var dot = require("dot");
var fs = require('fs'); 
var path = require('path'); 
var colors = require('colors');  

var tempDir = "temp";
var dataDir = "data";
var output = "output";

colors.setTheme({  
    silly: 'rainbow',  
    input: 'grey',  
    verbose: 'cyan',  
    prompt: 'red',  
    info: 'green',  
    data: 'blue',  
    help: 'cyan',  
    suc: 'yellow',  
    debug: 'magenta',  
    error: 'red'  
}); 

fs.readdir(__dirname + '/'+tempDir+'/', function (err, files) {
	if(err){
		console.log(err);
		return
	}
	// console.log(files)
	files.forEach(function (file) {
		if(path.extname(file)!=".html") return;
		fs.readFile(__dirname + '/'+tempDir+'/'+file, 'utf8', function(err,data){  
		    if(err){  
		        console.log(err);  
		    }else{  
		        readDataFile(file, data)
		    }  
		});
	})
});

function readDataFile(file, tempData){
	fs.readFile(__dirname + '/'+dataDir+'/'+path.basename(file, ".html")+'.json', 'utf8', function(err,data){  
	    if(err){  
	        console.log(err);  
	    }else{  
	        // console.log(data);  
	        generator(file, tempData, data)
	    }  
	});
}

function generator(file, tempData, data){
	var template = dot.template(tempData);
	var result = template(data);
	fs.writeFile(__dirname + '/'+output+'/'+file, result, function (err) {
        if (err) throw err;
        else console.log("<<<success>>>".suc)
    });
}

