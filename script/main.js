/* get size of an object */
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


var $headingTitle = $('#dvHeader'),
	$infoMsg = $('#notification_Msg_Print'),
	$qTitle = $('#containerDiv h2'),
	$container = $('#container'),
	$navigation = $('.pagination'),
	totalQuestion = Object.size(dataCollection),
	currentAnswer,
	slides = 1;

function init()
{
	$('#dvHeader').html(heading);
	$('#notification_Msg_Print').html(helpTxt);
	loadQuestion(slides);
	$('#submit').html(btnLabel["submitbtn"]);
	$('#next').html(btnLabel["nextbtn"]);

	if(totalQuestion == 1)
	{
		$('#next').remove();
		$('.pagination').hide();
		//$('#submit').css({left: '333px'});
	}

	//setInterval(setsize, 200);
}

function setsize()
{
	//console.log(screen.width < screen.height)
	// if(screen.width < screen.height)
	// {
	// 	if((screen.width > 320 && screen.width < 600) && (screen.height > 400 && screen.height < 700))
	// 	{
	// 		$("#container").find('div').css({
	// 				'width': '100%',
	// 				 'height': '15%',
	// 				 'margin-left': '0', 
	// 				'margin-top': '2%'

	// 		});

	// 		$("#container").find('img').css({
	// 				'width': '34%'

	// 		});
	// 	}
	// }
	// else 
	// {
	// 	$("#container div").css({
	// 		    'float': 'left',
	// 			'width': '25%',
	// 			'position': 'relative',
	// 			'height': '25%',

	// 			'margin-left': '5%', 
	// 			'margin-top': '10%',

	// 			'display': 'block'

	// 	});

	// 	$("#container").find('img').css({
	// 			'width': '65%',
	// 			'border': '1px solid rgba(213, 198, 87, 0.24)',
	// 			'text-align': 'left'

	// 	});
	// }
}

function loadQuestion(index)
{
	var title 		= dataCollection[index]["title"];
	var option 		= dataCollection[index]["option"];
	var answer 		= dataCollection[index]["answer"];
	var navigation 	= index + " of " + totalQuestion;
	
	console.log(title);
	//$('#title').html(index + '. ' + title);
	$('#title').find('span').html(title);
	
	$container.empty();
	$('#container').empty();
	
	for(var i=0; i<option.length; i++)
	{
		$div = $('<div></div>');
		
		$('<input>')
			.attr({type: 'checkbox', name: 'images', value: (i+1), class: 'css-checkbox', id: 'temp' + i})
			.appendTo($div);
			
		$('<label>')
			.attr({for: 'temp' + i})
				.appendTo($div);
				
		$('<img>').attr({src: option[i], alt: ""}).appendTo($div);
			
		$div.appendTo('#container');
	}
	
	console.log(answer);
	currentAnswer = answer;
	
	$('.pagination').html(navigation);

	$('input[type="checkbox"]').click(function(e)
	{
        $('#submit').removeAttr('disabled');
    });
}

function checkAnswers()
{
	var userAnswer = new Array();
	$('input[type="checkbox"]:checked').each(function(index, element) {
        userAnswer.push($(this).val());
    });
	$('input[type="checkbox"]').each(function(index, element) {
		$(this).attr('disabled', 'disabled')
    });
	console.log(currentAnswer);
	console.log(userAnswer);
	
	var incorrect = false;
	if(checkArrays(currentAnswer, userAnswer))
	{	
		setTimeout(function()
		{
			$('input[type="checkbox"]:checked').parent().addClass('correct');
					
		}, 200);
	}
	else
	{	
	incorrect = true;
//incorrect
		//showAlert(dataCollection[slides]["feedback"]["incorrect"]);
		setTimeout(function()
		{
			$('input[type="checkbox"]:checked').parent().addClass('incorrect');
				
			for(var j=0; j<userAnswer.length; j++)
			{
				$('input[value="' + userAnswer[j] + '"]').parent().addClass('incorrect');
				
			}
			for(var k=0; k<currentAnswer.length; k++)
				$('input[value="' + currentAnswer[k] + '"]').parent().addClass('correct').removeClass('incorrect');
		}, 200);
	}
	
	$('#container').find('label').hide();
			
	if(incorrect) playAudio('try-again.mp3');
	else playAudio('well-done.mp3');
	
	if(slides == totalQuestion)
	{
		showAlertLast(msgComplete);
	}
	else
	{
		setTimeout(function()
		{
			$('#next').removeAttr('disabled');
		}, 500);
		
	}
	
	$('#answer').removeAttr('disabled');
	$('#reset').removeAttr('disabled');
	$('#submit').attr('disabled', 'disabled');
	$('input[type="radio"]').attr('disabled', 'disabled');
}

function Reset()
{
	window.location = 'index.html';	
}

function Answer()
{
	var answer = dataCollection["1"]["answer"];
	var option = dataCollection["1"]["option"];
	
	$('input[type="checkbox"]').prop('checked', false);
	
	alert($('input[type="checkbox"]'))
	
	for(var k = 0; k< answer.length; k++)
	{
		$('#temp' + (answer[k]-1)).prop('checked', true);
	}
}

function nextQuestion()
{
	$('.incorrect').removeClass('incorrect');
	$('.correct').removeClass('correct');
	loadQuestion(++slides);
	$('.errorMsg').hide();
	$('#submit').attr('disabled', 'disabled');
	if(slides == totalQuestion)
		$('#next').fadeOut();
	else
		$('#next').attr('disabled', 'disabled');
}

function showHelp()
{
	$('.notifiactinMsgWrapper').fadeToggle();
	return false;
}

function showAlert(message, flag)
{
	$('.errorMsg').html(message).fadeIn();
	setTimeout(function()
	{
		$('.errorMsg').fadeOut();
	}, 500);
}

function showAlertLast(message)
{
	if(totalQuestion != 1)
	{
		setTimeout(function()
		{
			$('.errorMsg').html(message + '<div id="closeBtn">x</div>').fadeIn();
			$('#closeBtn')
				.click(function(e) {
                    $('.errorMsg').hide();
                });
			
		}, 2000);
	}
}

function checkArrays( arrA, arrB ){
    //check if lengths are different
    if(arrA.length !== arrB.length) return false;

    //slice so we do not effect the original
    //sort makes sure they are in order
    //join makes it a string so we can do a string compare
    var cA = arrA.slice().sort().join(","); 
    var cB = arrB.slice().sort().join(",");

    return cA===cB;

}
$(document).ready(function(e) {
    init();
});
function fnShowAudioPlayer(){
	var x = "<div id='dvAudioControl' class='audioPlayer'>"+
				"<object id='auTest' type='application/x-shockwave-flash' data='audio/mp3_player.swf' width='200' height='20'>"+
					"<param name='wmode' value='transparent' />"+
					"<param name='movie' value='audio/mp3_player.swf' />"+
					"<param name='FlashVars' value='mp3=audio/1.mp3&amp;showvolume=1&amp;autoplay=1' />"+
				"</object>"+
				"<img src='img/icon_close.png' class='btnCloseAudio' onclick='fnHideAudioControl()'></img>"+
			"</div>";
	$("#audioContainerDiv").html(x);
	//$('#dvAudioControl').show();
	//var audioElement = document.getElementById('auTest');
	//audioElement.play();
}

function fnHideAudioControl(){
	$("#audioContainerDiv").html('');
	//var audioElement = document.getElementById('auTest');
	//audioElement.pause();
	//audioElement.currentTime=0;
	//$('#dvAudioControl').hide();
}

function playAudio(audioname) {
	var audio = new Audio("audio/" + audioname);
	audio.play();
}


