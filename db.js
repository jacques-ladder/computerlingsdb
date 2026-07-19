// ***IMPORTANT***: 
// specify root folder as /computerlingsdb/
const root      = document.querySelector(":root")

const db        = document.getElementById("db");
const BODY      = document.getElementById("dbBODY");
const HEADER    = document.getElementById("dbHEADER");

const BANNER    = document.querySelector(".navbar");

const petition_form = document.querySelector("#petition_form")

const illegal_keys = [
  ["`", null], // quotes and apostrophes are allowed in all inputs, because we use this key to make their inputs strings.
  ["(", "pronouns"],
  [")", "pronouns"]
]

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
console.log()
function mobile() {
  root.style.setProperty("--font-size-all", "clamp(0.5rem, 1vw, 1rem)");
  root.style.setProperty("--font-size_td", "clamp(0.5rem, 1vw, 1rem)");
  root.style.setProperty("--font-size-link", "clamp(0.5rem, 1vw, 1rem)");
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
  console.log(true_height)
  root.style.setProperty("--search_bar_height", true_height)
  console.log(root.style.getPropertyValue("--search_bar_height"))
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
      console.log()
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
            ELEMENT2.src       = "/computerlingsdb/assets/photos/" + data;
            ELEMENT2.classList.add("photo");
          ELEMENT.appendChild(ELEMENT2);
          break;
        case "name":
          CELL.classList.add("name");
          ELEMENT           = document.createElement("div");
          ELEMENT.classList.add("names");
            ELEMENT2           = document.createElement("label");
            console.log(ELEMENT2)
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
  const prompt = event.target
  for (key of illegal_keys) {
    if (event.key == key[0]) {
      if (key[1] === null || prompt.name == key[1]) {
        var input = prompt.value
        event.preventDefault(); // stops key event before it can write to the input
      }
    }
  }
}
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
      newEntry([`pull_cord`,[`Pull Cord`,`(She/It)`],`pull_cord.jpg`,[[`@pull_cord`,`https://x.com/pull_cord`]],`Cécilemin`,`PULL. CORD. PULL. CORD`,`> saaaaaample,,,, um. text??`,`Active`]);
      
      /*
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
    console.log(input_links)
    const input_owner       = inputs[`owner`].value;
    const input_description = inputs[`description`].value;
    const input_type        = inputs[`quirk`].value;
    const input_status      = inputs[`status`].value;

    console.log(inputs)

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

    required_entires = [input_name, input_account, input_owner, input_status];
    

    for (i = 0; i < required_entires.length; i++) {
      console.log(required_entires[i])
    }

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
    
    cecileQuickChange(c_button, "ENTRY KEY COPIED!", null);
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