class Routers {
	constructor() {
		this.routes = {};
		this.currentUrl = '';
		this.refresh = this.refresh.bind(this);
		window.addEventListener('load', this.refresh, false);
		window.addEventListener('hashchange', this.refresh, false);
	}
	route(path, callback) {
		this.routes[path] = callback;
	}
	refresh() {
		this.currentUrl = location.hash.slice(1) || '/';
		this.routes[this.currentUrl]();
	}
}

window.Router = new Routers();
var content = document.querySelector('body');
function changeBg(color) {
	content.style.backgroundColor=color;
}

Router.route('/', function() {
	changeBg('yellow')
})

Router.route('/red', function() {
	changeBg('red')
})
Router.route('/blue', function() {
	changeBg('blue')
})
