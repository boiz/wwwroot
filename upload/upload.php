<?php

if(move_uploaded_file($_FILES["fileToUpload"]["tmp_name"],"abc.abc")) echo "success";
else echo "error";

?> 