import { Class } from 'meteor/jagi:astronomy';
import {Meteor} from "meteor/meteor";
import { Data } from '/imports/model/Data.js';

export const MetaData = Class.create({
    name: "MetaData",
    collection: new Mongo.Collection('metadatas'),
    fields: {
        userId: String,
        dataId: String,
        name: String,
    },
    helpers: {
        data() {
            return Data.findOne({_id: this.dataId});
        },
        stringSize() {
            if (this.data()) {
                let s =this.data().size / 1000000;
                if ( s > 10) {
                    return s + " MB";
                } else if(s < 10 && s > 1) {
                    return s.toFixed(2) + " MB";
                } else {
                    return (s * 1000).toFixed(0) + " kB";
                }
            }
            return null;
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