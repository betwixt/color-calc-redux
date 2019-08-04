import { SubjectSelection } from '../ui/Parts'
import { connect } from 'react-redux'
import { updateSubject, updateSubjectFromList, getSubjectsFromDB } from '../../colorActions'

const mapStateToSubjSelectProps = state => 
    ({ 
        bdayOptions: state.bdayOptions
     })

const mapDispatchToSubjSelectProps = dispatch =>
    ({
        setSubject(){
            dispatch( updateSubject() )
        } ,
        setFromList(e, data){
            dispatch( updateSubjectFromList(e, data) )
        }, 
        getSubjectsFromDB(){
            dispatch( getSubjectsFromDB() )
        }, 
    })

export default connect(mapStateToSubjSelectProps, mapDispatchToSubjSelectProps)(SubjectSelection)
