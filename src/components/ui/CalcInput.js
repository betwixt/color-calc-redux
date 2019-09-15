import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Label, Accordion, Grid, } from 'semantic-ui-react';

import { colorInfo } from '../colorData.js'
import WeekBar from '../containers/WeekBar';


// Section with input field for target day of calculation, trigger to calculate for week
class CalcInput extends Component {
  state = { 
	activeIndex: -1, 
	dateVal: '',
  };
  
  // Handler for Accordion
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex });
	this.props.showTargetWeek();
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
		this.setState({ activeIndex: -1 });
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
        <Grid stackable >
		  <Grid.Row  columns={2} >

			<Grid.Column width={6}>
			<h1 style={{marginTop: "12px"}}> ~~~ Calculations ~~~ </h1>
			<p className="minor"> Please choose a Target Day:  </p>

			<p>
				<input id="targetDay"
				   type="date" 
				   value = {this.state.dateVal}
				   onChange={this.handleChange} 
				/> 
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
			</p>
			</Grid.Column>

			<Grid.Column width={10}>
			<Accordion fluid >
				<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
				  <Icon name='dropdown' />
				  See colors for 7 days
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 0 && this.state.dateVal !== ''}>
					<div style={{display: "table"}}>
						<WeekBar />
					</div>
				</Accordion.Content>
			</Accordion>
			</Grid.Column>
		  </Grid.Row>

        </Grid>
    );

  }
}

CalcInput.propTypes = {
	setChosenDate: PropTypes.func,
	calculateColor: PropTypes.func,
    showTodayColor: PropTypes.func,
    showChosenDayColor: PropTypes.func,
    showTargetWeek: PropTypes.func,
    setResetTargets: PropTypes.func,
	chosenCode: PropTypes.number,
	resetTargets: PropTypes.bool,
}
export {CalcInput}

