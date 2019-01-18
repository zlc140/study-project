class Routers {
	constructor() {
		this.routes = {};
		this._bindPopState
	}
	
	init(path) {
		history.replaceState({path: path}, null, path)
	}
	
	route(path, callback) {
		this.routes[path] = callback;
	}
	
	go(path) {
		console.log(path)
		history.pushState({path: path}, null, path);
		this.routes[path] && this.routes[path]();
	}
	
	_bindPopState() {
		window.addEventListener('popstate', e => {
			const path = e.state && e.state.path;
			this.routes[path] && this.routes[path]()
		})
	}
}

window.Router = new Routers();
window.Router.init(location.pathname)
var content = document.querySelector('body');
var Ul = document.querySelector('ul');

function changeBg(color) {
	content.style.backgroundColor = color;
}

Router.route('/', function () {
	changeBg('yellow')
})

Router.route('/red', function () {
	changeBg('red')
})
Router.route('/blue', function () {
	changeBg('blue')
})

Ul.addEventListener('click', (e) => {
	if(e.target.tagName == 'A'){
		e.preventDefault();
		let path = e.target.getAttribute('href').substr(1)
		Router.go(path)
	}
	
})