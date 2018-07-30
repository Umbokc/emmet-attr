<?php

	if(!isset($name)) $name = 'ea';

	header('Content-type: application/javascript; charset: UTF-8');

	$versions = [
		1,
		1.1,
		1.2,
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

	echo "/*! {$name}.js v{$v}| MIT License | github.com/umbokc/emmet-attr */\n";

	$path = "./js/{$name}.v{$v}.js";

	if(file_exists($path))
		echo file_get_contents($path);
?>
