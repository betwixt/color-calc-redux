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
		  <Grid padded="horizontally">
			<SubjectSelection />
			<Subject />
			<CalcInput />	
		    <ColorPane />			
		  </Grid>

	    </Container>
    </div>
    );
  }

}
export default ColorCalcWithPeople;


