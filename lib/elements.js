"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffsetTop = exports.getScrollPosition = exports.findPos = exports.findParentByClass = exports.exists = exports.toggleClass = exports.removeClass = exports.addClass = exports.hasClass = exports.find = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var find = function find(querySelector) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.prototype.slice.call(element.querySelectorAll(querySelector));
};

exports.find = find;

var isElement = function isElement(el) {
  try {
    // Using W3 DOM2 (works for FF, Opera and Chrome)
    // return obj instanceof HTMLElement;
    if (!(el instanceof HTMLElement)) {
      return find(el)[0].length > 0;
    }

    return true;
  } catch (e) {
    // Browsers not supporting W3 DOM2 don't have HTMLElement and
    // an exception is thrown and we end up here. Testing some
    // properties that all elements have. (works on IE7)
    return _typeof(el) === 'object' && el.nodeType === 1 && _typeof(el.style) === 'object' && _typeof(el.ownerDocument) === 'object';
  }
};

var hasClass = function hasClass(element, className) {
  if (!isElement(element)) return false;

  if (element.classList) {
    return element.classList.contains(className);
  }

  return new RegExp("(^| )".concat(className, "( |$)"), 'gi').test(element.className);
};

exports.hasClass = hasClass;

var addClass = function addClass(element, className) {
  if (!isElement(element)) return false;

  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += " ".concat(className);
  }

  return element;
};

exports.addClass = addClass;

var removeClass = function removeClass(element, className) {
  if (!isElement(element)) return false;

  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(new RegExp("(^|\\b)".concat(className.split(' ').join('|'), "(\\b|$)"), 'gi'), ' ');
  }

  return element;
};

exports.removeClass = removeClass;

var toggleClass = function toggleClass(element, className) {
  return hasClass(element, className) ? removeClass(element, className) : addClass(element, className);
};

exports.toggleClass = toggleClass;

var exists = function exists(selector) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return element.querySelector(selector) !== null;
};

exports.exists = exists;

var findParentByClass = function findParentByClass(element, className) {
  var parent = element.parentNode;

  if (parent !== null) {
    if (hasClass(parent, className)) {
      return parent;
    }

    parent = findParentByClass(parent, className);
  }

  return parent;
};

exports.findParentByClass = findParentByClass;

var findPos = function findPos(obj) {
  var curleft = 0;
  var curtop = 0;

  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);

    return {
      top: curtop,
      left: curleft
    };
  }

  return {
    top: curtop,
    left: curleft
  };
};

exports.findPos = findPos;

var getScrollPosition = function getScrollPosition() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.documentElement;
  return Math.max(element.scrollTop, document.body.scrollTop, window.pageYOffset, window.scrollY);
};

exports.getScrollPosition = getScrollPosition;

var getOffsetTop = function getOffsetTop(elem) {
  var offsetTop = 0;

  do {
    if (!isNaN(elem.offsetTop)) {
      offsetTop += elem.offsetTop;
    }
  } while (elem = elem.offsetParent);

  return offsetTop;
};

exports.getOffsetTop = getOffsetTop;