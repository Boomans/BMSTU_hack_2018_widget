import React from 'react';
import './main.scss';
import Header from '../../header/Header.jsx';
import Divider from '../../../components/divider/Divider.jsx';
import Form from '../../../components/form/Form.jsx';
import EditText from '../../../components/edit-text/EditText.jsx';
import Label from '../../../components/label/Label.jsx';
import Button from '../../../components/button/Button.jsx';
import Blocker from '../../../components/blocker/Blocker.jsx';
import cookieUtils from '../../../src/utils/cookie.js';

const COOKIE_KEY = window.data.cookieKey;

export default class MainSection extends React.Component {
    constructor(props) {
        super(props);

        this._onLoginClick = this._onLoginClick.bind(this);
        this._onEditTextChange = this._onEditTextChange.bind(this);

        this.state = {
            isBlockerHidden: true,
            isLoginHidden: false
        };

        this._loginData = {};

        //asshole
        window.removeCookie = () => {
            cookieUtils.remove(COOKIE_KEY);
        };
    }

    componentDidMount() {
        this._checkCookie();
    }

    render() {
        return (
            <div>
                <Blocker isHidden={this.state.isBlockerHidden}/>
                <Header titles={['Карты', 'Сервисы', 'АЗС', 'Клиенты', 'Акции', 'Контакты']}/>
                <div className='login-container'>
                    <Divider/>
                    <div id='bot-container'/>
                    <Form isHidden={this.state.isLoginHidden} style={{marginTop: 10}}>
                        <EditText id='lk-login' onChange={this._onEditTextChange} style={{width: 300, height: 42}} placeholder='Логин'/>
                        <EditText id='lk-pass' onChange={this._onEditTextChange} style={{width: 300, height: 42, marginLeft: 10}} placeholder='Пароль'/>
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

    _checkCookie() {
        if (cookieUtils.get(COOKIE_KEY)) {
            this.setState({
                isLoginHidden: true
            });
        }
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

        if (this._loginData.login && this._loginData.pass) {
            cookieUtils.set(COOKIE_KEY, `${this._loginData.login}_${this._loginData.pass}`);
        }

        setTimeout(() => {
            this._hideBlocker();
            this._checkCookie();
        }, 2000);
    }
}