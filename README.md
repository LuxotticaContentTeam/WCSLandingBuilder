# Supernova LP Cross Brand

  

## Popolare gli attributi in index.html

  

### Inserire le URL dei video

  

Nelle `<section>` in cui sono presenti dei video, noterete che **non esiste** un tag `<source>` per l'inserimento delle URL, ma dovrete farlo utilizzando gli attributi `data-video-mob` e `data-video-desk` per inserire rispettivamente le URL dei video MOB e DESK, presenti in ogni tag `<video>`.

  

Questo perchè i video vengono caricati attraverso Javascript in un secondo momento, all'evento click del player, riconoscendo la risoluzione dello schermo.

  

Es.:

  

    <video  class="cb_d-none cb_w-100 cb_h-100 cb_rounded-1"  data-video-mob="https://placehold.co/343x343.mp4"  data-video-desk="https://media.lenscrafters.com/2023/LP/About_Us_LP/Hero_Video/LENSCRAFTERS__30_NoPromo_16_9_US.mp4"  playsinline  loop></video>

  

### Inserimento di asset e lazy loading

  

In ogni tag `<img>` ricordate di insere le URL degli asset definitivi facendo attenzione agli attributi presenti nel tag.

In particolar modo, negli attributi `srcset` del tag `<source>` e `src` del tag `<img>`, inserirete la versione base64encode dell'asset corrispondente, per creare un placehoder con effetto blur dell'asset stesso e aspettare che l'immagine si carichi con il lazy loading.

  

Di seguito troverete degli esempi per ogni brand:

  

#### LC 

    <picture>
    
    <source  media="(max-width: 768px)"  srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAYAAABLLYUHAAAAAXNSR0IArs4c6QAAABNJREFUGFdjvHv37n8GKGAkjgMArkkOXYtfRRsAAAAASUVORK5CYII="  data-srcset="https://placehold.co/375x530"  />
    
    <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAAXNSR0IArs4c6QAAABNJREFUGFdjvHv37n8GKGBE5gAAeccHL1qYiX8AAAAASUVORK5CYII="  data-original="https://placehold.co/1920x1080"  class="cb_w-100 cb_h-100 cb_object-fit-cover video-cover lazy"  alt="Video cover"  />
    
    </picture>

  

#### TO 

    <picture>
    
    <source  media="(max-width: 768px)"  srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAYAAABLLYUHAAAAAXNSR0IArs4c6QAAABNJREFUGFdjvHv37n8GKGAkjgMArkkOXYtfRRsAAAAASUVORK5CYII="  data-srcset="https://placehold.co/375x530"  />
    
    <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAAXNSR0IArs4c6QAAABNJREFUGFdjvHv37n8GKGBE5gAAeccHL1qYiX8AAAAASUVORK5CYII="  data-original="https://placehold.co/1920x1080"  class="cb_w-100 cb_h-100 cb_object-fit-cover video-cover lazy"  alt="Video cover"  />
    
    </picture>

  

#### SV

    <picture>
    
    <source  media="(max-width: 768px)"  srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAYAAABLLYUHAAAAAXNSR0IArs4c6QAAABNJREFUGFdjvHv37n8GKGAkjgMArkkOXYtfRRsAAAAASUVORK5CYII="  data-srcset="https://placehold.co/375x530"  />
    
    <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAAXNSR0IArs4c6QAAABNJREFUGFdjvHv37n8GKGBE5gAAeccHL1qYiX8AAAAASUVORK5CYII="  data-src="https://placehold.co/1920x1080"  class="cb_w-100 cb_h-100 cb_object-fit-cover video-cover lazyload"  alt="Video cover"  />
    
    </picture>

  

