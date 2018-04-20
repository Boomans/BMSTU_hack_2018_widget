import React from 'react';
import './form.scss';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`form${this.props.isHidden ? ' hidden' : ''}`} style={this.props.style}>
                <div className={`form__container`}>
                    <div className={`form__container__content ${this.props.orientation === 'vertical' ? 'form__container__content_vertical' : 'form__container__content_horizontal'}`}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}