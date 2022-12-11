// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRTt9ge7sM2B8kr4k8eDxIZT9VzV-nLnw",
  authDomain: "irhs-hackathon.firebaseapp.com",
  databaseURL: "https://irhs-hackathon-default-rtdb.firebaseio.com",
  projectId: "irhs-hackathon",
  storageBucket: "irhs-hackathon.appspot.com",
  messagingSenderId: "743528970902",
  appId: "1:743528970902:web:70bdfecf6f02bed4d3e0b7",
  measurementId: "G-FLZENRH5N9"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference database
var DrugDB = firebase.database().ref("Drug Database");

// 
document.getElementById("drugForm").addEventListener("submit", submitForm);

// Submitting search request
function submitForm(e){
    e.preventDefault();
    var drug_name = getElementVal("drug_name");
    var drug_pharm = getElementVal("drug_pharm");
    var drug_stock = getElementVal("drug_stock");

    saveMessages(drug_name, drug_pharm, drug_stock);
    document.getElementById("drugForm").reset()
}

// Save data from database to local variables
const saveMessages = (drug_name, drug_pharm, drug_stock) => {
    var drug_db_set = DrugDB.push();

    drug_db_set.set({
        drug_name : drug_name,
        drug_pharm : drug_pharm,
        drug_stock : drug_stock,
    });

};

// Used to display values
const getElementVal = (id) => {
    return document.getElementById(id).value;
};
