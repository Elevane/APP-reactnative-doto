import React, { useState } from "react";
import ListProjects from "./ListProjects";
import useLocalStorage from "../Hooks/useLocalStorage";
import useApi from "../Hooks/useApi";
import useLocalJson from "../Hooks/useLocalJson";
import routes from "../Hooks/useRoutes";
import { toast } from "react-hot-toast";

export default function Home() {
  const user = useLocalStorage.GetUser();
  const [history, setHistory] = useState(false);

  const handleLogout = () => {
    routes.logout();
  };

  const HandleSave = async () => {
    let res = await useApi.updateUserProjects();
    if (res.error) return toast.error(res.error);
    return toast.success("Projets sauvegardés");
  };

  return (
    <div id="home">
      <h1>
        Liste des Projets de
        {user && (
          <strong style={{ color: "#2f3e46" }}>{` ${user.username} `}</strong>
        )}
      </h1>
      <article style={{ margin: " 10px 0 30px 0" }}>
        {" "}
        <button
          onClick={() => setHistory(!history)}
          className={
            history
              ? "home_buttons history_active"
              : "home_buttons history_inactive"
          }
          type="submit"
          value="historique"
        >
          historique
        </button>
        <button
          onClick={HandleSave}
          className="home_buttons save_button"
          type="submit"
          value="Sauvegarder"
        >
          Sauvegarder
        </button>
        <button
          onClick={handleLogout}
          className="home_buttons history_active logout_button"
          type="submit"
          value="Déconnexion"
        >
          Déconnexion
        </button>
      </article>
      <ListProjects
        props={JSON.parse(user.todo).projects}
        history={history}
        tags={
          useLocalJson.GetTags()[0].name !== null
            ? useLocalJson.GetTags()[0].name
            : "Default"
        }
      />
    </div>
  );
}
