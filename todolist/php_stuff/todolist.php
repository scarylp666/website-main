<?php
$BUZERATSKURVENYTUBYVA = "..\\..\\test.json";
if($_SERVER["REQUEST_METHOD"] == "GET"){
    $cicik = fopen($BUZERATSKURVENYTUBYVA,"r") or die("Unable :(");
    echo fread($cicik,filesize($BUZERATSKURVENYTUBYVA));
    fclose($cicik);
}
else{
    $cicik = fopen($BUZERATSKURVENYTUBYVA,"w") or die("Unable :(");
    fwrite($cicik,file_get_contents("php://input"));
    fclose($cicik);
}
?>