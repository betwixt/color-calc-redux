import { CalcInput } from '../ui/CalcInput'
import { connect } from 'react-redux'
import { setChosenDate, calculateChosenDayColor, setResetTargets, showTodayColor, showTargetWeek, showChosenDayColor } from '../../colorActions'



const mapStateToProps = state  => 
    ({
        chosenCode: parseInt(state.chosenDayColor),
        resetTargets: state.resetTargets,
     })

const mapDispatchToProps = dispatch =>
    ({
        setChosenDate(str){
            dispatch( setChosenDate(str) )
        }, 
        calculateColor(){
            dispatch( calculateChosenDayColor() )
        }, 
        setResetTargets(bool){
            dispatch( setResetTargets(bool) )
        }, 
        showTodayColor(){
            dispatch( showTodayColor() )
        }, 
        showTargetWeek(){
            dispatch( showTargetWeek() )
        }, 
        showChosenDayColor(){
            dispatch( showChosenDayColor() )
        } 
    })


export default connect( mapStateToProps, mapDispatchToProps )(CalcInput)
