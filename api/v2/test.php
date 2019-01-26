<?php
    //$memcached = new Memcached();
    //$memcached->addServer('ngulikin.com', 2083);
    
   /* $actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    function get_client_ip() {
        $ipaddress = '';
        if (getenv('HTTP_CLIENT_IP'))
            $ipaddress = getenv('HTTP_CLIENT_IP');
        else if(getenv('HTTP_X_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if(getenv('HTTP_X_FORWARDED'))
            $ipaddress = getenv('HTTP_X_FORWARDED');
        else if(getenv('HTTP_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if(getenv('HTTP_FORWARDED'))
           $ipaddress = getenv('HTTP_FORWARDED');
        else if(getenv('REMOTE_ADDR'))
            $ipaddress = getenv('REMOTE_ADDR');
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }*/
    
    //$key = get_client_ip().'~'.$actual_link;
    //$memcached->set($key, time() ,2);
    
    //$memcached->set('int', 'tes');
    
    //var_dump($memcached->get('int'));
    define('DAY',60*60*24, true);
    define('MONTH',DAY*30, true);
    define('YEAR',DAY*365, true);
        
    //$diff = abs(strtotime(date("Y-m-d H:i:s")) - strtotime("2018-01-12 14:29:25"));
        
        /*$years = floor($diff / (YEAR));
        $months = floor(($diff - $years * YEAR) / (MONTH));
        $days = floor(($diff - $years * YEAR - $months*MONTH ) / (DAY));
        
        /*if($days <= 30){
            $time_signup = $days." hari bergabung";
        }else if($days < 365){
            $time_signup = $days." bulan bergabung";
        }else{
            $time_signup = $days." tahun bergabung";
        }*/
        //$time = strtotime("2018-01-12 14:29:25");
        //$time = strtotime("2018-01-12 14:29:25");
        
        $date1=date_create(date("Y-m-d H:i:s"));
        $date2=date_create("2018-01-12 14:29:25");

        $diff=date_diff($date1,$date2);
        $days = $diff->format("%a");
        
        if($days <= 7){
            $time_signup = $days." hari bergabung";
        }else if($days <= 30){
            $week= floor($days/7);
            $time_signup = $week." minggu bergabung";
        }else if($days < 365){
            $month = floor($days/31);
            $time_signup = $month." bulan bergabung";
        }else{
            $year = floor($days/365);
            $time_signup = $year." tahun bergabung";
        }
        echo $time_signup;
?>