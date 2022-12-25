import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, child, onValue, push, update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
initializeApp(firebaseConfig);

// Defining the database as a variable

const drugDatabase = child(ref(getDatabase()), 'Drug Database');

const path = window.location.pathname;
const page = path.split("/").pop();

// Used to display values
const getElementVal = (id) => document.getElementById(id).value;

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

// Save data from database to local variables
const db_save_drug = (drug_name, drug_pharm, drug_stock) => {
  const drug_entry_key = push(drugDatabase).key;
  console.log(drug_entry_key);
  const drug_entry = {[drug_entry_key] : {
    drug_name : drug_name,
    drug_pharm : drug_pharm,
    drug_stock : drug_stock,
  }};

  update(drugDatabase, drug_entry);
};


function add_rows(table_id, drug_name, drug_pharm, drug_stock){
  const results_table_body = document.getElementById("results_table_body");
  const row = results_table_body.insertRow(-1);
  const name_cell = row.insertCell(0);
  const pharm_cell = row.insertCell(1);
  const stock_cell = row.insertCell(2);

  name_cell.innerHTML = drug_name;
  pharm_cell.innerHTML = drug_pharm;
  stock_cell.innerHTML = drug_stock;
}


function delete_rows(table_body_id){
  document.getElementById("results_table_body").innerHTML = "";
}


function add_drug(){
  const drug_name = getElementVal("drug_name");
  const drug_pharm = getElementVal("drug_pharm");
  const drug_stock = getElementVal("drug_stock");

  db_save_drug(drug_name, drug_pharm, drug_stock);

  document.getElementById("drug_name").value="";
  document.getElementById("drug_pharm").value="";
  document.getElementById("drug_stock").value="";
}


function data_read(search_parameter){
  onValue(DrugDB, (snapshot) => {

    const drug_info = snapshot.val();
    const drug_keys = Object.keys(drug_info);
    const user_input = getElementVal("user_input");

    delete_rows("results_table");

    for (let i = 0; i < drug_keys.length; i++) {
      const drug_obj = drug_keys[i];

      if (drug_info[drug_obj][search_parameter] === user_input) {
        const found_name = drug_info[drug_obj].drug_name;
        const found_pharm = drug_info[drug_obj].drug_pharm;
        const found_stock = drug_info[drug_obj].drug_stock;
        add_rows("results_table", found_name, found_pharm, found_stock);
      }
    }
  }, {
    onlyOnce: true
  });
}
