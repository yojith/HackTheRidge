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

var path = window.location.pathname;
var page = path.split("/").pop();


// Reading the drug info from the database and storing in repective locations
if (page === "add_info.html") {
  document.getElementById("submit_button").addEventListener("click", function(){
    add_drug();
  });
}

// Reading the drug info from the database and storing in repective locations
else if (page === "pharm_search.html") {
  document.getElementById("submit_button").addEventListener("click", function(){
    data_read("drug_pharm");
  });
}

else if (page === "drug_search.html") {
  document.getElementById("submit_button").addEventListener("click", function(){
    data_read("drug_name");
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


function add_drug(){
  var drug_name = getElementVal("drug_name");
  var drug_pharm = getElementVal("drug_pharm");
  var drug_stock = getElementVal("drug_stock");

  db_save_drug(drug_name, drug_pharm, drug_stock);

  document.getElementById("drug_name").value="";
  document.getElementById("drug_pharm").value="";
  document.getElementById("drug_stock").value="";
}


function data_read(search_parameter){
  console.log(search_parameter)
  DrugDB.once("value").then(function(snapshot){

    var drug_info=snapshot.val();
    const drug_keys= Object.keys(drug_info);
    var user_input = getElementVal("user_input");

    delete_rows("results_table");

    for (let i = 0; i < drug_keys.length; i++) {
      drug_obj = drug_keys[i];

      if (drug_info[drug_obj][search_parameter] === user_input) {

        var found_name = drug_info[drug_obj].drug_name;
        var found_pharm = drug_info[drug_obj].drug_pharm;
        var found_stock = drug_info[drug_obj].drug_stock;
        add_rows("results_table", found_name, found_pharm, found_stock)

      }

    }
  });
}
