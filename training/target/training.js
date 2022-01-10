// Transcrypt'ed from Python, 2022-01-11 00:37:48
var time = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_time__ from './time.js';
__nest__ (time, '', __module_time__);
var __name__ = '__main__';
export var App =  __class__ ('App', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.synth = window.speechSynthesis;
		self.timer_interval = 100;
		self.initial_wait = 1;
		self.running = true;
	});},
	get speak () {return __get__ (this, function (self, text) {
		var su = new SpeechSynthesisUtterance ();
		su.text = text;
		su.lang = 'de-DE';
		self.synth.speak (su);
	});},
	get test () {return __get__ (this, function (self) {
		self.speak ('test');
	});},
	get py_update () {return __get__ (this, function (self) {
		if (self.running == false) {
			self.last_time = time.time ();
			return ;
		}
		var delta = time.time () - self.last_time;
		self.last_time = time.time ();
		self.time_to_wait -= delta;
		if (self.pos >= 0) {
			var __left0__ = self.schedule [self.pos];
			var wait = __left0__ [0];
			var event = __left0__ [1];
		}
		else {
			var __left0__ = tuple ([self.initial_wait, 'waiting...']);
			var wait = __left0__ [0];
			var event = __left0__ [1];
		}
		var curr_wait = str (int (self.time_to_wait) + 1);
		for (var [i, e] of enumerate (self.schedule)) {
			if (i == self.pos) {
				document.getElementById ('wait{}'.format (i)).innerHTML = ('<b>' + str (int (self.time_to_wait))) + '</b>';
				document.getElementById ('phrase{}'.format (i)).innerHTML = '<b>{}</b>'.format (e [1]);
			}
			else {
				document.getElementById ('wait{}'.format (i)).innerHTML = e [0];
				document.getElementById ('phrase{}'.format (i)).innerHTML = e [1];
			}
		}
		if (self.time_to_wait <= 0) {
			self.pos++;
			if (self.pos >= len (self.schedule)) {
				window.clearInterval (self.interval);
				self.pos = -(1);
				return ;
			}
			var wait_time = int (self.schedule [self.pos] [0]);
			self.time_to_wait = wait_time;
			var phrase = self.schedule [self.pos] [1];
			self.speak (phrase);
		}
	});},
	get start () {return __get__ (this, function (self) {
		self.last_time = time.time ();
		self.time_to_wait = self.initial_wait;
		self.pos = -(1);
		self.interval = window.setInterval (self.py_update, self.timer_interval);
		self.running = true;
		document.getElementById ('toggle').innerText = 'pause';
	});},
	get toggle () {return __get__ (this, function (self) {
		if (self.running) {
			self.running = false;
			document.getElementById ('toggle').innerText = 'continue';
		}
		else {
			self.running = true;
			document.getElementById ('toggle').innerText = 'pause';
		}
	});},
	get goto () {return __get__ (this, function (self, i) {
		self.pos = i - 1;
		self.time_to_wait = 0.1;
	});},
	get set_schedule () {return __get__ (this, function (self, schedule_text) {
		var lines = schedule_text.py_split ('\n');
		var lines = (function () {
			var __accu0__ = [];
			for (var line of lines) {
				if (len (line.strip ()) > 3) {
					__accu0__.append (line);
				}
			}
			return __accu0__;
		}) ();
		self.schedule = (function () {
			var __accu0__ = [];
			for (var line of lines) {
				__accu0__.append (line.py_split (';'));
			}
			return __accu0__;
		}) ();
		self.show_table ();
	});},
	get show_table () {return __get__ (this, function (self) {
		var s = '<table border=0>\n            <colgroup>\n                <col style="width:10px">\n                <col style="width:50px">\n            </colgroup>  \n        ';
		for (var [i, e] of enumerate (self.schedule)) {
			var __left0__ = e;
			var wait = __left0__ [0];
			var phrase = __left0__ [1];
			var button = '<td><button onClick="training.app.goto({})">{}</button></td>'.format (i, i);
			s += '<tr>{}<td id="wait{}">{}</td><td  id="phrase{}">{}</td></tr>\t'.format (button, i, wait, i, phrase);
		}
		s += '</table>';
		document.getElementById ('table').innerHTML = s;
	});}
});
export var app = App ();
app.set_schedule (schedule_text);

//# sourceMappingURL=training.map