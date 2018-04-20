import React from 'react';

import './popup.scss';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='popup' style={this.props.style}>
                <div className='popup-container' style={this.props.styleContainer}>
                    {this.props.children}
                </div>
                <div className='close' onClick={this.props.onClose}/>
            </div>
        )
    }
}