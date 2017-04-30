import { Class } from 'meteor/jagi:astronomy';
import {MetaData} from "../model/MetaData";
import {Data} from "../model/Data";

MetaData.extend({
    meteorMethods: {
        create(obj) {
            this.userId = Meteor.userId();
            this.dataId = obj.dataId;
            this.name = obj.name;
            this.save();
        },
    }
});

Meteor.publishComposite('userMetadatas', function(refresh = 0) {
    return {
        find: function() {
            return MetaData.find({userId: this.userId}, {sort: {createdAt: -1}});
        },
        children: [
            {
                find(meta) {
                    return Data.find({_id: meta.dataId}).cursor;
                },
            },
        ]
    };
});