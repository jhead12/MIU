$('#newUser').on('pageinit', function(){
	//code needed for home page goes here	var myForm = $('#newId');
		    myForm.validate();		   
});	
		
$('#additem').on('pageinit', function(){

		var myForm = $('#formId');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here		function makeList(){		var formTag = document.getElementsByTagName('form'),			selectLi = $("#select");			makeSelect = document.createElement('select'),			makeSelect.setAttribute("id", "group");		for (var i = 0, j=contactGroups.length; i < j; i++) {
			var makeOption = document.createElement('option');			var optText = contactGroups[i];			makeOption.setAttribute('value', optText);			makeOption.innerHTML = optText;			makeSelect.appendChild(makeOption);
}			selectLi.appendChild(makeSelect);	}	//Find a value of selected radio button.	function getSelectedRadio(){		var radios = document.forms[0].sex;		for (var i = 0; i < radios.length; i++) {					if(radios[i].checked){				sexValue =	radios[i].value;							}
		}	}		function toggleControls(n){		switch(n){			case "on":				//ge('contactForm').style.display = "none";				$('#clear').style.display = "inline";				$("#displayLink").style.display= "none";				$('#addNew').style.display="inline";				//ge('full-1').style.display = "none";				$('#empty-1').style.display = "none";								break;			case "off":				//ge('contactForm').style.display = "block";				$('#clear').style.display = "inline";				$("#displayLink").style.display= "inline";				$('#addNew').style.display="none";				$('#data').style.display= "none";				$('#empty-1').style.display = "inline";								break;			default:				return false;		}			}		function storeData(key){	if(!key){		var id = Math.floor(Math.random()*10001);		}else{			id= key;		}				//Gather up all our form field values and store in an object.		//object properties contain array with the form label and input		getSelectedRadio();				var item 				= {};			item.fname			= ["First Name:", $('#fname').value];			item.lname			= ["Last Name:", $('#lname').value];			item.sex			= ["sex:", sexValue];			item.email			= ["Email:", $('#email').value];			item.group			= ["Group:", $('#group').value];			item.iq				= ["Iq:", $('#iq').value];			item.date			= ["Date:",$('#date').value];			item.statement		= ["TextEntry:", $('#statement').value];		//Save data into Local Storage: Use Stringify to convert our object to a string.		localStorage.setItem(id, JSON.stringify(item));		alert("You Wish has been Sent!");							}		function getData(){		toggleControls("on");		if(localStorage.length === 0){			alert("There is no data in Local Storage so using default");			autoFillData();		}				//Write Data from Local Storage to the browser		var dataTap = $('#data');				//var makeDiv = document.createElement('div');			//makeDiv.setAttribute("id", "items");		var makeList = $('#dt-ca');		dataTap.appendChild(makeList);		document.body.appendChild(dataTap);		$('#data').style.display= "display";		for (var i = 0, len = localStorage.length; i <len; i++)		 {			var makeli = document.createElement('li');			var linksLi = document.createElement('li')			makeList.appendChild(makeli);			var key = localStorage.key(i);			var value = localStorage.getItem(key);			//Convert the string from local storage value back to an object using JSON			var obj = JSON.parse(value);			var makeSubList = document.createElement('ul');				makeSubList.setAttribute('id','test');				makeSubList.setAttribute('data-theme', 'g');				makeSubList.setAttribute("data-role", "listview");					makeli.appendChild(makeSubList);			getImage(obj.group[1], makeSubList);			for( var n in obj){				var makeSubli = document.createElement('li');				makeSubList.appendChild(makeSubli);				var optSubText = obj[n][0]+" "+obj[n][1];				makeSubli.innerHTML = optSubText;				makeSubList.appendChild(linksLi);						}								makeItemLinks(localStorage.key(i), linksLi); //create our edit and Delete buttons for each item in local storage		}		}			//Get images	function getImage(imgName, makeSubList){		var imageLi = document.createElement('li');		makeSubList.appendChild(imageLi);		var newImage = document.createElement('img');		var setSrc = newImage.setAttribute("src", "images/"+ imgName +".png");		imageLi.appendChild(newImage);				}		//AutoFill	var autoFillData = function (){		//The Json object Data is coming from the json.js to from the html		//Then it is put the data in Local Data		for(var n in json){			var id = Math.floor(Math.random()*10001);			localStorage.setItem(id, JSON.stringify(json[n]));		}	}	//Search Function	//function search(){		//Search						var makeItemLinks =	function (key, linksLi){	var editLink = document.createElement('a');		editLink.href = '#';		editLink.key = key;				editText = "Edit Wisher";		editLink.addEventListener('click', editItem);		editLink.innerHTML = editText;		linksLi.appendChild(editLink);				//Line Break				var breakTag = document.createElement('br');		linksLi.appendChild(breakTag);				//add Delete Linke	var deleteLink = document.createElement('a');		deleteLink.href = "#";		deleteLink.key = key;		deleteText = "Delete Wisher";		deleteLink.addEventListener("click", deleteItem);		deleteLink.innerHTML = deleteText;		linksLi.appendChild(deleteLink);	}		var editItem = function (){		//Grab the data from our item from Local Storage		var value = localStorage.getItem(this.key);		var item = JSON.parse(value);				toggleControls("off");		//console.log("This is the Console Log " + value);		//Populate the form field with current local storage values		ge("fname").value = item.fname[1];		ge('lname').value = item.lname[1];			ge('email').value = item.email[1];		ge('group').value = item.group[1];					var radios = document.forms[0].sex;		for(var i = 0; i < radios.length; i++){					if (radios[i].value == "Male" && item.sex[1] == "Male"){				radios[i].setAttribute("checked", "checked");							}else if(radios[i].value == "Female" && item.sex[1] == "Female"){				radios[i].setAttribute("checked", "checked");							}		}		$('#iq').value = item.iq[1];		$('#date').value = item.date[1];		$('#statement').value = item.statement[1];								//Remove the initial listener from the input "save wisher" button		save.removeEventListener("click", storeData);		//Change Submit button Value to Edit button		$('#submit').value = "Edit Wisher";		var editSubmit = $('#submit');		editSubmit.addEventListener("click", validate);		editSubmit.key= this.key;		//Save the key value established in this function is the property event, that could be used when savin the data.				}		var deleteItem = function (){		var ask = confirm("are you sure you want to delete this Wisher");		if(ask){			localStorage.removeItem(this.key);			window.location.reload();		}else{			alert('Wisher was NOT deleted.')		}		}	var clearLocal = function (){		if (localStorage.length === 0) {			alert("Theres is no data to clear");				}		
else{		localStorage.clear();		alert("All Wishes are Deleted!");		window.location.reload();		return false;	}}	var validate = function (e){	//Define the elements to be checked	var getFname = $('#fname');	var getLname = $('#lname');	var getEmail = $('#email');	var getGroup = $('#group');		errMsg.innerHTML = "";	getGroup.style.border = "1px solid black";	getFname.style.border = "1px solid black";	getLname.style.border = "1px solid black";	getEmail.style.border = "1px solid black";		//	get Error messages	var messageAry = [];		//First Name Validation	if(getFname.value === ""){		var fnameError = "Please enter a First name.";		getFname.style.border = "1px solid red";		messageAry.push(fnameError);			}			//last Name Validation	if(getLname.value === ""){		var lnameError = "Please enter a Last name.";		getFname.style.border = "1px solid red";		messageAry.push(lnameError);	}		//Email Validation	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;	if(!(re.exec(getEmail.value))){		var emailError = "Please enter a valid email address";		getEmail.style.border = "1px solid red";		messageAry.push(emailError);		}	//Group Validation	if(getGroup.value === "--Choose A Group--"){		var groupError = "Please choose a group.";		getGroup.style.border = "1px solid red";		messageAry.push(groupError);			}		console.log(getGroup.value);	//if there are message put them on the screen	if(messageAry.length >= 1){		for (var i = 0, j= messageAry.length; i < j; i++)	{
		var txt = document.createElement('li');		txt.innerHTML = messageAry[i];		errMsg.appendChild(txt);
		}		e.preventDefault();		return false;	}else{		storeData(this.key);	}}	//Variable defailts	var contactGroups = ["--Choose A Group--" , "Education", "MusicGear", "Electronics"],		sexValue;		makeList();		errMsg = $('#errors');		//	//Set link & Submit var displayLink = $('#displayLink');	displayLink.addEventListener("click", getData);var clearLink = $('#clear');	clearLink.addEventListener("click", clearLocal);var save = $('#submit');	save.addEventListener("click", validate);
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};


