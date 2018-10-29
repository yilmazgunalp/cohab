export const curry = fn => {
  return function $curry(...args) {
    if(arguments.length === fn.length) {
      return fn.call(null,...arguments);
    }

    return $curry(fn.bind(null,...arguments));   
  } 
}

export const compose = (...fns) => (...args) => fns.reduceRight((acc,cur) => cur(acc),args);
