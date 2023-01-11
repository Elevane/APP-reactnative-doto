
const json = {
  tags: [{ "name" :"ecole", "color" : "#588157" },{ "name" :"perso", "color" : "#54B4D3" }, { "name" :"bmm", "color" : "#f28482" }],
};

const GetTags = () => {
 
  return json.tags;
};


const getColor = (e) => {

  return json.tags.filter(tag => tag.name === e)[0].color
}


export default {    GetTags, getColor };
