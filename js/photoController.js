gameApp.controller('photoCtrl', function ($scope, $document, $routeParams, sharedProperties, $location, $http, $timeout, $window) {

	var farm;
	var server;
	var photoid;
	var secret;
	

	sklad.open('photo_store', {
	  version: 1,
	  migration: {
	    '1': function (database) {
	      var objStore = database.createObjectStore('photos', {
	        autoIncrement: true,
	        keyPath: 'timestamp'
	      });
	      objStore.createIndex('imgdata_search', 'imgdata', {unique: true});
	    },
	    '2': function (database) {
	    }
	  }
	}, 

	function (err, conn) {
	  if (err) { throw err; }
	  $(function () {

	    var $list = $('#list')
	    function updateRows(conn) {
	      conn
	        .get({
	          photos: {imgdata: sklad.DESC, index: 'imgdata_search'}
	        }, function (err, data) {
	          if (err) { return console.error(err); }

	          // TODO: do stuff here.
	          $list.empty();
	          data.photos.forEach(function (photo) {
	          	var imgContainer = document.createElement('div');
	            var imgElement = document.createElement('img');
	            imgElement.setAttribute('src', photo.value.imgdata);
	            imgElement.setAttribute('alt', photo.value.timestamp);
	            imgElement.addEventListener("click", function($event){
				    sharedProperties.setImgData(event.target.getAttribute('src'));
				    $window.location.href = '#/game';
				});
	            var imgDelete = document.createElement('img');
	            imgDelete.setAttribute('src', "./img/game/blueSword_l.png");
	            imgDelete.classList.add("deleteBtn");
	            imgDelete.addEventListener("click", function($event){
	            	var key = parseInt(event.target.parentNode.childNodes[0].getAttribute("alt"));
	            	
	            	conn.delete({
	        			photos: [key]
	     			}, function (err, insertedKeys) {
	        		if (err) { return console.error(err); }
	      			})

	      			event.target.parentNode.remove();

				});

				imgContainer.appendChild(imgElement);
				imgContainer.appendChild(imgDelete);
	            $list.append(imgContainer);
	          })
	        });
	    }
	    updateRows(conn);

	    var $delete = $('.deleteBtn');
	    
	 
	    $delete.click(function () {
	     	conn.delete({
	        	photos: [1428103798744]
	     	}, function (err, insertedKeys) {
	        	if (err) { return console.error(err); }
	      	})

	     

	    	console.log($delete);
	    });
	  });
	}
	);

	
	$scope.flickrKey = "dragon";

	$scope.flickrSearch = function () {
		var flickr = new Flickr({
		  api_key: "a922ffe639ea2cc29b9ece5cea2c0399"
		});

		flickr.photos.search({
		  text: $scope.flickrKey
		}, function(err, result) {
		  if(err) { throw new Error(err); }
		  	for (i = 0; i < 5; i++) {
			  	var imglink = "https://farm"+result.photos.photo[i].farm+".staticflickr.com/"+result.photos.photo[i].server+"/"+result.photos.photo[i].id+"_"+result.photos.photo[i].secret+".jpg" 
			  	var ele = document.createElement('img');
	            ele.setAttribute('src', imglink);
	            ele.addEventListener("click", function($event){
				    sharedProperties.setImgData(event.target.getAttribute('src'));
				    $window.location.href = '#/game';
				});

			  	var gallery = document.getElementById('gallery-flickr');
			  	gallery.innerHTML = '';
			  	gallery.appendChild(ele);
		  	}

		  	
		  	
		});
	}


	



});


