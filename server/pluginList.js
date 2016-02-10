const fs = require('fs');
const path = require('path');
var pluginPath = path.join(__dirname, "../plugins/");

var getPlugins = function(){
	
	this.readPluginDir = function(){
		try{
			this.dir = fs.readdirSync(pluginPath);
		}
		catch(e){
			throw(e);
		}
	}
}

var plugins = new getPlugins();
plugins.readPluginDir();

console.log(plugins.dir);