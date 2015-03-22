/* player.js
**
**/

console.log("Telll player version " + VERSION);


$(function() {
    /*  TODO download the json movie data */
    // Fill panel with movie spots
    $("#panel").html("");
    for (i = 0; i < spots.length; ++i) {
       $("#panel").append('<div class="frame-icon"><img src="'+spots[i].thumb+'" id_spot='+spots[i].id+'></div>');
    }
    // hide status
    $(".status").hide();
    //var url = "//player.vimeo.com/video/118442440?autoplay=1&badge=0;player_id=player1&byline=0&portrait=0&title=0api=1&";
    //var url = "//player.vimeo.com/video/76979871?autoplay=1&badge=0;player_id=player1&byline=0&portrait=0&title=0api=1&";
    // var url = "http://player.vimeo.com/video/103141636?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;color=ffffff&autoplay=true";
    //var url = "//player.vimeo.com/video/17108401?autoplay=1&badge=0;player_id=player1&byline=0&portrait=0&title=0api=1&";
    //var url = "https://player.vimeo.com/video/118517903?autoplay=1&badge=0;player_id=player1&byline=0&portrait=0&title=0api=1&";

    // Fill player with movie
    var url = my_movie.url;
    $('#player1').attr('src', url);
    //console.log("Opened " + url);
    var iframe = $('#player1')[0];
    // Create the Froogaloop player
    var player = $f(iframe);
    //console.log(player);
    // time and status
    var status = $('.status');
    var elapsed = 0;

    // Create panel spots
    $('#panel').slick({
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 1
    });
    $("#panel img").click(function() {
        $("#mobile").popup("show");
        send_spot($(this).attr('id_spot'));
    });


    // When the player is ready, add listeners for pause, finish, and playProgress
    player.addEvent('ready', function() {
        $("#black_mask").hide();
        $("#stage").css('background','#000');
        $("#stage").show();
        $("#play_pause").removeClass("play");
        $("#play_pause").addClass("pause");
	
        status.text('ready');
        console.log("Player ready");    
        console.log(player);    
        player.addEvent('pause', onPause);
        player.addEvent('finish', onFinish);
        player.addEvent('playProgress', onPlayProgress);
        player.addEvent('seek', onSeek);
    });

    // Call the API when a button is pressed
    $('#play_pause').bind('click', function() {
        var my_class = $(this).attr('class').toLowerCase();
        console.log(my_class);
        if (my_class == "pause") {
            $("#play_pause").removeClass("pause");
            $("#play_pause").addClass("play");
        }
        player.api(my_class);
        //console.log($(this).text() +" at " );
        //player.addEvent('playProgress', function (data, id) {
        //     console.log(data.seconds);
        //});
    });

    // the player's callback functions

    function onPause(id) {
        when = status.text();
        status.text('paused');
        //console.log("Player paused at "+when);  
        setTimeout ( function () {
            if($("#play_pause").attr("class")=="pause"){
            $("#play_pause").removeClass("pause");
            $("#play_pause").addClass("play");}
        }, 1000);
    }

    function onSeek(id) {
        when = status.text("seeked");
        status.text('');
        player.api("pause");
        //console.log("Player paused at "+when);  
    }

    function onFinish(id) {
        when = status.text();
        status.text('finished');
        //console.log("Player finished at "+when);    
        $("#stage").css('background','#000');
        $( "#stage" ).html('<div>The End. <br><br><br>Thanks for testing <span class="telll_logo">te<span class="tr">l</span><span class="tg">l</span><span class="tb">l</span></span> demo!<br><br>You still can click the links in the spots gallery bellow.</div>');
        $("#play_pause").removeClass("pause");
        $("#play_pause").addClass("play");
    }

    /* onPlayProgress
     * Manages the animation at movie sync
     */
    frame = [];
    frame[0] = {};
    frame[0].frame = 15;
    frame[0].toplay = true;
    var stage_black = true;
    function onPlayProgress(data, id) {
        if ($("#play_pause").attr("class") == "play") {
            $("#play_pause").removeClass("play");
            $("#play_pause").addClass("pause");
        }
        elapsed = data.seconds;
        // show elapsed time in status field
        status.text(elapsed);
        // begin and end screen
        /*if (elapsed > 5 && elapsed < 5){
                $( "#stage" ).html("<div style='color:#FFF'>Loading Movie ...</div>");
        }*/
        if (elapsed > 3 && elapsed < 6 && stage_black){
                //console.log("Vai acender! ID:"+id);
                //console.log(data);
		stage_black = false;
                $( "#stage" ).html("");
		$( "#stage" ).animate({
		opacity: 0
		}, 5000, function() {
		    //$("#stage").css('background','none');
                    //console.log("Acendeu!");
		});
        }
        
        if (elapsed > 7 && spots[0].toshow){ //Rolls Royce
                show_spot(0, {x:200,y:150}, {x:30,y:400}, 3000);
                spots[0].toshow = false;
        }
        if (elapsed > 12 && spots[1].toshow){ // Daniel Craig
                show_spot(1, {x:500,y:150}, {x:480,y:180}, 3000);
                spots[1].toshow = false;
        }
        if (elapsed > 16 && spots[2].toshow){ // Eva Green
                show_spot(2, {x:300,y:150}, {x:350,y:150}, 3000);
                spots[2].toshow = false;
        }
        if (elapsed > 19 && spots[3].toshow){ // Tiffany
                show_spot(3, {x:750,y:300}, {x:700,y:350}, 2000);
                spots[3].toshow = false;
        }
        if (elapsed > 22 && spots[4].toshow){ // Bahamas
                show_spot(4, {x:400,y:300}, {x:400,y:280}, 3000);
                spots[4].toshow = false;
        }
        if (elapsed > 28 && spots[5].toshow){ // Helicopter
                show_spot(5, {x:400,y:280}, {x:200,y:80}, 3500);
                spots[5].toshow = false;
        }
        if (elapsed > 25 && spots[6].toshow){ // Yatch   ???
                show_spot(6, {x:200,y:300}, {x:250,y:280}, 2000);
                spots[6].toshow = false;
        }
        if (elapsed > 32 && spots[7].toshow){ // Hotel Atlantis
                show_spot(7, {x:400,y:120}, {x:350,y:100}, 2000);
                spots[7].toshow = false;
        }
        if (elapsed > 36 && spots[8].toshow){ // Armani
                show_spot(8, {x:600,y:300}, {x:400,y:350}, 2500);
                spots[8].toshow = false;
        }
        if (elapsed > 40 && spots[9].toshow){ // Ferreti
                show_spot(9, {x:450,y:250}, {x:400,y:240}, 4500);
                spots[9].toshow = false;
        }
        if (elapsed > 46.5 && spots[10].toshow){ // Mondeo
                show_spot(10, {x:200,y:100}, {x:400,y:200}, 2500);
                spots[10].toshow = false;
        }
        if (elapsed > 50 && spots[11].toshow){ // Ray Ban
                show_spot(11, {x:300,y:100}, {x:400,y:80}, 2000);
                spots[11].toshow = false;
        }
 
        if (elapsed > 55 && !stage_black){
                //console.log("Vai apagar!");
		stage_black = true;
		$( "#stage" ).animate({
		opacity: 1
		}, 500, function() {
		    //$("#stage").css('background','none');
                    //console.log("Apagou!");
		});
        }
    }


	function send_spot (spot_id){
	     var my_spot = spots[spot_id];
	     var my_frame = spots[spot_id].points[0].t;

	     var thumb = my_spot.thumb;
	     var title = my_spot.title ;
	     var description  = my_spot.description;
	     var link  = my_spot.links;
	     var formated = "";
	     player.api('seekTo', my_frame);
             /*setTimeout ( function () {
             if($("#play_pause").attr("class")=="play"){
                $("#play_pause").removeClass("play");
                $("#play_pause").addClass("pause");}
             }, 50);
             if($("#play_pause").attr("class")=="play"){
	         $( "#play_pause" ).trigger( "click" );
             }*/
	     for (i = 0; i < link.length; ++i) {
		 formated += " <li class='telll_link'> <a href='"+link[i].link+"' target='_blank'> <div class='thumb '><img src='"+link[i].thumb+"'></div> <span class='title'>"+link[i].title+"</span> <span class='description'>"+link[i].description+"</span> </a> </li> ";
                 window.open(link[i].link,"_blank");
	     }
	     $('#mobile1').contents().find("#screen_frame").html("");
	     $('#mobile1').contents().find("#screen_frame").append(formated);
	}

	function show_spot (spot_id, begin, end, time) {
	     //var time = 1000 * (end.t - begin.t);
	     var my_spot  = spots[spot_id];
	     var my_frame = spots[spot_id].points[0].t;
	     //console.log(my_frame);
	     var my_media = "images/spot_circles.gif"
	     if (my_spot.media != "default" && my_spot.media){
		  my_media = my_spot.media;
	     }
	     var $spot_frame = $('<div class="spot_frame"><img id_spot='+spot_id+' class="spot" src="'+my_media+'"></div>');
	     $spot_frame.css({left:begin.x,top:begin.y});
	     $spot_frame.appendTo($("#screen_frame"));
	     $spot_frame.fadeIn(600, function(){$(this).css('opacity','0.8')});
	     $spot_frame.animate({
		left:end.x,top:end.y
		}, time, function() {
			   //console.log("Apagar! spot "+spot_id);
			   $spot_frame.fadeOut();
	     });
	     
	     $(".spot").click(function() {
		$("#mobile").popup("show");
		send_spot($(this).attr('id_spot'));
	     }); 
	     //console.log(spot_id);
	     //console.log(begin);
	     //console.log(end);
	}

    
});



