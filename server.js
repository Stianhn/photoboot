var express = require('express');
var exec = require('child_process').exec;
var app = express();
var tmpFolder = "tmp_pictures";
var imageFolder = "images/";


app.use('/', express.static("client"));
app.use('/' + tmpFolder, express.static(tmpFolder));
app.use('/show', express.static('show'));
app.use('/images', express.static('images'));


app.get('/', function (req, res) {
  res.send("Hello world");
});

app.get('/picture', function (req, res) {
  exec('ls', function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
  res.json({path: tmpFolder + "/pic.jpg"});
});


app.delete('/picture/:name', function (req, res) {
  console.log('Dat param: ' + tmpFolder + '/' +req.params.name);
  exec('rm -f '+ tmpFolder + '/' + req.params.name, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
  res.send('DELETE request to homepage -' + req.param('name'));
});

app.put('/picture/:name', function (req, res) {
  exec('mv ' + tmpFolder + '/' + req.params.name + ' ' + imageFolder, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
  res.send('STORING image');
})

var server = app.listen(8080, function () {
  console.log("Server up and running");
});

