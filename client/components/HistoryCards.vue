<template>
    <cards>
        <cards-content>
            <!--<textfield v-model="dataChange.dataName" placeholder="Data Name" :is-info="true"></textfield>-->
            <textfield v-model="dataChange.typeName" placeholder="Run Type" :is-info="true"></textfield>
            <textfield v-if="dataChange.dataName" v-model="dataChange.dataName" placeholder="Run Type" :is-info="true"></textfield>
            <textfield v-model="dataChange.samples" placeholder="# Samples" :is-info="true"></textfield>
            <textfield v-model="dataChange.clientStartDT" placeholder="Client Start DateTime" :is-info="true"></textfield>
            <textfield v-model="dataChange.serverStartDT" placeholder="Server Received DateTime" :is-info="true"></textfield>
            <textfield v-model="dataChange.serverRunDT" placeholder="Server Run DateTime" :is-info="true"></textfield>
            <textfield v-model="dataChange.serverFinishDT" placeholder="Server Finish DateTime" :is-info="true"></textfield>
            <textfield v-model="dataChange.clientReceivedDT" placeholder="Client Received DateTime" :is-info="true"></textfield>
            <textfield v-model="dataChange.execTime" :placeholder="dataChange.typeName + ' Execution Time'" :is-info="true"></textfield>
            <textfield v-model="dataChange.overallTime" placeholder="Overall Execution Time" :is-info="true"></textfield>
        </cards-content>
        <divider></divider>
        <cards-action>
            <div class="pull-right">
                <tooltip text="Download weight">
                    <icon-button name="download" v-ripple trigger-tooltip></icon-button>
                </tooltip>
                <color-button class="primary" v-ripple>View Result</color-button>
            </div>
        </cards-action>
    </cards>
</template>
<script>
    import {MetaData} from '/imports/model/MetaData';
    import Moment  from "moment";
    export default {
        props: {
            value: Object,
        },
        computed: {
            dataChange() {
                let data = this.value;
                let metadata = MetaData.findOne(data.metaId);
                if (metadata) {
                    data.dataName = metadata.name;
                }
                data.typeName = data.type === 0 ? "GPU": "CPU";
                data.clientStartDT = Moment(data.clientStart).format("DD-MM-YYYY HH:mm:ss:SSS");
                data.clientReceivedDT = Moment(data.clientReceived).format("DD-MM-YYYY HH:mm:ss:SSS");
                data.serverStartDT = Moment(data.serverStart).format("DD-MM-YYYY HH:mm:ss:SSS");
                data.serverRunDT = Moment(data.serverRun).format("DD-MM-YYYY HH:mm:ss:SSS");
                data.serverFinishDT = Moment(data.serverRun).add(data.results[0].executionTime * 1000, 'milliseconds').format("DD-MM-YYYY HH:mm:ss:SSS");
                data.execTime = data.results[0].executionTime.toFixed(2) + " seconds";
                data.overallTime = (Number(data.clientReceived) - Number(data.clientStart)) / 1000 + " seconds";

                if (data.executionTime >= 60) {
                    data.execTime = (data.results[0].executionTime/60).toFixed(2) + " minutes";
                }

                if ((Number(data.clientReceived) - Number(data.clientStart)) / 1000 >= 60) {
                    data.overallTime = ((Number(data.clientReceived) - Number(data.clientStart)) / 1000 /60).toFixed(2) + " minutes";
                }

                return data;
            }
        }
    }
</script>
