import request from './app.js'
import displayingHTML from './app.js'
import initAddJS from './add.js'


export default function initHomeJS(){

const searchBtn = document.getElementById('searchBtn');
const insertBtn = document.getElementById('insertBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');

 if (performance.navigation.type == 1) {
    console.info( "HOME page is reloaded" );
    //fluidForm.innerHTML = window.sessionStorage.getItem('displayingHTML');
    initHomeJS();
  }
searchBtn.addEventListener('click', () =>{
	console.log("SEARCH BTN WORKS!!!");

});

insertBtn.addEventListener('click',() =>{
	let xhr = request('GET','/api/insert');
	xhr.onreadystatechange = function(){
	    	 if(xhr.readyState === 4 & xhr.status === 200){
	    	 	history.pushState('/api/insert', null, null);
	    	 	document.getElementById('fluidForm').innerHTML = xhr.response;
	    	 	window.sessionStorage.setItem('displayingHTML',xhr.response);

	    	 	initAddJS();
	    	 	
	    	 	

	    	 }
    	}
});

updateBtn.addEventListener('click',() =>{

});

deleteBtn.addEventListener('click',() =>{

});

}