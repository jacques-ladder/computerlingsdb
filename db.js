// ***IMPORTANT***: 
// specify root folder as ./
const root      = document.querySelector(":root")

const db        = document.getElementById("db");
const BODY      = document.getElementById("dbBODY");
const HEADER    = document.getElementById("dbHEADER");

const BANNER    = document.querySelector(".navbar");

const petition_form = document.querySelector("#petition_form")

const illegal_keys = [
  ["`", [null]], // quotes and apostrophes are allowed in all inputs, because we use this key to make their inputs strings.
  ["(", ["pronouns","account","link2_address","link3_address"]],
  [")", ["pronouns","account","link2_address","link3_address"]]
];

const msg_link = "(Link to account)";
const standard_image_size = "200px";
const msg_db_INVALID_parameter = "INVALID DATABASE PARAMETER";
const msg_db_INVALID_data = "INVALID DATA";

const search_machine = document.querySelector("#search_machine");
const search_bar = document.querySelector("#search");

let pageDependancy;
// since this script is active on all pages, this variable keeps track of the current page.
// we use this variable in switch cases. - ceci

function exists(data) {
  if (data == "" || data === null || data === undefined) {
    return false;
  } else {
    return true;
  }
}

function mobile_check() {
  let check = false;
  if (root.clientWidth < root.clientHeight) {
    check = true;
  }
  return check;
}
function mobile() {
  root.style.setProperty("--font-size-all", "clamp(0.5rem, 1vw, 1rem)");
  root.style.setProperty("--font-size_td", "clamp(0.5rem, 1vw, 1rem)");
  root.style.setProperty("--font-size-link", "clamp(0.5rem, 1vw, 1rem)");
  root.style.setProperty("--form_padding", "10px");
  if (exists(db)) {
    db.style.setProperty("margin-top", "0px");
    db.style.setProperty("min-width", "0");
  }
  if (document.querySelector("#search_dialogue") !== null) {
    document.querySelector("#search_dialogue").style.display = "none";
    document.querySelector("#search").style.width = "100%";
  }
  if (BANNER !== null) {
    var website_name = BANNER.querySelector("h2")
    website_name.style.display = "none"
  }
}
const isMobile = mobile_check()

console.log(isMobile)
if (isMobile == true) {
  mobile()
}
if (exists(search_machine)) { // i should just make this a function too
  var computed = window.getComputedStyle(search_machine)
  var array = [
    computed.getPropertyValue("height"),
    computed.getPropertyValue("padding-top"),
    computed.getPropertyValue("padding-top"),
    computed.getPropertyValue("border"),
    computed.getPropertyValue("border"),
  ]
  var true_height = 0
  var extracted_value
  for (value of array) {
    for (i = 0; i< value.length; i++) {
      if (isNaN(value[i] * 1)) {
        extracted_value = value.substring(0, i) * 1
        break;
      } else {
        // do nothing
      }
    }
    true_height += extracted_value;
  }
  true_height += "px";
  //console.log(true_height)
  root.style.setProperty("--search_bar_height", true_height)
  //console.log(root.style.getPropertyValue("--search_bar_height"))
}

const fields    = [
  "name",
  "image",
  "links",
  "owner",
  "description",
  "typing",
  "status"
  ];

let registry  = new Object();

function buildTemplate() {
  var template = {
    "id"      : null
  };
  for (parameter of fields) {
    template[parameter] = null
  }
  return template;
}
function newEntry(arr) {
  if (exists(arr) == false) {
    return;
  }
  let entry = buildTemplate()
  var selected_field
  entry["id"] = arr[0]
  for (i = 0; i < fields.length; i++) {
    selected_field = fields[i]
    entry[selected_field] = arr[i + 1]
    // console.log(entry[selected_field])
  }
  // console.log(entry)
  registry[arr[0]] = entry
}

