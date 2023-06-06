<script language="Javascript" type = "module">

document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;

alert(get_from_database("problem1","1"));
var condition_num_to_type = {'cond_1': 'purp_only.html', 'cond_2': 'purp_mech.html', 'cond_3': 'purp_mech_gpt.html'}
var new_to_old_cond_mapping = {'graph_1': 'cond_1', 'graph_2': 'cond_2', 'graph_3': 'cond_3', 'graph_4': 'cond_4'}

var stepsNames= ['pre','instructions','random'];
var problems_mapping = {'problem_1': 'Dry wet floor', 'problem_2': 'Remind taking medicine',
	'problem_3': 'Folding laundry', 'problem_4': 'Protect plants'}

var possible_problems = ['problem_1', 'problem_3'] // TODO here we need to add the problem that we want in the first part of the experiment
var possible_versions = ['v_1','v_2','v_3','v_4']

var versions_mapping = {'v_1': ['graph_1'],
						'v_2': ['graph_2'],
						'v_3': ['graph_3'],
						'v_4': ['graph_4']}
						

var chosen_problem;
var phaseName;
var chosen_version;
var chosen_condition;
var chosen_order;
var step=0;   // steps throughout a phase
var phase=1; // three phases, corresponding to conditions
var section = 0;
var mtimer;

const numOfSecondsSelfPart = 80; // 120
const numOfSecondsInspirationPart = 30; //480 todo - change this to see

var totalSecondsSelfAnswer = 80; // 120
var totalSecondsWithInspiration = 30; //480 todo - change this to see effect on times, table snapshot
// var curr_graph_url_problem;

	function showInspirationBlankLinesAccordingToPhase(cond){
		document.getElementById("self_solutions_section1").style.display ="none";
		document.getElementById("inspiration_solutions_section1").style.display ="none";
		document.getElementById("inspiration_box_section_1").style.display ="none";
		if (cond==="cond_4"){
			showEmptyConditionBlankLines()
		}
		else {
			let section_number = section+1
			logCurrentTime("section " + section_number.toString() + " part 2 - answers")
			document.getElementById("inspiration_solutions_section" + section_number.toString()).style.display ="block";
			document.getElementById("inspiration_box_section_" + section_number.toString()).style.display ="block";
		}
	}

	function showEmptyConditionBlankLines(){
		    document.getElementById("self_solutions_section1").style.display ="block";
			let section_number = section+1
			logCurrentTime("section " + section_number.toString() + " part 2 - answers")
	}

		function moveToInspirationSection(){
		// go to the top of the page
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;

		// show the inspirations section
		document.getElementById("inspiration_based_solutions_instructions").style.display ="block"

		// hide all non relevant sections
		document.getElementById("cond_2").style.display ="none"
		document.getElementById("cond_3").style.display ="none"
		document.getElementById("cond_1").style.display ="none"
		document.getElementById("cond_4").style.display ="none"

		// show the correct section
		document.getElementById(chosen_condition).style.display ="block"
		console.log(chosen_condition)
		if (chosen_condition === "cond_3") {
			logCurrentTime("section " + (section+1).toString() + " part 2 - cond_3 setting")
			console.log("cond_3_" + section.toString())
			let cond_element = document.getElementById("cond_3_" + (section+1).toString())
			cond_element.style.display = "block"
			cond_element.lastChild.attributes.src.value = "./graph_files/" + chosen_problem + "/" + condition_num_to_type["cond_3"]
			document.getElementById("inspiration_box_" + (section+1).toString() + "_text_line").style.display = "block"
		}
		if (chosen_condition === "cond_2"){
			logCurrentTime("section " + (section+1).toString() + " part 2 - cond_2 setting")
			console.log("cond_2_" + (section+1).toString())
			let cond_element = document.getElementById("cond_2_" + (section+1).toString())
			cond_element.style.display = "block"
			cond_element.lastChild.attributes.src.value = "./graph_files/" + chosen_problem + "/" + condition_num_to_type["cond_2"]
			document.getElementById("inspiration_box_" + (section+1).toString() + "_links_line").style.display = "block"
		}
		if (chosen_condition === "cond_1"){
			logCurrentTime("section " + (section+1).toString() + " part 2 - cond_1 setting")
			document.getElementById("inspiration_box_" + (section+1).toString() + "_graph_line").style.display = "block"
			let cond_element = document.getElementById("cond_1_" + (section+1).toString())
			cond_element.style.display = "block"
			cond_element.lastChild.attributes.src.value = "./graph_files/" + chosen_problem + "/" + condition_num_to_type["cond_1"]
		}
		if (chosen_condition === "cond_4"){
			logCurrentTime("section " + (section+1).toString() + " part 2 - cond_4 setting")
		}
	}


