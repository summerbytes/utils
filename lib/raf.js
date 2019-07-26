"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cAF = exports.rAF = void 0;

var rAF = function rAF(fn) {
  var requestAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (
  /* function FrameRequestCallback */
  callback,
  /* DOMElement Element */
  element) {
    window.setTimeout(callback, 1000 / 60);
  };

  return requestAF(fn);
};

exports.rAF = rAF;

var cAF = function cAF(fn) {
  var cancleAF = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  return cancleAF(fn);
};

exports.cAF = cAF;