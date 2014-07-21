//angular.element("#content").html('<ng-view></ng>');
var app = angular
		.module("LS", [ 'ngRoute', "ngResource", "ngSanitize", 'ui.bootstrap' ])

		.controller(
				'MainController',
				function($scope, $http, $sce, $location, $routeParams, $route) {
				    $scope.baseHref = 'http://everaldoreis.github.io/iSM---Stock-Manager/';
					$scope.items = [];
					$scope.keydown = function(keycode) {
						/* validate $scope.mobileNumber here */
						$scope.typing = true;
					};
					$scope.location = $location;
					$scope.keyup = function(keycode) {
						/* validate $scope.mobileNumber here */
						$scope.typing = false;
						sender = setTimeout(function() {
							if ($scope.typing) {
								clearTimeout(sender);
							} else {
								var responsePromise = $http
										.get("/articles.json");
								responsePromise.success(function(data, status,
										headers, config) {
									$scope.items = data;
								});
								responsePromise.error(function(data, status,
										headers, config) {
									alert("AJAX failed!");
								});
							}
						}, 800);
					};
					// http://everaldoreis.com.br/artigos.json
					$scope.menuClick = function(event, ativo) {
						$scope.ativo = ativo;
						var responsePromise = $http.get($routeParams.page
								+ '?layout=ajax');
						responsePromise.success(function(data, status, headers,
								config) {
							$location.path(getPath(event.target.href));
						});
						responsePromise.error(function(data, status, headers,
								config) {
							alert("AJAX failed!");
						});
					};
					$scope.getJSON = function(s) {
						var s = {
							url : '',
							key : 'items'
						};
						var responsePromise = $http.get(s.url);
						responsePromise.success(function(data, status, headers,
								config) {
							$scope.items[s.key] = data;
						});
						responsePromise.error(function(data, status, headers,
								config) {
							alert("getJSON failed!");
						});
					};
					$scope.renderHtml = function(html_code) {
						return $sce.trustAsHtml(html_code);
					};
					var baseLen = $location.absUrl().length
							- $location.url().length;
					function getPath(fullUrl) {
						return fullUrl.substring(baseLen);
					}
				})

		.controller('PaginationController',
				function($scope, $http, $sce, $location, $routeParams, $route) {
					$scope.totalItems = $scope.totalItems || 64;
					$scope.currentPage = $scope.currentPage || 4;

					$scope.setPage = function(pageNo) {
						$scope.currentPage = pageNo;
					};

					$scope.pageChanged = function() {
						console.log('Page changed to: ' + $scope.currentPage);
					};

					$scope.maxSize = $scope.maxSize || 5;
					$scope.bigTotalItems = $scope.bigTotalItems || 175;
					$scope.bigCurrentPage = $scope.bigCurrentPage || 1;
				})

		.controller(
				'PostsController',
				function($scope, $http, $sce, $location, $routeParams, $route) {
					// http://everaldoreis.com.br/artigos.json
					$('#processing').modal('show');
					var responsePromise = $http
							.get('http://everaldoreis.com.br/artigos.json');
					responsePromise.success(function(data, status, headers,
							config) {
						$scope.items['posts'] = data;
						$('#processing').modal('hide');
					});
					responsePromise.error(function(data, status, headers,
							config) {
						alert("Get posts failed!");
						$('#processing').modal('hide');
					});
				})

		.filter('slice', function() {
			return function(arr, start, end) {
				return arr.slice(start, end);
			};
		})

		.filter('searchFor', function() {
			return function(arr, searchString) {
				if (!searchString) {
					return arr;
				}

				var result = [];

				searchString = searchString.toLowerCase();

				angular.forEach(arr, function(item) {
					if (item.title.toLowerCase().indexOf(searchString) !== -1) {
						result.push(item);
					}
				});

				return result;
			};
		})

		.config(
				function($provide, $routeProvider, $locationProvider,
						$httpProvider) {
					// configure the routing rules here
					$routeProvider
							.when(
									'/:page*?',
									{   
										templateUrl : function($routeParams) {
										    console.log($routeParams.page)
										    base = window.base ? window.base : 'http://everaldoreis.github.io/iSM---Stock-Manager/';
											$routeParams.page = $routeParams.page == undefined ? ''
													: $routeParams.page.replace('iSM---Stock-Manager/', '').replace('#!', '');
											return LS.logado ? base+'pages/'
													+ $routeParams.page
													: base+'pages/auth?login';
										},
										controller : 'MainController'
									}).otherwise({
								redirectTo : function(){ 
								    return (window.base ? window.base : 'http://everaldoreis.github.io/iSM---Stock-Manager/')+'404';
								}
							});
					// routing DOESN'T work without html5Mode
					$locationProvider.html5Mode(false).hashPrefix('!');
					// Intercept http calls.
					$provide.factory('MyHttpInterceptor', function($q) {
						console.log($q)
						return {
							// On request success
							request : function(config) {
								// angular.element("#processing").css({display:
								// 'block'});
								// console.log('request:', config);
								// about the request before it is sent.

								// Return the config or wrap it in a promise if
								// blank.
								return config || $q.when(config);
							},

							// On request failure
							requestError : function(rejection) {
								// about the error on the request.
								// console.log('requestError:', rejection);

								// Return the promise rejection.
								return $q.reject(rejection);
							},

							// On response success
							response : function(response) {
								// from the response.
								// console.log('response:', response);

								// Return the response or promise.
								return response || $q.when(response);
							},

							// On response failture
							responseError : function(rejection) {
								// console.log('responseError:', rejection);
								// about the error.

								// Return the promise rejection.
								return $q.reject(rejection);
							}
						};
					});
					$httpProvider.interceptors.push('MyHttpInterceptor');
				});
