"use strict";
if(!('U' in window)) window.U = {};
if(!('__set' in window.U)){
	window.U.__set = (key, val) => {
		if(!(key in window.U))
			U[key] = val;
	};
}

U.__set('onload', (func_call) => {
	document.addEventListener('DOMContentLoaded', () => {
		func_call();
	});
});
U.__set('init', () => {
	U.__set('isMobile', (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)));
	if('start' in window.U && typeof U.start == 'function') U.start();
});
U.__set('$id', (sel, from) => {
	from = (from || document);
	let prop = 'getElementById';
	return (prop in from) ? from[prop](sel) : undefined;
});
U.__set('$name', (sel, from) => {
	from = (from || document);
	let prop = 'getElementsByName';
	return (prop in from) ? from[prop](sel) : undefined;
});
U.__set('$tagName', (sel, from) => {
	from = (from || document);
	let prop = 'getElementsByTagName';
	return (prop in from) ? from[prop](sel) : undefined;
});
U.__set('$get', (sel, from) => {
	from = (from || document);
	let prop = 'querySelector';
	return (prop in from) ? from[prop](sel) : undefined;
});
U.__set('$gets', (sel, from) => {
	from = (from || document);
	let prop = 'querySelectorAll';
	return (prop in from) ? from[prop](sel) : undefined;
});
U.__set('issetRecursive', (obj, keys) => {
	if(obj.hasOwnProperty(keys[0])){
		let key = keys[0];
		keys.splice(0, 1);
		if(keys.length == 0)
			return true;
		return U.issetRecursive(obj[key], keys, 1);
	} else {
		return false;
	}
});
U.__set('hide', (elem) => {
	// U.addPropToObjIf(elem, 'ea-data', {});
	// U.addPropToObjIf(elem['ea-data'], 'show-hide' , {});
	// let visi = elem.style.visibility;
	// let disp = elem.style.display;
	// visi = visi !== 'hidden' ? visi : 'visible';
	// disp = disp !== 'none' ? disp : 'block';
	// elem['ea-data']['show-hide'].visibility = visi;
	// elem['ea-data']['show-hide'].display = disp;
	elem.style.visibility = 'hidden';
	elem.style.display = 'none';
});
U.__set('show', (elem) => {
	// elem.style.visibility = (elem['ea-data']['show-hide'].visibility) ? elem['ea-data']['show-hide'].visibility : 'visible';
	// elem.style.display = (elem['ea-data']['show-hide'].display) ? elem['ea-data']['show-hide'].display : 'block';
	elem.style.visibility ='';
	elem.style.display = '';
});
U.__set('log_mess', 'log_mess');
U.__set('log', (mes) => {
	window[U.log_mess] = mes;
	window.console.log(mes);
});
U.__set('getAttr', (from, name) => {
	return from.getAttribute(name);
});
U.__set('attr', (from, name) => {
	return U.getAttr(from, name);
});
U.__set('setAttr', (from, name, val) => {
	return from.setAttribute(name, val);
});
U.__set('hasAttr', (from, name) => {
	return from.hasAttribute(name);
});
U.__set('each', (arr, call_func) => {
	if (arr.forEach){
		arr.forEach(call_func);
	} else {
		for (var i = 0; i < arr.length; i++) {
			call_func(arr[i], i);
		}
	}
});
U.__set('eachMap', (the_map, call_func) => {
	for (let prop in the_map) {
		if (the_map.hasOwnProperty(prop)) {
			call_func(prop, the_map[prop]);
		}
	}
});
U.__set('__ofElemsFunc', (to, call_func) => {
	if(typeof to == 'string') {
		U.each(U.$gets(to), call_func);
	} else if(Array.isArray(to) || to.length != undefined){
		U.each(to, call_func);
	} else {
		U.each([to], call_func);
	}
});
U.__set('__ofElemFunc', (to, call_func) => {
	if(typeof to == 'string') {
		return call_func(U.$get(to));
	} else {
		return call_func(to);
	}
});
U.__set('click', (to, func) => {
	U.__ofElemsFunc(to, (item, index) => {
		item.onclick = func;
	});
});
U.__set('addClass', (to, cl) => {
	U.__ofElemsFunc(to, (item) => {
		item.classList.add(cl);
	});
});
U.__set('remClass', (to, cl) => {
	U.__ofElemsFunc(to, (item) => {
		item.classList.remove(cl);
	});
});
U.__set('hasClass', (to, cl) => {
	return U.__ofElemFunc(to, (item) => {
		let className = " " + cl + " ";
		return ( (" " + item.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1 );
	});
});
U.__set('toggleClass', (to, class_name) => {
	U.__ofElemsFunc(to, (item) => {
		if ('classList' in item) { 
			item.classList.toggle(class_name);
		} else {
			// For IE9
			let classes = item.className.split(' ');
			let i = classes.indexOf(class_name);

			if (i >= 0) 
				classes.splice(i, 1);
			else 
				classes.push(class_name);
			item.className = classes.join(' '); 
		}
	});
});
U.__set('parent', (to) => {
	return U.__ofElemFunc(to, (item) => {
		return item.parentElement;
	});
});
U.__set('parents', (to, parent) => {
	return U.__ofElemFunc(to, (item) => {
		return item.closest(parent);
	});
});
U.__set('html', (to, val) => {
	if(val !== undefined) to.innerHTML = val;
	return to.innerHTML;
});
U.__set('textContent', ('textContent' in document) ? 'textContent' : 'innerText');
U.__set('text', (to, val) => {
	if(val !== undefined) to[U.textContent] = val;
	return to[U.textContent];
});
U.__set('random', (min, max, not_in) => {

	if(min === undefined && max === undefined)
		return Math.random();

	if (max === undefined) {
		max = min;
		min = 0;
	}

	let val;
	let __rand = (min, max) => {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	val = __rand(min, max);
	if (not_in !== undefined) {
		if (Array.isArray(not_in)) {
			while (not_in.includes(val))
				val = __rand(min, max);
		} else if (Number.isInteger(not_in)){
			while (not_in == val)
				val = __rand(min, max);
		}
	}
	return val;
});
U.__set('hover', (elem, over, out) => {
	// elem.onmouseover = over;
	// elem.onmouseout = out;
	elem.onmouseenter = over;
	elem.onmouseleave = out;
});
U.__set('addPropToObjIf', (obj, prop, val) => {
	prop in obj || (obj[prop] = val);
});
U.__set('create', (tagName, options) => {
	return document.createElement(tagName, options);
});
U.__set('append', (to, elem) => {
	to.appendChild(elem);
});
U.__set('clone', (elem) => {
	return elem.cloneNode();
});
U.__set('css', (to, data) => {
	U.__ofElemsFunc(to, (item) => {
		U.eachMap(data, (key, val)=>{
			item.style[key] = val;
		});
	});
});

document.addEventListener('DOMContentLoaded', function(){

	U.init();

// emmet attr
	let nodeList = U.$tagName('*');

	let emmets = {
		'w' : 'width', 'mx-h' : 'max-height', 'mn-h' : 'min-height',
		'h' : 'height', 'mx-w' : 'max-width', 'mn-w' : 'min-width',

		'f' : 'font', 'ff' : 'font-family', 'fs' : 'font-style', 'fw' : 'font-weight', 'fz' : 'font-size',
		'lh' : 'line-height',

		'p' : 'padding', 'pt' : 'padding-top', 'pr' : 'padding-right', 'pb' : 'padding-bottom', 'pl' : 'padding-left',
		'm' : 'margin', 'mt' : 'margin-top', 'mr' : 'margin-right', 'mb' : 'margin-bottom', 'ml' : 'margin-left',
		't' : 'top', 'r' : 'right', 'b' : 'bottom', 'l' : 'left',

		'bd' : 'border', 'bdw' : 'border-width', 'bdc' : 'border-color', 'bds' : 'border-style',
		'bdt' : 'border-top', 'bdb' : 'border-bottom', 'bdr' : 'border-right', 'bdl' : 'border-left',

		'c' : 'color',
		'bg' : 'background', 'bgi' : 'background-image', 'bgc' : 'background-color', 'bgsz' : 'background-size',
	};

	let xPathRes = document.evaluate ( "//*[@ea]//*", U.$tagName('html')[0], null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	let actualSpan = xPathRes.iterateNext ();
	while (actualSpan) {
		U.addPropToObjIf(actualSpan, 'ea-data', {});
		U.addPropToObjIf(actualSpan['ea-data'], 'hover_s', []);

		let get_attrs = (name) => {
			return U.getAttr(actualSpan, name).split(' ');
		};
		let get_data = (item) => {
			if (item === '') return {};
			let items = item.split('=');
			return {
				value: items[1].split(':').join(' '),
				prop: emmets[items[0]],
			}
		};

		let for_attr_call = (name, call_func) => {
			if (U.hasAttr(actualSpan, name)) {
				let attrs = get_attrs(name);
				U.each(attrs, (item) => {
					let data = get_data(item);
					if(data.prop !== undefined && data.value.trim() != "")
						call_func(data);
				});
			}
		};

		for_attr_call('ea-j', (data) => {
			actualSpan.style[data.prop] = data.value;
		});

		for_attr_call('ea-j:hov', (data) => {
			let elem = actualSpan;
			actualSpan['ea-data'].hover_s.push([data.prop, data.value, actualSpan.style[data.prop]]);
			U.hover(elem, (event) => {
				U.each(elem['ea-data'].hover_s, (style)=>{ elem.style[style[0]] = style[1]; });
			}, (event) => {
				U.each(elem['ea-data'].hover_s, (style)=>{ elem.style[style[0]] = style[2]; });
			});
		});

		actualSpan = xPathRes.iterateNext()
	}

// other
	U.each(U.$gets('[ea] [no-click-js]'), (the_link)=>{
		the_link.onclick = (e) => {
			e.preventDefault();
		};
	});

	U.each(U.$gets('[ea] [togl-cl]'), (item) => {
		let data = U.getAttr(item, 'togl-cl').split('|');
		let forItem = data[0];
		let cls = data[1].split(' ');
		item.onclick = (e) => {
			e.preventDefault();
			U.each(cls, function(cl) {
				U.toggleClass(forItem, cl);
			});
		};
	});

// tabs
	let tabs_data = {};

	let gen_cl_tab = (k)=>{
		return k + '--tab-active';
	};

	let gen_cl_tab_item = (k)=>{
		return k + '--tab-item-active';
	};

	U.each(U.$gets('[ea] [tab-item]'), (item, index) => {
		let data = U.getAttr(item, 'tab-item').split('|');
		let name = data[0];
		let item_tab = U.$get(data[1]);
		let active = (data.length > 2) ? (data[2] == 'active') : false;

		U.addPropToObjIf(tabs_data, name, {});
		U.addPropToObjIf(tabs_data[name], 'tabs', []);
		U.addPropToObjIf(tabs_data[name], 'items', []);

		tabs_data[name].tabs.push(item);
		tabs_data[name].items.push(item_tab);

		if(!active){
			U.hide(item_tab);
		} else {
			U.addClass(item, gen_cl_tab(name));
			U.addClass(item_tab, gen_cl_tab_item(name));
		}
	});

	let eachHide = (items, item)=>{
		U.each(items, function(el) {
			U.hide(el);
		});
		U.show(item);
	}

	U.eachMap(tabs_data, (key, item)=>{
		U.each(item.items, (el, index)=>{
			let the_tab = tabs_data[key].tabs[index];
			the_tab.onclick = (e) => {
				e.preventDefault();
				if(!U.hasClass(the_tab, gen_cl_tab(key))){
					U.remClass(tabs_data[key].tabs, gen_cl_tab(key)); U.addClass(the_tab, gen_cl_tab(key));
					U.remClass(tabs_data[key].items, gen_cl_tab_item(key)); U.addClass(el, gen_cl_tab_item(key));
					eachHide(tabs_data[key].items, el);
				}
			};
		});
	});

});
