import { Data } from '/imports/model/Data.js';

Meteor.publishComposite('files.datas.all', function() {
    return {
        find: function() {
            return Data.find().cursor;
        },
    };
});