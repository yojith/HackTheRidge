import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getFirestore, collection, addDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"

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
const firebaseApp = initializeApp(firebaseConfig);

// Defining the database as a variable
const drugDatabase = collection(getFirestore(firebaseApp), "Drug Database");

// Google authorization
const auth = getAuth();
const provider = new GoogleAuthProvider();

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

if (page === "login.html") {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      document.getElementById("login_button").style.display = "none";
      document.getElementById("logout_button").style.display = "block";
      showUserDetails(user);
    } else {
      document.getElementById("login_button").style.display = "block";
      document.getElementById("logout_button").style.display = "none";
    }
  });
  
  document.getElementById("login_button").addEventListener("click", function(){
    login();
  });
  document.getElementById("logout_button").addEventListener("click", function(){
    logout();
  });
}


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


async function db_save_drug(drug_name, drug_pharm, drug_stock){
  await addDoc(drugDatabase, {
    drug_name : drug_name,
    drug_pharm : drug_pharm,
    drug_stock : drug_stock,
  });
}


async function add_drug(){
  const drug_name = getElementVal("drug_name");
  const drug_pharm = getElementVal("drug_pharm");
  const drug_stock = getElementVal("drug_stock");

  await db_save_drug(drug_name, drug_pharm, drug_stock);

  document.getElementById("drug_name").value="";
  document.getElementById("drug_pharm").value="";
  document.getElementById("drug_stock").value="";
}

async function data_read(search_parameter){
  const user_input = getElementVal("user_input");
  const drug_query = query(drugDatabase, where(search_parameter, "==", user_input));
  const drug_docs = await getDocs(drug_query);

  delete_rows("results_table");
  
  drug_docs.forEach((doc) => {
    const doc_data = doc.data()
    const found_name = doc_data.drug_name;
    const found_pharm = doc_data.drug_pharm;
    const found_stock = doc_data.drug_stock;
    add_rows("results_table", found_name, found_pharm, found_stock);
  });
}

function showUserDetails(user){
  document.getElementById("user_details").innerHTML = `
    <img src="${user.photoURL}" style="width:10%">
    <p>Name: ${user.displayName}</p>
    <p>Email: ${user.email}</p>
  `
}

async function login(){
  console.log("login");

  await signInWithPopup(auth, provider).then((result) => {
    showUserDetails(result.user);
    document.getElementById("login_button").style.display = "none";
    document.getElementById("logout_button").style.display = "block";
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorCode, errorMessage, email, credential);
  });
}

async function logout(){
  console.log("logout");

  await signOut(auth).then(() => {
    document.getElementById("user_details").innerHTML = `
      <p>Logout Successful</p>
    `
    document.getElementById("login_button").style.display = "block";
    document.getElementById("logout_button").style.display = "none";
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorCode, errorMessage, email, credential);
  });
}

