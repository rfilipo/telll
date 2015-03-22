/* demo telll.me js stuff
author: monsenhor@cpan.org
*/
function refreshSwatch() {
        console.log("Implemente-me!");
}

$(document).ready(function(){
    // INIT Panel
    $('#panel').slick({
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 1
    });
    
    $( "#scroll" ).slider({
	orientation: "horizontal",
	range: "min",
	max: 255,
	value: 0,
	slide: refreshSwatch,
	change: refreshSwatch
});
      
    ///////////////////////////////////////////////////////////////////////
    //         INITIAL SCREEN 

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
    $("#panel").animate({
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
        $("#panel").animate({
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
        $("#panel").animate({
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

});
