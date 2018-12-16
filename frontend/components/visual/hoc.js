let React = require('react');
module.exports =  function higherOrderComponent(Component) {
  return class extends React.Component {
    render() {
      return (
          <Component {...this.props}/>
      );
    }
  }
  }

