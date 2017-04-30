import {FilesCollection} from 'meteor/ostrio:files';
import { Class } from 'meteor/jagi:astronomy';
import {Meteor} from "meteor/meteor";

export const Data = new FilesCollection({
    collectionName: 'Data',
    allowClientCode: false, // Disallow remove files from Client
    // debug: true,
    // storagePath: '/images',
    // permissions: 0774,
    // parentDirPermissions: 0774,
    collectionName: 'Data',
    onBeforeUpload: function (file) {
        if (/txt|csv/i.test(file.extension)) {
            return true;
        } else {
            return 'Please input txt or csv file';
        }
    }
});
