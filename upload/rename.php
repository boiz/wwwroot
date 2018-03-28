<?php 

switch ($_POST["name"]) {
	case "south_ca":
		$name="south_ca";
		break;

	case "north_ca":
		$name="north_ca";
		break;

	case "las_vegas":
		$name="las_vegas";
		break;
}


if(rename("abc.abc", $name.".pdf")) echo "success";
else echo "error";

 ?>