import request from './app.js'
import initAddCustomerJS from './customer.js'

export default function initAddJS(){

const addCustomerBtn = document.getElementById('addCustomerBtn');
const addInvoiceBtn = document.getElementById('addInvoiceBtn');
const addEmployeeBtn = document.getElementById('addEmployeeBtn');

/*if (performance.navigation.type == 1) {
    console.info( "This page is reloaded" );
    document.getElementById('fluidForm').innerHTML = window.sessionStorage.getItem('displayingHTML');
  }*/
addCustomerBtn.addEventListener('click', () =>{
	//console.log("SEARCH BTN WORKS!!!");
	let xhr = request('GET','/api/customer');
	xhr.onreadystatechange = function(){
	    	 if(xhr.readyState === 4 & xhr.status === 200){
	    	 	history.pushState('/api/customer', null, null);
	    	 	document.getElementById('fluidForm').innerHTML = xhr.response;
	    	 	
	    	 	window.sessionStorage.setItem('displayingHTML',xhr.response);
	    	 	initAddCustomerJS();
	    	 	

	    	 }
    	}

});

addInvoiceBtn.addEventListener('click',() =>{
	

});

addEmployeeBtn.addEventListener('click',() =>{

});


}