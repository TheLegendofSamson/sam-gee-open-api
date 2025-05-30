fetch("https://api.thedogapi.com/v1/images/search")
    .then(response => {
        if (!response.ok) {
            throw new Error("Request failed");
        }
        return response.json();
    })

    .then(data => {
        const imageData = data;
        console.log(imageData);
    })

    .catch(error => {
        console.error("An error occured:", error);
    });

fetch("https://api.thedogapi.com/v1/breeds")
    .then(response => {
        if (!response.ok) {
            throw new Error("Request failed");
        }
        return response.json();
    })

    .then(data => {
        const imageData = data;
        console.log(imageData);
    })

    .catch(error => {
        console.error("An error occured:", error);
    });