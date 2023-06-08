function openSection (evt, sectionName) {
	 var x, secContent, seclinks;
 
 	secContent = document.getElementsByClassName("secContent");
 	for (x = 0; x < secContent.length; x++)
 	{
		 secContent[x].style.display = "none";
	 }
	seclinks = document.getElementsByClassName("seclinks");
  for (x = 0; x < seclinks.length; x++) {
    	seclinks[x].className = seclinks[x].className.replace(" active", "");
  	}
 
	document.getElementById(sectionName).style.display = "block";
	evt.currentTarget.className += " active";

};