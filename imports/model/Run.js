import { Class, Type } from 'meteor/jagi:astronomy';
import {Meteor} from "meteor/meteor";
import { MetaData } from '/imports/model/MetaData.js';
import Moment  from "moment";

let runs = new Mongo.Collection('runs');
Type.create({
    name: 'Array',
    class: Array,
});

export const RunResult = Class.create({
    name: "RunResult",
    fields: {
        clientStart: Date,
        clientReceived: {type: Date, optional: true},
        serverStart: Date,
        serverRun: Date,
        executionTime: Number,
        resultString: String,
        map: [Array],
        clientStartDT: {
            type: String,
            resolve(doc) {
                console.log(Moment(doc.clientStart).format("DD-MM-YYYY HH:mm"));
                return Moment(doc.clientStart).format("DD-MM-YYYY HH:mm");
            }
        }
    },
});

export const Run = Class.create({
    name: "Run",
    collection: runs,
    typeField: 'type',
    fields: {
        userId: String,
        metaId: String,
        results: {
            type: [Object],
            default: null,
        },
        
    },
    helpers: {
        metadata() {
            return MetaData.findOne({_id: this.metaId});
        }
    },
    behaviors: {
        timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
            hasUpdatedField: true,
            updatedFieldName: 'updatedAt'
        },
        softremove: {
            removedFieldName: 'removed',
            hasRemovedAtField: true,
            removedAtFieldName: 'removedAt'
        }
    }
});

export const SOM = Class.create({
    name: "SOM",
    collection: runs,
    fields: {
        userId: String,
        metaId: String,
        results: {
            type: [Object],
            default: null,
        },
        type: Number,
        samples: Number,
        features: Number,
        x: Number,
        y: Number,
        iterations: Number,
    },
    helpers: {
        metadata() {
            return MetaData.findOne({_id: this.metaId});
        }
    },
    behaviors: {
        timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
            hasUpdatedField: true,
            updatedFieldName: 'updatedAt'
        },
        softremove: {
            removedFieldName: 'removed',
            hasRemovedAtField: true,
            removedAtFieldName: 'removedAt'
        }
    }
});