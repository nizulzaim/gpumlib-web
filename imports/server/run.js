import { Class } from 'meteor/jagi:astronomy';
import {Run, SOM} from "../model/Run";
import {MetaData} from "../model/MetaData";
import {Data} from "../model/Data";
import cmd from "node-cmd";

let SomRun = function(_id, clientStart, serverStart) {
    let som =SOM.findOne(_id);
    if (som) {
        let filename = som.metadata().data().versions.original.path;
        let data = som;
        let serverRun = new Date();
        let cmdRun = Meteor.bindEnvironment(function(err, data, stderr){
            if (err) {
                console.log(err);
                return;
            }
            // console.log(data);
            function strtok(src, delim){
                delim_escaped = new RegExp('[' + delim.replace(/[\[\]\(\)\*\+\?\.\\\^\$\|\#\-\{\}\/]/g, "\\$&") + ']', 'g');
                return src.replace(delim_escaped, delim[0]).split(delim[0]);
            }

            let arrLine = strtok(data, '\n\r');
            let arrLineNoEmpty = [];
            let serverRunTime = 0;
            let map = [];

            arrLine.forEach(item => {
                if (item !== "") {
                    arrLineNoEmpty.push(item);
                }
            })

            let executionTime = parseFloat(arrLineNoEmpty[1].replace ( /[^\d.]/g, '' ));
            for (let i = 3; i < arrLineNoEmpty.length; i++) {
                let temp = strtok(arrLineNoEmpty[i], ' ');
                let tempLine = [];
                temp.forEach(item => {
                    if (item !== "") {
                        tempLine.push(parseInt(item));
                    }
                })
                map.push(tempLine);
            }

            console.log(map);
            let results = {
                clientStart,
                serverStart,
                serverRun,
                executionTime,
                resultString: data,
                map,
            }

            som.results.push(results);
            som.save();
        }, (e) =>{
            throw e;
        })
        console.log(`".\\assets\\app\\som.exe" "${filename}" ${data.samples} ${data.features} ${data.x} ${data.y} ${data.iterations} ${data.type}`);
        cmd.get(`".\\assets\\app\\som.exe" "${filename}" ${data.samples} ${data.features} ${data.x} ${data.y} ${data.iterations} ${data.type}`,cmdRun);
        
    }
}
SOM.extend({
    meteorMethods: {
        run(obj, clientStart) {
            let serverStart = new Date();
            obj.samples = parseInt(obj.samples);
            obj.features = parseInt(obj.features);
            obj.x = parseInt(obj.x);
            obj.x = parseInt(obj.x);
            obj.iterations = parseInt(obj.iterations);
            obj.results = [];

            if (obj.type === 1) {
                obj.type = 2;
            }

            
            obj.userId = Meteor.userId();
            this.set(obj);
            let save = this.save();

            let runSOM = Meteor.bindEnvironment(()=> {
                SomRun(save, clientStart, serverStart);
            }, (e) =>{
                throw e;
            })
            
            setTimeout(runSOM, 1000);
            return save;
        },
        clientReceivedDate(date) {
            this.results[this.results.length - 1].clientReceived = date;
            this.save();
        }
    }
});

Meteor.publishComposite('soms', function(refresh = 0) {
    return {
        find: function() {
            return SOM.find({userId: this.userId}, {sort: {createdAt: -1}});
        },
        children: [
            {
                find(som) {
                    return MetaData.find({_id: som.metaId});
                },
                children: [
                    {
                        find(meta) {
                            return Data.find({_id: meta.dataId}).cursor;
                        },
                    },
                ]
            },
        ]
    };
});

Meteor.publishComposite('som', function(id="") {
    return {
        find: function() {
            return SOM.find({userId: this.userId, _id: id}, {sort: {createdAt: -1}});
        },
        // children: [
        //     {
        //         find(som) {
        //             return MetaData.find({_id: som.metaId});
        //         },
        //         children: [
        //             {
        //                 find(meta) {
        //                     return Data.find({_id: meta.dataId});
        //                 },
        //             },
        //         ]
        //     },
        // ]
    };
});