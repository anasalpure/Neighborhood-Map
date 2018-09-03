import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

const propTypes = {
  isOpen: PropTypes.bool,
  className: PropTypes.node,
};

const defaultProps = {
  isOpen: false,
};

function getTransitionClass(status) {
  const transitionClassOf = {
    'entering': 'collapse showing',
    'entered' : 'collapse show',
    'exiting' : 'collapse',
    'exited'  : 'collapse',
  };
  return transitionClassOf[status] || 'collapse';
}

function getHeight(node) {
  return node.scrollHeight;
}

class Collapse extends Component {
  constructor(props) {
    super(props);

  }

 

  render() {
    const {
      isOpen,
      className,
      children,
      onTop,
      ...otherProps
    } = this.props;




    const transitionStyle = {
      transition: 'all 0.3s ease-in-out'
    };

    return (
      <Transition
       in={isOpen}  
       timeout={150} 
      >
        {(status) => {
          
          const collapseClass = getTransitionClass(status);

          let classes = collapseClass;   
          if(className) classes+=' '+  className  
        
          return (
            <div
              {...otherProps}
              style={transitionStyle }
              className={classes}
            >
              {children}
            </div>
          );
        }}
      </Transition>
    );
  }
}

Collapse.propTypes = propTypes;
Collapse.defaultProps = defaultProps;
export default Collapse;
