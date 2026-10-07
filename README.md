# VIAVI — guida passo passo

Questa guida racconta in modo semplice come è fatta la demo VIAVI, come avviarla
e dove trovare le parti principali del codice. Puoi seguirla dall'inizio alla fine
anche se stai imparando React e lo sviluppo web.

## 1. Che cosa fa l'app

VIAVI è una piccola applicazione web composta da due schermate:

1. **Login**: mostra i campi per email e password, controlla che non siano vuoti
   e mostra un messaggio se manca un dato.
2. **Home**: mostra un saluto, un menu e tre riquadri chiamati Cedolini, Entrate
   e Tasse.

Le due schermate sono collegate da transizioni animate. Il marchio VIAVI si sposta
tra il centro della pagina e la barra superiore della home, mentre le linee curve
decorative fanno da sfondo.

> **Importante:** questa è una demo grafica, non un vero sistema di autenticazione.
> Per proseguire basta inserire un qualsiasi testo non vuoto in entrambi i campi.
> Email e password non vengono inviate a un server né salvate. I link
> «Password dimenticata?» e «Registrati» sono segnaposto.

## 2. Tecnologie usate

- **HTML** definisce il punto in cui viene mostrata l'app.
- **CSS** definisce colori, disposizione, adattamento agli schermi e animazioni.
- **JavaScript** contiene la logica che reagisce alle azioni dell'utente.
- **React** costruisce le schermate come componenti e aggiorna i campi quando
  l'utente scrive.
- **React Router** permette di passare da una schermata all'altra senza
  ricaricare tutta la pagina.
- **Vite** avvia il progetto durante lo sviluppo e prepara i file finali per la
  pubblicazione.

## 3. Preparare e avviare il progetto

### Requisiti

