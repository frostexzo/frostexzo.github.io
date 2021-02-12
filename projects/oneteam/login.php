<?php
	header('Content-Type: text/html; charset=utf-8');
  set_time_limit(0);
  $handle = fopen("visitors_list.txt", "r");
  while (!feof($handle)) {
    $bufer = fgets($handle);
    $n=$n+1;
  }
  fclose($handle);

$userData = "(" . ((($n - 1) / 7) + 1)  . ")  " . date("d.m.y H:i") . "\nИмя: " . $_POST["firstname"] . "\nФамилия: " . $_POST["surname"] . "\nДепартамент: " . $_POST["department"] . "\n\n\n";

  $fp = fopen("visitors_list.txt", "a");
  $writeFile = fwrite($fp, $userData);
  if ($writeFile) echo "true";
  else echo "false";
  fclose($fp);

?>