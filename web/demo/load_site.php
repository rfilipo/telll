<?php
/** Crawler to show external websites inside iframes
 * it uses the get var "url" as base64
 * 
 * by monsenhor filipo@kobkob.org
 * October 2014
*/

$url = base64_url_decode($_GET["url"]);
//$base_href = parse_url($url)["host"];
$html ="<!-- load_site crawler by monsenhor -->";
$html = $html . get_site($url);
//$html = "<base href='". $base_href ."' />" . $html;
echo "<h1>Showing:\n" . $url . "</h1>";
//echo $html;
       
function base64_url_decode($input) {
 return base64_decode(strtr($input, '-_,', '+/='));
}
       
function get_site($url){
        $ch = curl_init();
        $timeout = 10;
        $useragent = "Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0";
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);     
        curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
        if( ! $data = curl_exec($ch))
        {
        trigger_error(curl_error($ch));
        }
        curl_close($ch);
        return $data;   
}
?>
