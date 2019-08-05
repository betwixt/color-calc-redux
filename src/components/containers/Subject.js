import { Subject} from '../ui/Parts'
import { connect } from 'react-redux'
import { showTodayColor, createSubject } from '../../colorActions'
//import { months } from '../colorData'

const mapStateToSubjProps = state =>   
    ({
        bdayString: state.subject,
        todayCode: parseInt(state.todayColor)
    })

const mapDispatchToSubjProps = dispatch =>
    ({
        updatePane(){
            dispatch( showTodayColor() )
        }, 
        saveBday(name){
            dispatch( createSubject(name) )
        } 
    })

export default connect(mapStateToSubjProps, mapDispatchToSubjProps)(Subject)
