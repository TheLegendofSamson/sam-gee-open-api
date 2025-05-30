const photoUrl = "https://api.thedogapi.com/v1/images/search";
const breedUrl = "https://api.thedogapi.com/v1/breeds";

//callback function for randomizeButton event listener
function randomizePhoto(event) {
    event.preventDefault();

    //fetching API data
    fetch(photoUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Request failed");
            }
            return response.json();
        })

        .then(randomData => {
            const imageData = randomData;
            console.log(imageData);

            //displaying image in Dog Photos section
            imageData.map(addImage => {
                const photoSection = document.getElementById("dog-photos");
                const image = document.createElement("img");
                image.src = `${addImage.url}`;
                photoSection.appendChild(image);
            });
        })
        
        .catch(error => {
            console.error("An error occured:", error);
        });
}

fetch(breedUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error("Request failed");
        }
        return response.json();
    })

    .then(searchData => {
        const breedData = searchData;
        console.log(breedData);
    })

    .catch(error => {
        console.error("An error occured:", error);
    });
   
//event listener for randomize Button
const randomizeButton = document.getElementsByName("randomize-dogs");
randomizeButton[0].addEventListener("click", randomizePhoto);