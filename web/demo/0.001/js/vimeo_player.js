$(function() {

    /////////////////////////////////////////////////////////////////////////
    //         INIT the movie and player

    var movie_id = "76018930";
    var movie_str = "vimeo";
    var $_GET = getQueryParams(document.location.search);
    if ($_GET["movie_id"]) {movie_id = $_GET["movie_id"]}
    if ($_GET["movie_str"]) {movie_str = $_GET["movie_str"]}
    var url = setMovieUrl (movie_id,movie_str);

    // load the movie in player
    $('#player1').attr('src', url);
    var iframe = $('#player1')[0];
    // Create the Froogaloop player
    var player = $f(iframe);
    // set status bar
    var status = $('.status');
    var elapsed = 0; // time is 0

    // When the player is ready, add listeners for pause, finish, and playProgress
    player.addEvent('ready', function() {
        status.text('ready');
        console.log("Player ready");    
        player.addEvent('pause', onPause);
        player.addEvent('finish', onFinish);
        player.addEvent('playProgress', onPlayProgress);
    });

    // Call the API when a button is pressed
    // TODO: seek button / API call
    $('button').bind('click', function() {
        player.api($(this).text().toLowerCase());
        //console.log($(this).text() +" at " );
        //player.addEvent('playProgress', function (data, id) {
        //     console.log(data.seconds);
        //});
    });

    // Get metadata for this movie, if not exists create a new one
    // TODO load movie meta data from json
    // metadata = {[ my meta data]};

   var metadata = {};
    // 

    /* onPlayProgress
     * Manages the animation at movie sync
     */
    frame = [];
    frame[0] = {};
    frame[0].frame = 15;
    frame[0].toplay = true;
    function onPlayProgress(data, id) {
        elapsed = data.seconds;
        status.text(data.seconds + 's played');
        //console.log(data.seconds + 's played');    

        if (elapsed > frame[0].frame && frame[0].toplay){
            $("#stage").css('background-color','transparent');
            console.log("Ad 0  at " + elapsed);
            frame[0].toplay = false;
            // put on point and show
            $("#ad").css({
                top:'100px',     
                left:'250px',
            });
	    $("#ad").animate({
		opacity: 1,
		}, 3000, function() {
                   // frame animation
                   // 1 - change image TODO: some merge/mix?
                   $("#ad img").attr('src','images/fog.png');
                   // 2 - go top left?
                   $("#ad").animate({
		       top: '-30px',
                       left: '30px',
		       }, 4000, function() {
                            // 3 - then go down rigth!
			   $("#ad").animate({
			       top: '100px',
			       left: '500px',
			       }, 1000, function() {
				    // 3 - then desapear!
				   $("#ad").animate({
				       opacity: 0,
				       }, 2000, function() {
                                         console.log("Ad 0 ended at " + elapsed);
					    // END
				   });
			   });
	           });
                   //console.log("Ad 0 end");
	    });
        }
    }

    ///////////////////////////////////////////////////////////////////////
    //         INITIAL SCRENN 

    // zoom the phone
    // create the zoomer - just work on same domain
    // TODO create callback for zooming the phone when mouseover
    $('iframe#mobile1').zoomer({ width: 160, height: 284, zoom: 0.5 });
    zoomed_styles = {
       'background-size':'293px 500px',
       width:"170px",       
       height:"300px",
       top:'-10px',     
       left:'800px',
       padding: "105px 66px"
    };
    $("#mobile").css(zoomed_styles);

    mobile_zoom = .5; // Change me to any number 0–1
    mobile_url = "http://kobkob.org";
    $iframe_mobile = $("iframe#mobile1");
    $iframe_mobile.data().zoomer.zoom = mobile_zoom;
    $iframe_mobile.zoomer('src',mobile_url); 
    //$iframe_mobile.zoomer('refresh'); 


    // init and hide overture and controls
    ad_styles = {
       position:"absolute",
       width:"305px",       
       height:"136px",
       top:'100px',     
       left:'200px',
    };
    $("#ad").css(ad_styles);
    $("#ad").animate({
	opacity: 0,
	//height: "toggle"
	}, 5000, function() {
	// Animation complete.
        $("#stage").css('background-color','transparent');
    });
    $("#controls").animate({
	opacity: 0,
	//height: "toggle"
	}, 5000, function() {
	// Animation complete.
    });

    ///////////////////////////////////////////////////////////////////////
    //         INIT Telllme Interface 

    // controls behavior
    c_hidden = 1;
    c_moving = 0;
    $("*").mousemove(function(event) {
      if (event.pageX < 773 && event.pageY < 556 && c_hidden == 1 && c_moving == 0){
        //console.log("Show controls");
        //console.log(event.pageX);
        //console.log(event.pageY);
        c_moving = 1;
        $("#controls").animate({
    	opacity: 1,
    	//height: "toggle"
    	}, 100, function() {
            c_hidden = 0;
            c_moving = 0;
            //console.log("Showed");
        });
      } else if ((event.pageX > 773 || event.pageY > 556) && c_hidden == 0 && c_moving == 0) {
        //console.log("Hide controls");
        c_moving = 1;
        $("#controls").animate({
    	opacity: 0,
    	//height: "toggle"
    	}, 100, function() {
            c_hidden = 1;
            c_moving = 0;
            //console.log("Hidden");
        });
      }
    });

    // ads behavior
    $("#ad").click(function(e) {
        //alert( "Implemente-me Please!" );
        $('#ad-menu').hide();
        $('#ad-menu').css({'top':e.pageY-80,'left':e.pageX-80, 'position':'absolute', 'border':'1px solid black', 'padding':'5px'});
        $('#ad-menu').show();
    });

    // ads-menu behavior
    $("#ad-menu").mouseleave(function() {
        $('#ad-menu').hide();
    });
    $("#ad-menu li").mouseenter(function() {
        $(this).css('background-color','black');
    });
    $("#ad-menu li").mouseleave(function() {
        $(this).css('background-color','#c0c0c0');
    });
    $("#ad-menu .open").click(function() {
        alert( "Implemente-me Please!" );
        $('#ad-menu').hide();
    });
    $("#ad-menu .share").click(function() {
        alert( "Implemente-me Please!" );
        $('#ad-menu').hide();
    });
    $("#ad-menu .comment").click(function() {
        alert( "Implemente-me Please!" );
        $('#ad-menu').hide();
    });


    // the player's callback functions

    function onPause(id) {
        when = status.text();
        status.text('paused');
        console.log("Player paused at "+when);    
    }

    function onFinish(id) {
        when = status.text();
        status.text('finished');
        console.log("Player finished at "+when);    
        $("#stage").css('background-color','#fff');
    }

//// other functions

    /* getQueryParams 
     */
    function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

      while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
      }

    return params;
    }   

    /* setMovieUrl
     */
    function setMovieUrl(movieId, movieStr) {
      if (movieStr == "vimeo"){
	      var url = "//player.vimeo.com/video/"+movieId+"?autoplay=1&badge=0;player_id=player1&byline=0&portrait=0&title=0api=1&";
	    //var url = "//player.vimeo.com/video/76979871?autoplay=1&badge=0;player_id=player1&byline=0&portrait=0&title=0api=1&";
	    //var url = "http://player.vimeo.com/video/103141636?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;color=ffffff&autoplay=true";
      }
      return url;
    }



});
