import useLocalStorage from "../../Hooks/useLocalStorage";
import routes from "../../Hooks/useRoutes";

export default function RequireAuth({ children }) {
  const user = useLocalStorage.GetUser();
  if (user === false) routes.logout();
  return children;
}
