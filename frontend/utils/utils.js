import * as F from './functional.js';

// isEmpty :: String -> Boolean
export const isEmpty = string => !Boolean(string.trim());

// prop :: String -> Object -> a
export const prop = F.curry((p, obj) => obj[p]);

// partObj :: [String] -> Object -> Object
export const partObj = F.curry((fields,obj) => 
      fields.reduce((acc,cur) => {
       acc[cur] = obj[cur];
       return acc;}
       ,{}))

