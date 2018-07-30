<?php

	$name = 'ea';

	header('Content-type: text/css; charset: UTF-8');

	$versions = [
		1,
		1.1,
		1.2,
		1.3,
		2,
	];

	$lasr_v = end($versions);

	if(isset($_GET['v'])){
		$v = floatval($_GET['v']);
		if(!in_array($v, $versions))
			$v = $lasr_v;
	}
	else
		$v = $lasr_v;

	echo "/*! {$name}.css v{$v}| MIT License | github.com/umbokc/emmet-attr */\n\n";

	$path = "./css/{$name}.v{$v}.css";

	if(file_exists($path))
		echo file_get_contents($path);
?>
