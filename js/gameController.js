gameApp.controller('gameCtrl', function ($scope, $document, $routeParams, sharedProperties, $location, $http, $timeout) {

  var shit = angular.element(document.getElementsByClassName("right"));
  var shitid = shit[0].id;
  var n2 = shitid[shitid.length-1];

  $scope.imgSword = [
    "redL",
    "redR",
    "redL",
    "redL"
  ]
 
  var n2 = shitid[shitid.length-1];
  console.log(n2);

  
  if (window.innerWidth < window.innerHeight) {
    $scope.boxScale = window.innerWidth / 120;
  } else {
    $scope.boxScale = window.innerHeight / 120;
  }
  
  $scope.boxLeft = window.innerWidth * 0.07 + 75;
  $scope.boxTop = window.innerHeight * 0.55;

	$scope.svgWidth = window.innerWidth;
  $scope.svgHeight = window.innerHeight;

  $scope.insert = function(event){
    var container = angular.element(document.getElementById('swordHolder_front'));

    var hole = event.target;
    var parent = hole.parentNode;
    var surface = parent.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, hole);
    var animatedSword_ID = 'animatedSword_'+index;
    var animatedSword = angular.element( document.querySelector( '#'+animatedSword_ID ) );

    var imgInserted = angular.element(parent.getElementsByTagName('image'));
    console.log(imgInserted[index]);

    var swordWdith
    var swordX
    var swordY 

    var d;

    if (angular.element(surface).hasClass("front")){
      swordWdith = window.innerWidth * 0.2;
      swordX = hole.getBoundingClientRect().left-swordWdith;
      swordY = hole.getBoundingClientRect().top-hole.getBoundingClientRect().height+15;

      d = angular.element("<div class='sword' style='" + 
          "left:"+swordX+"px;" +
          "top:"+swordY+"px;" +
      "'></div>");
      container.append(d); 

      $timeout(function(){
        angular.element(d).addClass('insert-anime');
        angular.element(d).css('width', '40px');
      }, 1000); 
      

    } else if (angular.element(surface).hasClass("right")){
      swordWdith = window.innerWidth * 0.2;
      swordX = hole.getBoundingClientRect().left+40;
      swordY = hole.getBoundingClientRect().top-hole.getBoundingClientRect().height+15;

      d = angular.element("<div class='sword-right' style='" + 
          "left:"+swordX+"px;" +
          "top:"+swordY+"px;" +
      "'></div>");
      container.append(d); 

      $timeout(function(){
        angular.element(d).addClass('insert-anime-right');
      }, 1000); 
    }

    $timeout(function(){
        angular.element(d).remove();
        angular.element(imgInserted[index]).addClass("show");
    }, 2000); 

    
    
    
  }


  $scope.set = function(){
    var a = angular.element( document.querySelector( '#cube' ) );
    //a[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + -200 + 'deg) rotateZ(' + 0 + 'deg)';
  }



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



});


