// Chiediamo al browser se l'utente preferisce ridurre le animazioni.
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

// Cerchiamo la scritta che deve partire dal centro e la sua posizione finale in basso.
const brandName = document.querySelector(".brand-name");
const arrivedFromHome =
  window.sessionStorage.getItem("viavi-login-from-home") === "true";

if (arrivedFromHome) {
  window.sessionStorage.removeItem("viavi-login-from-home");
}

// Recuperiamo il modulo e i suoi campi per controllarli prima di aprire la home.
const loginForm = document.querySelector(".login-form");
let loginTransitionStarted = false;

loginForm.addEventListener("submit", (event) => {
  // Blocchiamo l'invio standard: non dobbiamo mettere le credenziali nell'indirizzo web.
  event.preventDefault();

  const emailInput = loginForm.querySelector("#email");
  const passwordInput = loginForm.querySelector("#password");
  const feedback = loginForm.querySelector("#login-feedback");
  const emptyFields = [emailInput, passwordInput].filter(
    (input) => input.value.trim() === ""
  );

  // Se manca un dato, avvisiamo l'utente e portiamo il cursore al primo campo da compilare.
  if (emptyFields.length > 0) {
    feedback.textContent = "Inserisci email e password per continuare.";
    emptyFields.forEach((input) => input.setAttribute("aria-invalid", "true"));
    emptyFields[0].focus();
    return;
  }

  // Con il movimento ridotto attivo passiamo subito alla home senza avviare animazioni.
  if (prefersReducedMotion.matches) {
    window.sessionStorage.setItem("viavi-home-from-login", "true");
    window.location.assign("home.html");
    return;
  }

  // Impediamo un secondo invio mentre il marchio sta raggiungendo il centro.
  if (loginTransitionStarted) {
    return;
  }
  loginTransitionStarted = true;

  // Conserviamo la trasformazione visibile, anche se l'animazione iniziale è ancora in corso.
  const currentTransform = window.getComputedStyle(brandName).transform;
  const centerX = brandName.style.getPropertyValue("--brand-start-x");
  const centerY = brandName.style.getPropertyValue("--brand-start-y");

  // La classe fa svanire la scheda e mostra la linea di caricamento sotto il marchio.
  document.body.classList.add("login-transition");
  loginForm.querySelector(".submit-button").disabled = true;

  // La Web Animation parte dalla posizione visibile e termina con VIAVI grande al centro.
  const brandMovement = brandName.animate(
    [
      { transform: currentTransform, opacity: 1 },
      {
        transform: `translate3d(${centerX}, ${centerY}, 0) scale(3.2)`,
        opacity: 1,
      },
    ],
    {
      duration: 950,
      easing: "cubic-bezier(0.65, 0, 0.35, 1)",
      fill: "forwards",
    }
  );

  // Dopo il caricamento la home riprende il marchio dal centro e lo porta in alto.
  brandMovement.finished.then(() => {
    window.sessionStorage.setItem("viavi-home-from-login", "true");
    window.setTimeout(() => {
      // Le credenziali non vengono salvate né inviate: il passaggio è solo dimostrativo.
      window.location.assign("home.html");
    }, 650);
  });
});

// Togliamo l'indicazione di errore da un campo appena l'utente lo modifica.
loginForm.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      input.removeAttribute("aria-invalid");
    }

    const emailFilled = loginForm.querySelector("#email").value.trim() !== "";
    const passwordFilled = loginForm.querySelector("#password").value.trim() !== "";

    if (emailFilled && passwordFilled) {
      loginForm.querySelector("#login-feedback").textContent = "";
    }
  });
});

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

  // Al ritorno dalla home il marchio riparte dal centro e scende nella posizione finale.
  if (arrivedFromHome) {
    document.body.classList.add("login-from-home");
    brandName.animate(
      [
        {
          opacity: 1,
          transform: `translate3d(${horizontalOffset}px, ${verticalOffset}px, 0) scale(3.2)`,
        },
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
      ],
      {
        duration: 2200,
        easing: "cubic-bezier(0.65, 0, 0.35, 1)",
        fill: "both",
      }
    );
  }
}
