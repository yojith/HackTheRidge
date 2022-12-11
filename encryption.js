// config key for firebase realtime database
const firebaseConfig = {
    apiKey: "AIzaSyCRTt9ge7sM2B8kr4k8eDxIZT9VzV-nLnw",
    authDomain: "irhs-hackathon.firebaseapp.com",
    databaseURL: "https://irhs-hackathon-default-rtdb.firebaseio.com/",
    projectId: "irhs-hackathon",
    storageBucket: "irhs-hackathon.appspot.com",
    messagingSenderId: "743528970902",
    appId: "1:743528970902:web:70bdfecf6f02bed4d3e0b7",
    measurementId: "G-FLZENRH5N9"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var msgContent = getElementVal("msgContent");

    saveMessages(name, emailid, msgContent);

    //  enable alert
    document.querySelector(".alert").style.display = "block";

    //  remove the alert
    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    //  reset the form
    document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, msgContent) => {
    var newContactForm = contactFormDB.push();
    newContactForm.set({
        name: name,
        emailid: emailid,
        msgContent: msgContent,
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};