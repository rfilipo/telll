//#include "Kob/iPlayer.js"
//#include "Canvas.js"
//#include "Panel.js"
//#include "Kob/Movie.js"


/**
  * class MockPlayer
  * 
  */

MockPlayer = function ()
{
  this._init ();
}

MockPlayer.prototype = new iPlayer ();

/**
 * _init sets all MockPlayer attributes to their default value. Make sure to call
 * this method within your class constructor
 */
MockPlayer.prototype._init = function ()
{
  /**
   * 
   */
  this.m_my_canvas = "";
  /**
   * 
   */
  this.m_my_panel = "";
  /**
   * 
   */
  this.m_my_movie = "";

  /**Aggregations: */

  /**Compositions: */

}


