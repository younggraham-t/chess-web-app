function showUserPopup() {
    const userPopup = document.getElementById('newUserPopup');
    userPopup.classList.remove("hidden"); 
}
function hideUserPopup() {
    const userPopup = document.getElementById('newUserPopup');
    userPopup.classList.add("hidden"); 

    toggleUserNameTaken(false);
}

function toggleUserNameTaken(shouldDisplay) { 
    const userNameTakenMessage = document.getElementById("userNameTakenMessage");
    if (userNameTakenMessage.classList.contains("hidden") && shouldDisplay) {
        userNameTakenMessage.classList.remove("hidden");
    }
    else if (!userNameTakenMessage.classList.contains("hidden") && !shouldDisplay) {
        userNameTakenMessage.classList.add("hidden");
    }
}

function displayUserUpdateFailed() {

}

function submitUser() {
    const formInputs = document.getElementById("userForm").elements; 
    const userId = formInputs["userId"].value;
    const userName = formInputs["userName"].value;
    const userPassword = formInputs["userPassword"].value;
    const userFullName = formInputs["userFullName"].value;
    const userRole = formInputs["userRole"].value;
    const userBirthDate = formInputs["userBirthDate"].value;
    if (userId) {
        updateUser(userId, userName, userPassword, userRole, userFullName, userBirthDate);
    }
    else {
        addUser(userName, userPassword, userRole, userFullName, userBirthDate);
    }
    
}