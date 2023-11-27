function buildFetchOptions(method,bodyObject) {
    let fetchOptions = {};
    fetchOptions.method = method.toLowerCase();
    if (fetchOptions.method == 'post' || fetchOptions.method == 'put') {
        fetchOptions.body = JSON.stringify(bodyObject);
        fetchOptions.headers = {"Content-Type":"application/json"};
    }
    return fetchOptions;
}
async function makeAPICall(url,method,idParam,bodyObject) {
    let fetchOptions = buildFetchOptions(method,bodyObject);
    if (idParam && idParam != null) {
        url += "/"+idParam;
    }
    let apiResponse = await fetch(url,fetchOptions);
    if (apiResponse.status != 200) return undefined;
    let apiResponseJSON = await apiResponse.json();
    return apiResponseJSON;
}

async function getUserList() {
    let userList = await makeAPICall(getUsersURL, "get");
    // console.log(userList);
    return userList; 
}

async function getUser(id) {
    let user = await makeAPICall(getUserURL, "get", id);
    if (user) {
        return user;
    } 
    else {
        alert("User not found");
    }
    
}

async function addUser(userName, userPassword, userRole, userFullName, userBirthDate) {
   let newUser = new User(userName, userPassword, userRole, userFullName, userBirthDate);
   let response = await makeAPICall(createUserURL, "post", undefined, newUser);
//    console.log(response);
   if (response && response != null) {
        // console.log(response.body);
        hideUserPopup();
   }
   else {
        toggleUserNameTaken(true);
   }
}

async function updateUser(id, userName, userPassword, userRole, userFullName, userBirthDate) {
    let newUser = new User(userName, userPassword, userRole, userFullName, userBirthDate);
    let response = await makeAPICall(createUserURL, "post", id, newUser);
    if (response) {
        hideUserPopup();
    }
    else {
        displayUserUpdateFailed();
    }
}

// this function is commented since it is a potential security issue
// async function deleteUser(id) {
//     confirm("Are you sure you want to delete user with id:" + id);
//     let deleteResponse = await makeAPICall(deleteUserURL,"delete",id);
//     if (deleteResponse) {
//         alert("Deleted User:" + id);
//     }
// }