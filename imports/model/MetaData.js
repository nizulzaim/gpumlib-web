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