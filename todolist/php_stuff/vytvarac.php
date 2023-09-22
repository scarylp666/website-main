<?php
$json_test = array("Peter"=>1, "Ben"=>0);
$json_hodnota = json_encode($json_test);
$testfile = fopen("test.json","w+") or die("Unable :(");
fwrite($testfile, $json_hodnota);
fclose($testfile);

?>