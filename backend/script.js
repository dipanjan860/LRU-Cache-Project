var set_capacity='http://localhost:5000/set_capacity';//post left
var search_value='http://localhost:5000/search';//post right
var reset_page='http://localhost:5000/reset';//post left
var cache_contents='http://localhost:5000/get_cache_contents';//get left
var search_history='http://localhost:5000/search_history';//get another page
var state_details='http://localhost:5000/state_details';//get right

async function setCapacity() {
    const capacity = document.getElementById('capacity').value;
    const response = await fetch(set_capacity, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ capacity: parseInt(capacity) })
    });
    const result = await response.json();
    document.getElementById('result').innerText = result.message;
    updateCacheContents();
    updateSearchHistory();
}

async function searchValue() {
    const value = document.getElementById('value').value;
    const response = await fetch(search_value, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: value })
    });
    const result = await response.json();
    document.getElementById('result').innerText = `${result.message} (Response time: ${result.response_time.toFixed(2)} ms)`;
    updateCacheContents();
    updateSearchHistory();
    if (result.value) {
        renderStateDetails(result.value);
    }
}

async function resetCache() {
    const response = await fetch(reset_page, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    document.getElementById('result').innerText = result.message;
    updateCacheContents();
    updateSearchHistory();
    clearStateDetails();  
}

function clearStateDetails() {
    const stateDetailsDiv = document.getElementById('state-details');
    stateDetailsDiv.innerHTML = '';
}
async function updateCacheContents() {
    const response = await fetch(cache_contents);
    const cacheContents = await response.json();
    const cacheList = document.getElementById('cache-contents');
    cacheList.innerHTML = '';
    cacheContents.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `Key: ${item.key}, State: ${item.state_ut}`;
        listItem.onclick = () => fetchStateDetails(item.state_ut);
        cacheList.appendChild(listItem);
    });
}

async function fetchStateDetails(state_ut) {
    const response = await fetch(`${state_details}/${state_ut}`);
    const stateDetails = await response.json();
    renderStateDetails(stateDetails.value);
    document.getElementById('result').innerText = `State details fetched`;
}

function renderStateDetails(details) {
    const stateDetailsDiv = document.getElementById('state-details');
    stateDetailsDiv.innerHTML = `
        <p><strong>State/UT:</strong> ${details.state_ut}</p>
        <p><strong>Capital:</strong> ${details.capital}</p>
        <p><strong>Population:</strong> ${details.population}</p>
        <p><strong>Description:</strong> ${details.description}</p>
        <p><strong>Famous Food:</strong> ${details.famous_food}</p>
        <p><strong>Famous Dance:</strong> ${details.famous_dance}</p>
        <p><strong>Famous Places to Visit:</strong> ${details.famous_places_to_visit}</p>
        <p><strong>Language Spoken:</strong> ${details.language_spoken}</p>
        <p><strong>Image:</strong> <img src="${details.image_url}" alt="Image of ${details.state_ut}" style="max-width: 100%; height: auto;"></p>
    `;
}

async function updateSearchHistory() {
    const response = await fetch(search_history);
    const history = await response.json();
    const historyList = document.getElementById('search-history');
    historyList.innerHTML = '';
    history.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.innerText = `State: ${entry.state_ut}, Response Time: ${entry.response_time.toFixed(2)} ms`;
        historyList.appendChild(listItem);
    });
}