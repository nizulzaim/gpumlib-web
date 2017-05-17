<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row has-gutter center-xs">
                <div class="col-xs-fluid-12">
                    <cards>
                        <form @submit.prevent="runData">
                            <cards-content>
                                <div class="row">
                                    <div class="col-xs-fluid-8">
                                        <dropdown-select v-model="passData.type" label="Train From">
                                            <menu-option :value="0">GPU</menu-option>
                                            <menu-option :value="1">CPU</menu-option>
                                        </dropdown-select>
                                    </div>
                                    <div class="col-xs-fluid-16">
                                        <dropdown-select v-model="passData.metaId" label="Train Data">
                                            <menu-option v-for="meta in metadatas" :key="meta._id" :value="meta._id">{{meta.name}}</menu-option>
                                        </dropdown-select>
                                    </div>
                                    <div class="col-xs-fluid-8">
                                        <textfield v-model="passData.samples" placeholder="# Samples"></textfield>
                                    </div>
                                    <div class="col-xs-fluid-8">
                                        <textfield v-model="passData.features" placeholder="# Features"></textfield>
                                    </div>
                                    <div class="col-xs-fluid-8">
                                        <textfield v-model="passData.iterations" placeholder="Number of Iterations"></textfield>
                                    </div>
                                    <div class="col-xs-fluid-4">
                                        <textfield v-model="passData.x" placeholder="Map X"></textfield>
                                    </div>
                                    <div class="col-xs-fluid-4">
                                        <textfield v-model="passData.y" placeholder="Map Y"></textfield>
                                    </div>
                                </div>
                            </cards-content>
                            <divider></divider>
                            <cards-action>
                                <div class="pull-right">
                                    <color-button type="submit" class="primary" :disabled="disabledButton" v-ripple>Run</color-button>
                                </div>
                            </cards-action>
                        </form>
                    </cards>
                </div>
            </div>
        </page-container>

        <reveal v-model="showReport" :enable-overlay-click="false">
            <div class="col-md-fluid-12" v-if="runningSOM">
                <cards v-depth="2" v-if="globalResultsLength">
                    <cards-content class="background-theme">
                        <div class="color-white font-light font-title font-center no-margin">Result Report</div>
                    </cards-content>
                    <cards-content-scrollbar>
                        <div class="row has-gutter" v-for="s in runningSOM">
                            <div class="col-xs-fluid-12">
                                <textfield v-model="configCurrent.dataName" placeholder="Data Name" :is-info="true"></textfield>
                            </div>
                            <div class="col-xs-fluid-12">
                                <textfield v-model="configCurrent.typeName" placeholder="Run Type" :is-info="true"></textfield>
                            </div>
                            <div class="col-xs-fluid-8">
                                <textfield v-model="configCurrent.samples" placeholder="# Samples" :is-info="true"></textfield>
                            </div>
                            <div class="col-xs-fluid-8">
                                <textfield v-model="configCurrent.features" placeholder="# Features" :is-info="true"></textfield>
                            </div>
                            <div class="col-xs-fluid-8">
                                <textfield v-model="configCurrent.iterations" placeholder="Number of Iterations" :is-info="true"></textfield>
                            </div>
                            <div class="col-xs-fluid-4">
                                <textfield v-model="configCurrent.x" placeholder="Map X" :is-info="true"></textfield>
                            </div>
                            <div class="col-xs-fluid-4">
                                <textfield v-model="configCurrent.y" placeholder="Map Y" :is-info="true"></textfield>
                            </div>
                            <divider></divider>
                            <div class="col-xs-fluid-12">
                                <textfield v-model="somCurrent.clientStartDT" placeholder="Client Start DateTime" :is-info="true"></textfield>
                            </div>
                            <div class="col-xs-fluid-12">
                                <textfield v-model="somCurrent.serverStartDT" placeholder="Server Received DateTime" :is-info="true"></textfield>
                            </div>
                            <div class="col-xs-fluid-12">
                                <textfield v-model="somCurrent.serverRunDT" placeholder="Server Run DateTime" :is-info="true"></textfield>
                            </div>
                            <div class="col-xs-fluid-12">
                                <textfield v-model="somCurrent.serverFinishDT" placeholder="Server Finish DateTime" :is-info="true"></textfield>
                            </div>
                            <div class="col-xs-fluid-12">
                                <textfield v-model="somCurrent.clientReceivedDT" placeholder="Client Received DateTime" :is-info="true"></textfield>
                            </div>
                            <divider></divider>
                            <div class="col-xs-fluid-12">
                                <textfield v-model="somCurrent.execTime" :placeholder="configCurrent.typeName + ' Execution Time'" :is-info="true"></textfield>
                            </div>
                            <div class="col-xs-fluid-12">
                                <textfield v-model="somCurrent.overallTime" placeholder="Overall Execution Time" :is-info="true"></textfield>
                            </div>
                        </div>
                    </cards-content-scrollbar>
                    <divider></divider>
                    <cards-action class="cards-content">
                        <div class="pull-right">
                            <color-button class="primary" v-ripple="">Next</color-button>
                        </div>
                    </cards-action>
                </cards>
            </div>
        </reveal>
        <loader ref="loader"></loader>
    </div>
