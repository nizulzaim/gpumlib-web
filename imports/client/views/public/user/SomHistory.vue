<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row has-gutter">
                <div class="col-xs-fluid-24 col-lg-fluid-6 col-md-fluid-8" v-for="(som, index) in soms" :key="som._id">
                    <history-cards v-model="soms[index]"></history-cards>
                </div>
            </div>
        </page-container>
    </div>
</template>

<script>
    import {SOM} from '/imports/model/Run';
    export default {
        meteor: {
            subscribe: {
                soms: [],
            },
            soms() {
                return SOM.find();
            }
        }
    }
</script>
