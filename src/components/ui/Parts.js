import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, Header, Button, Form, Dropdown, Label, Accordion, } from 'semantic-ui-react';

import { colorInfo } from '../colorData.js'
import NumChooser  from '../containers/NumChooserWrap';
import MonthChooser  from '../containers/MonthChooser';
import WeekBar from '../containers/WeekBar';

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
  state = { label: "", showLink: true }
  
  handleInput = (e, { name, value }) => this.setState({ label: value })
  handleClick = () => this.setState({showLink: false})
  handleCancel = () => this.setState({showLink: true})
  
  handleSubmit = () => {
	console.log(`label is ${this.state.label}`);
	// Clear input field and revert to displaying link instead of Form
	this.setState({ label: "", showLink: true });
	// Make call to backend
	this.props.saveBday(this.state.label);
  }
  
  componentWillReceiveProps(nextProps){
	  if (this.state.showLink) {
		  return;
	  }
	  if (this.props.bdayString !== nextProps.bdayString) {
		  // Get current label and ask if current bday should be saved [DID NOT Implement]
		  
		  this.setState({ label: "", showLink: true})
	  }
  }

  render() {
	const now = new Date()
	const today = now.toDateString();
	let c = colorInfo.get(this.props.todayCode);
	const {label} = this.state;

    return ( 
	  <div>
        <div> 
			<div>
				<p style={{marginBottom:"5px"}} > 
					<span className="minor"> BIRTHDAY: </span>
					<span className="headline"> {this.props.bdayString} </span>

				{this.state.showLink ? (
					<button className="linky formcover" onClick={this.handleClick} > 
						Save this birthday 
					</button>
				) : (
					<Form style={{display:"inline-block"}} onSubmit={this.handleSubmit} >
						<Form.Group inline>
							<Form.Input 
								inline 
								size='mini'
								value = {label}
								onChange={this.handleInput}
								placeholder='Label' 
							/>
							<Form.Button size='mini' content='Save' />  
							<Form.Button size='mini' content='Cancel' />  

						</Form.Group>
					</Form>
				)}
				</p>
			</div>
			<p className="subtitle">Today's Color</p>
			<Label circular color={c.bg} style={{marginRight: "10px"}}>
				{c.title}
			</Label>
			<button className="linky" onClick={this.props.updatePane} >
				 More Info
			</button>
		</div> 
		<p style={{font: "12px Century Gothic", fontStyle: "oblique"}}> {today}  </p>
	  </div>
    );

  }
}

Subject.propTypes = {
	bdayString: PropTypes.string,
	todayCode: PropTypes.number,
	updatePane: PropTypes.func,
}
export {Subject}


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
        <div>
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

			<Accordion>
				<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
				  <Icon name='dropdown' />
				  See colors for 7 days
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 0}>
					<div style={{display: "table"}}>
						<WeekBar />
					</div>
				</Accordion.Content>
			</Accordion>

        </div>
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


class SubjectSelection extends Component {
  state = { 
	activeIndex: -1,
	modalOpen: false,
  };
  
  componentDidMount(){
	this.props.getSubjectsFromDB();
   }	

  // Handlers for 'Enter a Birthday' modal
  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })  
  setAndClose = () => {
	  this.props.setSubject()
	  this.handleClose()
  }

  /*
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
*/

  render() {
//    const { activeIndex } = this.state
	let sz = {height: 300, width: 500}
	
    return (
	<div>
	  <Modal 
	    trigger={<Button className="c-btn" onClick={this.handleOpen}>Enter a Birthday</Button>} 
		style={sz} 
	    open={this.state.modalOpen}
        onClose={this.handleClose}
		closeOnDimmerClick={false} 	 
		closeIcon
	  >
		<Modal.Content>
		  <MonthChooser />
		  <NumChooser />
		</Modal.Content>
		<Modal.Actions>
		  <Button color='green' onClick={this.setAndClose}>
			<Icon name='checkmark' /> OK
		  </Button>
		</Modal.Actions>
	  </Modal>
	  
	   <Dropdown
		 placeholder='Select a Saved Birthday'
         selection
		 onChange={this.props.setFromList}
         options={this.props.bdayOptions}
	   />
	  
	  {/* Switch back to accordion later.. more complicated because have to make a list of clickable items
      <Accordion>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Saved Birthdays
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            Construct a list  of Subjects from the database
          </p>
        </Accordion.Content>
      </Accordion>
	  */}
	</div>
	);
  }
}
SubjectSelection.propTypes = {
	setSubject: PropTypes.func,
	setFromList: PropTypes.func,
	getSubjectsFromDB: PropTypes.func,
	bdayOptions: PropTypes.array,
}
export {SubjectSelection};
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