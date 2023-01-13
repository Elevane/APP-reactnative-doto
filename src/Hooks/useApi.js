import useLocalStorage from "./useLocalStorage";

const processResult = (value) => {
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
    return { isSucess: true, error: null };
  } else if (value.errorMessage !== undefined)
    return { isSucess: false, error: value.errorMessage };
  else {
    return { isSucess: false, error: "unknwown error while fetching api" };
  }
};

const updateUser = async () => {
  const user = useLocalStorage.GetUser();
  if (!user) {
    alert("No user is Authentificated");
    return;
  }
  return await request(
    process.env.REACT_APP_DBHOST_TODO,
    "PUT",
    user.token,
    user.todo
  ).then((value) => {
    return processResult(value);
  });
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
    return processResult(value);
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
    return processResult(value);
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
      console.log(
        `Error while fetching the api, error given : ${e}  || ${a} || ${b}`
      );
      return { isSucess: false, error: `${e}  || ${a} || ${b}` };
    });
};

export default { updateUser, createAccount, authenticate };
