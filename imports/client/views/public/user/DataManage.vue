<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row has-gutter">
                <div class="col-lg-fluid-4" v-if="!showCardsUploader">
                    <div @click="showUpload">
                        <cards style="cursor: pointer;" v-ripple="{background: '#CCCCCC'}">
                            <div style="padding-bottom: 140%"></div>
                            <div style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;">
                                <div class="row no-gutter center-xs middle-xs" style="height: 100%;">
                                    <div class="col-xs-fluid-24">
                                        <icon name="plus" style="font-size: 120px; line-height: 130px; height: 130px; width: 100%;" class="font-center color-grey-600"></icon>
                                    </div>
                                </div>
                            </div>
                        </cards>
                    </div>
                </div>
                <div class="col-lg-fluid-4" v-if="currentUpload.curValue && showCardsUploader">
                    <cards style="cursor: pointer;" v-ripple="{background: '#CCCCCC'}">
                        <div style="padding-bottom: 140%"></div>
                        <div style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;">
                            <div class="row no-gutter center-xs middle-xs" style="height: 100%;">
                                <div class="col-xs-fluid-24">
                                    <div class="font-headline font-light font-center">
                                        <div class="font-subhead font-thin no-margin">Data Name</div>
                                        {{dataname}}
                                    </div>
                                    <div class="font-display3 font-center">
                                        <div class="font-subhead font-thin no-margin">Uploading</div>
                                        {{currentUpload.curValue.progress.get()}}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </cards>
                </div>
                <div class="col-lg-fluid-4" v-for="meta in metadatas">
                    <cards class="data-cards">
                        <div style="padding-bottom: 140%"></div>
                        <div v-ripple="{background: '#CCCCCC'}" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" class="cards-place">
                            <div class="row no-gutter center-xs middle-xs" style="height: 100%;">
                                <div class="col-xs-fluid-24">
                                    <div class="font-headline font-light font-center color-white">
                                        <div class="font-subhead font-thin no-margin">Data Name</div>
                                        {{meta.name}}
                                    </div>
                                    <div class="font-headline font-light font-center color-white" v-if="meta.data()">
                                        <div class="font-subhead font-thin no-margin">Data Size</div>
                                        {{(meta.data().size / 1000000).toFixed(0)}} MB
                                    </div>
                                    <!--<div class="font-display3 font-center">
                                        <div class="font-subhead font-thin no-margin">Uploading</div>
                                        {{currentUpload.curValue.progress.get()}}%
                                    </div>-->
                                </div>
                            </div>
                        </div>
                        <cards-action class="cards-move"></cards-action>
                    </cards>
                </div>
            </div>
        </page-container>
    
        <reveal v-model="uploadNewData" :enable-overlay-click="false">
            <div class="col-md-fluid-8">
                <cards v-depth="2">
                    <cards-content class="background-theme">
                        <div class="color-white font-light font-title font-center no-margin">Upload New Data to Server</div>
                        <div class="color-white font-center">You can upload new data CSV or TXT format. The last column of data is the expected result</div>
                    </cards-content>
                    <cards-content-scrollbar>
                        <!--<div class="row has-gutter">
                                <div class="col-xs-fluid-12">
                                    <textfield v-model="bmi.weight" placeholder="Weight (kg)"></textfield>
                                </div>
                                <div class="col-xs-fluid-12">
                                    <textfield v-model="bmi.height" placeholder="Height (cm)"></textfield>
                                </div>
                            </div>-->
                            <input ref="fileInput" type="file" />
                            <!--<div>
                                Uploading <b>{{currentUpload.curValue.file.name}}</b>
                                <span id="progress">{{currentUpload.curValue.progress.get()}}%</span>
                            </div>
                            <div v-else>
                                
                            </div>-->
                        <!--<span id="progress">{{progress.get}}%</span>-->
                        
                        <!--<dropdown-select v-model="dataType" label="Data Type">
                                <menu-option value="0">Training</menu-option>
                                <menu-option value="1">Testing</menu-option>
                            </dropdown-select>-->
                        <textfield v-model="dataname" placeholder="Data Name"></textfield>
                    </cards-content-scrollbar>
                    <divider></divider>
                    <cards-action class="cards-content">
                        <div class="pull-right">
                            <flat-button @click="uploadNewData = false" class="primary" v-ripple>Close</flat-button>
                            <color-button @click="upload" class="primary" v-ripple>Upload</color-button>
                        </div>
                    </cards-action>
                </cards>
            </div>
        </reveal>
    </div>
</template>

<script>
    import {
        Data
    } from "/imports/model/Data";
    import {
        MetaData
    } from "/imports/model/MetaData";
    import Dropzone from "dropzone";
    export default {
        data() {
            return {
                uploadNewData: false,
                showCardsUploader: false,
                dataType: "",
                dataname: "",
                currentUpload: new ReactiveVar(false),
            }
        },
        mounted() {
            console.log(this.currentUpload);
            var client = new XMLHttpRequest();
            client.open('GET', 'http://localhost:3000/cdn/storage/Images/nvSYhNwSDWtEmBaTs/original/nvSYhNwSDWtEmBaTs.txt');
            client.onreadystatechange = function() {
                console.log(client.responseText);
            }
            client.send();
            
        },
        methods: {
            showUpload() {
                this.uploadNewData = true;
            },
            upload() {
                let self = this;
                let fileInput = this.$refs.fileInput;

                if (this.dataname === "") {
                    return this.$snackbar.run("Please enter data name", ()=> {}, "OK", "error");
                }
                if (fileInput.files && fileInput.files[0]) {
                    var upload = Data.insert({
                        file: fileInput.files[0],
                        streams: 'dynamic',
                        chunkSize: 'dynamic'
                    }, false);
    
                    upload.on('start',function() {
                        self.uploadNewData = false;
                        setTimeout(()=> {
                            self.currentUpload.set(this);
                            self.showCardsUploader = true;
                        }, 300);
                    });
    
                    upload.on('end', (error, fileObj) => {
                        if (error) {
                            this.$snackbar.run('Error during upload: ' + error.reason, ()=> {}, "OK", "error");
                        } else {
                            let metadata = new MetaData();
                            metadata.callMethod("create", {dataId: fileObj._id, name: this.dataname}, (err, result) => {
                                if (err) {
                                    return this.$snackbar.run(err.reason, () => {}, "OK", "error");
                                }
                                this.$snackbar.run('File "' + fileObj.name + '" successfully uploaded');
                            });
                            
                        }
                        this.currentUpload.set(false);
                        self.showCardsUploader = false;
                    });
                    upload.start();
                }
            }
        },
        meteor: {
            subscribe: {
                userMetadatas: [],
            },
            metadatas() {
                return MetaData.find({}, {sort: {createdAt: -1}});
            }
        }
    }
</script>