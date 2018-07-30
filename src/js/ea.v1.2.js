"use strict";
if(!('U' in window)) window.U = {};
if(!('__set' in window.U)){
	window.U.__set = (key, val) => {
		if(!(key in window.U))
			U[key] = val;
	};
}

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
U.__set('hide', (elem) => {
	elem.style.visibility = 'hidden';
	elem.style.display = 'none';
});
U.__set('show', (elem) => {
	elem.style.visibility = 'visible';
	elem.style.display = 'block';
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
	if ('forEach' in arr){
		arr.forEach(call_func);
	} else {
		for (var i = 0; i < arr.length; i++) {
			call_func(arr[i], i);
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
		// item.addEventListener('click', func, false);
		// item.addEventListener('touchend', func, false);
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
U.__set('toggleClass', (to, cl) => {
	U.__ofElemsFunc(to, (item) => {
		item.classList.toggle(cl);
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

document.addEventListener('DOMContentLoaded', function(){

	U.init();

// emmet attr
	let nodeList = U.$tagName('*');

	let emmets = {
		w : 'width',
		h : 'height',
		maw : 'max-width',
		mah : 'max-height',
		miw : 'min-width',
		mih : 'min-height',

		fz : 'font-size',
		lh : 'line-height',

		p : 'padding',
		pt : 'padding-top',
		pr : 'padding-right',
		pb : 'padding-bottom',
		pl : 'padding-left',

		m : 'margin',
		mt : 'margin-top',
		mr : 'margin-right',
		mb : 'margin-bottom',
		ml : 'margin-left',
		'm-a' : [ 'margin', 'auto' ],
		'mt-a' : [ 'margin-top', 'auto' ],
		'mr-a' : [ 'margin-right', 'auto' ],
		'mb-a' : [ 'margin-bottom', 'auto' ],
		'ml-a' : [ 'margin-left', 'auto' ],

		bd : 'border',
		bdt : 'border-top',
		bdb : 'border-bottom',
		bdr : 'border-right',
		bdl : 'border-left',
		bg : 'background',
		bgi : 'background-image',
		bgc : 'background-color',
		bgsz : 'background-size',
	};

	let xPathRes = document.evaluate ( "//*[@ea]//*", U.$tagName('html')[0], null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	let actualSpan = xPathRes.iterateNext ();
	while (actualSpan) {

		for (let j = 0, m = actualSpan.attributes.length; j < m; j++) {

			// let prefix = 'u-';
			// let prop = emmets[actualSpan.attributes[j].name.replace(prefix, '')];
			let prop = emmets[actualSpan.attributes[j].name];

			// let val = actualSpan.attributes[j].name.split(":");
			let val = actualSpan.attributes[j].value;

			if(prop){
				if(typeof(prop) == "string" && val.trim() != ""){
					actualSpan.style[prop] = val;
				} else if (typeof(prop) == "object") {
					actualSpan.style[prop[0]] = prop[1];
				}
			}

		}

		actualSpan = xPathRes.iterateNext ()
	}

// no-click-js
	U.$gets('[ea] [no-click-js]').forEach(function(the_link){
		the_link.onclick = (e) => {
			e.preventDefault();
		};
	});

	function toggle_class(element, class_name){
		if (element.classList) { 
			element.classList.toggle(class_name);
		} else {
			// For IE9
			let classes = element.className.split(" ");
			let i = classes.indexOf(class_name);

			if (i >= 0) 
				classes.splice(i, 1);
			else 
				classes.push(class_name);
			element.className = classes.join(" "); 
		}
	}

	U.$gets('[ea] [toggle-class-name]').forEach(function(item){
		item.onclick = (e) => {
			e.preventDefault();
			cl = U.getAttr(item, 'toggle-class-name');
			U.$gets(U.getAttr(item, 'toggle-class-to')).forEach((the_item) => {
				toggle_class(the_item, cl);
			});
		};
	});

// tabs
	U.$gets('[ea] [ea-tabs]').forEach(function(wrap){
		let name_tabs = U.getAttr(wrap, 'ea-tabs');
		let tabs = U.$gets('[tab-name=' + name_tabs + ']', wrap);
		let tab_active = U.$get('[tab-active]', wrap);
		let contents = {};
		let i = 0;

		tabs.forEach(function(elem){
			attr = U.getAttr(elem, 'tab-to');
			item = U.$get(attr, wrap);

			if(tab_active == undefined){
				if(i != 0){
					item.style.display = 'none';
					item.style.visibility = 'hidden';
				}
			} else {
				if (!U.hasAttr(elem, 'tab-active')){
					item.style.display = 'none';
					item.style.visibility = 'hidden';
				}
			}

			contents[attr] = item;
			i++;
		});

		tabs.forEach((elem) => {
			elem.onclick = (e) => {
				e.preventDefault();
				attr = U.getAttr(this, 'tab-to');
				contents[attr].style.display = 'block';
				contents[attr].style.visibility = 'visible';
				for (key in contents) {
					if (contents.hasOwnProperty(key)) {
						if(key != attr){
							contents[key].style.display = 'none';
							contents[key].style.visibility = 'hidden';
						}
					}
				}
			};
		});
	});

});
