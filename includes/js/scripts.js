var _prayerTimeDelta = 5;

function clock() {
	var now = new Date();
	var day = now.getDay() + 1;
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();

	day = (day < 10 ? '0' : '') + day;
	hours = (hours < 10 ? '0' : '') + hours;
	minutes = (minutes < 10 ? '0' : '') + minutes;
	seconds = (seconds < 10 ? '0' : '') + seconds;

	var nowStr = day + " : " + hours + " : " + minutes + " : " + seconds;

	$("#clock span:first-child").text(nowStr);

	setTimeout('clock()', 995);
}

function arrowDownAnimation() {
	$('#arrow-down').fadeToggle(2000);
	setTimeout('arrowDownAnimation()', 2000);
}

function logoAnimation() {
	var logo = $("#logo");
	logo.removeClass();
	logo.addClass("base");

    var now = new Date();
    var nowHours = now.getHours();
    var nowMinutes = now.getMinutes();

    for (var i=0; i < religions.length; ++i) {
        var religion = religions[i];
        var religionName = religion.name;
        var religionPrayers = religion.prayers;

        for (var j=0; j < religionPrayers.length; ++j) {
            var prayer = religionPrayers[j];
            var prayerStartTime = prayer.start_time;
            var time = prayerStartTime.split(":");
            var prayerHours = parseInt(time[0]);
            var prayerMinutes = parseInt(time[1]);

            if (nowHours == prayerHours && ((prayerMinutes <= nowMinutes) && (nowMinutes <= (prayerMinutes+_prayerTimeDelta)))) {
            	logo.addClass(religionName);
                break;
            }
        }
    }

    setTimeout('logoAnimation()', 60000);
}

function logoIntroAnimation(curr) {
	var logo = $("#logo");
	
	if (curr == 3) {
		logo.removeClass();
		logo.addClass("base");
		logo.fadeIn(500, function() {
			$('#intro').css({display: "none"});
			logoAnimation();
			$('#clock').fadeIn(2000);
			arrowDownAnimation();
		});
		return;
	}
	
	var religionName = religions[curr].name;
	
	logo.removeClass();
	logo.addClass(religionName);
	
	logo.fadeIn(1000, function() {
        logo.fadeOut(1000, function() {
			logoIntroAnimation(++curr);
		});
	});
}

function introAnimation(width, height) {
	$('#triangle-1').animate({right: -width}, 3700);
	$('#triangle-2').animate({top: -height}, 4300);
	$('#triangle-3').animate({top: -height}, 4000);
	$('#triangle-4').animate({top: -height}, 2000);
	$('#triangle-5').animate({right: -width}, 3800);
	$('#triangle-6').animate({right: -width}, 2000);
	$('#triangle-7').animate({left: -width}, 1700);
	$('#triangle-8').animate({bottom: -height}, 3500);
	$('#triangle-9').animate({top: -height}, 3500);
	$('#triangle-10').animate({left: -width}, 2500);

	setTimeout('logoIntroAnimation(0)', 1000);
}

$(document).ready(function() {
	var scrollWidth = 18;
	var width = window.innerWidth - scrollWidth;
	var height = window.innerHeight;

	$("#intro").css({
		"width": width + 18,
		"height": height
	});

	$("#content").css({
		"width": width,
		"height": height
	});

    var logo = $("#logo");
	logo.css({
		"top": height/2 - (logo.height()/2),
		"left": width/2 - (logo.width()/2)
	});
	
    var arrowDown = $("#arrow-down");
    arrowDown.css({
		"left": width/2 - arrowDown.width()/2
	});

	clock();
	introAnimation(screen.width, screen.height);
});