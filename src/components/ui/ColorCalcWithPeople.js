import React, { Component } from 'react';
import {Intro} from './Parts'
import { Grid, Container } from 'semantic-ui-react'

import ColorPane from '../containers/ColorPane';
import Subject from '../containers/Subject';
import SubjectSelection from '../containers/SubjectSelection';
import CalcInput from '../containers/CalcInput';

import './ColorCalcWithPeople.css';

// NOTE: When dev environment uses create-react-app server, urls in nav bar will need to 
// point to separate django server at "http://127.0.0.1:8000"

class ColorCalcWithPeople extends Component {

  render() {
    return (

     <div>		
		<div class="ui mini borderless menu" style={{marginLeft: '15px'}}>
			<a class="item" href="/">Home</a>
			<a class="active item" href="#">Colors w/ Data</a>				
			<a class="item" href="/weather/">Multi Weather</a>
			<a class="item" href="/colors1/">Color Calc 1</a>
		</div>
			<Container>

			<Intro />
			<Grid>
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


