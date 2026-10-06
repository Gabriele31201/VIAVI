# Pagina di accesso

Ciao! In questo progetto realizziamo una schermata di accesso e una home usando **HTML**,
**CSS** e un po' di **JavaScript**. L'HTML organizza i contenuti, il CSS ne cura l'aspetto
e JavaScript controlla i campi del login e avvia alcune animazioni.

## File del progetto

- `index.html` contiene il modulo della pagina di accesso.
- `style.css` contiene colori, disposizione, forme decorative, animazioni e adattamento agli schermi piccoli del login.
- `script.js` controlla che email e password non siano vuote e decide se attivare le animazioni.
- `home.html` contiene la pagina iniziale con il saluto personalizzato, i riquadri Tasse, Entrate e Cedolini e un menu minimale.
- `home.css` applica alla home lo sfondo lucido, il layout e le animazioni coordinate col login.
- `home.js` attiva le animazioni della home rispettando la preferenza per ridurre i movimenti.

Tutti i file devono rimanere nella stessa cartella. La pagina `index.html` usa `style.css`
e `script.js`; `home.html` usa `style.css`, `home.css` e `home.js`.

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

JavaScript controlla che il campo email e quello della password contengano almeno un carattere
diverso da uno spazio. Se uno dei due è vuoto, mostra un messaggio e non cambia pagina.
Quando entrambi sono compilati, il browser apre `home.html`. Per rispettare questa regola
semplice, il modulo non controlla se l'indirizzo email è scritto in un formato valido.

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

Quando si preme Accedi con entrambi i campi compilati, il marchio torna al centro mentre
la scheda svanisce e una linea di caricamento appare sotto VIAVI. La home riprende poi il
marchio da quel punto e lo anima verso l'alto, senza ripetere la pausa o la linea.
Quando si torna dalla home al login, VIAVI parte invece dalla posizione in alto,
raggiunge il centro con la linea di caricamento e prosegue verso la posizione finale
in basso con un movimento di 2,2 secondi. Durante il passaggio dalla home, saluto,
riquadri e menu svaniscono, lasciando visibili lo sfondo e il marchio.

JavaScript decide **quando** avviare l'effetto, mentre CSS descrive **come** si svolge
l'animazione. Se è attiva la preferenza per ridurre i movimenti, nome e scheda restano
subito nelle loro posizioni finali, senza animarsi.

### 4. La pagina iniziale

La home mette il marchio VIAVI in alto e usa un fondo scuro con riflessi trasparenti simili
alla scheda di accesso. Anche qui il marchio parte grande dal centro, resta fermo un secondo
con una linea di caricamento e poi si rimpicciolisce verso l'alto. Nel frattempo entrano le
curve e appare il saluto "Benvenuto, utente" sopra i riquadri Cedolini, Entrate e Tasse,
con le etichette allineate a destra e una tipografia coordinata al marchio.
Passando con il mouse o selezionandone uno con la tastiera, il riquadro attivo si allarga e
gli altri si restringono con una transizione più lenta e morbida. Il menu in alto a destra
contiene il collegamento per tornare al login. Se è attiva la preferenza per ridurre i
movimenti, gli elementi appaiono subito nelle loro posizioni finali.

### 5. Accessibilità e schermi piccoli

I campi hanno etichette visibili e gli elementi interattivi mostrano un contorno quando
si naviga con la tastiera. La regola `@media` modifica spaziature e disposizione su schermi
stretti, così il modulo rimane leggibile anche sul telefono.

## Limiti di questa versione

Queste pagine sono una dimostrazione: **non effettuano un accesso reale** e non salvano né
inviano credenziali a un servizio. JavaScript controlla soltanto che entrambi i campi non
siano vuoti; non verifica chi sta accedendo. Anche i collegamenti per recupero password e
registrazione sono segnaposto. Per autenticare gli utenti e proteggere davvero la home serve
un backend sicuro.
