<?php
	$memcache = new Memcached;
	$memcache->set('who', "satria");
	
	$who = $memcache->get('who');
	echo $who;
?>