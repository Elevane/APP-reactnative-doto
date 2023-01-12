const json = {
  tags: [
    { name: "ecole", color: "#84a98c" },
    { name: "perso", color: "#84a98c" },
    { name: "bmm", color: "#84a98c" },
  ],
};

const GetTags = () => {
  return json.tags;
};

const getColor = (e) => {
  return json.tags.filter((tag) => tag.name === e)[0].color;
};

export default { GetTags, getColor };
