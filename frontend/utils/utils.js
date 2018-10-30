import * as F from './functional.js';
import Result from 'folktale/result';

// isEmpty :: String -> Boolean
export const isEmpty = string => !Boolean(string.trim());

// prop :: String -> Object -> a
export const prop = F.curry((p, obj) => obj[p]);

// partObj :: [String] -> Object -> Object
export const partObj = F.curry((fields,obj)=> fields.reduce((acc,cur)=> {acc[cur] = obj[cur];return acc;},{}))

// parseDateString :: String -> Result String Date
export const parseDateString = datetime => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(datetime) ? 
             Result.Ok(datetime)
       :     Result.Error('Please enter a valid Date and Time.')
       

