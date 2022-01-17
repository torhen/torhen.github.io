// Transcrypt'ed from Python, 2022-01-17 14:32:31
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
export var change = function (s) {
	var price = document.getElementById ('price').value;
	var kw = document.getElementById ('kw').value;
	if (s == 'w') {
		var v = document.getElementById ('price').value;
		var price = v;
	}
	if (s == 'w') {
		var v = document.getElementById ('w').value;
		var kw = v / 1000;
	}
	if (s == 'kw') {
		var v = document.getElementById ('kw').value;
		var kw = v;
	}
	if (s == 'kwh_per_day') {
		var v = document.getElementById ('kwh_per_day').value;
		var kw = float (v) / 24;
	}
	if (s == 'chf_per_day') {
		var v = document.getElementById ('chf_per_day').value;
		var kw = (float (v) / 24) / price;
	}
	if (s == 'kwh_per_month') {
		var v = document.getElementById ('kwh_per_month').value;
		var kw = (float (v) / 24) / 30;
	}
	if (s == 'chf_per_month') {
		var v = document.getElementById ('chf_per_month').value;
		var kw = ((float (v) / 24) / 30) / price;
	}
	if (s == 'kwh_per_year') {
		var v = document.getElementById ('kwh_per_year').value;
		var kw = (float (v) / 24) / 365;
	}
	if (s == 'chf_per_year') {
		var v = document.getElementById ('chf_per_year').value;
		var kw = ((float (v) / 24) / 365) / price;
	}
	document.getElementById ('w').value = round (kw * 1000, 1);
	document.getElementById ('kw').value = round (kw, 1);
	document.getElementById ('kwh_per_day').value = round (kw * 24, 1);
	document.getElementById ('chf_per_day').value = round ((kw * 24) * price, 2);
	document.getElementById ('kwh_per_month').value = round ((kw * 24) * 30, 0);
	document.getElementById ('chf_per_month').value = round (((kw * 24) * 30) * price, 2);
	document.getElementById ('kwh_per_year').value = round ((kw * 24) * 365, 0);
	document.getElementById ('chf_per_year').value = round (((kw * 24) * 365) * price, 2);
};
change ('kw');

//# sourceMappingURL=app.map