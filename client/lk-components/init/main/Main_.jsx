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
// import CardContainer from '../../../widget-components/cards-container/CardsContainer.jsx'
import MyCardContainer from '../../../lk-components/my-cards-container/MyCardsContainer.jsx'

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
            isLoginHidden: false
        };

        this._loginData = {};
        this._loginContainerId = `login-container-${Math.random()}`;
        this._mainContainerId = `main-container-${Math.random()}`;
    }

    componentDidMount() {
        this._popupContainer = document.getElementById('popup-container');
        this._checkCookie();

        window.globalAction = {
            openPayment: () => {
                const content = this._getPopupContent('payment');
                this._mountPopup(content);
            }
        };

        const loginElement = document.getElementById(this._loginContainerId);
        if (!loginElement) return;

        const loginElementData = loginElement.getBoundingClientRect();

        document.getElementById(this._mainContainerId).style.marginTop= (loginElementData.top + loginElementData.height) + 'px';
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
                <div className='login-container'  id={this._loginContainerId}>
                    <Divider/>
                    <div id='bot-container'/>
                    <Form isHidden={this.state.isLoginHidden} style={{marginTop: 10}}>
                        <EditText id='lk-login' onChange={this._onEditTextChange} style={{width: 300, height: 42}}
                                  placeholder='Логин'/>
                        <EditText id='lk-pass' onChange={this._onEditTextChange}
                                  style={{width: 300, height: 42, marginLeft: 10}} placeholder='Пароль'/>
                        <Button text='Войти' style={{marginLeft: 10, width: 150, height: 42}}
                                onClick={this._onLoginClick}/>
                    </Form>

                    <Label isHidden={this.state.isLoginHidden} isTitle={true}
                           text='Чтобы воспользоваться ботом, нужно авторизоваться'
                           style={{marginTop: 10}}/>
                </div>
                <div className='main-content' id={this._mainContainerId}>
                    {/*<CardContainer/>*/}
                    <MyCardContainer/>
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

    _getPopupContent(key) {
        const content = {
            'payment': (<div><Label style={{fontSize: 35}} isTitle={true} text='Пополнение счёта'/>
                <Label text='Счет' style={{fontSize: 24}}/>
                <EditText placeholder='' style={{height: 60, marginTop: 8}} inputStyle={{backgroundColor: '#f3f3f3'}}/>
                <Label text='Сумма' style={{fontSize: 24, marginTop: 22}}/>
                <EditText placeholder='' style={{height: 60, marginTop: 8}} inputStyle={{backgroundColor: '#f3f3f3'}}/>
                <Button text='Пополнить' style={{height: 60, marginTop: 29}}/></div>)
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
            'lk-login': 'login',
            'lk-pass': 'pass'
        };

        this._loginData[keys[e.target.id]] = e.target.value;
    }

    _onLoginClick() {
        this._showBlocker();

        setTimeout(() => {
            if (this._loginData.login && this._loginData.pass) {
                cookieUtils.set(COOKIE_KEY, `${this._loginData.login}_${this._loginData.pass}`);
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