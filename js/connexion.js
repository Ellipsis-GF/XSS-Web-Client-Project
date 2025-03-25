var bouton = document.getElementById("submit-connexion");
var divRep = document.getElementById("rep-server");
var usernameInput = document.getElementById("user");
var passwordInput = document.getElementById("password");

bouton.addEventListener('click', function (){
    // Envoie de la requête HTTP en ajax et affichage de la réponse du serveur
    var username = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    var xhr; 
    try {  xhr = new ActiveXObject('Msxml2.XMLHTTP');   }
    catch (e) 
    {
        try {   xhr = new ActiveXObject('Microsoft.XMLHTTP'); }
        catch (e2) 
        {
           try {  xhr = new XMLHttpRequest();  }
           catch (e3) {  xhr = false;   }
         }
    }
  
    xhr.onreadystatechange  = function() 
    { 
       if(xhr.readyState  == 4){
            var span = document.createElement("span");
            var exSpans = document.querySelector("#rep-server span");
            var textNode;
            if (exSpans != null){
                exSpans.remove();
            }
            if(xhr.status  == 200) {
                if (xhr.responseText.charAt(0) == 'B'){ // affichage en vert si le message est "Bonjour {prénom} {nom} "
                    divRep.style.backgroundColor = "rgb(100,200,100)";
                }
                else { // sinon affichage en rouge
                    divRep.style.backgroundColor = "#db5050";
                }
                textNode = document.createTextNode(xhr.responseText);
                span.appendChild(textNode);
                divRep.appendChild(span);
            } else {
                textNode = document.createTextNode(xhr.status);
                span.style.color = "#db5050";
                span.appendChild(textNode);
                divRep.appendChild(span);
            }
        }
    }; 

    let data = "username=" + username + "&userpwd="+ password; // création du corp de la requête au format URL-encoded
    xhr.open("POST", "http://127.0.0.1:5000/login",  true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data); // envoie de la requête
});

usernameInput.addEventListener("keypress", function(event) {
    // Si l'utilisateur appuie sur la touche "Entrée" lorsqu'il selectionne l'entrée pour le nom d'utilisateur,
    // on considère que celà est équivalent à cliquer sur le bouton de soumission
    if (event.key === "Enter") {
      bouton.click();
    }
});

passwordInput.addEventListener("keypress", function(event) {
    // Si l'utilisateur appuie sur la touche "Entrée" lorsqu'il selectionne l'entrée pour le nom d'utilisateur,
    // on considère que celà est équivalent à cliquer sur le bouton de soumission
    if (event.key === "Enter") {
      bouton.click();
    }
});


