import axios from 'axios';
import * as moment from 'moment';

import C from './colorConstants'
import {daysInMonth, months} from './components/colorData'
import {computeForDate, computeWeekStartingOn } from './components'


// Action Creators: will return an action object with type (constant) and payload (some type of argument value)
// With Thunk package, can also return a function - (dispatch,getState)=>{stuff}

// Setting of month value causes a constraint on possible values for calendar day
// Is action creator the right place to implement this?
export function setBirthMonth(monthInt) {
	return (dispatch, getState) => {
	  let max = daysInMonth.get(monthInt); 
	  dispatch({
		type: C.SET_MONTHVALS,  payload: monthInt-1
	  });
      dispatch({
        type: C.SET_BMONTH,   payload: monthInt
      });
	  dispatch({
		type: C.SET_MAXDAYS,  payload: max
	  });
	  if (max < getState().birthval.bcalday) {
		   dispatch({ type: C.SET_BCALDAY,   payload: max });
           dispatch({ type: C.SET_DAYVALS,   payload: max-1 })
      }
	}
}
export const setBirthCalDay = num => dispatch => {
    dispatch ({
        type: C.SET_DAYVALS,
        payload: num - 1
    });
	dispatch ({
        type: C.SET_BCALDAY,
        payload: num
    })
}

export const setTodayColor = num =>
	({
		type: C.SET_TODAYCOLOR,
		payload: num
	})
	
export const setBdayOptions = arr =>
	({
		type: C.SET_BDAYOPTIONS,
		payload: arr
	})
	
export const setSubject= str =>
	({
		type: C.SET_SUBJECT,
		payload: str
	})
	
export const setChosenDate = dateStr =>
	({
		type: C.SET_CHOSENDATE,
		payload: dateStr
	})

export const setChosenDayColor = num =>
	({
		type: C.SET_CHOSENDAYCOLOR,
		payload: num
	})
	
export const setResetTargets = bool =>
	({
		type: C.SET_RESET,
		payload: bool
	})
	
export const setColorPane = num =>
	({
		type: C.SET_COLORPANE,
		payload: num
	})
	
export const setBarInfo = arr =>
	({
		type: C.SET_BARINFO,
		payload: arr
	})

export const setWeekActive = bool =>
	({
		type: C.SET_WEEKACTIVE,
		payload: bool
	})

export const setWeekSelect = num =>
	({
		type: C.SET_WEEKSELECT,
		payload: num
	})

	
export function showTodayColor(){ 
	return (dispatch, getState) => {
        let today = getState().todayColor;
		// const now = new Date();
		// const todayStr = new Date(+now - now.getTimezoneOffset() * 60 * 1000).toISOString().slice(0,10);
		// dispatch( setColorPane(computeForDate(todayStr, birthval.bmonth, birthval.bcalday)) );
		dispatch( setColorPane(today) );
	}
}


// Called by the buttons that select subject
// Change state for subjectString and todayColor; clear the input values in CalcInput component
export function updateSubject(){

	return (dispatch, getState) => {
		let bmonth = getState().bmonth;
		let bcalday = getState().bcalday;
		// This part got moved to Subject container
        //let m = months[bmonth - 1];
        //let subjStr = `${m} ${bcalday}`

		const now = new Date();
		const todayStr = new Date(+now - now.getTimezoneOffset() * 60 * 1000).toISOString().slice(0,10);

		dispatch( setSubject(`${moment.months()[bmonth-1]} ${bcalday}`) );
		dispatch( setTodayColor(computeForDate(todayStr, bmonth, bcalday)) );
		dispatch( setResetTargets(true) );

    }
}

export function updateSubjectFromList(e, {value}){

	return (dispatch, getState) => {
		console.log(`value is ${value}`);
		let bdayVals = value.split(" ");

        dispatch( setBirthMonth( months.indexOf(bdayVals[0]) + 1 ) );
		dispatch( setBirthCalDay( parseInt(bdayVals[1]) ) );
		dispatch( updateSubject() );
		
		// May want to disconnect displayed bday from state of MonthChooser and NumChooser
		// const fullMonth = moment.months()[months.indexOf(bdayVals[0])];
		// dispatch( setSubject(`${fullMonth} ${bdayVals[1]}`) );

    }
}

// Called when user clicks Save button in Subject component
export function createSubject(label){

	return (dispatch, getState) => {
		const mstr = months[getState().bmonth-1]
		const obj = { name: label, birthMonth: mstr, birthNum: getState().bcalday }
		// const csrftoken = Cookies.get('csrftoken')
		// console.log(`cookie returned - ${csrftoken}`);
		// console.log(`all cookies empty? - ${document.cookie.split(';') ==""}`);
		
		axios.post( 'http://127.0.0.1:8000/calc_api/subjects/', obj )
		   .then(res => { dispatch( getSubjectsFromDB() ); })
		   .catch ( err => { console.log(`During axios call: ${err}`); })	
		   
	    
    }
}

export function getSubjectsFromDB() {
	return (dispatch, getState) => {

	axios.get('http://127.0.0.1:8000/calc_api/subjects/')
		.then(res => 
			{  
			  	let options = res.data.map(item => 
				{
					const subjStr = `${item.birthMonth} ${item.birthNum}`;
					const labelStr = `${subjStr} ~ ${item.name}`;
					return {  key: labelStr, text: labelStr, value: `${subjStr} ${item.name}`}
				});
				dispatch(setBdayOptions(options));
			})
		.catch ( err => { console.log(`During axios call: ${err}`); })	
	}
}	  

export function calculateChosenDayColor() {
    return (dispatch, getState) => {
		let chosenDate = getState().chosenDate;
		let code = (chosenDate === "") ? 0 : computeForDate(chosenDate, getState().bmonth, getState().bcalday);
        dispatch( setChosenDayColor(code) );
    }
}

export function showChosenDayColor() {
	return (dispatch, getState) => {
		dispatch( setColorPane(getState().chosenDayColor) ) ;
	}
}

export function showTargetWeek() {
	return (dispatch, getState) => {
		
        let chosenDate = getState().chosenDate;
		// Parse string to get tmonth, tdate and tyear, then set state
			console.log("converting date string: " + chosenDate);
		let y = chosenDate.slice(0,4);
		let m = chosenDate.slice(5,7);
		let d = chosenDate.slice(8);
		let dateObj = new Date(y, m-1, d);
		let bar = computeWeekStartingOn(dateObj, getState().bmonth, getState().bcalday);
		
        dispatch( setBarInfo(bar) );
        dispatch( setWeekActive(true) );
        dispatch( setWeekSelect(0) );
		// dispatch( setColorPane(bar[0].colorNum) );
	}
}
