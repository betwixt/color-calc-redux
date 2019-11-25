import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, Button, Dropdown, Grid, Popup, Form,} from 'semantic-ui-react';

import NumChooser  from '../containers/NumChooserWrap';
import MonthChooser  from '../containers/MonthChooser';


class SubjectSelection extends Component {
  state = { 
//	activeIndex: -1,
	modalOpen: false,
	popupOpen: false,
	deleteMap: {},
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
  // Handlers for popup
  handleUnpop = () => this.setState( {popupOpen: false, deleteMap: {} } )
  handlePop = () => {
//	let d = {}
//	this.props.bdayOptions.map( item => d[item.id] = false )
	this.setState({ popupOpen: true  /*, deleteMap: d*/  })
  }
  handleManageList= () => { 
	// Make backend call to delete list items and get new list
	let map = this.state.deleteMap	
	let checked = []
	for (let key in map) {
		if (map[key]) checked.push(key) 
	}
	if (checked.length > 0) this.props.doDeletes(checked)
	// Close popup
	this.setState({ popupOpen: false, deleteMap: {} })

  }
  handleBox = ({target}) => {	  
	  let new_d = {...this.state.deleteMap}
	  new_d[target.defaultValue] = target.checked
	  this.setState( {deleteMap: new_d} )
  }


  render() {
//    const { activeIndex } = this.state
	let sz = {height: 300, width: 500}
	
    return (
	<Grid.Row centered columns={3} id="selectRow">
	  <Grid.Column width={4}>
		<h3> Birthday Selection </h3>
	  </Grid.Column>
	  
	  <Grid.Column width={5}>
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
	  
	  <Grid.Column width={7}>
		<Dropdown item text='Saved Birthdays' button={true}>
			<Dropdown.Menu>
			{this.props.bdayOptions.map( item =>
				<Dropdown.Item onClick={this.props.setFromList} value={item.id} key={item.key}> 
					{item.key }
				</Dropdown.Item>
			)}
			</Dropdown.Menu>
		</Dropdown>
		  
		<Popup wide on='click'
			position='bottom center'
			open={this.state.popupOpen}
			trigger={ <button style={{marginLeft:"5px"}} className="linky"
						onClick={this.handlePop}> Manage Birthday List</button>
			}
		>
			<Form.Group grouped>
			  <label>Delete Items</label>
			  {this.props.bdayOptions.map( item =>
				<Form.Field label={item.key} control='input' type='checkbox' 
					onClick={this.handleBox} value={item.id} /> 
			  )}
			</Form.Group>
			<Button content='OK' size='mini' onClick={this.handleManageList}/>
			<Button content='Cancel' size='mini' onClick={this.handleUnpop}/>

		</Popup>

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
	doDeletes: PropTypes.func,
	bdayOptions: PropTypes.array,
}
export {SubjectSelection};
//============

