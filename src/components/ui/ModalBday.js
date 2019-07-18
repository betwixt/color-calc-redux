import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './Modal.css';
import NumChooser  from '../containers/NumChooserWrap';
import MonthChooser  from '../containers/MonthChooser';



const ModalTrigger = ({ onOpen, text }) => 
	<button className="c-btn" onClick={onOpen}>{text}</button>;

const BdayModalContent = ({ onClose }) => {
  return ReactDOM.createPortal(
    <aside className="c-modal-cover">
      <div className="c-modal">
        <button className="c-modal__close" aria-label="Close Modal" onClick={onClose}>
          <span className="u-hide-visually">Close</span>
          <svg className="c-modal__close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30"></path></svg>
        </button>
        <div className="c-modal__body">
                <MonthChooser />
                <NumChooser />				
		</div>
      </div>
    </aside>,
    document.body
  );
}
/*
CONTENT GOES HERE :-D
                <MonthChooser />
                <NumChooser />
*/
class Modal extends Component {
  state = { isOpen: false };
  
  onOpen = () => {
	this.setState({ isOpen: true });
  };
  
  onClose = () => {
	this.setState({ isOpen: false });
  }
	  
  render() {
	const { isOpen } = this.state;
    const { triggerText } = this.props; 
    return (
	  <Fragment>
		<ModalTrigger onOpen={this.onOpen} text={triggerText} />
		{ isOpen &&
			<BdayModalContent onClose={this.onClose} />
		}
	  </Fragment>    
	);
  }
}
Modal.propTypes = {
	triggerText: PropTypes.string
}
export default Modal;