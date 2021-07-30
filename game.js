var app = new Vue({
	el: '#app',
	data: {
		menu: [
			{color: 'white', name: 'empty', val: 0,},
			{color: 'black', name: 'filled', val: 1,},
		],
	},
	methods: {
		brushSet: function(v) {
			brush = v;
		}
	}
})

var brush = 0;
var map = [];
var view = {};
var easystar = new EasyStar.js();
var selection = [];

// Log a message
function logMeta(m) {
    console.log(m);
}

