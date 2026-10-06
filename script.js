// Chiediamo al browser se l'utente preferisce ridurre le animazioni.
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

// Cerchiamo la scritta che deve partire dal centro e la sua posizione finale in basso.
const brandName = document.querySelector(".brand-name");

// Attiviamo l'animazione solo se il movimento non è stato disattivato nelle preferenze.
if (!prefersReducedMotion.matches) {
  // Calcoliamo di quanti pixel la scritta deve spostarsi per partire dal centro dello schermo.
  const brandPosition = brandName.getBoundingClientRect();
  const horizontalOffset =
    window.innerWidth / 2 - (brandPosition.left + brandPosition.width / 2);
  const verticalOffset =
    window.innerHeight / 2 - (brandPosition.top + brandPosition.height / 2);

  // Passiamo al CSS gli spostamenti, così la scritta può raggiungere il centro da qualunque schermo.
  brandName.style.setProperty("--brand-start-x", `${horizontalOffset}px`);
  brandName.style.setProperty("--brand-start-y", `${verticalOffset}px`);

  // Questa classe avvia le animazioni della scritta, della scheda e delle curve.
  document.body.classList.add("animations-enabled");
}
