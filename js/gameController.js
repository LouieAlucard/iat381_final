gameApp.controller('gameCtrl', function ($scope, $document, $routeParams, sharedProperties, $location, $http, $timeout) {

  var player = 0;
  var sword_color = "red";
  var win = [Math.floor(Math.random() * (3 - 0 + 1)), Math.floor(Math.random() * (3 - 0 + 1))];
  win = [0, 1];
  var head;
  //console.log(win);


  $scope.imgSword = {
    "surface_0":{
      "hole":[{"color":"red"}, {"color":"red"}, {"color":"red"}, {"color":"red"}],
      "dir":"l"
    },
    "surface_1":{
      "hole":[{"color":"red"}, {"color":"red"}, {"color":"red"}, {"color":"red"}],
      "dir":"r"
    },
    "surface_2":{
      "hole":[{"color":"red"}, {"color":"red"}, {"color":"red"}, {"color":"red"}],
      "dir":"l"
    },
    "surface_3":{
      "hole":[{"color":"red"}, {"color":"red"}, {"color":"red"}, {"color":"red"}],
      "dir":"l"
    },
  };

  
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
    //console.log(imgInserted[index]);

    var swordWdith
    var swordX
    var swordY 

    var d;

    if (player == 0) {
      sword_color = "red";
      player ++;
    } else if (player == 1) {
      sword_color = "green";
      player ++;
    } else if (player == 2) {
      sword_color = "yellow";
      player ++;
    } else if (player == 3) {
      sword_color = "blue";
      player = 0;
    }

    if (angular.element(surface).hasClass("front")){
      swordWdith = window.innerWidth * 0.2;
      swordX = hole.getBoundingClientRect().left-swordWdith;
      swordY = hole.getBoundingClientRect().top-hole.getBoundingClientRect().height+15;

      d = angular.element("<div class='sword' style='" + 
          "left:"+swordX+"px;" +
          "top:"+swordY+"px;" +
          "background-image: url(./img/game/"+sword_color+"Sword_l.png);" +
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
          "background-image: url(./img/game/"+sword_color+"Sword_r.png);" +
      "'></div>");
      container.append(d); 

      $timeout(function(){
        angular.element(d).addClass('insert-anime-right');
      }, 1000); 
    }

    $timeout(function(){
      angular.element(d).remove();
      angular.element(imgInserted[index]).addClass("show");

      var poptry = [parseInt(surface.id[surface.id.length-1]), index];
      if (poptry[0]==win[0] && poptry[1]==win[1]) {
        head = angular.element( document.querySelector( '#cube-head' ) );
        angular.element(head).addClass('popped');
      }
    }, 2000); 

   
 
 
    
  }

  var spin = 0;
  var spin_angle = -30;

  $scope.set = function(){
    spin++;
    spin_angle = spin_angle - 90;

    var a = angular.element( document.querySelector( '#cube' ) );
    head = angular.element( document.querySelector( '#cube-head' ) );
    var frontPre_index;
    var rightPre_index;
    var rightNew_index;

    if (spin == 4) {
      spin = 0 ;
      frontPre_index = 4;
      rightPre_index = spin;
      rightNew_index = spin + 1;
      a[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
      head[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
    } else if (spin == 1) {
      frontPre_index = spin - 1;
      rightPre_index = spin;
      rightNew_index = spin + 1;
      a[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
      head[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
    } else if (spin == 2) {
      frontPre_index = spin - 1;
      rightPre_index = spin;
      rightNew_index = spin + 1;
      a[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
      head[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
    } else if (spin == 3) {
      frontPre_index = spin - 1;
      rightPre_index = spin;
      rightNew_index = 0;
      a[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
      head[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
    }

    var frontPre = angular.element(document.getElementById("surface_"+frontPre_index));
    angular.element(frontPre).removeClass('front');

    var rightNew = angular.element(document.getElementById("surface_"+rightNew_index));
    angular.element(rightNew).addClass('right');
    $scope.imgSword[rightNew[0].id].dir = "r";

    var rightPre = angular.element(document.getElementById("surface_"+rightPre_index));
    angular.element(rightPre).removeClass('right');
    angular.element(rightPre).addClass('front');
    $scope.imgSword[rightPre[0].id].dir = "l";
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


