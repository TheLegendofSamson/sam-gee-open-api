const photoUrl = "https://api.thedogapi.com/v1/images/search";
const breedUrl = "https://api.thedogapi.com/v1/breeds";
let breedId;

//fetching all breed data
fetch(breedUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return response.json();
  })

  .then((baseData) => {
    const allBreeds = baseData;
    console.log(allBreeds);
  })

  .catch((error) => {
    console.error("An error occurred:", error);
  });

//callback function for randomizeButton event listener
function randomizePhoto(event) {
  event.preventDefault();

  //fetching API data
  fetch(photoUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })

    .then((randomData) => {
      const imageData = randomData;
      console.log(imageData);

      //displaying image in Dog Photos section
      imageData.map((addImage) => {
        const photoSection = document.getElementById("dog-photos");
        const ogImage = document.createElement("img");
        ogImage.src = `${addImage.url}`;
        ogImage.innerText = "original image";
        const newImage = document.createElement("img");
        newImage.src = `${addImage.url}`;
        newImage.innerText = "new image";
        photoSection.appendChild(ogImage);

        //replacing original photo with new photo
        if (ogImage !== newImage) {
          photoSection.replaceChildren(newImage);
        }

        //getting breed Id from photo
        breedId = addImage.id;
        const breedName = document.getElementById("breed-name");

        if (breedName !== null) {
          breedName.innerHTML = "";
        }

        //adding detail button
        if (document.getElementById("detail-button") === null) {
          const detailSection = document.getElementById("dog-details");
          const detailButton = document.createElement("button");
          detailButton.innerText = "Get Details";
          detailButton.setAttribute("type", "button");
          detailButton.setAttribute("id", "detail-button");
          //detail button event listener function
          detailButton.addEventListener("click", getDetails);

          //appending detail button to detail section
          detailSection.appendChild(detailButton);
        }
      });
    })

    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

//callback function for getDetails event listener
function getDetails(event) {
  event.preventDefault();

  const breedsUrl = `https://api.thedogapi.com/v1/images/${breedId}`;
  console.log(breedsUrl);

  //fetching API data
  fetch(breedsUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })

    .then((moreData) => {
      const breedData = moreData;
      console.log(breedData);

      const detailSection = document.getElementById("dog-details");
      let breedName = document.getElementById("breed-name");

      if (breedName === null) {
        breedName = document.createElement("p");
        breedName.id = "breed-name";
      }

      //checking if breed is known
      if (breedData.breeds !== undefined) {
        const nameDisplay = `${breedData.breeds[0].name}`;
        breedName.innerHTML = nameDisplay;

        detailSection.appendChild(breedName);
      } else {
        const unknownMessageDisplay = `Breed unknown`;
        breedName.innerHTML = unknownMessageDisplay;

        detailSection.appendChild(breedName);
      }
    })

    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

//event listener for randomize Button
const randomizeButton = document.getElementsByName("randomize-dogs");
randomizeButton[0].addEventListener("click", randomizePhoto);
