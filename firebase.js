// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCRTt9ge7sM2B8kr4k8eDxIZT9VzV-nLnw",
  authDomain: "irhs-hackathon.firebaseapp.com",
  databaseURL: "https://irhs-hackathon-default-rtdb.firebaseio.com",
  projectId: "irhs-hackathon",
  storageBucket: "irhs-hackathon.appspot.com",
  messagingSenderId: "743528970902",
  appId: "1:743528970902:web:70bdfecf6f02bed4d3e0b7",
  measurementId: "G-FLZENRH5N9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Defining the database as a variable
var DrugDB = firebase.database().ref().child('Drug Database');
var drug_info;

var path = window.location.pathname;
var page = path.split("/").pop();

if (page === "add_info.html") {
  document.getElementById("drug_add_form").addEventListener("submit", add_drug);
}

// Reading the drug info from the database and storing in repective locations
else if (page === "pharm_search.html") {
  DrugDB.once("value").then(function(snapshot){
    drug_info=snapshot.val();
    document.getElementById("pharm_name_search_form").addEventListener("submit", pharm_name_read);
  });
}

else if (page === "drug_search.html") {
  DrugDB.once("value").then(function(snapshot){
    drug_info=snapshot.val();
    document.getElementById("drug_name_search_form").addEventListener("submit", drug_name_read);
  });
}


// Used to display values
const getElementVal = (id) => {
  return document.getElementById(id).value;
};


// Save data from database to local variables
const db_save_drug = (drug_name, drug_pharm, drug_stock) => {
  var drug_db_set = DrugDB.push();
  drug_db_set.set({
      drug_name : drug_name,
      drug_pharm : drug_pharm,
      drug_stock : drug_stock,
  });
};


function add_rows(table_id, drug_name, drug_pharm, drug_stock){
  var results_table_body = document.getElementById("results_table_body");
  var row = results_table_body.insertRow(-1);
  var name_cell = row.insertCell(0);
  var pharm_cell = row.insertCell(1);
  var stock_cell = row.insertCell(2);

  name_cell.innerHTML = drug_name;
  pharm_cell.innerHTML = drug_pharm;
  stock_cell.innerHTML = drug_stock;
}


function delete_rows(table_body_id){
  document.getElementById("results_table_body").innerHTML = "";
}


function add_drug(e){
  e.preventDefault();
  var drug_name = getElementVal("drug_name");
  var drug_pharm = getElementVal("drug_pharm");
  var drug_stock = getElementVal("drug_stock");

  db_save_drug(drug_name, drug_pharm, drug_stock);
  document.getElementById("drug_add_form").reset();
}

function pharm_name_read(e){
  e.preventDefault();
  var drug_pharm = document.getElementById("drug_pharm").value;
  const drug_keys= Object.keys(drug_info);
  delete_rows("results_table")

  for (let i = 0; i < drug_keys.length; i++) {
    drug_dict = drug_keys[i];
    if (drug_info[drug_dict].drug_pharm === drug_pharm) {

      var found_name = drug_info[drug_dict].drug_name;
      var found_pharm = drug_info[drug_dict].drug_pharm;
      var found_stock = drug_info[drug_dict].drug_stock;
      add_rows("results_table", found_name, found_pharm, found_stock)

    } else {
      console.log("None found");
    }
  }
}

function drug_name_read(e){
  e.preventDefault();
  var drug_name = document.getElementById("drug_name").value;
  const drug_keys= Object.keys(drug_info);
  delete_rows("results_table")

  for (let i = 0; i < drug_keys.length; i++) {
    drug_dict = drug_keys[i];
    if (drug_info[drug_dict].drug_name === drug_name) {

      var found_name = drug_info[drug_dict].drug_name;
      var found_pharm = drug_info[drug_dict].drug_pharm;
      var found_stock = drug_info[drug_dict].drug_stock;
      add_rows("results_table", found_name, found_pharm, found_stock)

    } else {
      console.log("None found");
    }
  }
}
