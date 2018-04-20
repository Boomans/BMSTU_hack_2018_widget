import React from 'react';
import './label.scss';

export default class Label extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`label${this.props.isTitle ? ' label-title' : ''}${this.props.isHidden ? ' hidden' : ''}`} style={this.props.style}>
                <div className='label__container' dangerouslySetInnerHTML={{__html: this.props.text}}/>
            </div>
        )
    }
}