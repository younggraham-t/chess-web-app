export module user {
    export enum UserRole {
        admin = "admin",
        member = "member"
    }
    export class User {
        userId: number; 
        userName: string; 
        userPassword: string;
        userFullName?: string;
        userRole: UserRole;
        _userBirthDate?: Date;
        

        constructor(userId: number, userName: string, userPassword: string, userRole?: string, userFullName?: string, birthDate?: string) {
            this.userId = userId;
            this.userName = userName;
            this.userPassword = userPassword;
            this.userFullName = userFullName;
            if (userRole?.toLowerCase() == "admin".toLowerCase()) {
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
        // setBirthDate(birthDate?: string): void {
    
    }

// module.exports = User;
}