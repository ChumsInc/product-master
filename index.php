<?php


/**
 * @package Chums
 * @subpackage ProjectedDemands
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2013, steve
 */

require_once ("autoload.inc.php");
require_once iUI::ACCESS_FILE;

$bodyPath = "apps/product-master";
$title = "Product Master";
$description = "Doing away with the old spreadsheet system that is not able to have multiple people working in at the same time. Replaces the SKU System.";

$ui = new WebUI($bodyPath, $title, $description, true, 5);
$ui->version = "2018-11-02";
$ui->bodyClassName = 'container-fluid';
$ui->AddCSS("public/styles.css", true);
$ui->addManifest('public/js/manifest.json');
//$ui->AddJS("public/js/manifest.d41d8cd98f00b204e980.js");
//$ui->addChunkManifest('public/js/chunk-manifest.json');
/**
 * Changelog:
 * selected now stays on top of list
 * only users with inventory_admin group can edit.
 *
 * 4/13/2017
 * -- Moved xhr stuff from /node-dev/ to /node/
 * -- Added methods for using chunk-manifest.json for including required JS files.
 *
 * 4/14/2017
 * -- Clean up of role validation code required change here.
 * -- /node/validate/group/:group deprecated to use /node/validate/role/:role
 *
 * 6/21/2017
 * -- Changes to Chums Components required a few tweaks
 *
 * 9/7/2018
 * -- updated to react/redux
 * -- added editor for categories
 * -- updated all node_modules
 *
 */


$ui->Send();