$(document)
		.ready(
				function() {
					$('#inlineCalc').calculator();

					$('#inlineDisable').click(
							function() {
								var disable = $(this).text() === 'Disable';
								$(this).text(disable ? 'Enable' : 'Disable');
								$('#inlineCalc').calculator(
										disable ? 'disable' : 'enable');
							});
					var panels = $('.user-infos');
					var panelsButton = $('.dropdown-user');
					panels.hide();

					// Click dropdown
					panelsButton
							.click(function() {
								// get data-for attribute
								var dataFor = $(this).attr('data-for');
								var idFor = $(dataFor);

								// current button
								var currentButton = $(this);
								idFor
										.slideToggle(
												400,
												function() {
													// Completed slidetoggle
													if (idFor.is(':visible')) {
														currentButton
																.html('<i class="icon-chevron-up text-muted"></i>');
													} else {
														currentButton
																.html('<i class="icon-chevron-down text-muted"></i>');
													}
												})
							});

					$('[data-toggle="tooltip"]').tooltip();

					$('button').click(function(e) {
						e.preventDefault();
						alert("This is a demo.\n :-)");
					});

					/* BOOTSNIPP FULLSCREEN FIX */
					if (window.location == window.parent.location) {
						$('#back-to-bootsnipp').removeClass('hide');
					}

					$('[data-toggle="tooltip"]').tooltip();

					$('#fullscreen')
							.on(
									'click',
									function(event) {
										event.preventDefault();
										window.parent.location = "http://bootsnipp.com/iframe/4l0k2";
									});
					$('a[href="#cant-do-all-the-work-for-you"]').on(
							'click',
							function(event) {
								event.preventDefault();
								$('#cant-do-all-the-work-for-you')
										.modal('show');
							})

					$('[data-command="toggle-search"]')
							.on(
									'click',
									function(event) {
										event.preventDefault();
										$(this).toggleClass('hide-search');

										if ($(this).hasClass('hide-search')) {
											$('.c-search').closest('.row')
													.slideUp(100);
										} else {
											$('.c-search').closest('.row')
													.slideDown(100);
										}
									});

					$('#contact-list').searchable({
						searchField : '#contact-list-search',
						selector : 'li',
						childSelector : '.col-xs-12',
						show : function(elem) {
							elem.slideDown(100);
						},
						hide : function(elem) {
							elem.slideUp(100);
						}
					});
					$('#myTab a:last').tab('show');

					$('#myCarousel').carousel({
						interval : 4000
					});

					var clickEvent = false;
					$('#myCarousel')
							.on('click', '.nav a', function() {
								clickEvent = true;
								$('.nav li').removeClass('active');
								$(this).parent().addClass('active');
							})
							.on(
									'slid.bs.carousel',
									function(e) {
										if (!clickEvent) {
											var count = $('.nav').children().length - 1;
											var current = $('.nav li.active');
											current.removeClass('active')
													.next().addClass('active');
											var id = parseInt(current
													.data('slide-to'));
											if (count == id) {
												$('.nav li').first().addClass(
														'active');
											}
										}
										clickEvent = false;
									});

					$('#custom_carousel').on(
							'slide.bs.carousel',
							function(evt) {
								$('#custom_carousel .controls li.active')
										.removeClass('active');
								$(
										'#custom_carousel .controls li:eq('
												+ $(evt.relatedTarget).index()
												+ ')').addClass('active');
							})
					var panels = $('.vote-results');
					var panelsButton = $('.dropdown-results');
					panels.hide();

					// Click dropdown
					panelsButton.click(function() {
						// get data-for attribute
						var dataFor = $(this).attr('data-for');
						var idFor = $(dataFor);

						// current button
						var currentButton = $(this);
						idFor.slideToggle(400, function() {
							// Completed slidetoggle
							if (idFor.is(':visible')) {
								currentButton.html('Hide Results');
							} else {
								currentButton.html('View Results');
							}
						})
					});
				});
$(document).on('click', '.panel-heading span.icon_minim', function(e) {
	var $this = $(this);
	if (!$this.hasClass('panel-collapsed')) {
		$this.parents('.panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
	} else {
		$this.parents('.panel').find('.panel-body').slideDown();
		$this.removeClass('panel-collapsed');
		$this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
	}
});
$(document).on(
		'focus',
		'.panel-footer input.chat_input',
		function(e) {
			var $this = $(this);
			if ($('#minim_chat_window').hasClass('panel-collapsed')) {
				$this.parents('.panel').find('.panel-body').slideDown();
				$('#minim_chat_window').removeClass('panel-collapsed');
				$('#minim_chat_window').removeClass('glyphicon-plus').addClass(
						'glyphicon-minus');
			}
		});
$(document).on('click', '#new_chat', function(e) {
	var size = $(".chat-window:last-child").css("margin-left");
	size_total = parseInt(size) + 400;
	alert(size_total);
	var clone = $("#chat_window_1").clone().appendTo(".container");
	clone.css("margin-left", size_total);
});
$(document).on('click', '.icon_close', function(e) {
	// $(this).parent().parent().parent().parent().remove();
	$("#chat_window_1").remove();
});
