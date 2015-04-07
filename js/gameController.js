gameApp.controller('gameCtrl', function ($scope, $document, $routeParams, sharedProperties, $location, $http, $timeout, $route) {

  var player = 0;
  var sword_color = "red";
    $scope.bgColor = sword_color;
  var win = [Math.floor(Math.random() * (3 - 0 + 1)), Math.floor(Math.random() * (3 - 0 + 1))];
  win = [0, 1];
  var winCondition = false;
  var head;
  //console.log(win);
    
    $scope.replay = function() {
    $route.reload();
    }


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
  
  $scope.boxLeft = window.innerWidth * 0.07 + 90;
  $scope.boxTop = window.innerHeight * 0.55;
    $scope.headTop = $scope.boxTop - 140;
     $scope.headLeft = window.innerWidth * 0.07 + 90;

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

    if (angular.element(surface).hasClass("front")){
      swordWdith = window.innerWidth * 0.2;
      swordX = hole.getBoundingClientRect().left-swordWdith+10;
      swordY = hole.getBoundingClientRect().top-hole.getBoundingClientRect().height+20;

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
      swordY = hole.getBoundingClientRect().top-hole.getBoundingClientRect().height+20;

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
      $scope.imgSword[surface.id].hole[index].color = sword_color;
      angular.element(imgInserted[index]).addClass("show");

      var poptry = [parseInt(surface.id[surface.id.length-1]), index];
      if (poptry[0]==win[0] && poptry[1]==win[1]) {
        head = angular.element( document.querySelector( '#cube-headarea' ) );
        angular.element(head).addClass('popped');
        winCondition = true;
          
        
      }
        
        player ++;
      if (player == 0) {
        sword_color = "red";
        //player ++;
      } else if (player == 1) {
        sword_color = "green";
        //player ++;
      } else if (player == 2) {
        sword_color = "yellow";
        //player ++;
      } else if (player == 3) {
        sword_color = "blue";
        player = 0;
      }
        
        $scope.bgColor = sword_color;

    }, 2000); 
      
    $timeout(function(){
        if (winCondition == true) {
            var endmenu = angular.element( document.querySelector( '#endMenu' ) );
            angular.element(endmenu).addClass('show');
        }
        
    }, 2700); 

  }

  var spin = 0;
  var spin_angle = -30;

  $scope.set = function(dir){
<<<<<<< HEAD
    spin++;
    if (dir == 1) {
      spin_angle = spin_angle - 90;
    } else {
      spin_angle = spin_angle + 90;
    }
    

=======
>>>>>>> 1cfc32d1bbb966385aae0eca71c6374dfc988a2d
    var a = angular.element( document.querySelector( '#cube' ) );
    head = angular.element( document.querySelector( '#cube-head' ) );  
    
    
    
    if (dir == 1) {
        spin++;
        spin_angle = spin_angle - 90;
        
        var frontPre_index;
        var rightPre_index;
        var rightNew_index;

        if (spin == 4) {
              spin = 0 ;
              frontPre_index = 3;
              rightPre_index = spin;
              rightNew_index = spin + dir;
              a[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
              head[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
            } else if (spin == 1) {
              frontPre_index = spin - dir;
              rightPre_index = spin;
              rightNew_index = spin + dir;
              a[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
              head[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
            } else if (spin == 2) {
              frontPre_index = spin - dir;
              rightPre_index = spin;
              rightNew_index = spin + dir;
              a[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
              head[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
            } else if (spin == 3) {
              spin = 3;    
              frontPre_index = spin - dir;
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
      
    } else {
      spin--;
      spin_angle = spin_angle + 90;
        
        var rightPre_index;
        var frontPre_index;
        var frontNew_index;
        
        
            if (spin == -1) {
              spin = 3 ;
              rightPre_index = 1;
              frontPre_index = 0;
              frontNew_index = spin;
              a[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
              head[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
            } else if (spin == 2) {
              rightPre_index = 0;
              frontPre_index = spin + 1;
              frontNew_index = spin;
              a[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
              head[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
            } else if (spin == 1) {
              rightPre_index = spin + 2;
              frontPre_index = spin + 1;
              frontNew_index = spin;
              a[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
              head[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
            } else if (spin == 0) {
              rightPre_index = spin + 2;
              frontPre_index = spin + 1;
              frontNew_index = spin;
              a[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
              head[0].style['webkitTransform'] = 'rotateX(' + -20 + 'deg) rotateY(' + spin_angle + 'deg) rotateZ(' + 0 + 'deg)';
            }
        
            var rightPre = angular.element(document.getElementById("surface_"+rightPre_index));
    angular.element(rightPre).removeClass('right');

    var frontPre = angular.element(document.getElementById("surface_"+frontPre_index));
    angular.element(frontPre).removeClass('front');
    angular.element(frontPre).addClass('right');
    $scope.imgSword[frontPre[0].id].dir = "r";

    var frontNew = angular.element(document.getElementById("surface_"+frontNew_index));
    angular.element(frontNew).addClass('front');
    $scope.imgSword[rightPre[0].id].dir = "l";
    }
      
    
      
    
      
    console.log(spin);
    console.log(frontPre_index);
    console.log(rightPre_index);
    console.log(rightNew_index);
    console.log("----");

    
    
      
      
  }

  
  

  $scope.avatarFace = sharedProperties.getImgData();
  $scope.holeW = $scope.svgWidth * 0.02;
  $scope.holeH = $scope.holeW * 3;

//  var holeNumX = 4;
//  var holeNumY = 4;
//  
//  var holeX_first = $scope.svgWidth * 0.2;
//  var holeY_first = $scope.svgHeight * 0.2;
//  var holeGapX = ($scope.svgWidth -  holeX_first * 2) / (holeNumX - 1) - $scope.holeW;
//  var holeGapY = $scope.holeH * 1.5;
//  var holeCoord = [];
//
//  for (i = 0; i < holeNumY; i++) {
//    for (j = 0; j < holeNumX; j++) { 
//      holeCoord.push([
//        holeX_first + j*holeGapX,
//        holeY_first + i*holeGapY
//      ]);
//    }
//  }
//
//  $scope.holeCoord = holeCoord;
//  $scope.daggerSize = $scope.svgWidth * 0.05
});


