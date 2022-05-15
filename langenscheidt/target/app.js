// Transcrypt'ed from Python, 2022-05-15 13:27:52
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
export var App =  __class__ ('App', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.canvas = document.getElementById ('my_canvas');
		self.canvas.width = 500;
		self.canvas.height = 750;
		self.ctx = self.canvas.getContext ('2d');
		self.img = document.getElementById ('my_img');
	});},
	get button_click () {return __get__ (this, function (self) {
		var py_name = document.getElementById ('my_input').value;
		app.draw (py_name);
	});},
	get draw () {return __get__ (this, function (self, py_name) {
		self.ctx.drawImage (self.img, 0, 0);
		self.ctx.font = 'bold 42px arial';
		self.ctx.fillStyle = '#0A92BF';
		var txt1 = '{} - deutsch'.format (py_name);
		var txt2 = 'deutsch - {}'.format (py_name);
		var x = 60;
		var y = 580;
		self.ctx.fillText (txt1, x, y);
		self.ctx.fillText (txt2, x, y + 50);
	});}
});
export var app = App ();
app.button_click ();

//# sourceMappingURL=app.map