var current_hash;

function check_hash() {
    if(window.location.hash != current_hash) {
        current_hash = window.location.hash;
        document.getElementById('source').innerHTML = current_hash;
        document.getElementsByTagName('div')[0].style.display = 'block';
        /*
         * window.location.hash retourne le #, donc on l'enlève avant
         * de charger le fichier
         */
        charger(current_hash.substring(1));
    }
}

window.onload = function() {
    setInterval(check_hash, 300);
};

function charger(fichier) {
    if(!(fichier == "livre" || fichier == "biere")) {
        /*
         * Fichier non valide
         */
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "data/"+ fichier +".json", false);
    xhr.send();

    var donnees = JSON.parse(xhr.responseText);
    var tableau = document.getElementsByTagName('table')[0];
    if(fichier == "livre") {
        tableau.innerHTML = "<tr><td>Nom</td><td>Auteur(s)</td><td>Prix</td></tr>";
        for(index in donnees) {
            var livre = donnees[index];
            /*
             * Si livre.auteur est un string, il y a un auteur, sinon il y a plus d'un auteur.
             */
            var auteur_html = "";
            if(typeof(livre.auteur) == "string") {
                auteur_html = livre.auteur;
            } else {
                for(var j = 0; j < livre.auteur.length; j++) {
                    auteur_html += livre.auteur[j];
                    if(j < livre.auteur.length-1) {
                        auteur_html += ", ";
                    }
                }
            }
            tableau.innerHTML += "<tr><td>" + livre.nom + "</td><td>" + auteur_html + "</td><td>" + livre.prix + "</tr>";
        }
    } else {
        tableau.innerHTML = "<tr><td>Nom</td><td>Bières(s)</td><td>Logo</td></tr>";
        for(index in donnees) {
            var compagnie = donnees[index];
            /*
             * Si compagnie.biere est un string, il y a un auteur, sinon il y a plus d'un type de bière.
             */
            var biere_html = "";
            if(typeof(compagnie.biere) == "string") {
                biere_html = compagnie.biere;
            } else {
                for(var j = 0; j < compagnie.biere.length; j++) {
                    biere_html += compagnie.biere[j];
                    if(j < compagnie.biere.length-1) {
                        biere_html += ", ";
                    }
                }
            }

            tableau.innerHTML += "<tr><td>" + index + "</td><td>" + biere_html + "</td><td><img style='width:150px' src='" + compagnie.logo + "' /></tr>";
        }


    }

}
