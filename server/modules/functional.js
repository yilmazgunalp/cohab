const curry = fn => {
  return function $curry(...args) {
    if(arguments.length === fn.length) {
      return fn.call(null,...arguments);
    }

    return $curry(fn.bind(null,...arguments));   
  } 
}

const compose = (...fns) => (...args) => fns.reduceRight((acc,cur) => cur(acc),args);

const once = fn => {
  ranOnce = false;
  return (...args) => {
    if(!ranOnce) {
    ranOnce = true;
      return fn(...args);
    } 
    console.log(fn.name, 'Already ranOnce')
  }
}

module.exports = {curry,compose,once}
