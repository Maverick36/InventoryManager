import request from './app.js'
export default function initAddCustomerJS(){
let successLabel = document.getElementById('customerSuccess');
let failedLabel = document.getElementById('customerFailed');
const submitCustomerBtn = document.getElementById('submitCustomerBtn');
const cancelCustomerBtn = document.getElementById('cancelCustomerBtn');
const customerName = document.getElementById('customerName');
const customerAddress = document.getElementById('customerAddress');
const customerState = document.getElementById('customerState');
const customerCity = document.getElementById('customerCity');
const customerZipcode = document.getElementById('customerZipcode');

const customerPhone = document.getElementById('customerPhone');
const companyBtn = document.getElementById('companyBtn');
const individualBtn = document.getElementById('individualBtn');

successLabel.style.display = 'none';
failedLabel.style.display = 'none';

submitCustomerBtn.addEventListener('click', () =>{
	//console.log("SEARCH BTN WORKS!!!");
	let name = customerName.value;
	let address = customerAddress.value;
	let state = customerState.value;
	let city = customerCity.value;
	let zipcode = customerZipcode.value;
	let phone = customerPhone.value;
	let businessType;
	if(companyBtn.checked){
		businessType = companyBtn.value;
	}
	if(individualBtn.checked){
		businessType = individualBtn.value;

	}
		console.log("businessType-->"+businessType);


		if(!!name && !!address && !!phone && !!state && !!city && !!zipcode && !!businessType){
			
			console.log(phone.length+" phone length");
			if(phone.length == 10){
				console.log("inside2");
				let url = '/api/addCustomer?name='+name+'&address='+address+'&phone='+phone+'&state='+state+'&city='+city+'&zipcode='+zipcode+'&businessType='+businessType;
				let xhr = request('POST',url);
				xhr.onreadystatechange = function(){
		    	 if(xhr.readyState === 4 & xhr.status === 200){
		    	 	
		    	 		console.log(xhr.response);
		    	 		
		    	 		let results = JSON.parse(xhr.response);
		    	 		console.log("status---->"+results.status);
		    	 		if(results.status == "success"){
		    	 			failedLabel.style.display = 'none';
		    	 			successLabel.style.display = 'block';
		    	 			successLabel.style.textAlign = "center";

		    	 		}else if(results.status == "failed"){
		    	 			successLabel.style.display = 'none';
		    	 			failedLabel.style.display = 'block';
		    	 			failedLabel.style.textAlign = "center";
		    	 		}
		    	 	

		    	 }
	    	}

			}
		}
	
	
});

cancelCustomerBtn.addEventListener('click',() =>{
	//getPage('previousDisplayingHTML');
});

}