#### OPSM

    <picture>
    
    <source  media="(max-width: 768px)"  srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAYAAABLLYUHAAAAAXNSR0IArs4c6QAAABNJREFUGFdjvHv37n8GKGAkjgMArkkOXYtfRRsAAAAASUVORK5CYII="  data-image-src="https://placehold.co/375x530"  />
    
    <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAAXNSR0IArs4c6QAAABNJREFUGFdjvHv37n8GKGBE5gAAeccHL1qYiX8AAAAASUVORK5CYII="  data-image-src="https://placehold.co/1920x1080"  class="cb_w-100 cb_h-100 cb_object-fit-cover video-cover lazy-lo"  alt="Video cover"  />
    
    </picture>

  

### Inserimento dei titoli per lo Sticky Banner

  

Cercate nel file html l'attributo `data-title`, presente in tutti i tag **headings** (h1, h2..) e inseriteci il titolo della sezione corrispondente, rispettando la formattazione giusta per far sì che il titolo appaia correttamente.

  

Es. :

  

    <h2  class="cb_text-center"  data-title="Product highlights">product highlights</h2>

  

### Inserimento degli attributi analytics per tutti i tag `<a>`

  

In ogni tag `<a>` ricordate di settare gli attributi `data-element-id` e `data-description` che saranno utili al team analytics per i tracciamenti.

Partendo dal più semplice, l'attributo  `data-description` riporta il testo del link o della CTA (possibilmente senza spazi e con la lettera iniziale in maiuscolo) e indica perlopiù la destinazione del link, come potete vedere nell'esempio.

Invece l'attributo `data-element-id` ha bisogno di una sintassi più specifica, in quanto ogni "componente" del valore dell'attributo ha un significato bene specifico. Vi riporto la sintassi della documentazione:

    <Counter><ComponentName>_<ItemType><Counter>_<Action>

`<Counter><Nome>`: descrive il posizionamento di un componente nella pagina.
Se è possibile fornire il contatore che indica quante volte si ripete nella stessa riga/colonna, il nome può essere un generico "Placement", altrimenti deve essere un nome personalizzato come "Hero";

`<ItemType><Counter>`: per ogni elemento del componente è necessario specificare il suo tipo, come "Banner", "Video", "Tile" e un contatore che indica quante volte si ripete nella stessa riga/colonna;

`<Action>`: descrive ciò che l'utente ha cliccato. I valori possono essere:  CTA, IMG, LINK, CARTADD, PLAY, SHOW, HIDE.
  
Per approfondimenti vi allego questo doc: 

https://docs.google.com/document/d/1UysD_ZybZEqkBL5SG6B7pRmh6lcJAiBmsh80jTj1ghY/edit#heading=h.v7umwo10h0qx

Es. :

    <a  href="#"  class="cb_cta fill cb_font-m cb_fw-semibold cb_text-uppercase"  id="downloadCTA"  data-element-id="1DownloadApp_Banner1_CTA"  data-description="DownloadApp">download the app</a>

## Gestione carosello prodotti

### La parte HTML nel file index.html
Per gestire il carosello dei prodotti nella LP, andate prima nel file index.html e cercate la classe `ct_categories_wrapper`. In questo modo vi posizionerete nella porzione di codice che gestisce la tab delle categorie del carosello.

Aggiornate, per ogni elemento con la classe `.ct_category` l'attributo corrispondente `ct_category` con il nome della categoria del prodotto. 

FATE MOLTA ATTENZIONE A COME LO SCRIVETE PERCHÈ QUESTO VALORE TORNERÀ UTILE DOPO QUANDO DOVRETE EDITARE LA PARTE JS.

Nel nostro caso saranno:

    ct_category="Wayfarer"
    ct_category="Headliner"
   
 Ricordate di inserire lo stesso valore nel tag `<p>` per visualizzarli all'interno del "pulsante".

Invece popolate l'attributo `ct_category_URL` con la URL della PLP corrispondente.

Servirà per il link della "View All".

