const fs = require('fs');
const path = require('path');
var pluginPath = path.join(__dirname, "../plugins/");

var getPlugins = function(){
	
	this.readPluginDir = function(){
		try{
			return fs.readdirSync(pluginPath);
		}
		catch(e){
			throw(e);
		}
	};
	this.getPlugins = function(){
		this.dir = this.readPluginDir();
		this.plugins = [];
		
		for(var i=0; i < this.dir.length; i++){
			try{
				var thisDir = fs.readFileSync(pluginPath + this.dir[i] + "/main.js");
				if(thisDir){
					this.plugins.push(this.dir[i]);
				}
			}
			catch(e){
				throw(e);
			}
		}
	};
	
};

var plugins = new getPlugins();
plugins.getPlugins();

console.log(plugins);

module.exports = plugins;