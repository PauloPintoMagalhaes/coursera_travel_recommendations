// Get the search bar and search button elements and respective event listener
document.getElementById('search-btn').addEventListener('click',showSearchResults );
document.getElementById("reset-btn").addEventListener("click", resetSearch);
const searchbar = document.getElementById("search")


function showSearchResults(event) {
    const keyword = searchbar.value.toLowerCase();

    if (keyword !== "" ) {
        // Fetch data and filter based on the keyword
        fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                let locations = searchForKeyword(data, keyword.toLowerCase())
                showLocations(locations);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}

function showLocations(locations) {
    // This is ugly as sin, but it will have to do
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = ''; // Clear previous results
    locations.forEach(location => {
        console.log(location)
        // Create a container for each location
        const locationDiv = document.createElement('div');
        locationDiv.classList.add('text-box'); 

        const nameElement = document.createElement('h3');
        nameElement.textContent = location.name; 
        locationDiv.appendChild(nameElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = location.description;
        locationDiv.appendChild(descriptionElement);

        const imageElement = document.createElement('img');
        imageElement.src = location.imageUrl;
        locationDiv.appendChild(imageElement);

        console.log(locationDiv)

        resultsContainer.appendChild(locationDiv);
    });
}

function searchForKeyword(data, keyword){
    let results = []
    // Searches for topics
    Object.keys(data).forEach(key => {
        if (key.toLowerCase().includes(keyword)){
            results = [...data[key]];
        }
    });
    // Searches for countries
    data.countries.forEach(country => {
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(keyword)){
                results.push(city)
            }
        });
        
    });

    console.log("search results: ");
    console.log(results);

    return results;
}

function resetSearch(event) {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = ''; // Clear previous results
    searchbar.value = "";
}