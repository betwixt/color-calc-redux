import { SubjectSelection } from '../ui/SubjectSelection'
import { connect } from 'react-redux'
import { updateSubject, updateSubjectFromList, getSubjectsFromDB, deleteSubjects } from '../../colorActions'

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
        doDeletes(list){
            dispatch( deleteSubjects(list) )
        }, 
    })

export default connect(mapStateToSubjSelectProps, mapDispatchToSubjSelectProps)(SubjectSelection)
