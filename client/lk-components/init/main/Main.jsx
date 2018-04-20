import React from 'react';
import ReactDOM from 'react-dom';

import './main.scss';
import Header from '../../header/Header.jsx';
import Divider from '../../../components/divider/Divider.jsx';
import Form from '../../../components/form/Form.jsx';
import EditText from '../../../components/edit-text/EditText.jsx';
import Label from '../../../components/label/Label.jsx';
import Button from '../../../components/button/Button.jsx';
import Blocker from '../../../components/blocker/Blocker.jsx';
import cookieUtils from '../../../src/utils/cookie.js';
import Popup from '../../../components/popup/Popup.jsx';

const COOKIE_KEY = window.data.cookieKey;

export default class MainSection extends React.Component {
    constructor(props) {
        super(props);

        this._onLoginClick = this._onLoginClick.bind(this);
        this._onLogoutClick = this._onLogoutClick.bind(this);
        this._onEditTextChange = this._onEditTextChange.bind(this);
        this._unmountPopup = this._unmountPopup.bind(this);

        this.state = {
            isBlockerHidden: true,
            isLoginHidden: false,
            loginText: '',
            passText: ''
        };
    }

    componentDidMount() {
        this._popupContainer = document.getElementById('popup-container');
        this._checkCookie();

        window.globalAction = {
            openPayment: (params) => {
                const content = this._getPopupContent('payment', params);
                this._mountPopup(content);
            }
        };
    }

    render() {
        return (
            <div>
                <div id='popup-container'/>
                <Blocker isHidden={this.state.isBlockerHidden}/>
                <Header titles={['Карты', 'Сервисы', 'АЗС', 'Клиенты', 'Акции', 'Контакты']}/>
                <Button isHidden={!this.state.isLoginHidden} text='Выйти'
                        style={{position: 'fixed', top: 15, right: 15, width: 150, height: 42}}
                        onClick={this._onLogoutClick}/>
                <div className='login-container'>
                    <Divider/>
                    <div id='bot-container'/>
                    <Form isHidden={this.state.isLoginHidden} style={{marginTop: 10}}>
                        <EditText id='lk-login' onChange={this._onEditTextChange} style={{width: 300, height: 42}}
                                  placeholder='Логин' text={this.state.loginText}/>
                        <EditText id='lk-pass' onChange={this._onEditTextChange}
                                  style={{width: 300, height: 42, marginLeft: 10}} placeholder='Пароль'
                                  text={this.state.passText}/>
                        <Button text='Войти' style={{marginLeft: 10, width: 150, height: 42}}
                                onClick={this._onLoginClick}/>
                    </Form>

                    <Label isHidden={this.state.isLoginHidden} isTitle={true}
                           text='Чтобы воспользоваться ботом, нужно авторизоваться'
                           style={{marginTop: 10}}/>
                </div>
                <div className='main-content'>

                </div>
            </div>
        )
    }

    _mountPopup(children) {
        ReactDOM.render(<Popup styleContainer={{width: '50%'}} onClose={this._unmountPopup}>
            {children}
        </Popup>, this._popupContainer);
    }

    _unmountPopup() {
        ReactDOM.unmountComponentAtNode(this._popupContainer);
    }

    _getPopupContent(key, params) {
        const content = {
            'payment': (<div><Label style={{fontSize: 35}} isTitle={true} text='Пополнение счёта'/>
                <Label text='Счет' style={{fontSize: 24}}/>
                <EditText placeholder='' text={params.account} style={{height: 60, marginTop: 8}} inputStyle={{backgroundColor: '#f3f3f3'}}/>
                <Label text='Сумма' style={{fontSize: 24, marginTop: 22}}/>
                <EditText placeholder='' text={params.money} style={{height: 60, marginTop: 8}} inputStyle={{backgroundColor: '#f3f3f3'}}/>
                <Button onClick={this._unmountPopup} text='Пополнить' style={{height: 60, marginTop: 29}}/></div>)
        };

        return content[key];
    }


    _checkCookie() {
        this.setState({
            isLoginHidden: !!cookieUtils.get(COOKIE_KEY)
        });
    }

    _hideBlocker() {
        this.setState({
            isBlockerHidden: true
        });
    }

    _showBlocker() {
        this.setState({
            isBlockerHidden: false
        });
    }

    _onEditTextChange(e) {
        const keys = {
            'lk-login': 'loginText',
            'lk-pass': 'passText'
        };

        const newState = {};
        newState[keys[e.target.id]] = e.target.value;
        this.setState(newState);
    }

    _onLoginClick() {
        this._showBlocker();

        setTimeout(() => {
            if (this.state.loginText && this.state.passText) {
                cookieUtils.set(COOKIE_KEY, `${this.state.loginText}_${this.state.passText}`);
            }

            this._hideBlocker();
            this._checkCookie();
        }, 2000);
    }

    _onLogoutClick() {
        cookieUtils.remove(COOKIE_KEY);
        this._checkCookie();
    }
}