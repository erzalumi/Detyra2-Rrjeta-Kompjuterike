//include nessecary modules
var fs = require('fs'),
    path = require('path'),
    url = require('url');
var imageDir = 'C:/users/ernah/onedrive/desktop/Line Up Fotos/';
 
function reader(req,res){
        listImages(req,res);
            //read the image using fs and send the image content back in the response
        if(typeof pic !== 'undefined'){
            fs.readFile(imageDir + pic, function (err, content) {
                if (err) {
                    res.writeHead(400, {'Content-type':'text/html'})
                    console.log(err);
                    res.end("No such image");    
                } else {
                    //specify that content type in the response will be an image of jpg type
                    res.writeHead(200,{'Content-type':'image/jpg'});
                    res.end(content);
                }
            });
        }
            
}

//list names of img files in html page
function listImages(req, res){
    var query = url.parse(req.url,true).query;
    pic = query.image;
if (typeof pic === 'undefined') {
    getImages(imageDir, function (err, files) {
        res.writeHead(200, {'Content-type':'text/html'});
        res.write("List of files in directory:\n");
        var imageLists = '<ul>';
        for (var i=0; i<files.length; i++) {
            imageLists += '<li><a href="/?image=' + files[i] + '"></a>' + files[i] + '</li>';
        }
        imageLists += '</ul>';
        res.end(imageLists);
    });
}
}

 
//get the list of jpg files in the image dir
function getImages(imageDir, callback) {
    var fileType = '.jpg',
        files = [], i;
    fs.readdir(imageDir, function (err, list) {
        for(i=0; i<list.length; i++) {
            if(path.extname(list[i]) === fileType) {
                files.push(list[i]); //store the file name into the array files
            }
        }
        callback(err, files);
    });
}

module.exports = {
    reader, 
}

