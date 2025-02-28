var formulaire = document.getElementById("formulaireinscription");

function isValidDate(dateString) {
    // Extraire le jour, le mois et l'année de la chaîne de caractères
    var day = parseInt(dateString.substring(0,2));
    var month = parseInt(dateString.substring(3,5)) - 1; // Les mois commencent à partir de 0 dans la classe Date de JavaScript
    var year = parseInt(dateString.substring(6,10));
  
    // Créer un objet Date à partir de la chaîne de caractères
    var dateObject = new Date(year, month, day);
  
    // Vérifier si l'année, le mois et le jour extraits de la chaîne de caractères sont les mêmes que ceux renvoyés par l'objet Date
    if (dateObject.getFullYear() == year && dateObject.getMonth() == month && dateObject.getDate() == day) {
      return true
    } else {
      return false;
    }
}

function isDateInFuture(dateString) {
    // On vérifie que la date ne se trouve pas dans le future
    var day = parseInt(dateString.substring(0,2));
    var month = parseInt(dateString.substring(3,5)) - 1;
    var year = parseInt(dateString.substring(6,10));
    var dateObject = new Date(year, month, day);
  
    var today = new Date();
    if (dateObject > today) {
      return true;
    } else {
      return false;
    }
}
  

function isLegalAge(dateString) {
    // On vérifie que l'utilisateur à l'âge légal pour s'inscrire sur notre site
    var day = parseInt(dateString.substring(0,2));
    var month = parseInt(dateString.substring(3,5)) - 1;
    var year = parseInt(dateString.substring(6,10));
    var dateObject = new Date(year, month, day);
  
    var legalAge = 13; // Age minimum légal pour créer un compte sur les réseaux sociaux en France
    var today = new Date();
    var age = today.getFullYear() - dateObject.getFullYear();
    var monthDiff = today.getMonth() - dateObject.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateObject.getDate())) {
        age--;
    }
  
    if (age >= legalAge) {
      return true;
    } else {
      return false;
    }
}

formulaire.addEventListener('submit', function (event){
    // vérification des entrées utilisateurs avant l'envoie du formulaire
    var dateNaissance = document.getElementById("birthdate").value;
    var username = document.getElementById("username").value;
    var mdp = document.getElementById("userpwd").value; //maj, min, 8char, 1chiffre
    var email = document.getElementById("useremail").value;
    var Elements = document.querySelectorAll("#formulaireinscription > div");
    var erreur, div, divTab;

    divTab = document.querySelectorAll("form > div > div");
    for (let i = 0; i < divTab.length; i++){
        divTab[i].remove();
    }

    // Vérifier si le nom d'utilisateur est valide
    var username_regex = /^.{6,}$/;
    if (!username_regex.test(username)){
        event.preventDefault();
        erreur = document.createTextNode("Entrez un nom d'utilisateur valide (6 caractères ou plus).");
        div = document.createElement("div");
        div.appendChild(erreur);
        Elements[3].appendChild(div);
    }

    // Vérifier si le mot de passe est valide
    var password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!password_regex.test(mdp)){
        event.preventDefault();
        erreur = document.createTextNode("Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule et un chiffre.");
        div = document.createElement("div");
        div.appendChild(erreur);
        Elements[4].appendChild(div);
    }

    // Vérifier si l'adresse email est valide
    var email_regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email_regex.test(email)){
        event.preventDefault();
        erreur = document.createTextNode("Entrez une adresse mail valide.");
        div = document.createElement("div");
        div.appendChild(erreur);
        Elements[5].appendChild(div);
    }

    // Vérifier si la date de naissance est valide
    var date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (dateNaissance != "") {
        if (!date_regex.test(dateNaissance)){
            event.preventDefault();
            erreur = document.createTextNode("Entrez une date de naissance valide (format: JJ/MM/AAAA).");
            div = document.createElement("div");
            div.appendChild(erreur);
            Elements[2].appendChild(div);
        } else if (!isValidDate(dateNaissance)){
            event.preventDefault();
            erreur = document.createTextNode("Entrez une date de naissance valide (format: JJ/MM/AAAA).");
            div = document.createElement("div");
            div.appendChild(erreur);
            Elements[2].appendChild(div);
        } else if(isDateInFuture(dateNaissance)){
            event.preventDefault();
            erreur = document.createTextNode("Entrez une date de naissance qui n'est pas dans le futur.");
            div = document.createElement("div");
            div.appendChild(erreur);
            Elements[2].appendChild(div);
        } else if(!isLegalAge(dateNaissance)){
            event.preventDefault();
            erreur = document.createTextNode("Vous n'avez pas l'âge légal pour créer un compte (13ans).");
            div = document.createElement("div");
            div.appendChild(erreur);
            Elements[2].appendChild(div); 
        }
    }
});