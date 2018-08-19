let React = require('react');

function Cross(props) {
  return  (<div className='close-button' onClick={props.onClose}>
          <svg className="cross" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="black" />
            <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="8" />
            <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="8" />
          </svg>  
          </div>
        )      
}

module.exports = Cross;
