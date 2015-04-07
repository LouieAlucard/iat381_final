gameApp.controller('photoCtrl', function ($scope, $document, $routeParams, sharedProperties, $location, $http, $timeout, $window) {

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
	            imgDelete.setAttribute('src', "./img/game/buttonDelete.png");
	            imgDelete.classList.add("deleteBtn");
                
                  imgDelete.addEventListener("click", function($event){
	            	var key = parseInt(event.target.parentNode.childNodes[0].getAttribute("alt"));
	            	
	            	conn.delete({
	        			photos: [key]
	     			}, function (err, insertedKeys) {
	        		if (err) { return console.error(err); }
	      			})
	            	console.log("shit");
                      event.target.parentNode.remove();
                  });

				imgContainer.appendChild(imgElement);
				imgContainer.appendChild(imgDelete);
	            $list.append(imgContainer);
	          })
	        });
	    }
	    updateRows(conn);
	  });
	}
	);
    
    $scope.flickrKey = "type somthing";

	$scope.flickrSearch = function () {
		var flickr = new Flickr({
		  api_key: "a922ffe639ea2cc29b9ece5cea2c0399"
		});

		flickr.photos.search({
		  text: $scope.flickrKey+" face"
		}, function(err, result) {
		  if(err) { throw new Error(err); }
            var gallery = document.getElementById('gallery-flickr');
			  	gallery.innerHTML = '';

		  	for (i = 0; i < 6; i++) {
			  	var imglink = "https://farm"+result.photos.photo[i].farm+".staticflickr.com/"+result.photos.photo[i].server+"/"+result.photos.photo[i].id+"_"+result.photos.photo[i].secret+".jpg" 
			  	var ele = document.createElement('div');
                var heightset = document.getElementById("list").childNodes[1];
                
	            ele.style.backgroundImage = "url("+imglink+")";
                if (heightset != null) {
                    ele.style.height = heightset.clientHeight + "px";
                    console.log(heightset.clientHeight);
                } else {
                    ele.style.height = "180px";
                    console.log("1");
                }
                
                ele.style.backgroundSize = "110% 110%";
	            ele.addEventListener("click", function($event){
				    sharedProperties.setImgData(imglink);
				    $window.location.href = '#/game';
				});
                
			  	
                gallery.appendChild(ele);
		  	}

		  	
		  	
		});
	}
});


