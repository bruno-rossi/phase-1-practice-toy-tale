let addToy = false;
let toysData = [];

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

  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => {    
    // displayToysAsCards(toysData);
    console.log(toys);

    toys.forEach(toy => {
      displayToyCard(toy);
    });
    
  });
})

function displayToyCard(toy) {
  const createCardDiv = document.createElement("div");
  const toyNameTag = document.createElement("h2");
  const toyImg = document.createElement("img");
  const pTag = document.createElement("p");
  const buttonTag = document.createElement("button");

  createCardDiv.className = "card";
  toyNameTag.textContent = toy.name;
  toyImg.src = toy.image;
  toyImg.className = "toy-avatar"; 
  buttonTag.className = "like-btn";
  buttonTag.id = toy.id;
  buttonTag.textContent = "Like ❤️";

  const toyCollectionDiv = document.querySelector("#toy-collection");

  createCardDiv.append(toyNameTag);
  createCardDiv.append(toyImg);
  createCardDiv.append(pTag);
  toyCollectionDiv.append(createCardDiv);
  createCardDiv.append(buttonTag);
  
  function displayNumLikes(num) {

    if (num === 1) {
      pTag.textContent = "1 like";
    } else {
      pTag.textContent = `${num} likes`;
    }
  }
  displayNumLikes(toy.likes);

  // Create like button functionality:
  
  // Get current number of likes:
  let numOfLikes;
  numOfLikes = toy.likes;
      
  // console.log(`${toy.name} has ${toy.likes} likes.`)
      
  // Add event listener to the button:
  buttonTag.addEventListener("click", event => {

    // Increment numOfLikes by one when the button is clicked: 
    let newNumOfLikes = ++numOfLikes;
        
    // Use a PATCH request to update the number of likes in the db:
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json" },
      body: JSON.stringify({
        "likes": newNumOfLikes
      })
    })

    // Execute the displayNumLikes function with the new number to update the text in the p tag:
    displayNumLikes(newNumOfLikes);
  })

}

// Create form functionality
const form = document.querySelector(".add-toy-form");

// Store the name and image url values in a let variable:
let newToyName;
let newToyImg;

// Add event listener to the form submit event:
form.addEventListener("submit", event => {
  event.preventDefault();

  // Assign the values of newToyName and newToyImg to the "value" inside each of the text input fields:
  newToyName = document.querySelector("#new-toy-name").value;
  newToyImg = document.querySelector("#new-toy-image").value;

  console.log(newToyName);
  console.log(newToyImg);

  // POST Request to add new item to the db, interpolating the value of newtoyName and newToyImg:
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
  .then(res => res.json())
  .then(newToy => {
    console.log(newToy);
    
    displayToyCard(newToy);
    // toysData.push({ 
    //   id: newToy.id,
    //   name: newToy.name,
    //   image: newToy.image,
    //   likes: newToy.likes
    //   });
    // console.log(toysData);
    // displayToysAsCards(toysData);
    debugger
    form.reset();
  })
});