import React from 'react';

import './message.scss';
import Label from '../../components/label/Label.jsx';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this._messageContainerId = `message-container-${Math.random()}`;
    }

    componentDidMount() {
        this._messageContainer = document.getElementById(this._messageContainerId);
    }

    render() {
        return (
            <div className='message-container'>
                <div id={this._messageContainerId} className='message-container__content'>
                    {this.props.messages.map((textData, i) => {
                        const {isCommand, text, isWaiting} = textData;
                        if (isWaiting) {
                            return this.createWaitingDots();
                        } else {
                            return this.createBubbleComponent(isCommand, text, `message-container__content__bubble-${i}`);
                        }
                    })}
                </div>
            </div>
        )
    }

    createWaitingDots() {
        return (<div key='waiting-dots' className='bubble'>
            <div className={`bubble-container tri-right bubble-container__right right-in round`}>
                <div className='waiting-dots'>
                    <div className='waiting-dots__container'>
                        {[1, 2, 3].map(i => {
                            return (<span key={`waiting-dots-key-${i}`}/>);
                        })}
                    </div>
                </div>
            </div>
        </div>);
    }


    createBubbleComponent(isLeft, text, id) {
        return (<div key={id} className='bubble'>
            <div
                className={`bubble-container tri-right ${isLeft ? 'bubble-container__left left-in' : 'bubble-container__right right-in'} round`}>
                <div className="talk-text">
                    <Label text={text}/>
                </div>
            </div>
        </div>);
    }
}