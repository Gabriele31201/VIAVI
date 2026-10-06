# Pagina di accesso

Ciao! In questo progetto realizziamo una schermata di accesso usando solo **HTML** e **CSS**.
L'obiettivo è capire come si costruisce una pagina web: prima organizziamo i contenuti,
poi usiamo gli stili per controllarne l'aspetto.

## File del progetto

- `index.html` contiene la struttura e i testi della pagina.
- `style.css` contiene colori, disposizione, forme decorative, animazioni e adattamento agli schermi piccoli.
- `script.js` decide se attivare le animazioni, rispettando la preferenza di accessibilità del dispositivo.

I tre file devono rimanere nella stessa cartella: `index.html` carica il foglio di stile
`style.css` e lo script `script.js`.

## Come aprire la pagina

Apri la cartella `prova sito` e fai doppio clic su `index.html`. Il browser mostrerà la pagina
senza bisogno di installare programmi o avviare un server.

## Come è costruita la pagina

### 1. La struttura HTML

L'HTML descrive **che cosa** si trova nella pagina:

- `head` contiene informazioni per il browser, come il titolo e la codifica dei caratteri.
- `main` racchiude il contenuto principale.
- `section` contiene la scheda di accesso.
- `form` raccoglie i dati scritti dall'utente.
- `label` descrive ciascun campo e, grazie a `for` e `id`, è collegata al proprio input.
- `button` rappresenta l'azione principale.

Gli attributi `required` chiedono al browser di non inviare i campi vuoti, mentre `type="email"`
controlla che l'indirizzo abbia una forma plausibile. Sono controlli di base del browser, non
una verifica dell'identità.

Le curve decorative sono marcate con `aria-hidden="true"` perché non comunicano informazioni
necessarie: in questo modo le tecnologie assistive possono ignorarle.

### 2. La presentazione CSS

Il CSS descrive **come** appaiono gli elementi. All'inizio di `style.css` troviamo alcune
variabili con i colori principali. Le regole successive sono divise in sezioni numerate:

1. colori del progetto;
2. regole di base;
3. impaginazione;
4. curve decorative;
5. scheda effetto vetro;
6. titoli e testi;
7. campi del modulo;
8. opzioni, collegamenti e pulsante;
9. adattamento agli schermi piccoli.

Il fondo scuro è composto da un colore e da sfumature. Gli anelli sono forme ovali create
con bordi arrotondati, ruotate e posizionate in parte fuori dallo schermo.

La scheda ricorda un vetro lucido perché è quasi trasparente, sfoca lo sfondo dietro di sé
con `backdrop-filter` e usa una fascia diagonale luminosa, sfumature e ombre interne per
simulare dei riflessi. Non ha un bordo: la sua forma si distingue grazie a luce, sfocatura
e ombra, mentre il testo resta nitido perché la trasparenza si applica solo allo sfondo.

Il nome **VIAVI** è posizionato in basso con lettere spaziate e un colore tenue, scelto per
armonizzarsi con lo sfondo scuro restando facile da leggere.

### 3. Le animazioni JavaScript

Quando la pagina si apre, `script.js` controlla se il dispositivo è impostato per ridurre
i movimenti. Se le animazioni sono consentite, calcola la distanza tra la scritta VIAVI
in basso e il centro dello schermo. Il nome appare grande al centro e resta fermo per un
secondo, mentre una linea sottile sotto di esso si allunga e poi si spegne. A quel punto
VIAVI si rimpicciolisce fino alla posizione finale; durante il tragitto la scheda di accesso
compare e le curve entrano dai lati dello schermo.

JavaScript decide **quando** avviare l'effetto, mentre CSS descrive **come** si svolge
l'animazione. Se è attiva la preferenza per ridurre i movimenti, nome e scheda restano
subito nelle loro posizioni finali, senza animarsi.

### 4. Accessibilità e schermi piccoli

I campi hanno etichette visibili e gli elementi interattivi mostrano un contorno quando
si naviga con la tastiera. La regola `@media` modifica spaziature e disposizione su schermi
stretti, così il modulo rimane leggibile anche sul telefono.

## Limiti di questa versione

Questa è una pagina dimostrativa: **non effettua un accesso reale** e non salva né invia
credenziali a un servizio. Il pulsante usa un modulo HTML, ma non c'è un server collegato
che controlli email e password. Anche i collegamenti per recupero password e registrazione
sono segnaposto: per renderli funzionanti servono altre pagine e, per l'autenticazione,
un backend sicuro.
