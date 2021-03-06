document.addEventListener('DOMContentLoaded', function(){

	var nodeList = document.getElementsByTagName('*');

	var emmets = {
		w : 'width',
		h : 'height',
		maw : 'max-width',
		mah : 'max-height',
		miw : 'min-width',
		mih : 'min-height',

		fz : 'font-size',

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

		bg : 'background',
		bgi : 'background-image',
		bgsz : 'background-size',
	};

	var xPathRes = document.evaluate ( "//*[@ea]//*", document.getElementsByTagName('html')[0], null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var actualSpan = xPathRes.iterateNext ();
	while (actualSpan) {

		for (var j = 0, m = actualSpan.attributes.length; j < m; j++) {

			// var prefix = 'u-';
			// var prop = emmets[actualSpan.attributes[j].name.replace(prefix, '')];
			var prop = emmets[actualSpan.attributes[j].name];

			// var val = actualSpan.attributes[j].name.split(":");
			var val = actualSpan.attributes[j].value;

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

});
