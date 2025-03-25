$(document).ready(function() {  
    refreshChat(); // On raffraichit le chat dès que la page s'affiche

    setInterval(function() {
        // raffraichit le chat toutes les 30 secondes
        refreshChat();
      }, 30000);
    
    function refreshChat() {
        // Fonction de raffraichissement de l'historique du chat
        $.get("http://127.0.0.1:5000/chatget", function(data) {
            // Sélection de la zone de chat et suppression de cette dernière puis affichage de la version rafraichit (5sec)
            var $histConv = $("#hist-conv div");
            $histConv.text("");
            let messages = "";
            for (let indiceObjet = 0; indiceObjet < data.length; indiceObjet++) {
                messages += data[indiceObjet].date + "   " + data[indiceObjet].time + "   " + data[indiceObjet].user + "\n" + ajouterSautsDeLigne(data[indiceObjet].msg) + "\n\n";
            }
            $histConv.append($("<pre>").text(messages)); // On choisit d'effectuer l'affichage dans une balise <pre> pour garder les propriétés des chaines de caractères
        });
    }

    function ajouterSautsDeLigne(chaine) {
    // Cette fonction permet de rajouter des sauts de ligne tout les 60 caractère dans une chaine de caractères
        var chaineAvecSautsDeLigne = "";
        for (var i = 0; i < chaine.length; i++) {
          chaineAvecSautsDeLigne += chaine[i];
          if ((i+1) % 60 == 0) {
            chaineAvecSautsDeLigne += "\n";
          }
        }
        return chaineAvecSautsDeLigne;
    }    

    $("#submit-com").click(function() {
    // Envoie de la requête http et affichage de la réponse
        var message = $("#commentaire").val();
        $.ajax({
            url: "http://127.0.0.1:5000/chatsend",
            type: "POST",
            data: JSON.stringify({ msg: message}),
            contentType: "application/json",
            dataType: "json",
            success: function(data) {
                var $repServer = $("#rep-server");
                $repServer.text("");
                if (data.num === 1) {
                    $repServer.css('color', 'red').append(data.msg);
                } else {
                    $repServer.css('color', 'green').append(data.msg);
                    refreshChat(); // Rafraîchir le chat après l'envoi
                    $("#commentaire").val(""); // Effacer le champ de message
                }
            },
            error: function() {
                $("#rep-server").css('color', 'red').text("Error sending message");
            }
        });        
    });
      
});