//Check off
$("ul").on("click", "li", function(){
	$(this).toggleClass("complete");
});

//Remove item 
$("ul").on("click", "span", function(event){

	//use parent() to get parent element 
	$(this).parent().fadeOut(500, function(){

		$(this).remove();
	});
	//preven click event propagate through parent element
	event.stopPropagation();
});

//Add new item 
$("input[type='text']").keypress(function(event){

	if(event.keyCode === 13){

		var item = $(this).val();
		$(this).val("");

		$("ul").append("<li><span><i class='fas fa-trash'></i></span> "+item+"</li>");
	}
});

$(".fa-plus").on("click", function(){

	$("input[type='text']").fadeToggle();
});