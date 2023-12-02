"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
var user;
(function (user) {
    let UserRole;
    (function (UserRole) {
        UserRole["admin"] = "admin";
        UserRole["member"] = "member";
    })(UserRole = user.UserRole || (user.UserRole = {}));
    class User {
        constructor(userId, userName, userPassword, userRole, userFullName, birthDate) {
            this.userId = userId;
            this.userName = userName;
            this.userPassword = userPassword;
            this.userFullName = userFullName;
            if ((userRole === null || userRole === void 0 ? void 0 : userRole.toLowerCase()) == "admin".toLowerCase()) {
                this.userRole = UserRole.admin;
            }
            else {
                this.userRole = UserRole.member;
            }
            if (birthDate) {
                this.userBirthDate = new Date(birthDate);
            }
            //  
            // this.setBirthDate(birthDate);
        }
        get userBirthDate() {
            return this._userBirthDate;
        }
        set userBirthDate(date) {
            this._userBirthDate = date;
        }
    }
    user.User = User;
    // module.exports = User;
})(user || (exports.user = user = {}));
