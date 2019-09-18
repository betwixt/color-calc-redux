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

     <div>		
		<Container>
		  <Intro />
		  <Grid>
			<SubjectSelection />
			<Subject />
			<CalcInput />		
		  </Grid>
		  <ColorPane />

	    </Container>
    </div>
    );
  }

}
export default ColorCalcWithPeople;


