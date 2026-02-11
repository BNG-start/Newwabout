let clickCount = 0;
const nonButton = document.getElementById("non");
const ouiButton = document.getElementById("oui");
const mainGif = document.getElementById("main-gif"); // Récupère l'image pour changer les GIFs

// Les textes pour chaque clic
const nonText = ["Non", "I ber son ??", "Eh bébé !???", "Je sais que tu blague !", "Tchiiiip"];

// Tes GIFs dans l'ordre précis
const gifs = [
    "budu.gif",     // État initial (0 clic)
    "duducute.gif", // 1er clic
    "dudupoof.gif", // 2ème clic
    "duduno.gif",   // 3ème clic
    "buduf.gif"     // 4ème clic (Tchiiiip)
];

nonButton.addEventListener("click", function() {
    clickCount++;

    // Gestion des changements jusqu'au 4ème clic
    if (clickCount < gifs.length) {
        // 1. Changer le texte du bouton Non
        nonButton.innerHTML = nonText[clickCount];
        
        // 2. Changer le GIF selon l'ordre demandé
        mainGif.src = gifs[clickCount];
        
        // MODIFICATION : Supprime le délai initial pour les clics suivants
        // On ajoute la classe CSS qui force l'affichage immédiat
        mainGif.classList.remove("delayed-fade");
        mainGif.classList.add("instant-show");

        // 3. Petite animation de "pop" pour la fluidité lors du changement
        mainGif.style.animation = 'none';
        mainGif.offsetHeight; // Trigger reflow
        mainGif.style.animation = "fadeIn 0.3s ease-out forwards"; 

        // 4. Agrandissement progressif du bouton OUI
        let currentSize = window.getComputedStyle(ouiButton).getPropertyValue('font-size');
        let newSize = parseFloat(currentSize) * 1.4; 
        ouiButton.style.fontSize = newSize + "px";
        
        // Ajustement du padding pour garder une forme harmonieuse
        let currentPadding = window.getComputedStyle(ouiButton).padding;
        ouiButton.style.padding = (parseFloat(currentPadding) * 1.2) + "px";
    }

    // Gestion du dernier clic ("Tchiiiip")
    if (clickCount === 4) {
        // On désactive le clic sur le bouton non pendant qu'il prépare sa disparition
        nonButton.style.pointerEvents = "none";

        setTimeout(() => {
            // Ajoute la classe pour l'effet de disparition
            nonButton.classList.add("fade-out");
            
            setTimeout(() => {
                nonButton.style.display = 'none';
                
                // Le bouton Oui devient énorme et s'arrête de clignoter
                ouiButton.classList.remove("blink"); 
                ouiButton.style.transform = "scale(2)"; 
                ouiButton.style.transition = "transform 0.5s ease-in-out";
            }, 1000);
        }, 2000); // On laisse "Tchiiiip" et "buduf.gif" visibles 2 secondes
    }
});

ouiButton.addEventListener("click", function() {
    // Petit effet de clic avant de changer de page
    ouiButton.style.transform = "scale(0.9)";
    
    setTimeout(() => {
        window.location.href = "page2.html";
    }, 100);
});