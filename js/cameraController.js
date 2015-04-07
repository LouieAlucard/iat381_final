gameApp.controller('camCtrl', function ($scope, $document, $routeParams, sharedProperties, $location, $http, $timeout) {

  	


	navigator.getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
    );
 
    navigator.getUserMedia({
      video: true
    }, function (localMediaStream) {
 
        var video = document.querySelector('video');
        video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
 
        var button = document.getElementById('Camerabutton');
        button.onclick = function () {
            var canvas = document.createElement('canvas');
            var w = 450;
            var h = 450;
            canvas.width  = w;
            canvas.height = h;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, w, h);


            var imgData = canvas.toDataURL("img/png");
            //console.log(imgData);
            
            //eCardAppService.setUserImage(imgData);
            document.getElementById('cameraIMG').setAttribute( 'src', imgData);

            var v = document.getElementById('cameraVideo');
            v.style.display = 'none';

    
        }
 
    }, function (err) {
      alert(err);
    });


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

	    var $save = $('#save');
	 
	    $save.click(function () {
	      var imgD = document.getElementById('svgimgtest').getAttribute('xlink:href');

	      sharedProperties.setImgData(imgD);
		  $window.location.href = '#/game';

	      
	      conn.insert({
	        photos: [
	          { 
	            timestamp: Date.now(),
	            imgdata: imgD
	          }
	        ]
	      }, function (err, insertedKeys) {
	        if (err) { return console.error(err); }
	      })

	      //console.log(imgD);
	    });
	  });
	}
	);



});


