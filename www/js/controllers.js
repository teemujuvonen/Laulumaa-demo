angular.module('starter.controllers', ['ionic', 'ngCordova'])


	.controller("MainCtrl", function ($scope, $timeout, $ionicPopover, $state, Globals) {
		$scope.$on("$ionicView.enter", function(){
			
			ezar.initializeVideoOverlay(
			function () {
			ezar.getBackCamera().start();
			},
			function (err) {
			alert('unable to init ezar: ' + err);
			});

			img = Globals.get_product();
			document.getElementById("product").src = "http://niisku.lamk.fi/~juvoteem/laulumaa/images/" + img;
		});

		$scope.snapshotTimestamp = Date.now();
		$scope.reverseCameraTimestamp = Date.now();

		$scope.back = function () {
			Globals.set_in_sub_category(false);
			ezar.initializeVideoOverlay(
			function () {
			ezar.getBackCamera().stop();
			});
			$state.go("landing");
		}


		$scope.snapshot = function () {
			//ignore ghost clicks, wait 1.5 sec between invocations
			if (Date.now() - $scope.snapshotTimestamp < 1500) return;
			$scope.snapshotTimestamp = Date.now();

			//get snapshot & revcamera buttons to hide/show
			var snapshotBtn = document.getElementById("snapshot");
			//var revCameraBtn = document.getElementById("revcamera");
			var backBtn = document.getElementById("main-back-button");
			var footerBlock = document.getElementById("footer-block");

			var inclWebView = true;    // include/exclude webView content on top of cameraView
			var inclCameraBtns = false; // show/hide snapshot & revcamera btns

			if (inclWebView && !inclCameraBtns) {
				//revCameraBtn.classList.add("hide");
				snapshotBtn.classList.add("hide");
				backBtn.classList.add("hide");
				footerBlock.classList.add("hide");
			}

			setTimeout(function () {
				ezar.snapshot(
					function (aBase64Image) {
						Globals.set_img(aBase64Image);
						ezar.getBackCamera().stop();
						$state.go("edit");

						//perform screen capture
						//show snapshot button
						if (inclWebView && !inclCameraBtns) {
							snapshotBtn.classList.remove("hide");
							//revCameraBtn.classList.remove("hide");
							backBtn.classList.remove("hide");
							footerBlock.classList.remove("hide");
						}
					}, null,
					{
						encodingType: ezar.ImageEncoding.JPG,
						includeWebView: inclWebView,
						saveToPhotoAlbum: true
					});
			}, 200);
		};

		$scope.reverseCamera = function () {
			//ignore ghost clicks, wait 1.5 sec between invocations
			if (Date.now() - $scope.reverseCameraTimestamp < 1500) return;
			$scope.reverseCameraTimestamp = Date.now();

			var camera = ezar.getActiveCamera();
			if (!camera) {
				return; //no camera running; do nothing
			}

			var newCamera = camera;
			if (camera.getPosition() == "BACK" && ezar.hasFrontCamera()) {
				newCamera = ezar.getFrontCamera();
			} else if (camera.getPosition() == "FRONT" && ezar.hasBackCamera()) {
				newCamera = ezar.getBackCamera();
			}

			if (newCamera) {
				newCamera.start();
			}
		}

		$scope.onDrag = function (event) {
			//console.log(event.target);
			$scope.draggedStyle = {
				"transform": "translate(" + event.gesture.center.pageX + "px, " + event.gesture.center.pageY + "px)"
			};
		}
		$scope.onRelease = function (event) {
			//console.log(event.gesture);

			$scope.draggedStyle = {
				"transform": "translate(" + event.gesture.center.pageX + "px, " + event.gesture.center.pageY + "px)"
			};
		}


		$ionicPopover.fromTemplateUrl('templates/popover.html', {
			scope: $scope,
		}).then(function (popover) {
			$scope.popover = popover;
		});
		$scope.openPopover = function ($event) {
			$scope.popover.show($event);
		};
		$scope.closePopover = function () {
			$scope.popover.hide();
		};
	})

	.controller("EditCtrl", function ($scope, $timeout, $ionicPopover, $state, Globals) {
		$scope.bg = "";
		$scope.$on("$ionicView.enter", function(){
			$scope.bg = Globals.get_img();
			$scope.bg = $scope.bg.replace("data:image/1;", "data:image/jpeg;");
		});

		$scope.back = function () {
			Globals.set_in_sub_category(false);
			$state.go("landing");
		};
	})

	.controller('PopoverCtrl', function ($scope, $state, $ionicPlatform, Globals) {

		$ionicPlatform.registerBackButtonAction(function () {
			event.preventDefault();
			event.stopPropagation();
			popover.hide();
		});

		$scope.sohva = function () {
			document.getElementById("product").src = "./img/sofa.png";
			$scope.popover.hide();
		}

		$scope.senkki = function () {
			document.getElementById("product").src = "./img/senkki.png";
			$scope.popover.hide();
		}
	})

	.controller('LandingCtrl', function ($scope, $state, Globals) {
	$scope.display_back = false;
	$scope.categories = [];
	$scope.$on("$ionicView.enter", function(){
		$scope.categories = Globals.get_categories();
		$scope.display_back = Globals.get_in_sub_category();
	});
	$scope.reset = function () {
		Globals.set_in_sub_category(false);
		$scope.display_back = false;
		$scope.categories = Globals.get_categories();
	}
		$scope.products = [];
		$scope.products = Globals.get_products();

		$scope.selectcategory = function (index) {
			if (Globals.get_in_sub_category()) {
				Globals.set_product(index.img);
				$state.go("main");
			}
			else {
				Globals.set_in_sub_category(true);
				$scope.display_back = true;
				$scope.categories = [];
				for (var i in $scope.products) {
					if ($scope.products[i].category == index.category) {
						$scope.categories.push($scope.products[i]);
					}
				}
			}
		}
	})
	
	
	.directive('ionPinch', function ($timeout) {
		return {
			restrict: 'A',
			link: function ($scope, $element) {

				$timeout(function () {
					var square = $element[0],
						posX = 0,
						posY = 0,
						lastPosX = 0,
						lastPosY = 0,
						bufferX = 0,
						bufferY = 0,
						scale = 1,
						lastScale,
						rotation = 0,
						last_rotation, dragReady = 0;
					ionic.onGesture('touch drag transform dragend', function (e) {
						e.gesture.srcEvent.preventDefault();
						e.gesture.preventDefault();
						switch (e.type) {
							case 'touch':
								lastScale = scale;
								last_rotation = rotation;
								break;
							case 'drag':
								posX = e.gesture.deltaX + lastPosX;
								posY = e.gesture.deltaY + lastPosY;
								break;
							case 'transform':
								rotation = e.gesture.rotation + last_rotation;
								scale = e.gesture.scale * lastScale
								break;
							case 'dragend':
								lastPosX = posX;
								lastPosY = posY;
								lastScale = scale;
								break;
						}
						var transform =
							"translate3d(" + posX + "px," + posY + "px, 0) " +
							"scale(" + scale + ")" +
							"rotate(" + rotation + "deg) ";
						e.target.style.transform = transform;
						e.target.style.webkitTransform = transform;
					}, $element[0]);
				});
			}
		};
	});

