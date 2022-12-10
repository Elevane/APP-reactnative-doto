
const json = {
  tags: [{ "name" :"ecole", "color" : "#E4A11B" },{ "name" :"perso", "color" : "#54B4D3" }],
};

const GetTags = () => {
 
  return json.tags;
};


const getColor = (e) => {

  return json.tags.filter(tag => tag.name == e)[0].color
}


export default {    GetTags, getColor };
