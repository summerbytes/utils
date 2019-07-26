const debounce = (fn, delay) => {
  let timer = null
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

export const throttle = (threshhold = 250, fn, scope) => {
  let last
  let deferTimer
  return () => {
    let context = scope || this

    let now = +new Date()
    let args = arguments
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(() => {
        last = now
        fn.apply(context, args)
      }, threshhold)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

const attachListener = (element, eventName, handler, opts) => {
  // if (debounceDelay > 0) {
  //   handler = debounce(handler, debounceDelay)
  // }

  if (element.addEventListener) {
    element.addEventListener(eventName, handler, opts)
  } else if (element.attachEvent) {
    element.attachEvent(`on${eventName}`, handler)
  } else {
    element[`on${eventName}`] = handler
  }
}
/**
 * adds an eventListener to an object.
 *
 * @param [NodeList|Object|String]  el  Object(s) to bind the listener
 * @param [String]  eventName Name of the event e.g. click
 * @param [function]  handler Callback function
 */
export const addListener = (
  el,
  eventName,
  handler,
  opts = { passiv: false }
) => {
  if (typeof el === 'string') {
    el = document.querySelectorAll(el)
    if (el.length === 1) {
      el = el[0] // if only one set it properly
    }
  }

  if (el == null || typeof el === 'undefined') return

  if (el.length !== undefined && el.length > 1 && el !== window) {
    // it's a NodeListCollection
    for (let i = 0; i < el.length; i += 1) {
      attachListener(el[i], eventName, handler, opts)
    }
  } else {
    // it's a single node
    attachListener(el, eventName, handler, opts)
  }
}

const detachListener = (element, eventName, handler) => {
  if (element.addEventListener) {
    element.removeEventListener(eventName, handler, false)
  } else if (element.detachEvent) {
    element.detachEvent(`on${eventName}`, handler)
  } else {
    element[`on${eventName}`] = null
  }
}

export const removeListener = (el, eventName, handler) => {
  if (typeof el === 'string') {
    el = document.querySelectorAll(el)
    if (el.length === 1) {
      el = el[0] // if only one set it properly
    }
  }

  if (el == null || typeof el === 'undefined') return

  if (el.length !== undefined && el.length > 1 && el !== window) {
    // it's a NodeListCollection
    for (let i = 0; i < el.length; i += 1) {
      detachListener(el[i], eventName, handler)
    }
  } else {
    // it's a single node
    detachListener(el, eventName, handler)
  }
}

export const scrollPos = () => {
  if (window.pageYOffset != undefined) {
    return [pageXOffset, pageYOffset]
  } else {
    var sx,
      sy,
      d = document,
      r = d.documentElement,
      b = d.body
    sx = r.scrollLeft || b.scrollLeft || 0
    sy = r.scrollTop || b.scrollTop || 0
    return [sx, sy]
  }
}
