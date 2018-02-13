const url = require('url');
const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Nes = require('nes');
const routes = require('./routes');
const pluginRoutes = require('./pluginRoutes');
const h2o2 = require('h2o2')

// ELECTRONNN
// Being used purely as a browser window - none of it's node integrations are used
const {app, BrowserWindow} = require('electron');

const server = new Hapi.Server({
	connections: {
		routes: {
			files: {
				relativeTo: Path.join(__dirname, '../')
			}
		}
	}
});
server.connection({ port: 3000 });

server.register(Inert, () => {});
server.register(h2o2, () => {});



server.route(routes);

server.start((err) => {

	if (err) {
		throw err;
	}

	console.log('Server running at:', server.info.uri);
});


const pluginServer = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '../')
            }
        }
    }
});
pluginServer.connection({ port: 3001 });

pluginServer.register(Inert, () => {});
pluginServer.register(h2o2, () => {});



pluginServer.route(pluginRoutes);

pluginServer.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Plugin server running at:', pluginServer.info.uri);
});

