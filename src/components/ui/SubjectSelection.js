import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, Button, Dropdown, Grid, } from 'semantic-ui-react';

import NumChooser  from '../containers/NumChooserWrap';
import MonthChooser  from '../containers/MonthChooser';


class SubjectSelection extends Component {
  state = { 
	activeIndex: -1,
	modalOpen: false,
  };
  
  componentDidMount(){
	this.props.getSubjectsFromDB();
   }	

  // Handlers for 'Enter' modal
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
	<Grid.Row centered columns={4} id="selectRow">
	  <Grid.Column width={4}>
		<h3> Birthday Selection </h3>
	  </Grid.Column>
	  <Grid.Column width={3}>
	  <Modal 
	    trigger={<Button className="c-btn" onClick={this.handleOpen}>Enter a Day</Button>} 
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
	  </Grid.Column>
	  
	  <Grid.Column width={1}>
		<h4> OR </h4>
	  </Grid.Column>

	  
	  <Grid.Column width={4}>
	  <Dropdown item text='Choose From Saved' button={true}>
        <Dropdown.Menu>
		{this.props.bdayOptions.map( item =>
			<Dropdown.Item onClick={this.props.setFromList} value={item.text}> 
				{item.key }
			</Dropdown.Item>
		)}

        </Dropdown.Menu>
      </Dropdown>

	  </Grid.Column>
	  
	  {/* 
	  
	  <Dropdown
		 placeholder='Choose from Saved Birthdays'
         selection
		 onChange={this.props.setFromList}
         options={this.props.bdayOptions}
	   />
	   
	  
	  Switch back to accordion later.. more complicated because have to make a list of clickable items
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
	</Grid.Row>
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
