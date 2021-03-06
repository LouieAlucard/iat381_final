gameApp.controller('camCtrl', function ($scope, $document, $routeParams, sharedProperties, $location, $http, $timeout, $window) {

    $scope.videoHeight = window.innerHeight * 0.8;
    

    //Get device Camera
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
        
        var ow = document.getElementsByClassName("cameraContainer")[0].offsetWidth;
        //console.log(ow);
 
        var button = document.getElementById('Camerabutton');
        button.onclick = function () {
            var v = document.getElementById("cameraVideo");
            
            var canvas = document.createElement('canvas');
            var w = v.videoWidth ;
            var h = v.videoHeight;
            canvas.width  = w;
            canvas.height = h;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, w, h);


            var imgData = canvas.toDataURL("img/png");
            //console.log(imgData);
            
            //eCardAppService.setUserImage(imgData);
            var cI = document.getElementById('cameraIMG');
            cI.setAttribute( 'src', imgData);
            cI.style.display = "block";
            
            
            var pface = document.getElementById('pirateFace');
            pface.style.height = cI.clientHeight+"px";
            
            


            v.style.display = "none";

            var btn1 = document.getElementById("retake");
            var btn2 = document.getElementById("save");
            
            btn1.style.visibility = "visible";
            btn2.style.visibility = "visible";
        }
 
    }, function (err) {
      alert(err);
    });
    
    
     $scope.retake = function() {
            var v = document.getElementById("cameraVideo");
            v.style.display = "block";
            
            var cI = document.getElementById('cameraIMG');
            cI.style.display = "none";
         
            var btn1 = document.getElementById("retake");
            var btn2 = document.getElementById("save");
            
            btn1.style.visibility = "hidden";
            btn2.style.visibility = "hidden";
        }


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
	      var imgD = document.getElementById('cameraIMG').getAttribute('src');
        
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

	      console.log(imgD);
	    });
	  });
	}
	);



});


