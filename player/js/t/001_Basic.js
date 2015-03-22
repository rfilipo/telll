var my_movie;
var my_Ad;
my_movie = new Movie;
my_ad = new Ad;

/*************************************************************/
QUnit.module( "Data Classes inspection" );
/*************************************************************/
QUnit.test( "Instance a Movie", function( assert ) {
assert.ok( my_movie, "Instanced a Movie!" );
});
QUnit.test( "Instance an Ad", function( assert ) {
assert.ok( my_ad, "Instanced a Ad!" );
});
QUnit.test( "load a Movie from JSON", function( assert ) {
assert.expect(2);
var url = "/telll/movies/000000001.json"; 
var m_data;
var done = assert.async();
$.getJSON( url, function( data ) {
    m_data = data;
    $.each( data, function( key, val ) {
        eval("my_movie."+key+" = val;");
    });
  }).done(function() {
    //my_movie.id = m_data.id;
    //console.log(my_movie);
    assert.ok( my_movie, "Movie loaded!" );
    assert.equal( my_movie.id, 1, "Id match" );
    done();
  });
});
QUnit.test( "Load Ads from Movie", function( assert ) {
assert.ok( false, "Implement me!" );
});
QUnit.test( "Load user Social Content for Movie", function( assert ) {
assert.ok( false, "Implement me!" );
});
/*************************************************************/

/*************************************************************/
QUnit.module( "Basic functions" );

/*************************************************************/
QUnit.test( "Instance a player", function( assert ) {

$.widget( "kob.telllPlayer", {
    // Default options.
    options: {
      movie: { title: ""}
    },

    // Change title.
    title: function( value ) {
      if ( value === undefined ) {  // No value passed, act as a getter.
        return this.options.movie.title;
      } else {                      // Value passed, act as a setter.
        this.options.movie.title =  value ;
        var player = this.options.movie.title || "Mock Player";
        this.element.text( player );
      }
},

    _create: function( ob ) {
    var title = ob.title || this.options.movie.title;
    this.element.addClass( "player" ).text( title );
    }
});

var $player = $( "<div />" ).appendTo( "body").telllPlayer({ title: "Vimeo Player" });
console.log($player);
assert.equal( $player.telllPlayer("title"), "Vimeo Player" );
});
/*************************************************************/

QUnit.test( "Instance the player's screen", function( assert ) {
assert.ok( false, "Implement me!" );
});
QUnit.test( "Instance the player's controls", function( assert ) {
assert.ok( false, "Implement me!" );
});
QUnit.test( "Instance the player's scroll", function( assert ) {
assert.ok( false, "Implement me!" );
});
QUnit.test( "Instance a player Ad spot", function( assert ) {
assert.ok( false, "Implement me!" );
});
