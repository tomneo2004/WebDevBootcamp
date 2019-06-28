var allList = document.querySelectorAll("li");

for(var i=0; i<allList.length; i++){

	allList[i].addEventListener("mouseover", function(){
		this.classList.add("focus");
	});

	allList[i].addEventListener("mouseout", function(){
		this.classList.remove("focus");
	});

	allList[i].addEventListener("click", function(){
		this.classList.toggle("done");
	});
}