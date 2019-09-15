import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Icon, Label, Accordion, Grid, } from 'semantic-ui-react';


// Section with header explaining background, list of saved persons/bdays, button to choose 
// a bday not yet saved

//			<div className="App-header">

class Intro extends Component {
  render() {
    return ( 
			<header>
				Banner with background info and nice image 
			</header>
    );

  }
}

Intro.propTypes = {
    prop1: PropTypes.array,
//    prop2: PropTypes.func,
//    prop3: PropTypes.bool.isRequired
}
export {Intro}


//============
/*
class Base extends Component {
  render() {
    return ( 
        <div> </div> 
    );

  }
}

Base.propTypes = {
    prop1: PropTypes.array,
    prop2: PropTypes.func,
    prop3: PropTypes.bool.isRequired
}
export default Subject;

        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Enter A Birthday
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
            <MonthChooser />
            <NumChooser />	
			<button className="c-btn"> Select It! </button>
        </Accordion.Content> 
	  
*/
