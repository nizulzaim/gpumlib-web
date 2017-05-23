<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row has-gutter">
                <div class="col-xs-fluid-24 col-lg-fluid-6 col-md-fluid-8" v-for="(som, index) in soms" :key="som._id">
                    <cards>
                        <history-cards v-model="soms[index]"></history-cards>
                        <divider></divider>
                        <cards-action class="background-grey-100">
                            <div class="pull-right">
                                <!--<tooltip text="Download weight">
                                    <icon-button name="download" v-ripple trigger-tooltip></icon-button>
                                </tooltip>-->
                                <flat-button class="primary" @click="showMapMethod(som._id)" v-ripple>Heatmap</flat-button>
                                <color-button class="primary" @click="showReportMethod(som._id)" v-ripple>View Result</color-button>
                            </div>
                        </cards-action>
                    </cards>
                </div>
            </div>
            <reveal v-model="showReport" :enable-overlay-click="false">
                <div class="col-md-fluid-12" v-if="selectedId">
                    <cards v-depth="2">
                        <cards-content class="background-theme">
                            <div class="color-white font-light font-title font-center no-margin">Result Report</div>
                        </cards-content>
                        <cards-content-scrollbar>
                            <div class="row has-gutter">
                                <div class="col-xs-fluid-12">
                                    <textfield v-model="configCurrent.dataName" placeholder="Data Name" :is-info="true"></textfield>
                                </div>
                                <div class="col-xs-fluid-12">
                                    <textfield v-model="configCurrent.typeName" placeholder="Run Type" :is-info="true"></textfield>
                                </div>
                                <div class="col-xs-fluid-12">
                                    <textfield v-model="configCurrent.samples" placeholder="# Samples" :is-info="true"></textfield>
                                </div>
                                <div class="col-xs-fluid-12">
                                    <textfield v-model="configCurrent.features" placeholder="# Features" :is-info="true"></textfield>
                                </div>
                                <div class="col-xs-fluid-12">
                                    <textfield v-model="configCurrent.x" placeholder="Map X" :is-info="true"></textfield>
                                </div>
                                <div class="col-xs-fluid-12">
                                    <textfield v-model="configCurrent.y" placeholder="Map Y" :is-info="true"></textfield>
                                </div>
                                <div class="col-xs-fluid-12">
                                    <textfield v-model="configCurrent.iterations" placeholder="Number of Iterations" :is-info="true"></textfield>
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
                                    <textfield v-model="somCurrent.loadDataTimeString" placeholder="Load Data Time" :is-info="true"></textfield>
                                </div>
                                <div class="col-xs-fluid-12">
                                    <textfield v-model="somCurrent.overallTime" placeholder="Overall Execution Time" :is-info="true"></textfield>
                                </div>
                                <div class="col-xs-fluid-12">
                                    <textfield v-model="somCurrent.latencyString" placeholder="Network Latency" :is-info="true"></textfield>
                                </div>
                            </div>
                        </cards-content-scrollbar>
                        <divider></divider>
                        <cards-action class="cards-content">
                            <div class="pull-right">
                                <color-button class="primary" @click="showReport = false" v-ripple="">OK</color-button>
                            </div>
                        </cards-action>
                    </cards>
                </div>
            </reveal>
            <reveal v-model="showMap">
                <div class="col-md-fluid-12" v-if="selectedId">
                    <cards v-if="showMap && selectedSOM">
                        <heatmap v-model="somCurrent.map"></heatmap>
                        <divider></divider>
                        <cards-action class="cards-content">
                            <div class="pull-right">
                                <color-button class="primary" @click="showMap = false" v-ripple>OK</color-button>
                            </div>
                        </cards-action>
                    </cards>
                </div>
            </reveal>
        </page-container>
    </div>
</template>

<script>
    import {SOM} from '/imports/model/Run';
    import {MetaData} from '/imports/model/MetaData';
    import Moment  from "moment";
    export default {
        data() {
            return {
                selectedId: "",
                showReport: false,
                showMap: false,
            }
        },
        computed: {
             somCurrent() {
                if (this.selectedSOM && this.selectedSOM.results) {
                    let results = this.selectedSOM.results;
                    let r = results[results.length - 1];
                    // return results[results.length - 1].clientStart;
                    r.clientStartDT = Moment(r.clientStart).format("DD-MM-YYYY HH:mm:ss:SSS");
                    r.clientReceivedDT = Moment(r.clientReceived).format("DD-MM-YYYY HH:mm:ss:SSS");
                    r.serverStartDT = Moment(r.serverStart).format("DD-MM-YYYY HH:mm:ss:SSS");
                    r.serverRunDT = Moment(r.serverRun).format("DD-MM-YYYY HH:mm:ss:SSS");
                    r.serverFinishDT = Moment(r.serverRun).add(r.executionTime * 1000, 'milliseconds').format("DD-MM-YYYY HH:mm:ss:SSS");
                    r.execTime = ((Number(r.serverFinish) - Number(r.serverRun)) / 1000)  + " seconds";
                    r.overallTime = ((Number(r.clientReceived) - Number(r.clientStart)) / 1000) + " seconds";
                    r.latency = (((Number(r.clientReceived) - Number(r.clientStart)) / 1000) - ((Number(r.serverFinish) - Number(r.serverRun)) / 1000));
                    r.loadDataTime =  ((Number(r.serverFinish) - Number(r.serverRun)) / 1000) - r.executionTime ;
                    r.loadDataTimeString =  r.loadDataTime.toFixed(2) + " seconds";
                    r.latencyString = r.latency.toFixed(2) + " seconds";
                    if (r.executionTime >= 60) {
                        r.execTime = ((((Number(r.serverFinish) - Number(r.serverRun)) / 1000) / 60) ).toFixed(2) + " minutes";
                    }

                    if ((Number(r.clientReceived) - Number(r.clientStart)) / 1000 >= 60) {
                        r.overallTime = ((Number(r.clientReceived) - Number(r.clientStart)) / 1000 /60).toFixed(2) + " minutes";
                    }

                    if (r.latency >=60) {
                        r.latencyString = (r.latency/60).toFixed(2) + " minutes";
                    }

                    if (r.loadDataTime > 60) {
                        r.loadDataTimeString = (r.loadDataTime/60).toFixed(2) + " minutes";
                    }

                    return r;
                }

                return "";
            },
            selectedSOM() {
                console.log(SOM.findOne(this.selectedId));
                return SOM.findOne(this.selectedId);
            },
            configCurrent() {
                if (this.selectedSOM) {
                    let results = this.selectedSOM;
                    results.dataName = MetaData.findOne(results.metaId).name;
                    results.typeName = results.type === 0 ? "GPU": "CPU";

                    return results;
                }
                return "";
            },
            
        },
        methods: {
            showReportMethod(id) {
                this.selectedId = id;
                this.showReport = true;
            },
            showMapMethod(id) {
                this.selectedId = id;
                this.showMap = true;
            }
        },
        meteor: {
            subscribe: {
                soms: [],
            },
            soms() {
                return SOM.find();
            },
        }
    }
</script>
