class User {
    userName; 
    userPassword;
    userFullName = undefined;
    userRole;
    userBirthDate = undefined;
    

    constructor(userName, userPassword, userRole, userFullName, birthDate) {
        this.userName = userName;
        this.userPassword = userPassword;
        if (userFullName) this.userFullName = userFullName;
        if (userRole && userRole.toLowerCase() == "admin".toLowerCase()) {
            this.userRole = "admin";
        }
        else {
            this.userRole = "member";
        }
        if (typeof birthDate == "string") this.userBirthDate = new Date(birthDate);
        else if (typeof birthDate == "Date") this.userBirthDate = birthDate; //shouldn't happen
        
    }
}
