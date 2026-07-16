// ***IMPORTANT***: 
// specify root folder as /computerlingsdb/
//
// when adding a new parameter, remember to:
// - list it in FIELDS
// - update TEMPLATE
// - make argument in ADDENTRY()
// - assign it in ADDENTRY()
// - create it's case in the switch statement under TABLE()
// - update all previous entires with data
//
// we will figure out a script that automates this later. - cécilemin

const db        = document.getElementById("db");
const BODY      = document.getElementById("dbBODY");
const HEADER    = document.getElementById("dbHEADER");
const fields    = [
  "name",
  "image",
  "account",
  "owner",
  "typing",
  "status"
  ]; 
  // IMPORTANT: the order of this array = the order each field is arranged in, left-to-right, when the database is intitialized.
const template = {
    "id"      : null,
    "image"   : null,
    "name"    : null,
    "owner"   : null,
    "account" : [null, null],
    "typing"  : null,
    "status"  : null
};

let registry  = new Object();
registry["lemon"] = { // lemon's entry is hardcoded into the dictionary as a fall-back.
    "id"      : "lemon",
    "image"   : "lemon.jpg",
    "name"    : "Lemon",
    "owner"   : "PauIndeed",
    "account" : ["@LEMONSYSEXE", "https://x.com/lemonsysexe"],
    "typing"  : "🟡> example",
    "status"  : "Active"
  };


const msg_link = "(Link to account)";
const standard_image_size = "200px";
const msg_db_INVALID_parameter = "INVALID DATABASE PARAMETER";
const msg_db_INVALID_data = "INVALID DATA";

function addEntry(id, image, name, owner, accountHandle, accountLink, typing, status) {
  /*
  cecilemin note:
  this is a temporary way to add entries to the computerlings database dynamically. it is a clunky way to do it but hopefully we can build off of it for real i/o.
  */
  var entry = Object.create(template);
  entry["id"] = id;
  entry["image"] = image;
  entry["name"] = name;
  entry["owner"] = owner;
  entry["account"] = [accountHandle, accountLink];
  entry["typing"] = typing;
  entry["status"] = status;
  
  registry[id] = entry;
}

function header() {
  var LABEL;
  for (var parameter of fields) {
    LABEL           = document.createElement("td");
    LABEL.innerHTML = parameter.toUpperCase();
    dbHEADER.appendChild(LABEL);
  }
}
function table() {
  header();
  for (var entry in registry) {
    console.log(entry);
    
    var ROW   = document.createElement("tr");
    ROW.id    = entry;
    
    for (var parameter of fields) {
      //console.log(parameter);
      //console.log(registry[entry][parameter]);
      
      var CELL    = document.createElement("td");
      var ELEMENT;
      var data;
      if (registry[entry][parameter] == "" || registry[entry][parameter] === null) {
        data = "N/A";
      } else {
        data = registry[entry][parameter];
      }
      switch (parameter) {
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
}

function initialize() { // we're calling this function the moment the html body loads.
  // addEntry(id, image, name, owner, accountHandle, accountLink, typing)
  addEntry("lime", "lime.jpg", "Lime", "PauIndeed", "@LEMONSYSEXE", "https://x.com/LEMONSYSEXE", "🟢> example", "Active");
  addEntry("neroli", "neroli.jpg", "Neroli", "PauIndeed", "@LEMONSYSEXE", "https://x.com/LEMONSYSEXE", "🐟> example", "Active");
  addEntry("stardust", "stardust.jpg", "Stardust", "PauIndeed", "@LEMONSYSEXE", "https://x.com/LEMONSYSEXE", "⭐️ example", "Active");
  addEntry("lovedeath", "lovedeath.jpg", "Lovedeath", "PauIndeed", "@LEMONSYSEXE", "https://x.com/LEMONSYSEXE", "💜> example", "Active");
  addEntry("flora", "flora.jpg", "Flora", "PauIndeed", "@LEMONSYSEXE", "https://x.com/LEMONSYSEXE", "🌻> example", "Active");
  addEntry("cecile", "cecile.jpg", "Cécile", "Cécilemin", "@jacques_ladder", "https://x.com/jacques_ladder", null, "Retired ARG, but active in community");
  table();
}
