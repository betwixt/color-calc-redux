import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Label, Accordion, Grid, } from 'semantic-ui-react';

import { colorInfo } from '../colorData.js'
import WeekBar from '../containers/WeekBar';


// Section with input field for target day of calculation, trigger to calculate for week
class CalcInput extends Component {
  state = { 
	activeIndex: -1, // For Accordion
	dateVal: '',
  };
  
  // Handler for Accordion
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index //Toggle if already active

    this.setState({ activeIndex: newIndex });
	if (newIndex === 1) {
		this.props.showTargetWeek();
	} else if (newIndex === 1) {
	}
  }
  // Handler when date input field gets a new value
  handleChange = (e) => {
	  console.log(`target val is ${e.target.value}`)
	let v = e.target.value;
    this.setState({dateVal: v});  // local state
	// global state
	this.props.setChosenDate(v);
	this.props.calculateColor(); 
	if (v === "") {
		this.setState({ activeIndex: -1 }); //Occurs when Birthday has been changed
	} else {
		this.props.showTargetWeek()
	}
  }
  // Check if reset is needed, initiated by updateSubject action
  componentWillReceiveProps(nextProps){
	if (this.props.resetTargets) {
		this.setState({dateVal: ""});
		this.handleChange({target: {value:""}}); // create event object with new value

	}
  }
  // After reset occurred, it's no longer needed, so set to false
  componentDidUpdate() {
	if (this.props.resetTargets) {
		this.props.setResetTargets(false);
	} 
  }
  
  render() {	  
	// Initial values
	const { activeIndex } = this.state
    console.log(`chosenCode is ${this.props.chosenCode}, reset is ${this.props.resetTargets}`);
	let c = colorInfo.get(this.props.chosenCode);

    return ( 
		<>
		<Grid.Row>
		<h1> ~~~ Calculations ~~~ </h1>
		</Grid.Row>
	
        <Grid.Column width={9}>
			<div>
				<span className="minor"> Target Day:  </span>
				<input id="targetDay"
						   type="date" 
						   value = {this.state.dateVal}
						   onChange={this.handleChange} 
						   disabled={this.props.noSubject}
						   style={{marginLeft:"10px"}}
				/> 			
			</div>
			
			<Accordion>
				<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
					<Icon name='dropdown' />
					Calculate for a Day
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 0 && this.state.dateVal !== ''}>
  					

						{ this.props.chosenCode !== 0 &&
							<>
							<Label circular color={c.bg} style={{marginLeft: "10px", marginRight: "10px"}}>
								{c.title}
							</Label>
							<button className="linky" onClick={this.props.showChosenDayColor} >
								More Info
							</button>
							</>
						}
					
				</Accordion.Content>

				<Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
				  <Icon name='dropdown' />
				  Calculate for a Week
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 1 && this.state.dateVal !== ''}>
						<WeekBar />
					
				</Accordion.Content>
			</Accordion>


        </Grid.Column>
		</>
    );

  }
}

// 					<div style={{display: "table"}}>  </div>
			  
			  
CalcInput.propTypes = {
	setChosenDate: PropTypes.func,
	calculateColor: PropTypes.func,
    showTodayColor: PropTypes.func,
    showChosenDayColor: PropTypes.func,
    showTargetWeek: PropTypes.func,
    setResetTargets: PropTypes.func,
	chosenCode: PropTypes.number,
	resetTargets: PropTypes.bool,
	haveSubject: PropTypes.bool,
}
export {CalcInput}

