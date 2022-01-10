// Transcrypt'ed from Python, 2022-01-10 23:39:33
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
export var swiss_wgs = function (sX, sY) {
	var sX = str (sX);
	var sY = str (sY);
	if (sX.strip () [0].isdigit ()) {
		var x = float (sX);
		var y = float (sY);
		var x1 = (x - 600000) / 1000000;
		var y1 = (y - 200000) / 1000000;
		var L = (((2.6779094 + 4.728982 * x1) + (0.791484 * x1) * y1) + ((0.1306 * x1) * y1) * y1) - ((0.0436 * x1) * x1) * x1;
		var p = ((((16.9023892 + 3.238272 * y1) - (0.270978 * x1) * x1) - (0.002528 * y1) * y1) - ((0.0447 * x1) * x1) * y1) - ((0.014 * y1) * y1) * y1;
		return tuple ([(L * 100) / 36, (p * 100) / 36]);
	}
	else {
		return tuple ([-(1), -(1)]);
	}
};
export var wgs_swiss = function (sLon, sLat) {
	var sLon = str (sLon);
	var sLat = str (sLat);
	if (sLon.strip () [0].isdigit ()) {
		var Lon = float (sLon);
		var Lat = float (sLat);
		var p = (Lat * 3600 - 169028.66) / 10000;
		var L = (Lon * 3600 - 26782.5) / 10000;
		var y = ((((200147.07 + 308807.95 * p) + (3745.25 * L) * L) + (76.63 * p) * p) - ((194.56 * L) * L) * p) + ((119.79 * p) * p) * p;
		var x = (((600072.37 + 211455.93 * L) - (10938.51 * L) * p) - ((0.36 * L) * p) * p) - ((44.54 * L) * L) * L;
		return tuple ([x, y]);
	}
	else {
		return tuple ([-(1), -(1)]);
	}
};
export var conv_line = function (s) {
	var __left0__ = s.py_split ();
	var x = __left0__ [0];
	var y = __left0__ [1];
	if (float (x) > 360) {
		var __left0__ = swiss_wgs (x, y);
		var lon = __left0__ [0];
		var lat = __left0__ [1];
	}
	else {
		var __left0__ = wgs_swiss (x, y);
		var lon = __left0__ [0];
		var lat = __left0__ [1];
	}
	var lon = str (lon).__getslice__ (0, 9, 1);
	var lat = str (lat).__getslice__ (0, 9, 1);
	return '<tr><td>{}</td><td>{}</td></tr>'.format (lon, lat);
};
export var convert = function () {
	var s = document.getElementById ('input').value;
	var lines = s.py_split ('\n');
	var r = '<table border=1>';
	for (var line of lines) {
		r += conv_line (line);
	}
	r += '</table>';
	document.getElementById ('out').innerHTML = r;
};

//# sourceMappingURL=convert.map