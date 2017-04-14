window.onload = function(){

	// set up a name array

	nameArr = [[],[],[],[]];
	for (var i=0; i<4; i++) {
		for (var j=0; j<4; j++) {
			nameArr[i][j] = document.getElementById("no"+i+j);
		}
	}

	// randomly assign colors using name array

	var colorObj = {
		1: "purple",
		2: "blue",
		3: "green",
		4: "yellow",
		5: "red",
		6: "pink",
		7: "orange",
		8: "lightblue"
	}

	var colorCount = {
		"purple": 0,
		"blue": 0, 
		"green": 0,
		"yellow": 0,
		"red": 0,
		"pink": 0,
		"orange": 0,
		"lightblue": 0
	}

	// if class is down, gray. if class is up, use this code

	upObj = {}
	for (var i=0; i<4; i++) {
		for (var j=0; j<4; j++) {
			var random = Math.floor(Math.random()*8) + 1;
			while(colorCount[colorObj[random]] > 1) {
				// need a new random number
				random = Math.floor(Math.random()*8) + 1;
			} 
			upObj[nameArr[i][j].getAttribute("id")] = colorObj[random];
			colorCount[colorObj[random]] += 1;
		}
	}

	// change color on click

	var cells = document.querySelectorAll(".row > div");
	var endGameCounter = 0;
	var turnsStart = 2;
	var turns = turnsStart;
	var display = document.getElementById("display");
	display.innerText = "You have "+turns+" turns remaining"
	var button = document.querySelector("#btn");
	var prevColor = Math.random();
	var disabled = false;

	
	for(i=0; i<cells.length; i++) {
		cells[i].addEventListener("click", function(event){
			if(disabled === false){
				if (event.target.getAttribute("class") === "col-xs-2 col-xs-offset-1 down") {
					event.target.setAttribute("class", "col-xs-2 col-xs-offset-1 up");
					event.target.style.backgroundColor = upObj[event.target.getAttribute("id")];
					endGameCounter += 1;
					if (event.target.style.backgroundColor === prevColor && endGameCounter % 2===0) {
					} else if (event.target.style.backgroundColor !== prevColor && endGameCounter % 2===0) {
						disabled = true;
						setTimeout(function(){
						    flipBack();
						},1000);
					} 
					prevColor = event.target.style.backgroundColor;
				} 
				if (endGameCounter === 16) {
					youWin();
				}
			}
		});
	}
	
	// end game if all are up

	function flipBack(){
		for (var i=0; i<4; i++) {
			for (var j=0; j<4; j++) {
				nameArr[i][j].setAttribute("class", "col-xs-2 col-xs-offset-1 down");
				nameArr[i][j].style.backgroundColor = "lightgray";
			}
		}
		endGameCounter = 0;
		disabled = false;
		turns -= 1;
		if(turns === 1){
			display.innerText = "Careful! Only one turn remaining."
			display.setAttribute("class", "col-xs-12 text-center alert alert-warning");
		} else {
			display.innerText = "You have "+turns+" turns remaining."
		}
		if (turns < 1) {
			youLose();
		}
	}

	function youWin(){
		setTimeout(function(){
			display.setAttribute("class", "col-xs-12 text-center alert alert-success");
			display.innerText = "You win with " +(turnsStart-turns) + " turns remaining!"
			button.innerHTML = "Play again"
		},250);
	}

	function youLose(){	
		display.setAttribute("class", "col-xs-12 text-center alert alert-danger");
		display.innerText = "You lose!"
		button.innerHTML = "Try again"
	}


	// set up reset button

	button.addEventListener("click", function(event){
		location.reload();
	});

};