import useLocalStorage from "./useLocalStorage";

const updateUser = async () => {
  const user = useLocalStorage.GetUser();
  if (!user) {
    alert("No user is Authentificated");
    return;
  }
  await request(
    process.env.REACT_APP_DBHOST_TODO,
    "PUT",
    user.token,
    user.todo
  );
};

const authenticate = (email, password) => {
  const user = {
    email: email,
    password: password,
  };
  return request(
    process.env.REACT_APP_DBHOST_USERS + "/authenticate",
    "POST",
    null,
    user
  ).then((value) => {
    if (
      value !== null &&
      value !== undefined &&
      value.result !== null &&
      value.result !== undefined
    ) {
      localStorage.setItem(
        process.env.REACT_APP_USER_KEY_LOCAL,
        JSON.stringify({ user: value.result })
      );
      window.location.href = "/";
    } else if (value.errorMessage !== undefined)
      alert(
        `Error while fetching : server response  =>  ${value.errorMessage}`
      );
  });
};

const createAccount = async (email, password, username) => {
  const localUser = useLocalStorage.GetUser();
  const user = {
    username: username,
    email: email,
    password: password,
  };
  return request(
    process.env.REACT_APP_DBHOST_USERS + "/register",
    "POST",
    localUser.token,
    user
  ).then((value) => {
    if (
      value !== null &&
      value !== undefined &&
      value.result !== null &&
      value.result !== undefined
    ) {
      localStorage.setItem(
        process.env.REACT_APP_USER_KEY_LOCAL,
        JSON.stringify({ user: value.result })
      );
      window.location.href = "/";
    } else if (value.errorMessage !== undefined)
      alert(
        `Error while fetching : server response  =>  ${value.errorMessage}`
      );
  });
};

const request = async (route, method, token = null, requestbody = null) => {
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
      alert(
        `Error while fetching the api, error given : ${e}  || ${a} || ${b}`
      );
    });
};

export default { updateUser, createAccount, authenticate };
