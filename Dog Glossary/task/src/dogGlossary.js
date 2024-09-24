async function showRandomDog() {
    await fetchFunction(null);
}
async function fetchFunction(breedName) {
    try{
        let url;
        let imageContainer = document.getElementById("content");
        if (breedName) {
            url = "https://dog.ceo/api/breed/" + breedName + "/images/random";
        } else {
            url = "https://dog.ceo/api/breeds/image/random";
        }
        const response = await fetch(url);
        const data = await response.json();
        let imageSrc = data.message;
        let content = document.getElementById("content");
        let DogImage = document.createElement("img");
        content.innerHTML = "";
        DogImage.src = imageSrc;
        DogImage.alt = "random dog";
        imageContainer.appendChild(DogImage);
    } catch(error){
        console.log(error)
    }
}
async function showBreed() {
    let breedsResponse = await fetch("https://dog.ceo/api/breeds/list");
    let listOfBreeds = (await breedsResponse.json()).message;
    let dogBreed = document.getElementById("input-breed").value.toLowerCase();
    let existingBreed = listOfBreeds.find((breed) => breed === dogBreed);
    if (existingBreed) {
        // img
        await fetchFunction(dogBreed);
    } else {
        // error
        let breedNotFound = document.createElement("p");
        breedNotFound.textContent = "Breed not found!";
        let content = document.getElementById("content");
        content.innerHTML = "";
        content.appendChild(breedNotFound);
    }
}


async function showSubBreed() {
    try {
        let subBreedsResponse = await fetch("https://dog.ceo/api/breeds/list/all");
        let dogBreed = document.getElementById("input-breed").value.toLowerCase();
        let listOfSubBreeds = (await subBreedsResponse.json()).message[dogBreed];

        // Clear the content div first to ensure it only has one element at a time
        let content = document.getElementById("content");
        content.innerHTML = "";

        if (listOfSubBreeds && listOfSubBreeds.length > 0) {
            // Create an ordered list and append sub-breeds to it
            let listContainer = document.createElement("ol");
            listContainer.id = "sub-breed-container";

            for (let i = 0; i < listOfSubBreeds.length; i++) {
                let listElement = document.createElement("li");
                listElement.textContent = listOfSubBreeds[i];
                listElement.classList.add("breed-item");
                listContainer.appendChild(listElement);
            }

            // Append the listContainer (ol) as the only child of content
            content.appendChild(listContainer);
        } else if (listOfSubBreeds && listOfSubBreeds.length === 0) {
            // If no sub-breeds are found, show the "No sub-breeds found!" message
            let subBreedsNotFound = document.createElement("p");
            subBreedsNotFound.textContent = "No sub-breeds found!";
            content.appendChild(subBreedsNotFound);
        } else {
            // Handle the case where the breed is not found in the API
            let breedNotFound = document.createElement("p");
            breedNotFound.textContent = "Breed not found!";
            content.appendChild(breedNotFound);
        }
    } catch (error) {
        console.log("Error fetching sub-breeds:", error);
    }
}

async function showAllBreeds() {
    try {
        let allBreedsResponse = await fetch("https://dog.ceo/api/breeds/list/all");
        let content = document.getElementById("content");
        content.innerHTML = "";
        let listContainer = document.createElement("ol");
        let allBreeds = (await allBreedsResponse.json()).message;
        let allBreedsOnlyKeys = Object.keys(allBreeds);
        for (let i = 0; i < allBreedsOnlyKeys.length; i++) {
            let listElement = document.createElement("li");
            listElement.textContent = allBreedsOnlyKeys[i];
            let currentBreed = allBreedsOnlyKeys[i];

            let listOfSubBreeds = allBreeds[currentBreed];

            if (listOfSubBreeds.length > 0) {
                let subBreedContainer = document.createElement("ul");
                listElement.appendChild(subBreedContainer);

                for (let j = 0; j < listOfSubBreeds.length; j++) {
                    let breed = document.createElement("li");
                    breed.textContent = listOfSubBreeds[j];
                    breed.classList.add("sub-breed-item");
                    subBreedContainer.appendChild(breed);
                }

            }
            listContainer.appendChild(listElement);
        }
        content.appendChild(listContainer);

    } catch (error) {
        console.log("Error fetching all breeds:", error);
    }
}