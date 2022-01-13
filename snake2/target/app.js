// Transcrypt'ed from Python, 2022-01-13 22:52:49
var random = {};
var time = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_time__ from './time.js';
__nest__ (time, '', __module_time__);
import * as __module_random__ from './random.js';
__nest__ (random, '', __module_random__);
var __name__ = '__main__';
export var g_width = 20;
export var g_height = 15;
export var g_posx = 50;
export var g_posy = 60;
export var g_size = 25;
export var canvas = document.getElementById ('canvas');
export var ctx = canvas.getContext ('2d');
export var clear_canvas = function () {
	ctx.fillStyle = 'lightgray';
	ctx.fillRect (0, 0, canvas.width, canvas.height);
};
export var draw_field = function () {
	ctx.strokeStyle = 'gray';
	ctx.beginPath ();
	var x0 = g_posx;
	var x1 = g_posx + g_width * g_size;
	for (var j = 0; j < g_height + 1; j++) {
		var y = g_posy + j * g_size;
		ctx.moveTo (x0, y);
		ctx.lineTo (x1, y);
	}
	ctx.stroke ();
	var y0 = g_posy;
	var y1 = g_posy + g_height * g_size;
	for (var i = 0; i < g_width + 1; i++) {
		var x = g_posx + i * g_size;
		ctx.moveTo (x, y0);
		ctx.lineTo (x, y1);
	}
	ctx.stroke ();
	ctx.strokeStyle = 'black';
	ctx.strokeRect (g_posx, g_posy, g_width * g_size, g_height * g_size);
};
export var Block =  __class__ ('Block', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, x, y, color) {
		if (typeof color == 'undefined' || (color != null && color.hasOwnProperty ("__kwargtrans__"))) {;
			var color = 'darkgreen';
		};
		self.x = __mod__ (x, g_width);
		self.y = __mod__ (y, g_height);
		self.color = color;
	});},
	get place () {return __get__ (this, function (self, x, y) {
		self.x = __mod__ (int (x), g_width);
		self.y = __mod__ (int (y), g_height);
	});},
	get is_inside () {return __get__ (this, function (self) {
		if ((0 <= self.x && self.x < g_width) && (0 <= self.y && self.y < g_height)) {
			return true;
		}
		else {
			return false;
		}
	});},
	get move () {return __get__ (this, function (self, dx, dy) {
		self.x += dx;
		self.y += dy;
		self.x = __mod__ (self.x, g_width);
		self.y = __mod__ (self.y, g_height);
	});},
	get draw () {return __get__ (this, function (self) {
		ctx.fillStyle = self.color;
		var x0 = g_posx + self.x * g_size;
		var y0 = g_posy + self.y * g_size;
		ctx.fillRect (x0, y0, g_size, g_size);
	});}
});
export var Snake =  __class__ ('Snake', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		var xm = Math.floor (g_width / 2);
		var ym = Math.floor (g_height / 2);
		self.blocks = [];
		var initial_block_len = 3;
		for (var i = 0; i < initial_block_len; i++) {
			self.blocks.append (Block (xm - i, ym));
		}
		self.dx = 1;
		self.dy = 0;
		self.is_growing = false;
		self.apple = Block (0, 0, 'red');
		self.place_apple ();
	});},
	get set_dir () {return __get__ (this, function (self, dx, dy) {
		self.dx = dx;
		self.dy = dy;
	});},
	get place_apple () {return __get__ (this, function (self) {
		var x = random.random () * g_width;
		var y = random.random () * g_height;
		self.apple.place (x, y);
	});},
	get py_update () {return __get__ (this, function (self) {
		var i = len (self.blocks);
		var __left0__ = tuple ([self.blocks [i - 1].x, self.blocks [i - 1].y]);
		var x_last = __left0__ [0];
		var y_last = __left0__ [1];
		for (var i = i - 1; i > 0; i--) {
			var __left0__ = tuple ([self.blocks [i - 1].x, self.blocks [i - 1].y]);
			self.blocks [i].x = __left0__ [0];
			self.blocks [i].y = __left0__ [1];
		}
		self.blocks [0].move (self.dx, self.dy);
		if (self.growing) {
			var new_block = Block (x_last, y_last);
			self.blocks.append (new_block);
			self.growing = false;
		}
		self.check_apple_coll ();
	});},
	get check_apple_coll () {return __get__ (this, function (self) {
		var x0 = self.blocks [0].x;
		var y0 = self.blocks [0].y;
		var x1 = self.apple.x;
		var y1 = self.apple.y;
		if (x0 == x1 && y0 == y1) {
			self.grow ();
			self.place_apple ();
		}
	});},
	get grow () {return __get__ (this, function (self) {
		self.growing = true;
	});},
	get draw () {return __get__ (this, function (self) {
		for (var block of self.blocks) {
			block.draw ();
		}
		self.apple.draw ();
	});}
});
export var Game =  __class__ ('Game', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.snake = Snake ();
		document.addEventListener ('keydown', self.key_event);
	});},
	get py_update () {return __get__ (this, function (self) {
		self.snake.py_update ();
	});},
	get draw () {return __get__ (this, function (self) {
		clear_canvas ();
		draw_field ();
		self.snake.draw ();
	});},
	get key_event () {return __get__ (this, function (self, e) {
		if (e.key == 'ArrowUp') {
			self.snake.set_dir (0, -(1));
		}
		if (e.key == 'ArrowDown') {
			self.snake.set_dir (0, 1);
		}
		if (e.key == 'ArrowRight') {
			self.snake.set_dir (1, 0);
		}
		if (e.key == 'ArrowLeft') {
			self.snake.set_dir (-(1), 0);
		}
		if (e.key == ' ') {
			self.snake.grow ();
		}
	});}
});
export var game = Game ();
export var g_time = 0;
export var g_takt = 0.2;
export var game_loop = function () {
	if (time.time () - g_time > g_takt || g_time == 0) {
		game.py_update ();
		game.draw ();
		g_time = time.time ();
	}
	window.requestAnimationFrame (game_loop);
};
game_loop ();

//# sourceMappingURL=app.map