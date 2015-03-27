gameApp.controller('gameCtrl', function ($scope, $document, $routeParams, sharedProperties, $location, $http) {

	$scope.svgWidth = window.innerWidth;
  $scope.svgHeight = window.innerHeight;


  $scope.faceDimension = window.innerWidth * 0.5;


  $scope.holeW = $scope.svgWidth * 0.02;
  $scope.holeH = $scope.holeW * 3;

  var holeNumX = 4;
  var holeNumY = 4;
  
  var holeX_first = $scope.svgWidth * 0.2;
  var holeY_first = $scope.svgHeight * 0.2;
  var holeGapX = ($scope.svgWidth -  holeX_first * 2) / (holeNumX - 1) - $scope.holeW;
  var holeGapY = $scope.holeH * 1.5;
  var holeCoord = [];

  for (i = 0; i < holeNumY; i++) {
    for (j = 0; j < holeNumX; j++) { 
      holeCoord.push([
        holeX_first + j*holeGapX,
        holeY_first + i*holeGapY
      ]);
    }
  }

  $scope.holeCoord = holeCoord;


  $scope.daggerSize = $scope.svgWidth * 0.05


  $scope.set = function(){
    var a = angular.element( document.querySelector( '#cube' ) );
    a[0].style['webkitTransform'] = 'rotateX(' + 0 + 'deg) rotateY(' + 0 + 'deg) rotateZ(' + 0 + 'deg)';
  }

});


