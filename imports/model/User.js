import { Class } from 'meteor/jagi:astronomy';
import {Meteor} from "meteor/meteor";

export const UserProfile = Class.create({
    name: 'UserProfile',
    fields: {
        firstName: {type:String, default: ""},
        lastName: {type:String, default: ""},
        userType: {type:[Number], default: 0},
    }
});

export const User = Class.create({
    name: "User",
    collection: Meteor.users,
    fields: {
        username: String,
        profile: UserProfile,
        // fullname: {
        //     transient: true,
        //     type: String,
        //     resolve(doc) {
        //         String.prototype.capitalizeFirstLetter = function() {
        //             return this.charAt(0).toUpperCase() + this.slice(1);
        //         };
        //         return doc.profile.firstName.capitalizeFirstLetter() + " " + doc.profile.lastName.capitalizeFirstLetter();
        //     }
        // }
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