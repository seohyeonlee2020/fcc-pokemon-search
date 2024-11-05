const pokeUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const nameSection = document.getElementById("pokemon-name")
const idSection = document.getElementById("pokemon-id")
const weightSection = document.getElementById("weight")
const heightSection = document.getElementById("height")
const imgSection = document.getElementById("sprite")
const typeSection = document.getElementById("types")

const validateInput = async (searchText) => {
  try{
    const allRes = await fetch(pokeUrl);
    const allData = await allRes.json();
    //console.log("alldata", allData)
    const names = allData.results.map((elem) => elem.name);
    const ids = allData.results.map((elem) => parseInt(elem.id))

    const nameValid = names.includes(searchText);
    const idValid = ids.includes(searchText);

    return (nameValid || idValid);
  }
  catch (err){
    console.log(err);
  }
}


const fetchData = async (searchText) => {
  try{
    console.log("fetchData called")
      const callUrl = `${pokeUrl}/${searchText}`;
  console.log("callUrl", callUrl)
          const res = await fetch(callUrl);
    console.log("res here with callUrl ", callUrl)
    const data = await res.json();
    console.log("json coming")
    console.log("json", data)

    //destructure input
    const {name, id, weight, height, sprites, types, stats} = data;
    nameSection.textContent = name.toUpperCase();
    idSection.textContent = `#${id}`;
    weightSection.textContent = "weight: " + weight;
    heightSection.textContent = "height: " +  height;

    //get image
    const img_src = sprites.front_default;
    if(img_src){
      imgSection.src = img_src;
    }

//get type
//clear prev results
typeSection.innerHTML = ""
//console.log("types", types, typeof types)
  const typesList = types.map((elem) => elem.type.name) 
  //console.log(typesList, "typesList")
  typesList.map((elem) => {
    typeSection.innerHTML += `<p>${elem.toUpperCase()}</p>`
  })

//get stats
  stats.map((elem) => {
    console.log("stat", elem.stat.name, typeof elem.stat.name, elem.base_stat)
    const cell = document.getElementById(`${elem.stat.name}`);
    console.log(`table cell wiht id ${elem.stat.name}`, cell.innerHTML)
    cell.innerText = elem.base_stat;
  })
}catch (err) {
    //alert("Pokémon not found");
    console.log("error: ", err)
    return;
  }

}

const processInput = async () => {
  const inputVal = input.value;
  console.log("input", inputVal)
  //input can be either name or pokemon id
  let searchText;
  if(parseInt(inputVal)){
    //input is number
    searchText = parseInt(inputVal);
  }
  else {
    searchText = inputVal.toLowerCase().trim();
  }

  const inputValid = await validateInput(searchText);
  console.log("input validation outcome", inputValid)
  if(inputValid){
    fetchData(searchText)
  }
  else{
    alert("Pokémon not found");
    return;
  }

}

searchBtn.addEventListener("click", processInput)
