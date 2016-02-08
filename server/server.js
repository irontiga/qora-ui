const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Nes = require('nes');
const routes = require('./routes');

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



server.route(routes);

server.start((err) => {

	if (err) {
		throw err;
	}

	console.log('Server running at:', server.info.uri);
});