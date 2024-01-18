<?php

function isMobile() {
    return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
}


if(isMobile()){
    include '../00_Dependences/MOB/to-us/header.html';
}else{
    include '../00_Dependences/DESK/to-us/header.html';
}



echo "<style data-owner=\"cTeam_\">";
include '../00_Dependences/DesignSystem/index.css';
include 'index.css';
echo "</style>";

include 'index_.html';

echo "<script data-owner=\"cTeam_\">";
include '../00_Dependences/DesignSystem/index.js';
include 'index.js';
echo "</script>";


if(isMobile()){
    include '../00_Dependences/MOB/to-us/footer.html';
}else{
    include '../00_Dependences/DESK/to-us/footer.html';

}

?>
 