import React from 'react';
import Form from '../../../components/form/Form.jsx';
import EditText from '../../../components/edit-text/EditText.jsx';
import Button from '../../../components/button/Button.jsx';
import Label from '../../../components/label/Label.jsx';
import Message from '../../message/Message.jsx';
import httpRequest from '../../../src/utils/http.js';

import './main.scss';

export default class MainSection extends React.Component {
    constructor(props) {
        super(props);

        this._onSendClick = this._onSendClick.bind(this);
        this._onEditTextChange = this._onEditTextChange.bind(this);
        this._mainContainerId = `widget-container-${Math.random()}`;
        this.state = {
            workAreaTop: 0,
            messages: [],
            commandText: ''
        };

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
                    <EditText id={this._commandEditTextId} onChange={this._onEditTextChange}
                              style={{width: 500, height: 42}}
                              placeholder='Введите сообщение' text={this.state.commandText}/>
                    <Button text='Отправить' style={{marginLeft: 10, width: 150, height: 42}}
                            onClick={this._onSendClick}/>
                </Form>

                <div className='widget-container__workarea' style={{
                    position: 'fixed',
                    top: this.state.workAreaTop,
                    height: window.innerHeight - this.state.workAreaTop
                }}>
                    <div className='widget-container__workarea-container' style={{}}>
                        <Message messages={this.state.messages}/>
                    </div>
                </div>
            </div>
        )
    }

    _onSendClick() {
        if (this.state.commandText.trim() === '' || this._waitingResponse) return;

        this.setState({
            messages: [{
                isCommand: true,
                text: this.state.commandText
            }]
        });

        this._commandEditText.value = '';

        setTimeout(() => {
            // показываем балун ожидания
            this._waitingResponse = true;
            this.setState({
                messages: this.state.messages.concat([{
                    isWaiting: true
                }])
            });

            const bodyFormData = new FormData();
            bodyFormData.set('message', this.state.commandText);
            bodyFormData.set('meta_data', JSON.stringify({
                account_id: parseInt(Math.random() * 1000000)
            }));

            httpRequest({
                method: 'POST',
                url: window.widget.data.botServerLink,
                data: bodyFormData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    if (this._waitingResponse) {
                        this.state.messages.pop();
                        this.setState({
                            messages: this.state.messages.concat([{
                                isCommand: false,
                                text: res.message
                            }])
                        });
                    }
                    this._waitingResponse = false;

                    this._analyseResponse(res);
                })
                .catch(err => {
                    console.log(err);
                    if (this._waitingResponse) {
                        this.state.messages.pop();
                        this.setState({
                            messages: this.state.messages.concat([{
                                isCommand: false,
                                text: 'Возникла ошибка, повторите попытку'
                            }])
                        });
                    }
                    this._waitingResponse = false;
                });

            this.setState({
                commandText: ''
            });
        }, 500);
    }

    _onEditTextChange(e) {
        this.setState({
            commandText: e.target.value
        });
    }

    _analyseResponse(res) {
        if (!res.action) return;

        const split = res.action.split('?');
        const action = split[0].split('/').slice(1);
        const params = split[1].split('&').reduce((result, curr, i) => {
            const paramSplit = curr.split('=');
            result[paramSplit[0]] = paramSplit[1];
            return result;
        }, {});

        if (action[1] === 'payment') {
            window.globalAction.openPayment(params);
        }
    }
}