import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {

    let result

    console.groupCollapsed(`dispatching action => ${action.type}`)
    // console.log(`dispatching action => ${action.type}`)
    result = next(action)

    let { bmonth, bcalday, birthval, subject, bdayOptions, todayColor, chosenDate, chosenDayColor, resetTargets, colorPane, weekbar} = store.getState()

    console.log(`

        bmonth: ${bmonth}, bday: ${bcalday}
        maxDays: ${birthval.maxDays}
		subject: ${subject}
        chosenDate: ${chosenDate}
		chosenDayColor: ${chosenDayColor}
		resetTargets: ${resetTargets}
        colorPane: ${colorPane}
        todayColor: ${todayColor}
        bdayOptions size: ${bdayOptions.length}
        weekbar: active? ${weekbar.weekActive}, info:
          ${weekbar.barInfo}

    `)

    console.groupEnd()

    return result

}

export default (initialState={}) => {
    return applyMiddleware(thunk,consoleMessages)(createStore)(appReducer, initialState)
}
