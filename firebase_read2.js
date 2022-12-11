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

// Reading the drug info from the database and storing in repective locations
DrugDB.once("value").then(function(snapshot){
  var drug_info=snapshot.val();
  document.getElementById("drugForm").addEventListener("submit",function(e){
    e.preventDefault();
    var drug_pharm = document.getElementById("drug_pharm").value;
    const drug_keys= Object.keys(drug_info);
    for (let i = 0; i < drug_keys.length; i++) {
      drug_dict = drug_keys[i]
      if (drug_info[drug_dict].drug_pharm === drug_pharm) {
        var found_name = drug_info[drug_dict].drug_name
        var found_pharm = drug_info[drug_dict].drug_pharm
        var found_stock = drug_info[drug_dict].drug_stock
        document.getElementById("p_name").innerHTML = found_name
        document.getElementById("p_pharm").innerHTML = found_pharm
        document.getElementById("p_stock").innerHTML = found_stock
      } else {
        console.log("none found");
      }
    }
  });
});
