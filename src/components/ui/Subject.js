import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Grid, } from 'semantic-ui-react';

import { colorInfo } from '../colorData.js'


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
	const haveSubject = this.props.bdayString.startsWith("--")

    return ( 
	  <Grid.Row>
        <div> 
			<div>
				<p style={{marginBottom:"5px"}} > 
					<span className="minor"> BIRTHDAY: </span>
					<span className="headline"> {this.props.bdayString} </span>

				{this.state.showLink ? (
					<button className="linky formcover" onClick={this.handleClick} disabled={haveSubject} > 
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
			<p style={{font: "12px Century Gothic", fontStyle: "oblique"}}> {today}  </p>
		</div> 
	  </Grid.Row>
    );

  }
}

Subject.propTypes = {
	bdayString: PropTypes.string,
	todayCode: PropTypes.number,
	updatePane: PropTypes.func,
}
export {Subject}


