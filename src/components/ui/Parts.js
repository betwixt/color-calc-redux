import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, Header, Button, Form, Dropdown, } from 'semantic-ui-react';

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

  render() {
	const now = new Date()
	const today = now.toDateString();
	let bg = colorInfo.get(this.props.todayCode).bg;
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
			<p id="today"> Today's Color </p>
			<Button  onClick={this.props.updatePane} color={bg} >
				 More Info
			</Button>
		</div> 
		<p> {today}  </p>
	  </div>
    );

  }
}

Subject.propTypes = {
	todayCode: PropTypes.number,
	updatePane: PropTypes.func,
}
export {Subject}


// Section with input field for target day of calculation, trigger to calculate for week
class CalcInput extends Component {
  render() {
	  
    let holder;
	// Initial values
	const now = new Date()
	let initDateStr = new Date(+now - now.getTimezoneOffset() * 60 * 1000).toISOString().slice(0,10);
	this.props.setChosenDate(initDateStr);
    console.log("Init target is " + initDateStr);
	
    return ( 
        <div>
			<p> - -  </p>
			<Header as="h3"> CALCULATIONS section </Header>
            <div id="choosing">
                <p>  Choose a Day:  </p>
                <input type="date" 
                       defaultValue={initDateStr}
                       ref={input => holder = input}
                       onChange={() => this.props.setChosenDate(holder.value)} />
                <button className="pickDay"  onClick={this.props.showChosenDayColor} >
                    MY COLOR for this Day
                </button>
            </div>
            <div id="barbutton">
                <button  onClick={this.props.showTargetWeek}>
                   SHOW Week of Colors
                </button>
            </div>	
			<div id="bar">
                <WeekBar />
			</div> 
        </div>
    );

  }
}

CalcInput.propTypes = {
	setChosenDate: PropTypes.func,
    showTodayColor: PropTypes.func,
    showChosenDayColor: PropTypes.func,
    showTargetWeek: PropTypes.func
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