Installa [Node.js](https://nodejs.org/), che include npm. npm serve a installare
le librerie e a lanciare i comandi del progetto.

Apri PowerShell nella cartella del progetto. Su Windows, se PowerShell blocca lo
script `npm.ps1`, usa `npm.cmd` come negli esempi seguenti.

### Installare le librerie

La prima volta esegui:

```powershell
npm.cmd install
```

Questo comando legge `package.json` e scarica le librerie necessarie nella cartella
`node_modules`. Il file `package-lock.json` registra le versioni risolte, così le
installazioni successive sono più coerenti.

### Avviare l'app mentre la stai modificando

```powershell
npm.cmd run dev
```

Vite mostra nel terminale un indirizzo locale, di solito
`http://localhost:5173`. Aprilo nel browser: quando salvi una modifica, Vite
aggiorna la pagina.

### Creare e provare la versione finale

```powershell
npm.cmd run build
npm.cmd run preview
```

`build` controlla e prepara i file ottimizzati nella cartella `dist`.
`preview` avvia un piccolo server locale per provare proprio quei file.

## 4. Come sono organizzati i file

```text
viavi-login/
├── index.html       punto di ingresso HTML
├── package.json     librerie e comandi del progetto
├── vite.config.js   impostazioni di Vite
├── src/
│   ├── main.jsx     avvio di React e configurazione della navigazione
│   └── App.jsx      schermate, controlli e passaggi tra login e home
├── style.css        stile condiviso e schermata di login
└── home.css         stile della home e delle sue animazioni
```

Le cartelle `node_modules` e `dist` sono create dai comandi npm: non sono il
codice sorgente da modificare a mano.

## 5. Il percorso di avvio, dal browser a React

1. Il browser apre `index.html`. Al suo interno c'è il contenitore vuoto
   `<div id="root"></div>`, che farà da spazio per l'app.
2. La stessa pagina carica `src/main.jsx`.
3. `main.jsx` crea l'app React dentro `root`, attiva `HashRouter` e importa i due
   fogli di stile.
4. `HashRouter` legge il percorso dopo il simbolo `#` nell'indirizzo. In questo
   modo le pagine sono raggiungibili anche su hosting statici, senza configurare
   un server per gestire gli indirizzi.
5. `App.jsx` decide quale schermata mostrare: `#/` apre il login e `#/home` apre
   la home.

## 6. Come funziona il login

La schermata di accesso è il componente `LoginPage` in `src/App.jsx`.

### I valori dei campi

React conserva email e password nello **stato** del componente. In pratica lo
stato è il dato che React ricorda e usa per aggiornare la schermata. Quando
l'utente scrive, `setEmail` o `setPassword` aggiornano il valore corrispondente.

Anche il messaggio di errore, i campi da segnalare e lo stato del pulsante sono
memorizzati nello stato React. `useRef` conserva invece riferimenti agli elementi
HTML, per esempio per spostare il cursore sul primo campo mancante.

### Quando si preme «Accedi»

La funzione `handleSubmit` segue questi passaggi:

1. Impedisce al browser di ricaricare la pagina.
2. Rimuove gli spazi iniziali e finali e controlla se i campi sono vuoti.
3. Se manca un dato, mostra un messaggio e porta il cursore sul campo da
   completare.
4. Se i campi contengono testo, avvia la transizione e porta alla home.

Questo controllo verifica soltanto che i campi non siano vuoti: non controlla
la correttezza dell'email e non verifica la password su un server.

## 7. Come funzionano le schermate e la navigazione

In fondo a `src/App.jsx`, il componente `App` definisce le rotte:

- `/` mostra `LoginPage`;
- `/home` mostra `HomePage`;
- qualsiasi altro percorso torna al login.

`useNavigate` permette ai componenti di cambiare schermata con il codice.
`Link` crea collegamenti interni che funzionano con React Router senza ricaricare
il documento.

La pagina ricorda temporaneamente da quale schermata arriva usando due piccoli
segnali in `sessionStorage`. Non sono credenziali: servono solo a scegliere
l'animazione corretta dopo il cambio di rotta. Appena la schermata di arrivo li
legge, li rimuove.

## 8. Come si muove il marchio

La funzione `getCenterOffset` calcola quanti pixel deve spostarsi un elemento per
raggiungere il centro della finestra. In questo modo l'animazione si adatta alle
dimensioni dello schermo.

Le schermate usano `useLayoutEffect` per preparare la pagina appena React la
mostra: aggiornano il titolo del browser, misurano la posizione del marchio e
aggiungono al `body` le classi CSS necessarie. Quando la schermata viene lasciata,
le classi vengono tolte.

Il percorso da login a home è questo:

1. La scheda di login si attenua.
2. Il marchio cresce e raggiunge il centro.
3. L'app apre la home, che continua il movimento del marchio verso la barra in
   alto. Le curve sono già presenti sullo sfondo, quindi non ricominciano da capo.
4. Il saluto e i riquadri compaiono mentre il marchio si sposta.

Per tornare al login, il marchio della home si ingrandisce e va verso il centro.
Menu e contenuto si attenuano; al termine dell'animazione si apre il login.

### Movimento ridotto

Il browser può comunicare che l'utente preferisce meno animazioni. L'app controlla
questa preferenza e salta i movimenti quando è attiva. Anche i fogli CSS contengono
regole `prefers-reduced-motion`, come ulteriore supporto.

## 9. Come leggere i fogli di stile

### `style.css`

Questo file contiene i colori condivisi, lo sfondo del login, la scheda con i
campi, i collegamenti, il pulsante e le animazioni di ingresso. Le regole
`@media` riducono spaziature e cambiano la disposizione sui telefoni.

### `home.css`

Questo file contiene la home: intestazione, menu, saluto e riquadri. Su schermi
larghi i riquadri si dispongono in una riga; su tablet diventano due colonne e su
telefono una colonna. Il suo sfondo usa le stesse sfumature del login.

Le animazioni CSS sono definite con `@keyframes`. Per esempio, una regola
`animation` sceglie quale sequenza eseguire, per quanto tempo e con quale curva
di movimento. Le classi aggiunte da React attivano le sequenze appropriate.

## 10. Accessibilità e piccoli dettagli

- I campi hanno etichette collegate e suggerimenti di compilazione automatica.
- Gli errori sono annunciati alle tecnologie assistive e i campi mancanti sono
  segnalati.
- È possibile individuare con la tastiera i controlli tramite un contorno visibile.
- Il menu usa elementi HTML nativi `details` e `summary`.
- Le decorazioni di sfondo sono nascoste alle tecnologie assistive e non
  intercettano i clic.
- Le animazioni rispettano la preferenza di movimento ridotto.

## 11. Dove fare le modifiche

- Vuoi cambiare il testo, i campi o il comportamento del login? Apri
  `src/App.jsx` e cerca `LoginPage`.
- Vuoi cambiare ciò che appare nella home? Apri `src/App.jsx` e cerca
  `HomePage`.
- Vuoi cambiare colori, spaziature o aspetto del login? Modifica `style.css`.
- Vuoi cambiare home, menu o riquadri? Modifica `home.css`.
- Vuoi aggiungere una libreria o un comando npm? Modifica `package.json`.
- Vuoi cambiare il percorso usato per pubblicare il sito? Controlla `vite.config.js`.

Quando hai finito una modifica, puoi ricreare la versione finale con
`npm.cmd run build`.
