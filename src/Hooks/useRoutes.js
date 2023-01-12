import useLocalStorage from "./useLocalStorage";

const logout = () => {
  useLocalStorage.clear();
  window.location.href = "/login";
};

const moveTo = (route) => {
  window.location.href = "/" + route;
};

export default { logout, moveTo };
