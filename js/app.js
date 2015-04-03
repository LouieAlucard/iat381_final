var gameApp = angular.module('gameApp', [
	'ngRoute',
    'ngTouch',
    'ngAnimate'
]);

gameApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
            when('/main', {
                templateUrl: 'views/menu.html',
                controller: 'menuCtrl'
            }).
            when('/camera', {
                templateUrl: 'views/camera.html',
                controller: 'camCtrl'
            }).
            when('/photo', {
                templateUrl: 'views/photo.html',
                controller: 'photoCtrl'
            }).
			when('/game', {
				templateUrl: 'views/game.html',
				controller: 'gameCtrl'
			}).
			otherwise({
				redirectTo: '/main'
			});
	}
]);


gameApp.service('sharedProperties', function () {
    var data = [
        {
        "iconUrl":      "1",
        "iconClass":    "taskIcon",
        "detailUrl":    "Food Package",
        "title":        "Assignment 02",
        "content":      "- due on Sunday!"},
        {
        "iconUrl":      "3",
        "iconClass":    "taskIcon",
        "detailUrl      ":"Food Package",
        "title":        "Mailing",
        "content":      "- Post office closes at 5"},
        {
        "iconUrl":      "7",
        "iconClass":    "taskIcon",
        "detailUrlas":  "Food Package",
        "title":        "Grocery",
        "content":      "- tomato, carrot, milk, egg"},
        {
        "iconUrl":      "2",
        "iconClass":    "taskIcon",
        "detailUrl":    "Food Package",
        "title":        "Tax Filing",
        "content":      "- $ 205"}
    ];
    var getTaskData = function(){
        return data;
    }
    
    var removeTaskData = function(num){
        data.splice (num, 1);
    }

    return {
        getTaskData: getTaskData,
        removeTaskData: removeTaskData
    };
});


//svg error soluation
gameApp.directive('ngX', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngX', function(x) {
                elem.attr('x', x);
            });
        };
    })
    .directive('ngY', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngY', function(y) {
                elem.attr('y', y);
            });
        };
    })
    .directive('ngWidth', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngWidth', function(width) {
                elem.attr('width', width);
            });
        };
    })
    .directive('ngHeight', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngHeight', function(height) {
                elem.attr('height', height);
            });
        };
    })
    .directive('ngCx', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngCx', function(cx) {
                elem.attr('cx', cx);
            });
        };
    })
    .directive('ngCy', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngCy', function(cy) {
                elem.attr('cy', cy);
            });
        };
    })
    .directive('ngR', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngR', function(r) {
                elem.attr('r', r);
            });
        };
    })
    .directive('ngXlinkHref', function () {
        return {
            priority: 99,
            restrict: 'A',
            link: function (scope, element, attr) {
                var attrName = 'xlink:href';
                attr.$observe('ngXlinkHref', function (value) {
                if (!value)
                  return;

                attr.$set(attrName, value);
                });
            }
        };
    });

