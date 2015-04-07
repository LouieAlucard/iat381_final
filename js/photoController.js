gameApp.controller('photoCtrl', function ($scope, $document, $routeParams, sharedProperties, $location, $http, $timeout, $window) {

<<<<<<< HEAD
	var farm;
	var server;
	var photoid;
	var secret;
	

=======
>>>>>>> 1cfc32d1bbb966385aae0eca71c6374dfc988a2d
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
<<<<<<< HEAD
	          	var imgContainer = document.createElement('div');
	            var imgElement = document.createElement('img');
	            imgElement.setAttribute('src', photo.value.imgdata);
	            imgElement.setAttribute('alt', photo.value.timestamp);
=======
                var imgContainer = document.createElement('div');
	            var imgElement = document.createElement('img');
	            imgElement.setAttribute('src', photo.value.imgdata);
                  imgElement.setAttribute('alt', photo.value.timestamp);
>>>>>>> 1cfc32d1bbb966385aae0eca71c6374dfc988a2d
	            imgElement.addEventListener("click", function($event){
				    sharedProperties.setImgData(event.target.getAttribute('src'));
				    $window.location.href = '#/game';
				});
	            var imgDelete = document.createElement('img');
<<<<<<< HEAD
	            imgDelete.setAttribute('src', "./img/game/blueSword_l.png");
	            imgDelete.classList.add("deleteBtn");
	            imgDelete.addEventListener("click", function($event){
=======
	            imgDelete.setAttribute('src', "./img/game/buttonDelete.png");
	            imgDelete.classList.add("deleteBtn");
                
                  imgDelete.addEventListener("click", function($event){
>>>>>>> 1cfc32d1bbb966385aae0eca71c6374dfc988a2d
	            	var key = parseInt(event.target.parentNode.childNodes[0].getAttribute("alt"));
	            	
	            	conn.delete({
	        			photos: [key]
	     			}, function (err, insertedKeys) {
	        		if (err) { return console.error(err); }
	      			})
<<<<<<< HEAD

	      			event.target.parentNode.remove();

				});
=======
	            	console.log("shit");
                      event.target.parentNode.remove();
                  });
>>>>>>> 1cfc32d1bbb966385aae0eca71c6374dfc988a2d

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
    
    $scope.flickrKey = "flickr search";

<<<<<<< HEAD
	
	$scope.flickrKey = "dragon";

=======
>>>>>>> 1cfc32d1bbb966385aae0eca71c6374dfc988a2d
	$scope.flickrSearch = function () {
		var flickr = new Flickr({
		  api_key: "a922ffe639ea2cc29b9ece5cea2c0399"
		});
<<<<<<< HEAD

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


	

=======

		flickr.photos.search({
		  text: $scope.flickrKey+" face"
		}, function(err, result) {
		  if(err) { throw new Error(err); }
            var gallery = document.getElementById('gallery-flickr');
			  	gallery.innerHTML = '';
>>>>>>> 1cfc32d1bbb966385aae0eca71c6374dfc988a2d

		  	for (i = 0; i < 6; i++) {
			  	var imglink = "https://farm"+result.photos.photo[i].farm+".staticflickr.com/"+result.photos.photo[i].server+"/"+result.photos.photo[i].id+"_"+result.photos.photo[i].secret+".jpg" 
			  	var ele = document.createElement('div');
                var heightset = document.getElementById("list").childNodes[0].clientHeight;
                
	            ele.style.backgroundImage = "url("+imglink+")";
                ele.style.height = heightset + "px";
                ele.style.backgroundSize = "120% 120%";
	            ele.addEventListener("click", function($event){
				    sharedProperties.setImgData(imglink);
				    $window.location.href = '#/game';
				});
                
			  	
                gallery.appendChild(ele);
		  	}

		  	
		  	
		});
	}
});


