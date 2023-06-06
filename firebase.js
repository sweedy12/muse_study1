<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
  import {getDatabase, ref, set, onValue, get, child} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB9YPwt1mF2m6qG-UXiEGCo_F7iDKaEhO4",
    authDomain: "muse-c41fd.firebaseapp.com",
    databaseURL: "https://muse-c41fd-default-rtdb.firebaseio.com",
    projectId: "muse-c41fd",
    storageBucket: "muse-c41fd.appspot.com",
    messagingSenderId: "313728899350",
    appId: "1:313728899350:web:f309d4b02c049bac4c5837"
  };

  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);
   var database = getDatabase();
   export function get_from_database(problem, cond){
   const dref = ref(database);
   get(child(dref, problem)).then((snapshot)=>{
	alert(snapshot.val().cond1);
   });
   }
   
   
</script>