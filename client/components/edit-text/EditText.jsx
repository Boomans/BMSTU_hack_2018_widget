import React from 'react';
import './edit-text.scss';

export default class EditText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='edit-text'>
                <div className='edit-text__container' style={this.props.style}>
                    <input value={this.props.text || ''} style={this.props.inputStyle} id={this.props.id} type='text' placeholder={this.props.placeholder} onChange={this.props.onChange}/>
                </div>
            </div>
        )
    }
}