const json = {
    projects: [
      {
          name: "TP_WEBSERVICE",
          tag : "école",
          color : "#3B71CA",
          childs : [
            {
              desc : "un schéma de base de données re"},
            {
              desc : "je peux créer un object complot issue de wikipedia"
            }
          ] 
        } ,
        {
          name: "Tp webmobile",
          tag : "école",
          color : "#3B71CA",
          childs : [
            {
              desc : "un schéma de base de données représentant toutes le"
            },
            {
              desc : "je peux créer un object complot issue de wikipedia"
            },
            {
              desc : "un schéma de base de données représentant toutes les tables imparties. "
            },
            {
              desc : "je peux créer un object complot issue de wikipedia"
            },
            {
              desc : "un schéma de base de données représentant toutes les tables imparties. "
            },
            {
              desc : "je peux créer un object complot issue de wikipedia"
            },
            {
              desc : "je peux créer un object complot issue de wikipedia"
            },
            {
              desc : "je peux créer un object complot issue de wikipedia"
            }
          ] 
        }
    ],
  };
const GetJson = () => {
    return json;
}

const updateJson = (desc, name) => {
  
  let a =  json.projects.filter(x => x.name === name);
  //console.log(desc, name, a)
  a[0].childs.push({desc: desc})
}

const GetChildsJson = (name) => {
  return json.projects.filter(x => x.name === name)[0].childs;
}


export default { GetJson, updateJson, GetChildsJson}