const domain = process.env.REACT_APP_DOMAIN;

const userPath = "user";
const usersPath = "users";

const getUsersURL = domain + "/" + usersPath;
const baseUserURL = domain + "/" + userPath;
const getUserURL = baseUserURL;
const createUserURL = baseUserURL;
const deleteUserURL = baseUserURL;
const editUserURL = baseUserURL;


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


export async function getUser(id) {
    let user = await makeAPICall(getUserURL, "get", id);
    if (user) {
        return user;
    } 
    else {
        alert("User not found");
    }
    
}

export async function saveUser(user) {
    let userResponse
    if (user.userId) {
        userResponse = await makeAPICall(editUserURL, "put", user.userId, user)
    }
    else {
        userResponse = await makeAPICall(createUserURL, "post", undefined, user)
    }
    return userResponse;
}
// this function is commented since it is a potential security issue
// async function deleteUser(id) {
//     confirm("Are you sure you want to delete user with id:" + id);
//     let deleteResponse = await makeAPICall(deleteUserURL,"delete",id);
//     if (deleteResponse) {
//         alert("Deleted User:" + id);
//     }
// }