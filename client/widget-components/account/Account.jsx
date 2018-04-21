import React from 'react';

import './account.scss';
import Label from '../../components/label/Label.jsx';
import Button from '../../components/button/Button.jsx';

export default class Account extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='account' style={this.props.style}>
                <div className='account-container' style={this.props.styleContainer}>
                    <Label style={{fontSize: 36}} text={`Счёт №${this.props.account}`}/>
                    <Label style={{fontSize: 24, marginTop: 13}} text={`Количество привязанных карт: ${this.props.cardsCount}`}/>

                    <div className='account-container__button-container'>
                        <Button text='Пополнить' style={{height: 40, width: 240, margin: 'auto 0'}}/>
                        <Label style={{fontSize: 48, position: 'absolute', right: 0, bottom: -8}} text={`${this.props.money}&#8381;`}/>
                    </div>
                </div>
            </div>
        )
    }
}