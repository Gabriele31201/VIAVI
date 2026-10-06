// Leggiamo la preferenza di accessibilità impostata nel sistema o nel browser.
const homePrefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

// Cerchiamo il marchio nella sua posizione finale in alto.
const homeBrand = document.querySelector(".home-brand");
const loginLinks = document.querySelectorAll('a[href="index.html"]');
const arrivedFromLogin =
  window.sessionStorage.getItem("viavi-home-from-login") === "true";
let loginTransitionStarted = false;

// Rimuoviamo il segnale subito, così ricaricare la home avvia la sua animazione normale.
if (arrivedFromLogin) {
  window.sessionStorage.removeItem("viavi-home-from-login");
}

// La classe fa partire le animazioni soltanto quando i movimenti sono consentiti.
if (!homePrefersReducedMotion.matches) {
  // Calcoliamo quanto spostare il marchio per collocarlo al centro dello schermo.
  const brandPosition = homeBrand.getBoundingClientRect();
  const horizontalOffset =
    window.innerWidth / 2 - (brandPosition.left + brandPosition.width / 2);
  const verticalOffset =
    window.innerHeight / 2 - (brandPosition.top + brandPosition.height / 2);

  // Il CSS userà queste distanze come punto di partenza dell'animazione.
  homeBrand.style.setProperty("--home-brand-start-x", `${horizontalOffset}px`);
  homeBrand.style.setProperty("--home-brand-start-y", `${verticalOffset}px`);

  // La classe avvia insieme il movimento del marchio, l'ingresso dei riquadri e le curve.
  document.body.classList.add("home-animations-enabled");

  // Se arriviamo dal login, la home riprende il marchio direttamente dal centro.
  if (arrivedFromLogin) {
    document.body.classList.add("home-from-login");
  }
}

// Il marchio raggiunge il centro prima di aprire il login, così l'animazione prosegue
// dalla sua posizione visibile in home invece di ricominciare improvvisamente.
loginLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (homePrefersReducedMotion.matches || loginTransitionStarted) {
      if (loginTransitionStarted) {
        event.preventDefault();
      }
      return;
    }

    event.preventDefault();
    loginTransitionStarted = true;

    const brandPosition = homeBrand.getBoundingClientRect();
    const horizontalOffset =
      window.innerWidth / 2 - (brandPosition.left + brandPosition.width / 2);
    const verticalOffset =
      window.innerHeight / 2 - (brandPosition.top + brandPosition.height / 2);

    document.body.classList.add("home-returning-to-login");

    const brandMovement = homeBrand.animate(
      [
        { transform: getComputedStyle(homeBrand).transform },
        {
          transform: `translate3d(${horizontalOffset}px, ${verticalOffset}px, 0) scale(3.2)`,
        },
      ],
      {
        duration: 1300,
        easing: "cubic-bezier(0.65, 0, 0.35, 1)",
        fill: "forwards",
      }
    );

    brandMovement.finished.then(() => {
      window.sessionStorage.setItem("viavi-login-from-home", "true");
      window.location.assign(link.href);
    });
  });
});
