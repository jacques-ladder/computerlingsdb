// ***IMPORTANT***: 
// specify root folder as /computerlingsdb/
//
//
// when adding a new parameter, remember to:
// - list it in FIELDS
// - update TEMPLATE
// - make argument in newEntry()
// - assign it in newEntry()
// - create it's case in the switch statement under TABLE()
// - update all previous entires with appropriate data for field
// - add it's class in style.css
//
// we will figure out a script that automates this later. - cécilemin

const db        = document.getElementById("db");
const BODY      = document.getElementById("dbBODY");
const HEADER    = document.getElementById("dbHEADER");

const msg_link = "(Link to account)";
const standard_image_size = "200px";
const msg_db_INVALID_parameter = "INVALID DATABASE PARAMETER";
const msg_db_INVALID_data = "INVALID DATA";

const fields    = [
  "name",
  "image",
  "account",
  "owner",
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
  console.log(entry)
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
      row.classList.add("row_alt")
    }
  }
}
function table() {
  header();
  for (var entry in registry) {
    console.log(entry);
    
    var ROW   = document.createElement("tr");
    ROW.id    = entry;
    
    for (var parameter of fields) { // cycle through every valid field
      var CELL    = document.createElement("td");
      var ELEMENT; // the container for the data, like an <img> element for the photo
      var data;    // the info we're pulling from the entry, like the file path to a photo
      if (registry[entry][parameter] == "" || registry[entry][parameter] === null || registry[entry][parameter] === undefined) {
        data = "N/A";
      } else {
        data = registry[entry][parameter];
      }
      switch (parameter) { // identifies what field is being attached so the script can know how it should handle the data
        case "image":
          CELL.classList.add("photo");
          ELEMENT           = document.createElement("img");
          ELEMENT.src       = "/computerlingsdb/assets/photos/" + data;
          ELEMENT.classList.add("photo");
          break;
        case "name":
          CELL.classList.add("name");
          ELEMENT           = document.createElement("p");
          ELEMENT.innerHTML = data;
          break;
        case "owner":
          CELL.classList.add("owner");
          ELEMENT           = document.createElement("p");
          ELEMENT.innerHTML = data;
          break;
        case "account":
          CELL.classList.add("account");
          ELEMENT           = document.createElement("a");
          ELEMENT.href      = data[1];
          ELEMENT.innerHTML = data[0];
          break;
        case "typing":
          CELL.classList.add("typing");
          ELEMENT           = document.createElement("p");
          ELEMENT.innerHTML = data;
          break;
        case "status":
          CELL.classList.add("status");
          ELEMENT           = document.createElement("p");
          ELEMENT.innerHTML = data;
          break;
        default:
          CELL.classList.add("INVALID");
          ELEMENT           = document.createElement("p");
          ELEMENT.innerHTML = msg_db_INVALID_parameter;
          console.error("INVALID PARAMETER [" + parameter + "] IN ROW: " + ROW.id);
          break;
      }
      CELL.appendChild(ELEMENT);
      ROW.appendChild(CELL);
    }
    BODY.appendChild(ROW);
  }
  rows() // after all entries are built, script will handle logic related to all rows
}

function initialize() { // we're calling this function the moment the html body loads.
  // newEntry(id, image, name, owner, accountHandle, accountLink, typing)
  newEntry(["lemon", "Lemon", "lemon.jpg", ["@LEMONSYSEXE", "https://x.com/LEMONSYSEXE"],"PauIndeed", "🟡> example", "Active"]);
  newEntry(["lime", "Lime", "lime.jpg", ["@LEMONSYSEXE", "https://x.com/LEMONSYSEXE"], "PauIndeed", "🟢> example", "Active"]);
  newEntry(["neroli", "Neroli", "neroli.jpg", ["@LEMONSYSEXE", "https://x.com/LEMONSYSEXE"], "PauIndeed", "🐟> example", "Active"]);
  newEntry(["stardust", "Stardust", "stardust.jpg", ["@LEMONSYSEXE", "https://x.com/LEMONSYSEXE"], "PauIndeed", "⭐️ example", "Active"]);
  newEntry(["lovedeath", "Lovedeath", "lovedeath.jpg", ["@LEMONSYSEXE", "https://x.com/LEMONSYSEXE"], "PauIndeed", "💜> example", "Active"]);
  newEntry(["flora", "Flora", "flora.jpg", ["@LEMONSYSEXE", "https://x.com/LEMONSYSEXE"], "PauIndeed", "🌻> example", "Active"]);
  newEntry(["hydrangea", "Hydrangea", "hydrangea.jpg", ["@solstice_labs", "https://x.com/solstice_labs"], "PauIndeed", "", "Active"]);
  //newEntry(["cecile", "cecile.jpg", "Cécile", ["@jacques_ladder", "https://x.com/jacques_ladder"], "Cécilemin",  "", "Retired ARG, but active in community."]);
  table();
}

function initialize_petition() {// intitialize function specific to petition.html
  document.getElementById("hide").style.display = "none";
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
    const dump = document.getElementById("dump");

    const input_name    = document.querySelector("#name").value;
    if (document.querySelector("#account").value.charAt(0) == "@") {
      temp_handle = document.querySelector("#account").value.replace("@", "");
    } else {
      temp_handle = document.querySelector("#account").value;
    }
    const input_account = temp_handle
    const input_owner   = document.querySelector("#owner").value;
    const input_type    = document.querySelector("#quirk").value;
    const input_status  = document.querySelector("#status").value;

    var id
    var name
    var photo
    var handle
    var link
    var owner
    var type
    var status

     // contains info that is in the middle of being processed

    id      = '"' + internal_case(input_name) + '"'
    name    = '"' + input_name + '"';
    photo   = '"' + internal_case(input_name) + ".jpg" + '"';
    handle  = '["@' + input_account + '"';
    link    = '"' + "https://x.com/" + input_account + '"]';
    owner   = '"' + input_owner + '"';
    type    = '"' + input_type + '"';
    status  = '"' + input_status + '"';
  
    entry = "[" + [id, name, photo, [handle, link], owner, type, status] + "]";
    dump.innerHTML = entry;
    document.getElementById("hide").style.display = "grid"
    //console.log(input_name)

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
}
const c_button = "copy_entry_key"
if (document.getElementById(c_button) !== undefined) {
  document.getElementById(c_button).addEventListener("click", function(event){
    event.preventDefault(); // stop page from reloading when event fires.
    console.log(document.getElementById("dump").innerHTML);
    document.querySelector("#dump").select();
    document.execCommand("copy");
    
    cecileQuickChange(c_button, "ENTRY KEY COPIED!", null);
    setTimeout(() => {
      cecileQuickChange(c_button, "COPY TO CLIPBOARD", null)
    }, 2500)
  })
} else {
  console.error("failed to apply eventListener to entry key copy button.")
}

function cecileQuickChange(id, text, css_rules) {
  // css_rules = [[property, value], ["height", "400px"]]
  const ELEMENT = document.getElementById(id)
  if (text !== null) {
    ELEMENT.innerHTML = text
  }
  if (css_rules !== null) {
    var property;
    var value;
    for (rule of css_rules) {
      property = rule[0]
      value = rule[1]
      ELEMENT.style[property] = value;
    }
  }
}