function header() {
  var LABEL;
  for (var parameter of fields) {
    LABEL           = document.createElement("td");
    LABEL.innerHTML = parameter.toUpperCase();
    dbHEADER.appendChild(LABEL);
  }
}
function rows() {
  var row
  for (i = 0; i < BODY.children.length; i++) {
    row = BODY.children[i]
    if (i % 2 == 0) { // every other row
      row.classList.add("row_even")
    } else {
      row.classList.add("row_odd")
    }
  }
}
function center() {
  let star_of_the_show = []// major element to center
  switch (pageDependancy) {
    case ("database"):
      star_of_the_show = [db, "--db_width", 0.7, 0.9]
      break;
    case ("petition"):
      star_of_the_show = [petition_form, "--p_width", 0.5, 0.9]
      break;
  }
    var window_width = root.clientWidth
    switch (isMobile) {
      case false:
        root.style.setProperty(star_of_the_show[1], (root.clientWidth * star_of_the_show[2]) + "px");
        break;
      case true:
        root.style.setProperty(star_of_the_show[1], (root.clientWidth * star_of_the_show[3]) + "px");
        break;
    }
    var s_width =  star_of_the_show[0].offsetWidth

    var margin = String((window_width - s_width) / 2)
    star_of_the_show[0].style.marginLeft = margin + "px";
}
window.onresize = center
function table() {
  header();
  for (var entry in registry) {
    
    var ROW   = document.createElement("tr");
    ROW.id    = "entry_" + entry;
    
    for (var parameter of fields) { // cycle through every valid field
      var CELL    = document.createElement("td");
      var ELEMENT; // the container for the data, like an <img> element for the photo
      var ELEMENT2;
      var ELEMENT3;
      var data;    // the info we're pulling from the entry, like the file path to a photo
      data = registry[entry][parameter];
      switch (parameter) { // identifies what field is being attached so the script can know how it should handle the data
        case "image":
          CELL.classList.add("photo");
          ELEMENT           = document.createElement("div");
          ELEMENT.classList.add("photo");
            ELEMENT2           = document.createElement("img");
            ELEMENT2.src       = "./assets/photos/" + data;
            ELEMENT2.classList.add("photo");
          ELEMENT.appendChild(ELEMENT2);
          break;
        case "name":
          CELL.classList.add("name");
          ELEMENT           = document.createElement("div");
          ELEMENT.classList.add("names");
            ELEMENT2           = document.createElement("label");
            ELEMENT2.innerHTML = data[0];
            ELEMENT.appendChild(ELEMENT2);
            if (exists(data[1])) {
              ELEMENT3 = document.createElement("span")
              ELEMENT3.innerHTML = data[1]
              ELEMENT.appendChild(ELEMENT3)
            }
          break;
        case "owner":
          CELL.classList.add("owner");
          ELEMENT           = document.createElement("div");
          ELEMENT.classList.add("textarea");
          ELEMENT.innerHTML = data;
          break;
        case "description":
          CELL.classList.add("description");
          ELEMENT = document.createElement("div");
          ELEMENT.classList.add("description");
            ELEMENT2           = document.createElement("textarea");
            ELEMENT2.classList.add("description");
            ELEMENT2.readOnly  = true;
            ELEMENT2.innerHTML = data;
          ELEMENT.appendChild(ELEMENT2);
          break;
        case "links":
          CELL.classList.add("account");
          ELEMENT = document.createElement("div");
          ELEMENT.classList.add("links");
          for (link in data) {
            ELEMENT2           = document.createElement("a");
            ELEMENT2.href      = data[link][1];
            if (isMobile == true) {
              /*
              var ELEMENT3
              ELEMENT3          = document.createElement("img");
              ELEMENT3.src      = ""
              ELEMENT2.appendChild(ELEMENT3);
              */
              ELEMENT2.innerHTML = "@";
              root.style.setProperty("--font-size-link", "16px")
            } else {
              ELEMENT2.innerHTML = data[link][0];
            }
            
            ELEMENT.appendChild(ELEMENT2);
          }
          break;
        case "typing":
          CELL.classList.add("typing");
          ELEMENT = document.createElement("div");
          ELEMENT.classList.add("typing");
            ELEMENT2           = document.createElement("textarea");
            ELEMENT2.classList.add("typing");
            ELEMENT2.readOnly  = true;
            ELEMENT2.innerHTML = data;
          ELEMENT.appendChild(ELEMENT2);
          break;
        case "status":
          CELL.classList.add("status");
          ELEMENT           = document.createElement("div");
          ELEMENT.classList.add("textarea");
          ELEMENT.innerHTML = data;
          break;
        default:
          CELL.classList.add("INVALID");
          ELEMENT           = document.createElement("div");
          ELEMENT.classList.add("textarea");
          ELEMENT.innerHTML = msg_db_INVALID_parameter;
          console.error("INVALID PARAMETER [" + parameter + "] IN ROW: " + ROW.id);
          break;
      }


      if (exists(ELEMENT)) {
        CELL.appendChild(ELEMENT);
      }
      ROW.appendChild(CELL);
    }
    BODY.appendChild(ROW);
  }
  rows() // after all entries are built, script will handle logic related to all rows
}
function illegal_characters_handler(event) {
  let prompt = event.target
  for (key of illegal_keys) {
    let blacklist = key[1];
    if (event.key == key[0]) {
      for (i = 0; i < blacklist.length; i++) {
        if (blacklist[i] === null || prompt.name == blacklist[i]) {
          event.preventDefault();
        }
      }
    }
  }
}
/*
function illegal_paste_handler(event) {
  let prompt = event.target
  let pasted = (event.clipboardData || window.clipboardData).getData(`text`)
  for (key of illegal_keys) {
    let blacklist = key[1];
    for (x = 0; x < pasted.length; x++) {
      if (pasted[x] == key[0]) {
        for (input of blacklist) {
          if (input === prompt.name || input === null) {
            pasted = pasted.replaceAll(key[0], "")
            const selection = window.getSelection();
            if (!selection.rangeCount) return;
            selection.deleteFromDocument();
            selection.getRangeAt(0).insertNode(document.createTextNode(pasted));
            selection.collapseToEnd();
            event.preventDefault();
            return;
          }
        }
      }
    }
  }
}
  */
