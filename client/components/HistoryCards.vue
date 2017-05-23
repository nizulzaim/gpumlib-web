<template>
    <cards-content>
        <!--<textfield v-model="dataChange.dataName" placeholder="Data Name" :is-info="true"></textfield>-->
        <textfield v-model="dataChange.typeName" placeholder="Run Type" :is-info="true"></textfield>
        <textfield v-if="dataChange.dataName" v-model="dataChange.dataName" placeholder="Run Type" :is-info="true"></textfield>
        <textfield v-model="dataChange.samples" placeholder="Number of Samples" :is-info="true"></textfield>
        <textfield v-model="dataChange.features" placeholder="Number of Features" :is-info="true"></textfield>
        <textfield v-model="dataChange.runDate" placeholder="Running Date" :is-info="true"></textfield>
    </cards-content>
    
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
                data.runDate = Moment(data.createdAt).format("DD-MM-YYYY HH:mm A");

                return data;
            }
        }
    }
</script>
