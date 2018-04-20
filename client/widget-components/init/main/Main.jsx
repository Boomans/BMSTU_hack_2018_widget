import React from 'react';
import Form from '../../../components/form/Form.jsx';
import EditText from '../../../components/edit-text/EditText.jsx';
import Button from '../../../components/button/Button.jsx';
import Label from '../../../components/label/Label.jsx';
import Message from '../../message/Message.jsx';

import './main.scss';

export default class MainSection extends React.Component {
    constructor(props) {
        super(props);

        this._onSendClick = this._onSendClick.bind(this);
        this._onEditTextChange = this._onEditTextChange.bind(this);
        this._mainContainerId = `widget-container-${Math.random()}`;
        this.state = {
            workAreaTop: 0,
            messages: []
        };

        this._command = null;
        this._commandEditTextId = `widget-command-${Math.random()}`;

        this._initStyles();
    }

    _initStyles() {
        const link = document.createElement('link');
        link.href = window.widget.data.stylesLink;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        document.head.appendChild(link);
    }

    componentDidMount() {
        const mainElement = document.getElementById(this._mainContainerId);
        if (!mainElement) return;

        const mainElementData = mainElement.getBoundingClientRect();
        this.setState({
            workAreaTop: mainElementData.top + mainElementData.height
        });

        this._commandEditText = document.getElementById(this._commandEditTextId);
    }

    render() {
        return (
            <div id={this._mainContainerId} className='widget-container'>
                <Label isTitle={true}
                       text='Напишите сообщение боту и он выполнит вашу просьбу'
                       style={{marginTop: 10}}/>
                <Form style={{marginTop: 10}}>
                    <EditText id={this._commandEditTextId} onChange={this._onEditTextChange} style={{width: 500, height: 42}}
                              placeholder='Введите сообщение'/>
                    <Button text='Отправить' style={{marginLeft: 10, width: 150, height: 42}}
                            onClick={this._onSendClick}/>
                </Form>

                <div className='widget-container__workarea' style={{
                    position: 'fixed',
                    top: this.state.workAreaTop
                }}>
                    <div className='widget-container__workarea-container' style={{
                        width: 670
                    }}>
                        <Message messages={this.state.messages}/>
                    </div>
                </div>
            </div>
        )
    }

    _onSendClick() {
        if (!this._command) return;

        this.setState({
            messages: this.state.messages.concat([{
                isCommand: true,
                text: this._command
            }])
        });

        this._commandEditText.value = '';
        this._command = null;

        //TODO делается запрос

        setTimeout(() => {
            this.setState({
                messages: this.state.messages.concat([{
                    isWaiting: true
                }])
            });
        }, 500);
    }

    _onEditTextChange(e) {
        this._command = e.target.value;
    }
}