// image size = 150/150 

var heading = "";
var helpTxt = "Click on the check box to select your option. More than one option can be selected.<br><br>Click on the Submit button to submit your option&#47;options.<br><br>Click on the Next button to go to the next question.";
var msgComplete = "End of Activity";
var btnLabel = {
	"nextbtn" : "Next",
	"submitbtn": "Submit"
}

var dataCollection = {
	"1": {
		"title": "Tick the things that you see in school.",
		
		"option": [		'img/items/blackbord.jpg',
						'img/items/bed.png',
						'img/items/chalk.png',
						'img/items/duster.png',
						'img/items/school-bus.png',
						'img/items/almirah.jpg'
					],
		"answer": [1, 3,4,5],
		"feedback": {
				"incorrect": "That's incorrect",
				"correct": "That's correct"
			}
	}
}