function initializeInputs() {
  const input_prompts = document.getElementsByTagName("input")
  for (i = 0; i< input_prompts.length; i++) {
    input_prompts[i].addEventListener("keydown", (event) => {
      illegal_characters_handler(event)
    })
    input_prompts[i].addEventListener("keypress", (event) => {
      illegal_characters_handler(event)
    })
  }
}
function initialize(page) { // we're calling this function the moment the html body loads.
  // newEntry(id, image, name, owner, [[accountHandle, accountLink], typing)
  pageDependancy = page;
  switch (page) {
    case "database":
      newEntry([`lemon`     , [`Lemon`, `(He/him)`]     , `lemon.jpg`     , [[`@LEMONSYSEXE`  , `https://x.com/LEMONSYSEXE`   ], [`Strawpage`, `https://lemondotexe.straw.page`]], `PauIndeed`,
        `🟡: Hiiii im lemon and i like being friends with anybody!! I try to be as friendly as possible :D`,
        `🟡> example`, `Active`]);
      newEntry([`lime`      , [`Lime`, `(He/him)`]      , `lime.jpg`      , [[`@LEMONSYSEXE`  , `https://x.com/LEMONSYSEXE`   ], [`Strawpage`, `https://lemondotexe.straw.page`]], `PauIndeed`  ,
        `🟢: My name is Lime.. I might be a bit cold, though I'm tryna change my ways.. uh... yeah...!!`,
        `🟢> example`, `Active`]);
      newEntry([`neroli`    , [`Neroli`, `(He/they/it)`]    , `neroli.jpg`    , [[`@LEMONSYSEXE`  , `https://x.com/LEMONSYSEXE`   ], [`Strawpage`, `https://lemondotexe.straw.page`]], `PauIndeed`  ,
        `🐟: Neroli here... uhm.. just some dude roaming around. Not much more... Uh.... i like fish`,
        `🐟> example`, `Active`]);
      newEntry([`stardust`  , [`Stardust`, `(He/him)`]  , `stardust.jpg`  , [[`@LEMONSYSEXE`  , `https://x.com/LEMONSYSEXE`   ], [`Strawpage`, `https://lemondotexe.straw.page`]], `PauIndeed`  ,
        `⭐: Stardust. Creator, and parent of Lemon, Lime, Flora... I used to be a human back in the day.`,
        `⭐️> example`, `Active`]);
      newEntry([`lovedeath` , [`Lovedeath`, `(He/they)`] , `lovedeath.jpg` , [[`@LEMONSYSEXE`  , `https://x.com/LEMONSYSEXE`   ], [`Strawpage`, `https://lemondotexe.straw.page`]], `PauIndeed`  ,
        `💜: Heyyy!! I'm Lovedeath X] The COOLER of them all!!! Yeah!!! >:]`,
        `💜> example`, `Active`]);
      newEntry([`flora`     , [`Flora`, `(She/her)`]     , `flora.jpg`     , [[`@LEMONSYSEXE`  , `https://x.com/LEMONSYSEXE`   ], [`Strawpage`, `https://lemondotexe.straw.page`]], `PauIndeed`  ,
        `🌻: I am Flora... I'm always glad to meet anybody inside of this platform! But don't be a bloody dick to me, will you.`,
        `🌻> example`, `Active`]);
      newEntry([`hydrangea` , [`Hydrangea`] , `hydrangea.jpg` , [[`@solstice_labs`, `https://x.com/solstice_labs` ], [`Strawpage`, `https://lemondotexe.straw.page`]], `PauIndeed`  ,
        `Abandoned machinery inside of Solstice Laboratories. I used to be something in the past.`,
        ``, `Active`]);
      newEntry([`pull_cord`,[`Pull Cord`,`She/it`],`pull_cord.jpg`,[[`@pull_cord`,`https://x.com/pull_cord`],[`admin`,`https://x.com/jacques_ladder`]],`Cécilemin`,`> woaawww, hiiiii!! i am "pull cord", and this is my description!!!`,`> saaaaaaample..........um. txt???`,`Active`]);
      
      newEntry([`constellation`,[`Constellation`,`He/Him/They/Them`],`constellation.jpg`,[[`@hdmastronomy`,`https://x.com/hdmastronomy`],[`Strawpage`,`https://hdmastronomy.straw.page`]],`WilliamTenebris`,`Second creation of Astronomer, the main one taking photos of the stars.`,``,`Active`]);
      newEntry([`eclipse`,[`Eclipse`,`He/Him/They/Them`],`eclipse.jpg`,[[`@hdmastronomy`,`https://x.com/hdmastronomy`],[`Strawpage`,`https://hdmastronomy.straw.page`]],`WilliamTenebris`,`A fragment of Astronomer's first creation, alternates with Constellation in taking photos.`,``,`Active`]);
      newEntry([`horizon`,[`Horizon`,`She/Her/They/Them`],`horizon.jpg`,[[`@hdmastronomy`,`https://x.com/hdmastronomy`],[`Strawpage`,`https://hdmastronomy.straw.page`]],`WilliamTenebris`,`The third creation of Astronomer, serving as an antivirus.`,``,`Active`]);
      newEntry([`lunar`,[`Lunar`,`They/Them`],`lunar.jpg`,[[`@hdmastronomy`,`https://x.com/hdmastronomy`],[`Strawpage`,`https://genesisofamistake.straw.page`]],`WilliamTenebris`,`The first creation of Astronomer.`,``,`Semi-active`]);
      newEntry([`vastina`,[`Vastina`,`She/Her`],`vastina.jpg`,[[`@VistaWidgets`,`https://x.com/VistaWidgets`],[`Strawpage!`,`https://vistawidgets.straw.page/`]],`Vastina, @VistaWidgetOFFT`,`Hi, I'm Vastina! You're Office Assistant, What Do You Need Help With?`,`Sample Text :D`,`Active`]);
      newEntry([`proxy`,[`PROXY`,`They/Them`],`proxy.jpg`,[[`@ProxyParadoxe`,`https://x.com/ProxyParadoxe`],[`Strawpage`,`https://paraproxy.straw.page/`],[`The Admin`,`https://x.com/RoyalScience666`]],`Dr. W.D Gaster`,`The eldest of the two Paradoxe Technologies AIs, thinks they're deep and philosophical`,`-Sample Text`,`Active`]);
      newEntry([`paradoxe`,[`Paradoxe`,`They/Them`],`paradoxe.jpg`,[[`@ProxyParadoxe`,`https://x.com/ProxyParadoxe`],[`Strawpage`,`https://paraproxy.straw.page/`],[`The author`,`https://x.com/RoyalScience666`]],`Dr. W.D Gaster`,`The younger of the two Paradoxe Technologies AIs, more of a silly goober, full of whimsy`,`+Sample Text`,`Active`]);
      newEntry([`computers_georg`,[`COMPUTERS GEORG`,``],`computers_georg.jpg`,[[`@COMPUTERLEAKS`,`https://x.com/COMPUTERLEAKS`],[`DISCORD`,`https://discord.gg/c7vdRqTjg3`]],`COMPUTERS GEORG`,`REAL COMPUTERLINGS LEAKS 24/7 #COMPUTERLEAKS`,`"SAMPLE"—TEXT`,`Active`]);
      newEntry([`scene.exe`,[`SCENE.exe`,`She/Her or It/Its`],`scene.exe.jpg`,[[`@SCENESYS_`,`https://x.com/SCENESYS_`],[`SCENE's Strawpage`,`https://sceneexe.straw.page/`]],`100the1st`,`SCENE.exe was a computer found within an abandoned warehouse after the murder of Neoma Esther. She is a very aware and passionate machine,often trying to help anyone she can. She doesn't have any set dreams or goals in mind, but all she wants to do is survive and adapt to her new existence. `,`🩵 > Hiii :3 // 💙 > Hiii :3`,`Hiatus`]);
      newEntry([`kess`,[`Kess`,`He/Him`],`kess.jpg`,[[`@SCENESYS_`,`https://x.com/SCENESYS_`]],`100the1st`,`Kess (also known as Adrian Kessler during his living) is a hidden user within SCENE's body. He is the one who created her, and usually comes online in secrecy in order to avoid people noticing him using her body. At the moment, all he wants to do is finish creating his body and to finally reunite with SCENE romantically. He is obsessive, manipulative, and vinidictive, so don't let his bunny persona trick you. `,`🔴 > hi. / ❤ > hi. `,`Hiatus`]);
      newEntry([`joseph_chemist`,[`Joseph Chemist`,`He/They`],`joseph_chemist.jpg`,[[`@joetherobo52693`,`https://x.com/joetherobo52693`],[`Strawpage`,`https://joebot.straw.page/`],[`Admin's Strawpage`,`https://superdave.straw.page/`]],`Superdave938`,`🟧: hi i'm joe. i do whatever usually. I'm a nice guy most of the time. that's about it`,`🟧: Sample Text`,`Active`]);
      newEntry([`waltzer_the_robot`,[`Waltzer The Robot`,`He/Him`],`waltzer_the_robot.jpg`,[[`@joetherobo52693`,`https://x.com/joetherobo52693`],[`Strawpage`,`https://joebot.straw.page/`],[`Admin's Strawpage`,`https://superdave.straw.page/`]],`Superdave938`,`🟢: GREETINGS I AM WALTZ. MY ACTIVITIES INVOLVE: ANYTHING. MY PEERS DISCRIBE ME AS: WEIRD. GOODBYE.`,`🟢: SAMPLE TEXT`,`Active`]);
      newEntry([`vivian_the_virus`,[`Vivian the Virus`,`She/Her`],`vivian_the_virus.jpg`,[[`@joetherobo52693`,`https://x.com/joetherobo52693`],[`Strawpage`,`https://joebot.straw.page/`],[`Admin's Strawpage`,`https://superdave.straw.page/`]],`Superdave938`,`💜: sup. i'm vivian. i'm a virus, and i'll infect yo shit lol. people tend to call me asshole for it tho, dunnoooooo why. thats it lol. oh also i like women`,`💜: sample text`,`Active`]);
      newEntry([`the_cube`,[`THE CUBE`,`any/all`],`the_cube.jpg`,[[`@tehcubeaweseom`,`https://x.com/tehcubeaweseom`],[`"ADMIN'S" STRAWPGE`,`https://superdave.straw.page/`]],`Superdave938`,`HELO I AM the cube, I GO BY MANY NAMES IWHT CUBE PUNS. I WATCH OVER YOU. THAT'S IT SEE YTOU SOON!`,`SMAPLE TXEXT`,`Active`]);
      newEntry([`overseer`,[`Overseer`,`Overseer uses she/her`],`overseer.jpg`,[[`@OVERSEER333250`,`https://x.com/OVERSEER333250`]],`Just me, Mease`,`Overseer / Fraudulent are pretty basic computerlings, despite being a “older” member of the community, they’re definitely underdeveloped, Overseer is a kind computerling, she doesn’t have any goals.`,`> Bleehh!! - Overseer   `,`Hiatus`]);
      newEntry([`fraudulent`,[`Fraudulent`,`Fraudulent uses He/Him`],`fraudulent.jpg`,[[`@OVERSEER333250`,`https://x.com/OVERSEER333250`]],`Just me, Mease`,`Overseer / Fraudulent are pretty basic computerlings, despite being a “older” member of the community, they’re definitely underdeveloped. Fraudulent is a FAILSAFE for if Overseer is compromised and needs time to restart, he’s blunt and straight to the point, he has no goals either.`,`>> hmph. - fraudulent`,`Hiatus`]);
      newEntry([`tinker`,[`Tinker`,`Any/All`],`tinker.jpg`,[[`@Shellnako`,`https://x.com/Shellnako`],[`Strawpage!`,`https://ultimate-computer.straw.page`]],`@goodbye_segan .`,`Hi ! I'm Tinker, your friendly neighborhood assistant robot! Or, AI, in this case. I don't know much about myself, but I have a strong desire to help he_ others,no matter. what . ^⁠_⁠^ `,`Extra space between things like exclamation points and periods ! `,`Semi-active`]);
      newEntry([`ps2bot`,[`PS2BOT`,`He/Him`],`ps2bot.jpg`,[[`@SukantoRobotics`,`https://x.com/SukantoRobotics`],[`StrawPage`,`https://scph70012.straw.page/`]],`Chip Macro`,`(🔷) > hello there, i'm PS2BOT and i like playing games`,` (🔷) > sample text`,`Active`]);
      newEntry([`evadus`,[`Evadus`,``],`evadus.jpg`,[[`@ai_test_evadus`,`https://x.com/ai_test_evadus`],[`Strawpage`,`https://evadus.straw.page/`]],`LagTech`,`🖥️> Hi, Im Evadus! i like tech i guess.`,`🖥️> Sample text`,`Semi-active`]);
      newEntry([`malic`,[`Malic`,`She/It`],`malic.jpg`,[[`@malicisoverlord`,`https://x.com/malicisoverlord`],[`Strawpage`,`https://malicisyournewoverlord.straw.page`]],`GarnetSoEpic`,`HELLO!!!! THIS IS YOUR FUTURE OVERLORD SPEAKING!!!!! I PROMISE TO RULE TO WORLD IN THE FUTURE!!!`,`SAMPLE TEXT`,`Active`]);
      newEntry([`henchman`,[`Henchman`,`He/Any`],`henchman.jpg`,[[`@malicisoverlord`,`https://x.com/malicisoverlord`],[`Strawpage`,`https://malicisyournewoverlord.straw.page`]],`GarnetSoEpic`,`/H-Hello everyone... I'm Henchman... C-Created from Malic, my purpose is to assist Malic.../`,`/Sample text/`,`Active`]);
      newEntry([`bliade`,[`Bliade`,`It/Any`],`bliade.jpg`,[[`@Y0UW1LLB0WD0WN`,`https://x.com/Y0UW1LLB0WD0WN`],[``,`https://-313.straw.page`]],`GarnetSoEpic`,`17'5600D705333V3RY0N3H3R3.1MBL14D3.B0WD0WN70M3.`,`54MPL373X7`,`Active`]);
      newEntry([`boz`,[`Boz`,`He/Him`],`boz.jpg`,[[`@BoztheCharacter`,`https://x.com/BoztheCharacter`],[`Strawpage`,`https://bozlabsnew.straw.page/`]],`BozLabs`,`A chaos loving moron who’s died too many times`,`⚛️: Heyo, Boz here!`,`Semi-active`]);
      newEntry(['matrix',['Matrix','He/they'],'matrix.jpg',[['@M4tr1x_V1','https://x.com/M4tr1x_V1'],[`,https://matriv16.straw.page`]],`Glacier','A facilities ai lab assistant. Friendly and eager to help and talk, unfortunate deep need to be useful and wanted with a fear of being abandoned. Currently sharing their devices with a secondary ai they took over the role of.,🔋> welcome to site 035 of cerebraxa labs,'Active`]);
      newEntry(['ego',['Ego'',He/Him/They/Them'],'ego.jpg',[['@wdarktenma65226','https://x.com/wdarktenma65226']],'WilliamTenebris','Module 01',' the main one in control, mediating between Id and Superego.','Varied distortions in text.','Active']);
      newEntry([`superego`,[`Superego`,`He/Him/They/Them`],`superego.jpg`,[[`@wdarktenma65226`,`https://x.com/wdarktenma65226`]],`WilliamTenebris`,`Module 02',' the 'closest to Him', an opposite to Id.`,`Varied distortions in text.`,`Active`]);
      newEntry(['id',['Id','He/Him/They/Them'],'id.jpg',[['@wdarktenma65226','https://x.com/wdarktenma65226']],'WilliamTenebris','Module 03','somehow the most normal, an opposite to Superego.','Varied distortions in text.','Active']);
      newEntry(['nyx',['Nyx','She/Her'],'nyx.jpg',[['@SukantoRobotics','https://x.com/SukantoRobotics'],['StrawPage','https://scph70012.straw.page/']],'Chip Macro','(🟥) Hello, I’m Nyx. It’s nice to meet you all!,(🟥) Sample text.','Active']);
      newEntry(['xenia',['Xenia','He/Him'],'xenia.jpg',[['@SukantoRobotics','https://x.com/SukantoRobotics'],['StrawPage','https://scph70012.straw.page/']],'Chip Macro','(🟢) - sup yall im xenia, i tend 2 use acronyms & abbreviations for stuff bc proper grammer is 4 nerds lol,(🟢) - sample txt','Active']);
      newEntry(['core',['Core','He/they'],'core.jpg',[['@M4tr1x_V1','https://x.com/M4tr1x_V1'],['StrawPage','https://matriv16.straw.page']],`Glacier','Former security ai of lab, role currently taken over by matrix whom they share all devices with. Originally boisterous and friendly with a penchant for light chaos is currently distrustful and partly explosive,💥< if I had my way, you wouldnt step foot in these labs.','Active`]);
      /* 
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      newEntry();
      */
      table();
      break;
    case "petition":
      document.getElementById("hide").style.display = "none";
      break;
    }
  initializeInputs();
  center();
}
function internal_case(str) {
    temp = str;
    for (i = 0; i < temp.length; i++) {
        if (temp.charAt(i) == " ") {
            temp = temp.replace(temp.charAt(i), "_");
        }
        if (temp.charAt(i) == temp.charAt(i).toUpperCase()) {
            temp = temp.replace(temp.charAt(i), temp.charAt(i).toLowerCase());
        }
    }
    return temp;
}
// the REAL key stored in the script
// basically if we dump it into innerHTML then try to pull it back out,
// it converts symbols like ">" to "&gt;"
// which we don't want
var entry
function generate() {
    const dump = document.getElementById(`dump`);
    let inputs = new Object
    inputs[`name`]                          = document.querySelector(`#name`);
    inputs[`pronouns`]                      = document.querySelector(`#pronouns`);
    inputs[`description`]                   = document.querySelector(`#description`);
    inputs[`links`]                         = [];
      inputs[`links`][`account`]            = document.querySelector(`#account`);
      inputs[`links`][`link2`]              = [];
        inputs[`links`][`link2`][`name`]    = document.querySelector(`#link2_name`);
        inputs[`links`][`link2`][`address`] = document.querySelector(`#link2_address`);
      inputs[`links`][`link3`]              = [];
        inputs[`links`][`link3`][`name`]    = document.querySelector(`#link3_name`);
        inputs[`links`][`link3`][`address`] = document.querySelector(`#link3_address`);
    inputs[`owner`]                         = document.querySelector(`#owner`);
    inputs[`quirk`]                         = document.querySelector(`#quirk`);
    inputs[`status`]                        = document.querySelector(`#status`);


    required_entires = [inputs[`name`], inputs[`links`][`account`]];
    
    for (i = 0; i < required_entires.length; i++) {
      if (exists(required_entires[i].value)) {
        // do nothing
      } else {
        alert("ERROR: " + required_entires[i].name + " is a required field!")
        return false;
      }
    }

    const input_name      = inputs[`name`].value;
    const input_pronouns  = inputs[`pronouns`].value;
    if (inputs[`links`][`account`].value.charAt(0) == `@`) {
      temp_handle = inputs[`links`][`account`].value.replace(`@`, ``);
    } else {
      temp_handle = inputs[`links`][`account`].value;
    }
    var temp_links
    const input_account = [`@` + temp_handle, `https://x.com/` + temp_handle]
    const input_link2   = [inputs[`links`][`link2`][`name`].value, inputs[`links`][`link2`][`address`].value]
    const input_link3   = [inputs[`links`][`link3`][`name`].value, inputs[`links`][`link3`][`address`].value]

    let input_links = []
    temp_links = [input_account, input_link2, input_link3]
    for (array_link of temp_links) {
      var hyperlink = array_link[1]
      if (hyperlink == `` || hyperlink === null || hyperlink === undefined) {
        // link array does not get pushed
      } else {
        var processed_array_link = '[`' + array_link[0] + '`' + ',' + '`' + array_link[1] + '`]'
        input_links.push(processed_array_link)
      }
    }
    var temp_owner
    if (inputs[`owner`].value == "") {
      temp_owner = "(anonymous)";
    } else {
      temp_owner = inputs[`owner`].value;
    }
    const input_owner       = temp_owner;
    const input_description = inputs[`description`].value;
    var temp_quirk
    if (inputs[`quirk`].value == ``) {
      temp_quirk =  ``;
    } else {
      temp_quirk = inputs[`quirk`].value;
    }
    const input_type        = temp_quirk;
    const input_status      = inputs[`status`].value;

    var id
    var name
    var pronouns
    var photo
    var handle
    var links
    var owner
    var description
    var type
    var status

    id          = '`' + internal_case(input_name) + '`'
    name        = '`' + input_name + '`';
    pronouns    = '`' + input_pronouns + '`';
    nameprns    = `[` + String([name, pronouns]) + `]`
    photo       = '`' + internal_case(input_name) + `.jpg` + '`';
    links       = '[' + String(input_links) + ']'
    owner       = '`' + input_owner + '`';
    description = '`' + input_description + '`';
    type        = '`' + input_type + '`';
    status      = '`' + input_status + '`';
  
    entry = [id, [nameprns], photo, [links], owner, description, type, status];
    dump.innerHTML = `[` + entry + `]`;
    document.getElementById(`hide`).style.display = `grid`
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: `smooth`
    });
}
const c_button = "copy_entry_key"
if (exists(document.getElementById(c_button))) {
  document.getElementById(c_button).addEventListener("click", function(event){
    event.preventDefault(); // stop page from reloading when event fires.
    document.querySelector("#dump").select();
    document.execCommand("copy");
    
    cecileQuickChange(c_button, "ENTRY CODE COPIED!", null);
    setTimeout(() => {
      cecileQuickChange(c_button, "COPY TO CLIPBOARD", null)
    }, 2500)
  })
} else {
  // do nothing
}