window.onload = function() {document.getElementById('submitButton'); }

	function logCurrentTime(section_name){
			let today = new Date();
			let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			let dateTime = date + ' ' + time;
			writeToLogger("Entering " + section_name + " time: " + dateTime)
	}
	
		function logCurrentTableTime(time_in_seconds){
			//let today = new Date();
			//let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			//let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			//let dateTime = date + ' ' + time;
			//getting the information from the table entries
			let str = "";
			for (let i=0; i < 10; i++){ //going over all 10 table rows
				let str_idx = (i+1).toString()
				str += "entry number " + str_idx;
				if (chosen_condition == "cond_4")
				{
					str += ": solution" + str_idx + ": " + document.getElementById('self_solution_1_'+str_idx).value
				str += ": explanation" + str_idx + ": " + document.getElementById('self_inspiration_explain_1_'+str_idx).value
				str += "\n"
				}
				else{
				str += ": solution" + str_idx + ": " + document.getElementById('inspiration_solution_1_'+str_idx).value
				str += ": explanation" + str_idx + ": " + document.getElementById('inspiration_explain_1_'+str_idx).value
				str += ": source" + str_idx + ": " + document.getElementById('inspiration_source_1_'+str_idx).value
				str += "\n"
				
				}
			
			}
			//add the "more" section
			
			if (chosen_condition == "cond_4"){
			str += "more entry: "
			str += "solution more: " + document.getElementById('more_self_solutions_1').value
				str += "explanation more: " + document.getElementById('more_self_inspiration_explain_1').value

				str += "\n"
			}
			else {
			str += "solution more: " + document.getElementById('more_inspiration_solutions_1').value
				str += "explanation more: " + document.getElementById('more_inspiration_explain_1').value
				str += "inspiration more: " + document.getElementById('more_inspiration_source_1').value
				str += "\n"
				
			}
			writeToTableLogger("table state after " + time_in_seconds + " seconds: " + str + "---$$$---");

			

	}



	function endOfSurveyubmit(){
	//alert("called the function");
	var all_fine = 0;
	if (chosen_condition != "cond_4")
	{
		if (!(document.getElementById('helpful_no').checked || document.getElementById('helpful_yes').checked)) {
			//alert("helpfulq");
			all_fine = 1;
		}
		if (!(document.getElementById('useagain_no').checked || document.getElementById('useagain_yes').checked)) {
			//alert("useagainq");
			all_fine = 1;
		}
		let a = document.getElementById('hardq_veryeasy').checked;
		let b = document.getElementById('hardq_fairlyeasy').checked;
		let c = document.getElementById('hardq_moderate').checked;
		let d = document.getElementById('hardq_fairlyhard').checked;
		let e = document.getElementById('hardq_veryhard').checked;
		
		if (!(a||b||c||d||e))
		{
			//alert("hardq");
			all_fine = 1;
		}
		a = document.getElementById('timeq_lotless').checked;
		b = document.getElementById('timeq_lotmore').checked;
		c = document.getElementById('timeq_perfect').checked;
		d = document.getElementById('timeq_bitless').checked;
		e = document.getElementById('timeq_bitmore').checked;
		
		if (!(a||b||c||d||e))
		{	//alert("timeq");
			all_fine = 1;
		}
		
		a = document.getElementById('famil_veryfamiliar').checked;
		b = document.getElementById('famil_notatallfamil').checked;
		c = document.getElementById('famil_neutral').checked;
		d = document.getElementById('famil_notsofamil').checked;
		e = document.getElementById('famil_somewhatfamil').checked;
		if (!(a||b||c||d||e))
		{
			//alert ("familq");
			all_fine = 1;
		}
	}
	else{
		let a = document.getElementById('famil_veryfamiliar_c4').checked;
		let b = document.getElementById('famil_notatallfamil_c4').checked;
		let c = document.getElementById('famil_neutral_c4').checked;
		let d = document.getElementById('famil_notsofamil_c4').checked;
		let e = document.getElementById('famil_somewhatfamil_c4').checked;
		if (!(a||b||c||d||e))
		{
			//alert("condition 4,fmail");
			all_fine = 1;
		}
		a = document.getElementById('veryeasy_c4').checked;
		b = document.getElementById('fairlyeasy_c4').checked;
		c = document.getElementById('moderate_c4').checked;
		d = document.getElementById('fairlyhard_c4').checked;
		e = document.getElementById('veryhard_c4').checked;
		
		if (!(a||b||c||d||e))
		{
			//alert("condition 4,hardq");
			all_fine = 1;
		}
		a = document.getElementById('lotless_c4').checked;
		b = document.getElementById('lotmore_c4').checked;
		c = document.getElementById('perfect_c4').checked;
		d = document.getElementById('bitless_c4').checked;
		e = document.getElementById('bitmore_c4').checked;
		
		if (!(a||b||c||d||e))
		{	
			//alert("condition 4,timeq");
			all_fine = 1;
		}
	
		
	
	}
	
	
	
	
	if (all_fine == 0){
		//try to put the comment submittance here, or try to recreate it
	
		document.getElementById("endOfTaskForm").submit();	
	}
	else
	{
		alert ("Please complete all survey questions to submit the task");

	}
	}
	

	function writeToLogger(log){
		document.getElementById('logger').value += log + '\n'
	}
	function writeToTableLogger(log){
		//alert(log);
		document.getElementById('table_logger').value += log + '\n'
	}
	
	//first page - moving from registration to instructions page 1/3
	function clickOnFirstInstructionButton(){
			logCurrentTime("first instructions section")
			if (document.getElementById("prolific_id").value === ""){
				alert("In order to continue, you should insert a Prolific user id number.")
				return
			}
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		    phaseName= stepsNames[step+1]
		    document.getElementById("registration_section").style.display ="none";
			showSection("pre");
			step += 1
	}
	function ClickOnFirstReturnButton(){
	//chosen_condition = "cond_3"; //change condition here
	//get condition value from document:
	//if (document.getElementById("condition_chooser").value != ""){
		//chosen_condition = "cond_"+document.getElementById("condition_chooser").value;
	//}
	
			logCurrentTime("second instructions section")
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		    phaseName= stepsNames[step-1]
		    document.getElementById("pre").style.display ="block";
			document.getElementById("instructions").style.display ="none";
			if (chosen_condition === 'cond_1') {
				document.getElementById("instructions_cond1").style.display ="none";}
			if (chosen_condition === 'cond_2'){
				document.getElementById("instructions_cond2").style.display ="none";}
			if (chosen_condition === 'cond_3'){
				document.getElementById("instructions_cond3").style.display ="none";;
				document.getElementById("instructions_cond123").style.display ="none"}
			if (chosen_condition === 'cond_4'){
			document.getElementById("instructions_cond_123").style.display ="none"
			document.getElementById("instructions_next_cond_123").style.display ="none"
			document.getElementById("instructions_next_cond_4").style.display ="none"
			document.getElementById("example_solutions_inspirations_cond123").style.display ="none"
			
				showSection("example_solutions_inspirations_cond4");
				}
			step -= 1
	}
	
	//second page - moving to instructions page 2
	function clickOnInitialNextButton(){
	//chosen_condition = "cond_3"; //change condition here
	//get condition value from document:
	//if (document.getElementById("condition_chooser").value != ""){
		//chosen_condition = "cond_"+document.getElementById("condition_chooser").value;
	//}
	
			logCurrentTime("second instructions section")
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		    phaseName= stepsNames[step+1]
		    document.getElementById("pre").style.display ="none";
			showSection("instructions");
			if (chosen_condition === 'cond_1') {
				showSection("instructions_cond1");}
			if (chosen_condition === 'cond_2'){
				showSection("instructions_cond2");}
			if (chosen_condition === 'cond_3'){
				showSection("instructions_cond3");
				//document.getElementById("instructions_cond123").style.display ="none"}
				}
			if (chosen_condition === 'cond_4'){
			document.getElementById("instructions_cond_123").style.display ="none"
			document.getElementById("instructions_next_cond_123").style.display ="none"
			document.getElementById("instructions_next_cond_4").style.display ="block"
			document.getElementById("example_solutions_inspirations_cond123").style.display ="none"
			
				showSection("example_solutions_inspirations_cond4");
				}
			step += 1
	}
	
		function ClickOnSecondReturnButton(){
			document.getElementById("instructions2").style.display ="none";
			step -= 2
			clickOnInitialNextButton()
			
			
	}
	
	//third page - instructions page 2 to next page
	function clickOnInitialNext2Button(){
			logCurrentTime("third instructions section")
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		    phaseName= stepsNames[step+1]
			document.getElementById("instructions").style.display ="none";
			if (chosen_condition === 'cond_1') {
				document.getElementById("instructions_cond1").style.display ="none";
				}
			if (chosen_condition === 'cond_2'){
				document.getElementById("instructions_cond2").style.display ="none";
				}
			if (chosen_condition === 'cond_3'){
				document.getElementById("instructions_cond3").style.display ="none";
				}
			if (chosen_condition === 'cond_4'){
				document.getElementById("instructions_cond4").style.display ="none";
				}
			showSection("instructions2");
			
			step += 1
	}
	
	//moving from instructions page 3 to main 
	function goToMainSection(){
			logCurrentTime("condition section");
		    document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		    phaseName= stepsNames[step+1]
		    document.getElementById("instructions2").style.display ="none";

			document.getElementById("banner").innerHTML = "Find solutions using an inspiration source"
			if (chosen_condition === 'cond_4'){
				document.getElementById("banner").innerHTML = "Find solutions yourself"
			}
			showSection("main");
			moveToInspirationSection()
			step += 1
	}

	function showInspirationSection(cond){
			document.getElementById('scroll_inspiration_solutions').scrollTop = 0;
			showSection("inspiration_based_solutions_blank_lines")
			document.getElementById("task_chosen_problem").innerHTML = chosen_problem;
			showInspirationBlankLinesAccordingToPhase(cond)
			document.getElementById("button3" + new_to_old_cond_mapping[chosen_order[section]]).style.display ="none";
			mtimer = setInterval(myTimerInspirationAnswer, 1000)
			document.getElementById('scroll_inspiration_solutions').scrollTop = 0;
	}

    function showSection(nameToShow)
   {
		// show seed div
        document.getElementById(nameToShow).style.display ="block";

   }

