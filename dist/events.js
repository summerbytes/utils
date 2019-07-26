"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollPos = exports.removeListener = exports.addListener = exports.throttle = void 0;

var _this = void 0,
    _arguments = arguments;

var debounce = function debounce(fn, delay) {
  var timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(_this, _arguments);
    }, delay);
  };
};

var throttle = function throttle() {
  var threshhold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 250;
  var fn = arguments.length > 1 ? arguments[1] : undefined;
  var scope = arguments.length > 2 ? arguments[2] : undefined;
  var last;
  var deferTimer;
  return function () {
    var context = scope || _this;
    var now = +new Date();
    var args = _arguments;

    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};

exports.throttle = throttle;

var attachListener = function attachListener(element, eventName, handler, opts) {
  // if (debounceDelay > 0) {
  //   handler = debounce(handler, debounceDelay)
  // }
  if (element.addEventListener) {
    element.addEventListener(eventName, handler, opts);
  } else if (element.attachEvent) {
    element.attachEvent("on".concat(eventName), handler);
  } else {
    element["on".concat(eventName)] = handler;
  }
};
/**
 * adds an eventListener to an object.
 *
 * @param [NodeList|Object|String]  el  Object(s) to bind the listener
 * @param [String]  eventName Name of the event e.g. click
 * @param [function]  handler Callback function
 */


var addListener = function addListener(el, eventName, handler) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    passiv: false
  };

  if (typeof el === 'string') {
    el = document.querySelectorAll(el);

    if (el.length === 1) {
      el = el[0]; // if only one set it properly
    }
  }

  if (el == null || typeof el === 'undefined') return;

  if (el.length !== undefined && el.length > 1 && el !== window) {
    // it's a NodeListCollection
    for (var i = 0; i < el.length; i += 1) {
      attachListener(el[i], eventName, handler, opts);
    }
  } else {
    // it's a single node
    attachListener(el, eventName, handler, opts);
  }
};

exports.addListener = addListener;

var detachListener = function detachListener(element, eventName, handler) {
  if (element.addEventListener) {
    element.removeEventListener(eventName, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent("on".concat(eventName), handler);
  } else {
    element["on".concat(eventName)] = null;
  }
};

var removeListener = function removeListener(el, eventName, handler) {
  if (typeof el === 'string') {
    el = document.querySelectorAll(el);

    if (el.length === 1) {
      el = el[0]; // if only one set it properly
    }
  }

  if (el == null || typeof el === 'undefined') return;

  if (el.length !== undefined && el.length > 1 && el !== window) {
    // it's a NodeListCollection
    for (var i = 0; i < el.length; i += 1) {
      detachListener(el[i], eventName, handler);
    }
  } else {
    // it's a single node
    detachListener(el, eventName, handler);
  }
};

exports.removeListener = removeListener;

var scrollPos = function scrollPos() {
  if (window.pageYOffset != undefined) {
    return [pageXOffset, pageYOffset];
  } else {
    var sx,
        sy,
        d = document,
        r = d.documentElement,
        b = d.body;
    sx = r.scrollLeft || b.scrollLeft || 0;
    sy = r.scrollTop || b.scrollTop || 0;
    return [sx, sy];
  }
};

exports.scrollPos = scrollPos;