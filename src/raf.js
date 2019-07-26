export const rAF = fn => {
  const requestAF =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(
      /* function FrameRequestCallback */ callback,
      /* DOMElement Element */ element
    ) {
      window.setTimeout(callback, 1000 / 60)
    }
  return requestAF(fn)
}

export const cAF = fn => {
  const cancleAF = window.cancelAnimationFrame || window.mozCancelAnimationFrame
  return cancleAF(fn)
}
