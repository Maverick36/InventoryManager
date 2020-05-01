import initHomeJS from './home.js';
import initAddJS from './add.js';
import initAddCustomerJS from './customer.js';
const loginBtn = document.getElementById('loginBtn');
const username = document.getElementById('username');
const pass = document.getElementById('password');
const fluidForm = document.getElementById('fluidForm');
let displayingHTML;

export default function request(method,url){
var xhr = new XMLHttpRequest();
xhr.open(method, url,true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send();
return xhr;
}

export function getDisplayingHTML(){
	return displayingHTML;
}



function getPage(wantedHTML){
	fluidForm.innerHTML = window.sessionStorage.getItem(wantedHTML);
    let page = document.getElementsByTagName('h3')[0].getAttribute('id');
    console.log("page value: "+page)
    switch(page){
    	case 'homePage': initHomeJS();
    	break;
    	case 'addPage': initAddJS();
    	break;
    	case 'addCustomerPage': initAddCustomerJS();
    	break;
    	default: console.log("FAILED!!!");

    }
}


//Checks if browser refresh button is clicked and reinitializes current page.
if (performance.navigation.type == 1) {
    
    getPage('displayingHTML');
  }

window.addEventListener('popstate', function(e) {
		alert("DO NOT PRESS BROWSER BACK/FORWARD BUTTON!!");
	});



loginBtn.addEventListener('click',(event) =>{
	
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
	  if(xhr.readyState === 4) {
	    console.log("We connected!!");
	    let data = JSON.parse(xhr.response);
	    console.log(data);
	    if(data.username.toLowerCase() == username.value && data.pass == pass.value){
	    	console.log("login was successful!");
	    	 let xhrRequest = request('GET','/api/home');
	    	 xhrRequest.onreadystatechange = function(){
		    	 if(xhrRequest.readyState === 4 & xhrRequest.status === 200){
		    	 	
		    	 	history.pushState('/api/home', null, null);
		    	 	fluidForm.innerHTML = xhrRequest.response;
		    	 	window.sessionStorage.setItem('displayingHTML',xhrRequest.response);
		    	 	
		    	 	initHomeJS();
		    	 }
	    	}

	    }else{
	    	console.log('Data doesnt match!!');
	    	console.log('DB-->'+data.username.toLowerCase());
	    	console.log('USER-->'+username.value);
	    	console.log('DB-->'+data.username.password);
	    	console.log('USER-->'+pass.value);
    }
  }
};
xhr.open('GET', '/api'+'?username='+username.value);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send();

});
