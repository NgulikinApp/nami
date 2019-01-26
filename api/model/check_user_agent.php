<?php
    $hash = hash('sha256', $_SERVER['HTTP_USER_AGENT'].' SHIFLETT');
    if (isset($_SESSION['HTTP_USER_AGENT']))
    {
        if ($_SESSION['HTTP_USER_AGENT'] != $hash)
        {
            echo "Unauthorized User";
            session_destroy();
            exit;
        }
    }
    else
    {
        $_SESSION['HTTP_USER_AGENT'] = $hash;
    }
?>