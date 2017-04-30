import { Class } from 'meteor/jagi:astronomy';
import {User} from "../model/User";

User.extend({
    meteorMethods: {
        create(userObj, profileObj = {}) {
            userObj.profile = profileObj;
            Accounts.createUser(userObj);
        },
        update(profileObj) {
            this.set({
                profile: profileObj,
            }, { merge: true });
            this.save();
        }
    }
});

Meteor.publishComposite('loginUser', function(refresh = 0) {
    return {
        find: function() {
            return User.find(this.userId);
        },
    };
});

if (!User.findOne()) {
    Accounts.createUser({username: "admin", password: "n"});
    Accounts.createUser({username: "user", password: "n"});
}