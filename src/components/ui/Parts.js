import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Grid, } from 'semantic-ui-react';
import hearts from './rainbow-hearts-touching.jpg';


class Intro extends Component {
  render() {

    return ( 

		  <Grid id="header">
			<Grid.Column width={3}>
				<Image src={hearts} size='small' id="banner-img" />
			</Grid.Column>
			<Grid.Column width={12}>
				  <h1 style={{paddingTop: '25px', font: 'Satisfy', color: 'DodgerBlue'}}>Your Daily Color</h1>
				  <p>
					Background:  According to numerology, our birthday is the key to calculating a personal
					number vibration for any given day, as well as the personal color associated with
					that number. Colors can remind us of principles and attitudes that bring us more in tune
					with Life.
				  </p>
				  <p>
				    The calculations used here are based on Louise Hay's book, <i>Colors and Numbers</i>.  
					Start by entering a person's birthday, then choose the day or days for calculating a 
					personal color. To learn the themes associated with a color, click on <small><u>More Info</u></small> or a day within the Week table.
				  </p>
			</Grid.Column>
		  </Grid>

		
		
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