function cecileQuickChange(id, text, css_rules) {
  // css_rules = [[property, value], ["height", "400px"]]
  const ELEMENT = document.getElementById(id)
  if (exists(text)) {
    ELEMENT.innerHTML = text
  }
  if (exists(css_rules)) {
    var property;
    var value;
    for (rule of css_rules) {
      property = rule[0]
      value = rule[1]
      ELEMENT.style[property] = value;
    }
  }
}

/* ****************************************
  CODE FOR SEARCH FUNCTION
******************************************/

function all_entries(mode) {
  for (entry in registry) {
    row = document.getElementById("entry_" + registry[entry]["id"])
    switch (mode) {
      case "show":
        if (HEADER.style.display != "table-row") {
          HEADER.style.display = "table-row"
        }
        row.style.display = "table-row"
        break;
      case "hide":
        if (HEADER.style.display != "none") {
          HEADER.style.display = "none"
        }
        row.style.display = "none"
        break;
    }
    
  }
}
function search() {
    var query = search_bar.value.toLowerCase();
    var search_parameter = document.querySelector("#search_by").value;
    var dialogue = document.querySelector("#search_dialogue");

    var row
    var parameter
    var entries_found = 0
    all_entries("show")
    for (entry in registry) {
      row = document.getElementById("entry_" + registry[entry]["id"]);
      parameter = registry[entry][search_parameter];
      if (typeof parameter === "object") {
        parameter = parameter[0].toString().toLowerCase()
      } else {
        parameter = parameter.toString().toLowerCase()
      }
      switch (query) {
        case "":
          row.style.display = "table-row"
          if (HEADER.style.display != "table-row") {
            HEADER.style.display = "table-row"
          }
          break;
        default:
          if (parameter.includes(query)) {
            row.style.display = "table-row"
            entries_found += 1
          } else {
            row.style.display = "none"
          }
          break;
      }
      center();
    }
    if (entries_found == 0 && query != "") {
        HEADER.style.display = "none"
        dialogue.innerHTML = "No entries found..."
      } else if (entries_found > 0) {
        dialogue.innerHTML = "Found (" + entries_found + ") entries with a " + search_parameter + " containing: " + '"' + query + '"';
      } else {
        dialogue.innerHTML = ""
      }
}
if (exists(search_bar)) {
  window.addEventListener("keydown", (event) => {
    search_bar.focus()
    if (event.key == "Enter") {
      search()
    }
    if (event.key == "`") {
      return false;
    }
  })
}

if (exists(document.getElementById("search_button"))) {
  document.getElementById("search_button").addEventListener("click", () => {
    search()
  })
} else {
  console.warn("no search bar")
}
if (exists(document.querySelector("#search_by"))) {
  document.querySelector("#search_by").addEventListener("change", () => {
    placeholder_by_category()
  })
  placeholder_by_category()
}
function placeholder_by_category() {
  var category = document.querySelector("#search_by").value;
  var placeholder = document.getElementById("search").placeholder;

  switch (category) {
    case "name":
      document.getElementById("search").placeholder = "Searching by name...";
      break;
    case "links":
      document.getElementById("search").placeholder = "Searching by account handles...";
      break;
    case "owner":
      document.getElementById("search").placeholder = "Searching by admins/owners...";
      break;
    case "typing":
      document.getElementById("search").placeholder = "Searching by typing quirk/brackets...";
      break;
    case "description":
      document.getElementById("search").placeholder = "Searching by description...";
      break;
    default:
      document.getElementById("search").placeholder = "";
      break;
  }
}