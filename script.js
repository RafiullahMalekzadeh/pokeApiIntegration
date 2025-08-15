// DOM elements
const pokemonInput = document.getElementById('pokemonInput');
const searchBtn = document.getElementById('searchBtn');
const resultsSection = document.getElementById('resultsSection');
const loading = document.getElementById('loading');

// Event listeners
searchBtn.addEventListener('click', searchPokemon);
pokemonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchPokemon();
    }
});

// Main search function
async function searchPokemon() {
    const searchTerm = pokemonInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        showError('Please enter a Pokémon name or ID');
        return;
    }
    
    showLoading();
    
    try {
        const pokemonData = await fetchPokemonData(searchTerm);
        displayPokemon(pokemonData);
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        showError('Pokémon not found. Please try a different name or ID.');
    } finally {
        hideLoading();
    }
}

// Fetch Pokémon data from PokeAPI
async function fetchPokemonData(searchTerm) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

// Display Pokémon information
function displayPokemon(pokemon) {
    const pokemonCard = `
        <div class="pokemon-card">
            <div class="pokemon-image">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZTwvdGV4dD4KPHRleHQgeD0iNzUiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Ob3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPgo='">
            </div>
            <h2 class="pokemon-name">${pokemon.name}</h2>
            <p class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</p>
            <div class="pokemon-types">
                ${pokemon.types.map(type => 
                    `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    resultsSection.innerHTML = pokemonCard;
}

// Show error message
function showError(message) {
    resultsSection.innerHTML = `<div class="error-message">${message}</div>`;
}

// Show loading spinner
function showLoading() {
    loading.style.display = 'block';
    resultsSection.style.display = 'none';
}

// Hide loading spinner
function hideLoading() {
    loading.style.display = 'none';
    resultsSection.style.display = 'flex';
}

// Initialize the app with a welcome message
function initApp() {
    resultsSection.innerHTML = `
        <div style="text-align: center; color: #7f8c8d;">
            <h2>Welcome to Pokémon Search!</h2>
            <p>Enter a Pokémon name or ID to get started</p>
            <p style="font-size: 0.9rem; margin-top: 20px;">
                Examples: pikachu, charizard, 25, 150
            </p>
        </div>
    `;
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', initApp);
