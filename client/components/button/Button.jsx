import React from 'react';
import './button.scss';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='button' style={this.props.style} onClick={this.props.onClick}>
                <div className='button__container'>
                    <div className='text-container'>
                        {this.props.text}
                    </div>
                </div>
            </div>
        )
    }
}