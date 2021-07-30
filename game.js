var app = new Vue({
	el: '#app',
	data: {
		menu: [
			{name: 'water00', val: 0,},
			{name: 'water01', val: 1,},
			{name: 'water02', val: 2,},
			{name: 'sand00', val: 3,},
			{name: 'grass00', val: 4,},
			{name: 'grass01', val: 5,},
			{name: 'mountain00', val: 6,},
		],
	},
	methods: {
		brushSet: function(v) {
			brush = v;
		}
	}
})

var map = [];
var view = {};

var brush = 0;
var selection = [];