Es. intero codice:

    

    <div  class="ct_categories">
   
    <div  ct_category="Wayfarer"  ct_category_URL="/lc-us/ray-ban-meta"  class="ct_category ct_icon_height_fix ct_selected">
    
    <p>WAYFARER</p>
    
    </div>
    
    <div  ct_category="Headliner"  ct_category_URL="/lc-us/ray-ban-meta"  class="ct_category">
    
    <p>HEADLINER</p>
    
    </div>
    
    <div  class="ct_category ct_fake_category_mob">
    
    <p>&nbsp;</p>
    
    </div>
    
    </div>


### La parte JS nel file products.js
Come prima cosa, cercate nel file products.js il commento `/* Populate products and create carousel */`, perchè nella porzione di codice immediatamente sotto, dovete inserire il valore della prima `ct_category` che avete inserito nel file index.html nella variabile `ct_searchTermMidProducts`,  perchè automaticamente verrà selezionata la prima tab (quindi la prima categoria) con i propri prodotti.

Codice:

    /* Populate products and create carousel */
    
    var ct_searchTermMidProducts =  "Categoria1";
    
    ct_populate_category_carouselMidProducts(ct_searchTermMidProducts);
    
    var ct_categoriesMidProducts = document.querySelectorAll(
    
    ".ct_midProducts_carousel .ct_category"
    
    ); 

Succesivamente cercate questa porzione di codice:

    var ct_img = document.createElement("img");
    
    ct_img.src =
    
    "https://assets.lenscrafters.com/is/image/LensCrafters/"  +
    
    ct_cc_upc +
    
    "__STD__shad__fr.png?imwidth=1024";
 
     
Qui viene dichiarata la variabile per la visualizzazione dell' immagine di prodotto corrispondente. 

Non dovrete fare altro che andare a sostituire la parte statica della URL che vedete (in questo caso quella di LensCrafters), con quella rispettiva dei vostri brand e concatenare la variabile `ct_cc_upc` in base a come è formata la URL dei vostri rispettivi brand.

In LensCrafters, per esempio, quella parte statica della URL dell'immagine viene recuperata ispezionando l'immagine prodotto dalla PDP.

### I file .json

Per ogni categoria del carosello dovrete creare (sicuramente in una cartella di Akamai a vostra scelta), ben **due file .json**. 

Nel primo andrete a inserire i prodotti della categoria corrispondente, ognuno con le rispettive info:

 - id (progressivo man mano che aggiungete i prodotti)
 - upc
 - brand
 - price
 - pdpURL
 - productName

Questo primo file .json lo chiamerete con lo stesso nome che avete dato all'attributo `ct_category` nel file index.html

Esempio: `Wayfarer.json`

Nel secondo file .json che andrete a creare dovrete inserire, per ogni prodotto, un'unica informazione, corrispondente alla variante colore del prodotto, **facendo molta attenzione all'indice numerico che accompagnerà la chiave "variants"**, perchè quello rispetterà l'ordine con cui avrete inserito i prodotti nel primo file .json

Quindi la proprietà `variants0` corrisponderà al prodotto 0 (aiutatevi con gli id progressivi), `variants1` al prodotto 1 e così via.

Questo secondo file .json lo chiamerete con lo stesso nome del primo file .json, con l'aggiunta della parolina "Variants".

Esempio: `WayfarerVariants.json`

Terminata la creazione del json e il caricamento in un determinato percorso, tornate nel file **products.js** e cercate e aggiornate la seguente porzione di codice, soprattutto nella prima parte del valore della variabile (quella prima di $), perchè dovrete aggiornarla con il path in cui avete caricato i file.

    var productsJsonUrl =  `../data/${ct_searchTermMidProducts}.json`;
    
    var variantJsonUrl =  `../data/${ct_searchTermMidProducts}Variants.json`;


## WCSLandingBuilder
Di seguito alcuni comandi utili per il funzionamento del tool LandingBuilder:

`npm i` o `npm install` , per installare i node modules
`npm run dev`, per lanciare il server in locale e aprire il progetto nel browser
`npm run build,` per buildare il progetto che creerà il file ESPOT.html nella cartella `dist`, con l'intero codice da copiare e incollare in WCS
