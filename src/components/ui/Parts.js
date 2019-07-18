import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Icon } from 'semantic-ui-react';

import NumChooser  from '../containers/NumChooserWrap';
import MonthChooser  from '../containers/MonthChooser';

// Section with header explaining background, list of saved persons/bdays, button to choose 
// a bday not yet saved
class Intro extends Component {
  render() {
    return ( 
			<div className="App-header">
				<p> Banner with background info and nice image </p>
			</div>
    );

  }
}

Intro.propTypes = {
//    prop1: PropTypes.array,
//    prop2: PropTypes.func,
//    prop3: PropTypes.bool.isRequired
}
export {Intro}


// Section that displays current person/birthday and their color for today
class Subject extends Component {
  render() {
	const now = new Date()
	const today = now.toDateString();
	
    return ( 
        <div> 
			<h3> For BIRTHDAY |show|  </h3>
            <div id="today-section">
                <h3 id="today"> TODAY </h3>
                <p> {today}  </p>
                <button  onClick={this.props.showTodayColor} >
                     More Info
                </button>
            </div>
		</div> 
    );

  }
}

Subject.propTypes = {
	showTodayColor: PropTypes.func
}
export {Subject}


// Section with input field for target day of calculation, trigger to calculate for week
class CalcInput extends Component {
  render() {
    return ( 
        <div>CALCULATIONS section - Contains input field from TargetChooser and WeekBar control</div> 
    );

  }
}

CalcInput.propTypes = {
}
export {CalcInput}


class SubjectSelection extends Component {
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Accordion>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Enter A Birthday
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
            <MonthChooser />
            <NumChooser />	
			<button className="c-btn"> Select It! </button>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Saved Birthdays
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            Construct a list  of Subjects from the database
          </p>
        </Accordion.Content>
      </Accordion>
	);
  }
}
export {SubjectSelection}
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
*/