
/**
  * class Movie
  * 
  */

Movie = function ()
{
  this._init ();
}


/**
 * _init sets all Movie attributes to their default value. Make sure to call this
 * method within your class constructor
 */
Movie.prototype._init = function ()
{
  /**
   * 
   */
  this.id = "";
  /**
   * 
   */
  this.title = "";
  /**
   * 
   */
  this.author = "";
  /**
   * 
   */
  this.date = "";
  /**
   * 
   */
  this.url = "";
  /**
   * 
   */
  this.ad = "";
  /**
   * 
   */
  this.passwd = "";

  /**Aggregations: */

  /**Compositions: */

}

/**
 * 
 * @param new_passwd
    *      
 */
Movie.prototype.passwd = function (new_passwd)
{
  
}


/**
 * 
 * @param url
    *      
 */
Movie.prototype.loadJson = function (url)
{

  return this;
}


