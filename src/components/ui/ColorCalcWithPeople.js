import React, { Component } from 'react';
import {Intro} from './Parts'
import { Grid, Container } from 'semantic-ui-react'

import ColorPane from '../containers/ColorPane';
import Subject from '../containers/Subject';
import SubjectSelection from '../containers/SubjectSelection';
import CalcInput from '../containers/CalcInput';

import './ColorCalcWithPeople.css';

class ColorCalcWithPeople extends Component {

  render() {
    return (

     <div className="App">		
		<Intro />
		<Container>
		  <Grid>
			<Grid.Column width={4}>
				<SubjectSelection />
			</Grid.Column>
			<Grid.Column width={12}>
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


