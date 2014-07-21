<!--<?php session_start(); $_SESSION['logado'] = 1; ?>-->
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" ng-app="LS"

<!--<![endif]-->
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title></title>
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--<?php if($_SERVER['SERVER_ADDR']=='127.0.0.1'){ echo '>';?>
<base href="/" />
<script>
window.base = '/';
window.LS = window.LS||<?php echo json_encode($_SESSION); ?>;
</script>
<!--<?php }else{ ?>-->
<!--<?php echo '-><!--'; ?>-->
<base href="http://everaldoreis.github.io/iSM---Stock-Manager/" />
<script type="text/javascript">window.LS = window.LS||JSON.parse('{"logado":"1"}');</script>
<!--<?php } ?>-->
<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="vendor/font-awesome4/css/font-awesome.css">
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/my.css">
<script src="vendor/modernizr-2.6.2.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="vendor/calculator/jquery.calculator.css">
	<script src="vendor/jquery-2.1.1.min.js"></script>
</head>
<body ng-controller="MainController">
<div ng-include="'templates/processing'"></div>
	<div class="container-fluid"
		class="{{ ativo}}">
		<div class="row">
			<!--[if lt IE 7]>
                    <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
                <![endif]-->

			<!-- Add your site or application content here -->
			<div class="nav navbar"
				style="border: none; position: relative; height: 50px; overflow: hidden; display: table;">
				<div class="navbar-fixed-top" ng-include="'templates/navbar_top'"></div>
			</div>
			<div class="col-sm-2">
				<div style="position: fixed; padding: 0 40px 0 0" class="col-sm-2">
					<div ng-include="'templates/sidebar'"></div>
				</div>
			</div>
			<div class="col-sm-10 panel" id="content">
				<div class="panel-body" ng-view></div>

			</div>
		</div>
	</div>
	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
	<script src="vendor/angular/angular.min.js"></script>
	<script src="vendor/angular/angular-route.min.js"></script>
	<script src="vendor/angular/angular-sanitize.min.js"></script>
	<script src="vendor/angular/angular-resource.min.js"></script>
	<script src="vendor/angular/angular-animate.min.js"></script>
	<script src="vendor/angular/angular-cookies.min.js"></script>
	<script src="vendor/angular/angular-sanitize.min.js"></script>
	<script src="vendor/ui-bootstrap-tpls-0.11.0.min.js"></script>
	
	<script src="js/plugins.js"></script>
	<script type="text/javascript"
		src="vendor/calculator/jquery.plugin.js"></script>
	<script type="text/javascript"
		src="vendor/calculator/jquery.calculator.js"></script>
	<script src="js/main.js"></script>

</body>
</html>
