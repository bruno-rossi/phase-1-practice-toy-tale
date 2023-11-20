let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })

   // Use a GET request to fetch the toy data.
  // Create a <div class="card"> for each toy and add it to the #toy-collection div.

// let toysData;

fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(toys => {

  // toysData = toys;
  // console.log(toys);

  const toyCollectionDiv = document.querySelector("#toy-collection");

  toys.forEach(toy => {
    const createCardDiv = document.createElement("div");
    createCardDiv.className = "card";
    toyCollectionDiv.append(createCardDiv);

    const toyNameTag = document.createElement("h2");
    toyNameTag.textContent = toy.name;
    createCardDiv.append(toyNameTag);

    const toyImg = document.createElement("img");
    toyImg.src = toy.image;
    toyImg.className = "toy-avatar";
    createCardDiv.append(toyImg);

    const pTag = document.createElement("p");
    function displayNumLikes(num) {
      if (num === 1) {
        pTag.textContent = "1 like";
      } else {
        pTag.textContent = `${num} likes`;
      }
    } 
    displayNumLikes(toy.likes);
    
    createCardDiv.append(pTag);

    const buttonTag = document.createElement("button");
    buttonTag.className = "like-btn";
    buttonTag.id = toy.id;
    buttonTag.textContent = "Like ❤️";
    createCardDiv.append(buttonTag);

    // Create like button functionality

    let numOfLikes;
    numOfLikes = toy.likes;

    console.log(`${toy.name} has ${toy.likes} likes.`)

    buttonTag.addEventListener("click", event => {

      let newNumOfLikes = ++numOfLikes;

      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json" },
        body: JSON.stringify({
          "likes": newNumOfLikes
        })
      })

      displayNumLikes(newNumOfLikes);
    })

   
  });    
})

// Create form functionality
const form = document.querySelector(".add-toy-form");
let newToyName;
let newToyImg;

form.addEventListener("submit", event => {
  event.preventDefault();
  newToyName = document.querySelector("#new-toy-name").value;
  newToyImg = document.querySelector("#new-toy-image").value;

  console.log(newToyName);
  console.log(newToyImg);

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json" },

    body: JSON.stringify({
      "name": `${newToyName}`,
      "image": `${newToyImg}`,
      "likes": 0
    })
  })
})

});
