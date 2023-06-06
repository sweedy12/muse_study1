<script type="module">
import { get_from_database } from "./firebase.js";

async function init() {
  await import("./firebase.js");
  window.get_from_database = get_from_database;
}

init();
<\script>