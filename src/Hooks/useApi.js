import useLocalStorage from "./useLocalStorage";

const UpdateUser = () => {
  const user = useLocalStorage.GetUser();
  if (!user) {
    alert("No user is Authentificated");
    return;
  }
  Request(process.env.REACT_APP_DBHOST_TODO, "PUT", user.token, user.todo);
};

const Authenticate = (email, password) => {
  const user = {
    email: email,
    password: password
  };
  return Request(
    process.env.REACT_APP_DBHOST_USERS + "/authenticate",
    "POST",
    null,
    user
  ).then((value) => {
    if(value  != null && value != undefined && value.result != null && value.result != undefined)
    {
      localStorage.setItem("user", JSON.stringify({ user: value.result }));
      window.location.href = "/";
    }
    else if(value.errorMessage !== undefined )
        alert(`Error while fetching : server response  =>  ${value.errorMessage}`)  
     
  });
};

const CreateAccount = (email, password, username) => {
  const localUser = useLocalStorage.GetUser();
  const user = {
    username: username,
    email: email,
    password: password,
  };
  return Request(
    process.env.REACT_APP_DBHOST_USERS + "/register",
    "POST",
    localUser.token,
    user
  ).then((value) => {
    if(value  != null && value != undefined && value.result != null && value.result != undefined){
      localStorage.setItem("user", JSON.stringify({ user: value.result }));
      window.location.href = "/";
    }
    else if(value.errorMessage !== undefined )
        alert(`Error while fetching : server response  =>  ${value.errorMessage}`)  
   
  });
};

function Request(route, method, token = null, requestbody = null) {
  return fetch(route, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token !== null ? token : "",
      Accept: "*/*",
    },
    body: JSON.stringify(requestbody),
  })
    .then((data) => data.json())
    .catch(function (e, a, b) {
      alert(`Error while fetching the api, error given : ${e}  || ${a} || ${b}`);
      console.log(`Error while fetching the api, error given : ${e}  || ${a} || ${b}`);
    });
}

export default { UpdateUser, CreateAccount, Authenticate };
