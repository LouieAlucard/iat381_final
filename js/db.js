var dbName = 'photo_store';
 

sklad.open(dbName, {
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
            var imgElement = document.createElement('img');
            imgElement.setAttribute('src', photo.value.imgdata);
            $list.append(imgElement);
          })
        });
    }
    updateRows(conn);



    var $save = $('#save');
 
    $save.click(function () {
      var imgD = document.getElementById('svgimgtest').getAttribute('xlink:href');

      
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