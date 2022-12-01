const json = {
  tags: [{ "name" :"ecole", "color" : "#3B71CA" },{ "name" :"perso", "color" : "#2cb074" }],
};


const GetTags = () => {
  return json.tags;
};



const getColor = (e) => {

  return json.tags.filter(tag => tag.name == e)[0].color
}


export default {    GetTags, getColor };
