
 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
  import {getDatabase, ref, set, onValue, get, child} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  

  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);
   var database = getDatabase();
    function get_from_database(problem, cond){
   const dref = ref(database);
   get(child(dref, problem)).then((snapshot)=>{
	alert(snapshot.val().cond1);
   });
