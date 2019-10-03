import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, Button, Dropdown, Grid, } from 'semantic-ui-react';

import NumChooser  from '../containers/NumChooserWrap';
import MonthChooser  from '../containers/MonthChooser';


class SubjectSelection extends Component {
  state = { 
//	activeIndex: -1,
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


  render() {
//    const { activeIndex } = this.state
	let sz = {height: 300, width: 500}
	
    return (
	<Grid.Row centered columns={3} id="selectRow">
	  <Grid.Column>
		<h3> Birthday Selection </h3>
	  </Grid.Column>
	  <Grid.Column>
	  <Modal 
	    trigger={<Button className="c-btn" onClick={this.handleOpen}>Enter a Birthday</Button>} 
		style={sz} 
	    open={this.state.modalOpen}
        onClose={this.handleClose}
		closeOnDimmerClick={false} 	 
		closeIcon
	  >
		<Modal.Content id="modalbox">
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
	  
	  <Grid.Column>
	  <Dropdown item text='Choose from Saved' button={true}>
        <Dropdown.Menu>
		{this.props.bdayOptions.map( item =>
			<Dropdown.Item onClick={this.props.setFromList} value={item.text} key={item.key}> 
				{item.key }
			</Dropdown.Item>
		)}

        </Dropdown.Menu>
      </Dropdown>

	  </Grid.Column>
	  
	  {/* // Previous version for list of bdays - selection widget
	  
	  <Dropdown
		 placeholder='Choose from Saved Birthdays'
         selection
		 onChange={this.props.setFromList}
         options={this.props.bdayOptions}
	   />

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

