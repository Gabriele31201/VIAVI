import React, { useLayoutEffect, useRef, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";

// Questi segnali temporanei permettono alla schermata di arrivo di sapere da dove
// proviene la navigazione e di scegliere l'animazione corretta.
const HOME_FROM_LOGIN_KEY = "viavi-home-from-login";
const LOGIN_FROM_HOME_KEY = "viavi-login-from-home";

// Calcola quanti pixel separano il centro dell'elemento dal centro della finestra.
function getCenterOffset(element) {
  const position = element.getBoundingClientRect();

  return {
    x: window.innerWidth / 2 - (position.left + position.width / 2),
    y: window.innerHeight / 2 - (position.top + position.height / 2),
  };
}

// Disegna le tre curve decorative riutilizzate sia nel login sia nella home.
function OperaArtwork() {
  return (
    <div className="opera-art" aria-hidden="true">
      <span className="opera-ring opera-ring-one" />
      <span className="opera-ring opera-ring-two" />
      <span className="opera-ring opera-ring-three" />
    </div>
  );
}

// Schermata di accesso: contiene il modulo, i suoi controlli e l'animazione verso la home.
function LoginPage() {
  const navigate = useNavigate();

  // I riferimenti permettono di misurare il marchio e mettere a fuoco un campo.
  const brandRef = useRef(null);
  const formRef = useRef(null);

  // Leggiamo il segnale prima che l'effetto della pagina lo rimuova.
  const arrivedFromHome = useRef(
    window.sessionStorage.getItem(LOGIN_FROM_HOME_KEY) === "true"
  );
  const loginTransitionStarted = useRef(false);

  // React conserva i valori digitati e i messaggi mostrati all'utente.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [invalidFields, setInvalidFields] = useState({
    email: false,
    password: false,
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useLayoutEffect(() => {
    // Aggiorna il titolo della scheda e consuma il segnale del ritorno dalla home.
    document.title = "Accedi | VIAVI";
    window.sessionStorage.removeItem(LOGIN_FROM_HOME_KEY);

    // Se l'utente preferisce meno movimento, non prepariamo animazioni.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    // Salva lo spostamento del marchio nelle variabili che il CSS può leggere.
    const brand = brandRef.current;
    const offset = getCenterOffset(brand);
    brand.style.setProperty("--brand-start-x", `${offset.x}px`);
    brand.style.setProperty("--brand-start-y", `${offset.y}px`);
    document.body.classList.add("animations-enabled");

    // Al ritorno dalla home, il marchio riparte dal centro e torna in posizione.
    if (arrivedFromHome.current) {
      document.body.classList.add("login-from-home");
      brand.animate(
        [
          {
            opacity: 1,
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(3.2)`,
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

    // Pulisce le classi globali quando React smonta la schermata.
    return () => {
      document.body.classList.remove(
        "animations-enabled",
        "login-from-home",
        "login-transition"
      );
    };
  }, []);

  // Gestisce l'invio del modulo e avvia il passaggio alla home se i campi sono compilati.
  function handleSubmit(event) {
    event.preventDefault();

    // trim() ignora gli spazi: un campo composto solo da spazi è considerato vuoto.
    const emailIsEmpty = email.trim() === "";
    const passwordIsEmpty = password.trim() === "";
    setInvalidFields({ email: emailIsEmpty, password: passwordIsEmpty });

    if (emailIsEmpty || passwordIsEmpty) {
      // Mostra l'errore e porta il cursore al primo campo da compilare.
      setFeedback("Inserisci email e password per continuare.");
      formRef.current
        .querySelector(emailIsEmpty ? "#email" : "#password")
        .focus();
      return;
    }

    // Con il movimento ridotto cambiamo schermata senza animare il marchio.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      window.sessionStorage.setItem(HOME_FROM_LOGIN_KEY, "true");
      navigate("/home");
      return;
    }

    // Evita che invii ripetuti avviino più transizioni contemporaneamente.
    if (loginTransitionStarted.current) {
      return;
    }

    loginTransitionStarted.current = true;
    setIsTransitioning(true);
    document.body.classList.add("login-transition");

    // Anima il marchio dal bordo della scheda fino al centro della finestra.
    const brand = brandRef.current;
    const currentTransform = window.getComputedStyle(brand).transform;
    const centerX = brand.style.getPropertyValue("--brand-start-x");
    const centerY = brand.style.getPropertyValue("--brand-start-y");
    const movement = brand.animate(
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

    // Quando il marchio arriva al centro, la home completa il movimento.
    movement.finished.then(() => {
      window.sessionStorage.setItem(HOME_FROM_LOGIN_KEY, "true");
      navigate("/home");
    });
  }

  // Rimuove il messaggio d'errore appena i campi necessari sono stati corretti.
  function clearFieldError(field, value) {
    if (value.trim() !== "") {
      setInvalidFields((current) => ({ ...current, [field]: false }));
    }

    if (
      (field === "email" ? value : email).trim() !== "" &&
      (field === "password" ? value : password).trim() !== ""
    ) {
      setFeedback("");
    }
  }

  return (
    <main className="login-page">
      {/* Le curve sono solo decorative e non devono essere lette dalle tecnologie assistive. */}
      <OperaArtwork />

      {/* Scheda principale con intestazione, campi e azioni del login. */}
      <section className="login-card" aria-labelledby="login-title">
        <header className="login-header">
          <p className="eyebrow">BENVENUTO</p>
          <h1 id="login-title">Accedi al tuo account</h1>
          <p className="subtitle">Inserisci i tuoi dati per continuare.</p>
        </header>

        {/* I valori sono controllati da React: ogni digitazione aggiorna lo stato. */}
        <form
          ref={formRef}
          className="login-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-field">
            <label htmlFor="email">Indirizzo email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="nome@esempio.it"
              autoComplete="email"
              required
              aria-invalid={invalidFields.email}
              value={email}
              onChange={(event) => {
                const value = event.target.value;
                setEmail(value);
                clearFieldError("email", value);
              }}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Inserisci la password"
              autoComplete="current-password"
              required
              aria-invalid={invalidFields.password}
              value={password}
              onChange={(event) => {
                const value = event.target.value;
                setPassword(value);
                clearFieldError("password", value);
              }}
            />
          </div>

          <div className="form-options">
            <label className="remember-option" htmlFor="remember">
              <input id="remember" name="remember" type="checkbox" />
              <span>Ricordami</span>
            </label>
            <a className="text-link" href="#">
              Password dimenticata?
            </a>
          </div>

          {/* Disattiviamo il pulsante durante il movimento per evitare un secondo invio. */}
          <button
            className="submit-button"
            type="submit"
            disabled={isTransitioning}
          >
            Accedi
          </button>
          <p
            className="form-feedback"
            id="login-feedback"
            role="alert"
            aria-live="polite"
          >
            {feedback}
          </p>
        </form>

        {/* Il collegamento è visivo per ora: la registrazione non è implementata. */}
        <p className="signup-prompt">
          Non hai un account? <a className="text-link" href="#">Registrati</a>
        </p>
      </section>

      {/* Il marchio si anima tra la sua posizione in basso e il centro della finestra. */}
      <p ref={brandRef} className="brand-name">
        VIAVI
      </p>
    </main>
  );
}

// Schermata principale che si apre dopo il modulo.
function HomePage() {
  const navigate = useNavigate();
  const brandRef = useRef(null);
  const returnStarted = useRef(false);

  // Memorizza se questa schermata è stata raggiunta dal login.
  const arrivedFromLogin = useRef(
    window.sessionStorage.getItem(HOME_FROM_LOGIN_KEY) === "true"
  );

  useLayoutEffect(() => {
    // Imposta il titolo e rimuove il segnale ormai utilizzato.
    document.title = "Home | VIAVI";
    window.sessionStorage.removeItem(HOME_FROM_LOGIN_KEY);

    // La classe applica lo stesso sfondo sfumato della schermata di accesso.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.body.classList.add("home-page");

    if (prefersReducedMotion) {
      return () => document.body.classList.remove("home-page");
    }

    // Prepara il punto iniziale del marchio per la sua animazione nella home.
    const brand = brandRef.current;
    const offset = getCenterOffset(brand);
    brand.style.setProperty("--home-brand-start-x", `${offset.x}px`);
    brand.style.setProperty("--home-brand-start-y", `${offset.y}px`);
    document.body.classList.add("home-animations-enabled");

    // Questa classe fa proseguire il movimento già iniziato dal login.
    if (arrivedFromLogin.current) {
      document.body.classList.add("home-from-login");
    }

    // Rimuove le classi prima di lasciare la home.
    return () => {
      document.body.classList.remove(
        "home-page",
        "home-animations-enabled",
        "home-from-login",
        "home-returning-to-login"
      );
    };
  }, []);

  // Riporta il marchio al centro prima di navigare al login.
  function returnToLogin(event) {
    // Lascia funzionare normalmente apertura in nuova scheda e clic modificati.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    // Con il movimento ridotto lasciamo che Link cambi schermata direttamente.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    event.preventDefault();

    // Un solo clic può avviare la transizione.
    if (returnStarted.current) {
      return;
    }

    returnStarted.current = true;
    document.body.classList.add("home-returning-to-login");

    // L'animazione parte dalla posizione attuale e ingrandisce il marchio al centro.
    const brand = brandRef.current;
    const offset = getCenterOffset(brand);
    const movement = brand.animate(
      [
        { transform: window.getComputedStyle(brand).transform },
        {
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(3.2)`,
        },
      ],
      {
        duration: 1300,
        easing: "cubic-bezier(0.65, 0, 0.35, 1)",
        fill: "forwards",
      }
    );

    // Terminato il movimento, indica al login da dove è arrivata la navigazione.
    movement.finished.then(() => {
      window.sessionStorage.setItem(LOGIN_FROM_HOME_KEY, "true");
      navigate("/");
    });
  }

  return (
    <div className="home-shell">
      {/* Riutilizziamo le stesse curve decorative del login. */}
      <OperaArtwork />

      <header className="home-header">
        {/* Il marchio è anche un collegamento per tornare alla schermata di accesso. */}
        <Link
          ref={brandRef}
          className="home-brand"
          to="/"
          aria-label="Torna al login"
          onClick={returnToLogin}
        >
          VIAVI
        </Link>

        {/* details e summary forniscono un menu semplice senza JavaScript aggiuntivo. */}
        <details className="home-menu">
          <summary>Menu</summary>
          <nav className="home-menu-panel" aria-label="Menu principale">
            <Link to="/" onClick={returnToLogin}>
              Torna al login
            </Link>
          </nav>
        </details>
      </header>

      {/* Contenuti d'esempio pronti a essere sostituiti con quelli reali della home. */}
      <main className="home-content">
        <h1>
          Benvenuto, <span className="home-user-name">utente</span>
        </h1>

        <section className="home-boxes" aria-label="Spazi per i contenuti della home">
          <button className="home-box" type="button">
            <span>Cedolini</span>
          </button>
          <button className="home-box" type="button">
            <span>Entrate</span>
          </button>
          <button className="home-box" type="button">
            <span>Tasse</span>
          </button>
        </section>
      </main>
    </div>
  );
}

// Associa ogni indirizzo alla schermata corrispondente.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      {/* Un indirizzo sconosciuto viene riportato al login. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
