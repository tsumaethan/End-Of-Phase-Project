document.addEventListener('DOMContentLoaded', function () {
    const breedSelect = document.getElementById('breed-select');
    const searchBtn = document.getElementById('search-btn');
    const dogGallery = document.getElementById('dog-gallery');

    // Fetch dog breeds and populate the select dropdown
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            breeds.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed;
                breedSelect.appendChild(option);
            });
        });

    // Event listener for search button click
    searchBtn.addEventListener('click', function () {
        const selectedBreed = breedSelect.value;
        const apiUrl = `https://dog.ceo/api/breed/${selectedBreed}/images/random`;
        
        // Fetch a random image of the selected breed
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const dogImage = document.createElement('img');
                dogImage.src = data.message;
                dogImage.alt = selectedBreed;
                dogImage.classList.add('dog-image');
                dogGallery.innerHTML = '';
                dogGallery.appendChild(dogImage);
            })
            .catch(error => {
                console.error('Error fetching dog image:', error);
            });
    });
});

