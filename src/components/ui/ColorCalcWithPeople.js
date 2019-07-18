import React, { Component } from 'react';
import {Intro, Subject, CalcInput, SubjectSelection} from './Parts'
import { Grid, Container } from 'semantic-ui-react'
import Modal from './ModalBday';

import TargetChooser from '../containers/TargetChooser';
import ColorPane from '../containers/ColorPane';
import WeekBar from '../containers/WeekBar';

import './ColorCalcWithPeople.css';

class ColorCalcWithPeople extends Component {

  render() {
    return (

     <div className="App">		
		<Intro />
		<Container>
		  <Grid>
			<Grid.Column width={5}>
				<SubjectSelection />
			</Grid.Column>
			<Grid.Column width={11}>
				<Subject />
				<CalcInput />		
				<ColorPane />
			</Grid.Column>
		  </Grid>
	    </Container>
    </div>
    );
  }

}
export default ColorCalcWithPeople;


