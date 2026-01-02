<?php

use chums\ui\WebUI2;
use chums\user\Groups;

require_once ("autoload.inc.php");

$ui = new WebUI2([
    'bodyClassName' => 'container-fluid',
    'contentFile' => 'body.inc.php',
    'requiredRoles' => [Groups::PRODUCTION],
    'requireLogin' => true,
    "title" => 'Product Master'
]);
$ui->addViteManifest()
    ->render();
