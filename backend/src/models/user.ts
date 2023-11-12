export module user {
    export enum UserRole {
        admin,
        member
    }
    export class User {
        userId: number; 
        userName: string; 
        userPassword: string;
        userFullName?: string;
        userRole?: UserRole;
        

        constructor(userId: number, userName: string, userPassword: string, userFullName?: string, userRole?: UserRole) {
            this.userId = userId;
            this.userName = userName;
            this.userPassword = userPassword;
            this.userFullName = userFullName;
            this.userRole = userRole;
        }
    }

// module.exports = User;
}