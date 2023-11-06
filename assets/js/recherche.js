document.addEventListener('DOMContentLoaded', function() {
    // Écouteur d'événement pour le formulaire de recherche
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = document.getElementById('title-input').value;
        const year = document.getElementById('year-input').value;
        const type = document.getElementById('type-select').value;
        currentPage = 1; // Réinitialiser la page à 1 pour chaque nouvelle recherche
        searchMovies(searchTerm, year, type, currentPage);
    });
        // boutons pour la  pagination 
        document.getElementById('prev-page').style.display = 'none';
        document.getElementById('next-page').style.display = 'none';

});


let currentPage = 1; // Initialement sur la première page
let currentSearchTerm = '';// on stock le terme de la recherche 
let currentYear = '';// on stock l'année
let currentType = '';// on stock le type de media

function searchPreviousPage() {// fonction pour voir la pages précedente
    if (currentPage > 1) {// on verifie qu'il y as une page précedente (<0 est impossible)
        currentPage--;// on décremente si c'est le cas
        searchMovies(currentSearchTerm, currentYear, currentType, currentPage);
    }// on appel la fonction de recherche avec les parametres récuperer 
    //
}

function searchNextPage() {//fonction pour voir la pages suivante sur le meme principes  
    currentPage++; //que la fonction precedente
    searchMovies(currentSearchTerm, currentYear, currentType, currentPage);
}

function searchMovies(searchTerm, year, type,page=1) {// mise a jours des varaibles
    currentSearchTerm = searchTerm;
    currentYear = year;
    currentType = type;
    // page est automatiquement initialisé a 1

    const apiKey = '3405a423'; 
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}&y=${year}&type=${type}&page=${page}`;

    fetch(url)// avec la méthode fetch on effectue la requete a l'API
        .then(response => response.json())// on convertie la reponse en format json
        .then(data => {
            if (data.Response === "True") {// on verifie si des resultat on été trouver
                displaySearchResults(data.Search, data.totalResults);// si resultat on appel la fonction 
                document.getElementById('next-page').style.display = currentPage * 10 < parseInt(data.totalResults, 10) ? 'block' : 'none';
                // mise a jour de la visibilité du boutons suivant (chaque page affiche 10 resultats pas défaut )
            } else { //gestions des erreur si data.Response != True

                alert('Pas de résultats trouvés.');
                document.getElementById('next-page').style.display = 'none'; //  on cache le bouton "Suivant" si aucun résultat

            }
        })
        .catch(error => {// si erreur de la requete , et error contiendra l'information
            console.error('Erreur lors de la recherche des films:', error);
            document.getElementById('next-page').style.display = 'none'; // on cache le bouton "Suivant" en cas d'erreur

        });
}

function displaySearchResults(movies) {
    const resultatsRecherche = document.getElementById('resultats');
    resultatsRecherche.innerHTML = ''; // On commence avec une recherche vide

    let row = document.createElement('div');
    row.className = 'row';

    movies.forEach((movie) => {//movie est un objet avec les information (titre,affiche et années)
        // on itére sur ces élements du tableau 
        const placeholderImage = 'https://placehold.co/600x600'; // URL de l'image de remplacement
        //si l'objet movie.Poster existe (!= de N/A)? ValeurVrai sinon on affiche une image du placehoider
        const Affiche = movie.Poster !== "N/A" ? movie.Poster : placeholderImage;
        // Création d'une carte pour chaque film
        const cartFilm = `
        <div class="col-md-3 mb-4">
        <div class="card h-100">
            <img src="${Affiche}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">${movie.Year}</p>
            </div>
        </div>
    </div>
        `;

        row.innerHTML += cartFilm;

       
        // Mise à jour des boutons de pagination avec un operateur ternaire
        // dans un cas 'block' boutton apparant sinon  none pour le cacher

    document.getElementById('prev-page').style.display = currentPage > 1 ? 'block' : 'none';
    document.getElementById('next-page').style.display = movies.length === 0 ? 'none' : 'block';
    });

    // S'il y a des cartes dans la dernière ligne qui n'a pas été ajoutée, on l'ajoute maintenant
    if (row.innerHTML !== '') {
        resultatsRecherche.appendChild(row);
    }
    document.getElementById('prev-page').style.display = currentPage > 1 ? 'block' : 'none';

}
// Wrap every letter in a span pour l'animation des pages 
var textWrapper = document.querySelector('.ml1 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml1 .letter',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 70 * (i+1)
  }).add({
    targets: '.ml1 .line',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700,
    offset: '-=875',
    delay: (el, i, l) => 80 * (l - i)
  }).add({
    targets: '.ml1',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });