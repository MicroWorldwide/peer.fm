goog.provide('ui');


var ui	= new function () {




/**
* @namespace UI
*/
var self	= this;




/**
* @field
* @property {string}
*/
var pageLoadingClass;

/**
* @field
* @property {string}
*/
var playButtonClass;

/**
* @field
* @property {goog.ui.Slider}
*/
var slider;




/**
* @function
* @property {void} Initialises this namespace
*/
var init;

/**
* @function
* @property {void} Updates UI
*/
var update;




self.init	= function () {
	window.onhashchange	= function () {
		var setActive	= function (selector, attribute, target) {
			var $elements	= $(selector);
			for (var i = 0 ; i < $elements.length ; ++i) {
				var $elem	= $elements[i];
				goog.dom.classes.enable(target ? target($elem) : $elem, 'active', $elem.getAttribute(attribute) == window.location.hash);
			}
		};

		setActive('.navbar a', 'href', function ($elem) { return $elem.parentNode; });
		setActive('[hash-location]', 'hash-location');
	};

	if (window.location.hash) {
		window.onhashchange();
	}
	else {
		window.location.hash	= $('.navbar li.active')[0].getChildren()[0].getAttribute('href');
	}


	/*** Library ***/
	var tableSorter	= new goog.ui.TableSorter();
	tableSorter.setDefaultSortFunction(goog.ui.TableSorter.alphaSort);
	tableSorter.decorate($('#library-table')[0]);


	self.slider	= new goog.ui.Slider();

	self.slider.setHandleMouseWheel(true);
	self.slider.setMoveToPointEnabled(true);
	self.slider.onclick	= function () {
		self.slider.valueJustChanged	= true;
		stream.time(self.slider.getValue());
		window.setTimeout(function () { self.slider.valueJustChanged = false; }, 1000);
	};

	self.slider.decorate($('#player .slider')[0]);
};

self.update	= function () {
	self.pageLoadingClass	= window.isNaN(stream.newTime) ? 'loading' : '';
	self.playButtonClass	= stream.isPlaying ? 'playing' : 'paused';
};




};
