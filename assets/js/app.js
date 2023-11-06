var films = [
    {
        title: "Deadpool",
        years: 2016,
        authors: "Tim Miller"
    },
    {
        title: "Spiderman",
        years: 2002,
        authors: "Sam Raimi"
    },
    {
        title: "Scream",
        years: 1996,
        authors: "Wes Craven"
    },
    {
        title: "It: chapter 1",
        years: 2019,
        authors: "Andy Muschietti"
    }
];

function displayFilms() {//fonction pour afficher les films en créant des ligne pour chaque film
    var tbody = document.querySelector("#movies-table tbody");
    tbody.innerHTML = ''; // sert à nettoyer la table avant de la repeupler ou mettre a jour

    films.forEach(function (film, index) {//boucle pour chaque element du tableau 
        var tr = document.createElement("tr");//et crée un nouvelle element de ligne pour contenir les données 

        var tdTitle = document.createElement("td");//un nouvel élément de cellule de tableau est crée pour le titre du film
        tdTitle.textContent = film.title;
        tr.appendChild(tdTitle);// on l'ajoute au tableau..le meme processus pour l'année et l'auteur

        var tdYears = document.createElement("td");
        tdYears.textContent = film.years;
        tr.appendChild(tdYears);

        var tdAuthors = document.createElement("td");
        tdAuthors.textContent = film.authors;
        tr.appendChild(tdAuthors);

        var tdActions = document.createElement("td");
        var btnDelete = document.createElement("button");
        btnDelete.className = "btn btn-danger";// on attribue les class css au bouton
        btnDelete.textContent = "Supprimer";
        btnDelete.onclick = function () {
            // on Demande une confirmation avant supression
            var confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce film ?");
            if (confirmDelete) {
                // Si l'utilisateur confirme, supprime le film du tableau
                films.splice(index, 1);//methode splice pour changer le contenu du tableau (index est la position dans le tableau
                                        // et 1 est 1 element 
                refreshFilmDisplay(); // Mise a jour 
            
        };
    }
        tdActions.appendChild(btnDelete);
        tr.appendChild(tdActions);

        tbody.appendChild(tr);
    });
}

function showAddForm() {// formulaire d'ajout pour saisir les detail
    var addFormDiv = document.getElementById('add-form');
    addFormDiv.innerHTML = `
        <form id="film-form">
            <div class="form-group">
                <label for="title">Titre</label>
                <input type="text" class="form-control" id="title" required>
            </div>
            <div class="form-group">
                <label for="year">Année</label>
                <input type="number" class="form-control" id="year" required min="1900" max="${new Date().getFullYear()}">
            </div>
            <div class="form-group">
                <label for="author">Auteur ou Réalisateur</label>
                <input type="text" class="form-control" id="author" required>
            </div>
            <button type="submit" class="btn btn-success">Sauvegarder</button>
        </form>
    `;
    addFormDiv.style.display = 'block';// formulaire visible
    document.getElementById('film-form').addEventListener('submit', addFilm);
}           // on ajoute un ecouteur d'evenemtn a l'element formr via le bouton submit 
            //pour appeler la fonction addFilm



function addFilm(event) {
    event.preventDefault();

    var title = document.getElementById('title').value;//on recupere les valeurs 
    var year = parseInt(document.getElementById('year').value);
    var author = document.getElementById('author').value;
    var currentYear = new Date().getFullYear();
    var errors = [];// initialisation d'un tableau vide pour stoker les erreurs 

    // Validation
    if (title.length < 2) errors.push("Le titre doit contenir au moins 2 caractères.");
    if (year < 1900 || year > currentYear) errors.push("L'année doit être comprise entre 1900 et l'année en cours.");
    if (author.length < 5) errors.push("L'auteur doit contenir au moins 5 caractères.");

    if (errors.length === 0) {
                                                                //
        title = title.charAt(0).toUpperCase() + title.slice(1);// majuscule sur le premier caractére et concatenation
        author = author.charAt(0).toUpperCase() + author.slice(1);

        var newFilm = { title: title, years: year, authors: author };
        films.push(newFilm);
        refreshFilmDisplay();
        document.getElementById('add-form').style.display = 'none';

        //  message de succès et suppression après 3 secondes
        let successAlert = document.createElement("div");
        successAlert.className = "alert alert-success";
        successAlert.role = "alert";
        successAlert.textContent = "Film ajouté avec succès";
        document.getElementById('alert-container').appendChild(successAlert);
        setTimeout(function () {// fonction pour la gestion du temps 3000
            successAlert.remove();
        }, 3000);

        event.target.reset();
    } else {
        //  message d'erreur et suppression après 5 secondes
        let errorAlert = document.createElement("div");
        errorAlert.className = "alert alert-danger";
        errorAlert.role = "alert";
        errorAlert.textContent = "Erreur dans le formulaire : " + errors.join(", ");
        document.getElementById('alert-container').appendChild(errorAlert);
        setTimeout(function () {
            errorAlert.remove();
        }, 5000);

    }
}


function sortFilms(type) {
    if (type === 'title') {
        films.sort(function (a, b) {
            return a.title.localeCompare(b.title);
        });
    } else if (type === 'year') {
        films.sort(function (a, b) {
            return a.years - b.years;
        });
    }
    refreshFilmDisplay();
}

function refreshFilmDisplay() {
    displayFilms();
}

document.getElementById('show-add-form').addEventListener('click', showAddForm);

document.getElementById('filter').addEventListener('change', function () {
    var selectedOption = this.value;
    sortFilms(selectedOption);
});

window.onload = refreshFilmDisplay;
// Wrap every letter in a span
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