</template>

<script>
    import {Run,SOM} from "/imports/model/Run.js";
    import {MetaData} from "/imports/model/MetaData.js";
    import Moment  from "moment";
    export default {
        data() {
            return {
                passData: {
                    type: "",
                    metaId: "",
                    samples: 0,
                    features: 0,
                    x: 10,
                    y: 10,
                    iterations: 1,
                },
                globalResultsLength: null,
                disabledButton: false,
                runId: "",
                runningSOM: null,
                showReport: false,
            }
        },
        computed: {
            somCurrent() {
                if (this.runningSOM && this.runningSOM[0].results) {
                    let results = this.runningSOM[0].results;
                    let r = results[results.length - 1];
                    // return results[results.length - 1].clientStart;
                    r.clientStartDT = Moment(r.clientStart).format("DD-MM-YYYY HH:mm:ss:SSS");
                    r.clientReceivedDT = Moment(r.clientReceived).format("DD-MM-YYYY HH:mm:ss:SSS");
                    r.serverStartDT = Moment(r.serverStart).format("DD-MM-YYYY HH:mm:ss:SSS");
                    r.serverRunDT = Moment(r.serverRun).format("DD-MM-YYYY HH:mm:ss:SSS");
                    r.serverFinishDT = Moment(r.serverRun).add(r.executionTime * 1000, 'milliseconds').format("DD-MM-YYYY HH:mm:ss:SSS");
                    r.execTime = r.executionTime.toFixed(2) + " seconds";
                    r.overallTime = (Number(r.clientReceived) - Number(r.clientStart)) / 1000 + " seconds";

                    if (r.executionTime >= 60) {
                        r.execTime = (r.executionTime/60).toFixed(2) + " minutes";
                    }

                    if ((Number(r.clientReceived) - Number(r.clientStart)) / 1000 >= 60) {
                        r.overallTime = ((Number(r.clientReceived) - Number(r.clientStart)) / 1000 /60).toFixed(2) + " minutes";
                    }

                    return r;
                }

                return "";
            },
            configCurrent() {
                if (this.runningSOM && this.runningSOM[0].results) {
                    let results = this.runningSOM[0];
                    results.dataName = MetaData.findOne(results.metaId).name;
                    results.typeName = results.type === 0 ? "GPU": "CPU";

                    return results;
                }

                return "";
            }
        },
        methods: {
            runData() {
                this.$refs.loader.enable();
                this.disabledButton = true;
                let som = new SOM();
                let clientStartDate = new Date();
                som.callMethod("run", this.passData, clientStartDate, (err, result) => {
                    this.$refs.loader.disable();
                    if (err) {
                        this.disabledButton = false;
                        return this.$snackbar.run(err.reason, () => {}, "OK", "error");
                    }
                    this.$snackbar.run('Data is been running in background');
                    this.runId = result;
                });
            },
            clearText() {
                this.passData = {
                    type: "",
                    metaId: "",
                    samples: 0,
                    features: 0,
                    x: 10,
                    y: 10,
                    iterations: 1,
                }
            },
            setClientReceivedDate() {
                let som = SOM.findOne();
                som.callMethod("clientReceivedDate", new Date(), (err, result) => {
                    if (err) {
                        this.disabledButton = false;
                        return this.$snackbar.run("Error sending Received Date", () => {}, "OK", "error");
                    }
                    this.showReport = true;
                });
            }
        },
        meteor: {
            subscribe: {
                userMetadatas: [],
                "som": function() {
                    return  [this.runId];
                },
            },
            metadatas() {
                return MetaData.find({}, {sort: {createdAt: -1}});
            },
            runningSOM() {
                let som  = SOM.find();

                if (som.fetch()[0]) {
                    if (this.globalResultsLength === null) {
                        this.globalResultsLength = som.fetch()[0].results.length;
                    } else {
                        if (this.globalResultsLength < som.fetch()[0].results.length) {
                            this.setClientReceivedDate();
                            this.globalResultsLength = som.fetch()[0].results.length;
                            this.$snackbar.run("Successfully run the SOM data");
                            console.log(som.fetch()[0]);
                        }
                    }
                }
                return som;
            }
        }
    }
</script>