</script>

<script>

function submitTask(){

	logCurrentTime("submit task section");

	// turn off last elements
	document.getElementById("inspiration_based_solutions_instructions").style.display ="none";
	document.getElementById("inspiration_based_solutions_blank_lines").style.display ="none"; // blank lines
	// document.getElementById("self_solutions_instructions").style.display ="none";
	// document.getElementById("self_solutions_blank_lines").style.display ="none";
	document.getElementById("question_instruction").style.display ="none";
	document.getElementById("main_table").style.display ="none";
	// document.getElementById("partNumber").style.display ="none";

	// show submit elements
	document.getElementById("banner").innerHTML = "Short survey"
	
	if (chosen_condition == "cond_4"){
		document.getElementById("submit_cond4").style.display ="block";
	}
	else {
		document.getElementById("submit_cond123").style.display ="block";
	
	}
	
	//alert(document.getElementById("table_logger").value);

}



function myTimerInspirationAnswer() {
	//todo - change here to go down every minute, rather then seconds
	const minutesLeft  = Math.floor(totalSecondsWithInspiration / 60);
	if (minutesLeft  > 0)
	{
    document.getElementById("timer_inspiration").innerHTML = '<span style = "font-size:30px"> &#8987; You have <font color="red">' + minutesLeft + ' </font> minutes left &#8987; </span>';
		
	}
	else
	{
		document.getElementById("timer_inspiration").innerHTML = '<span style = "font-size:30px"> &#8987; You have <font color="red"> less than a minute left </font> &#8987; </font>';

		}
	totalSecondsWithInspiration--;

	if (totalSecondsWithInspiration<0)
	{
		clearInterval(mtimer);
		document.getElementById("demo").innerHTML = 'Time\'s  up!';
		submitTask()
	}
	else if (totalSecondsWithInspiration<300){
		// document.getElementById("buttonNextAfterMinTimeInsp").style.display ="block";
	}
	if (totalSecondsWithInspiration % 30 == 0){
	logCurrentTableTime(totalSecondsWithInspiration);
	}
}
</script>