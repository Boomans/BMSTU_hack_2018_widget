import React from 'react';
import MyCardsData from './MyCardsData';
import Card from '../card/Card'

export default class MyCardsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            MyCardsData.map((card, i)=>{
                return (<Card img=card.image>)
            })

        )
    }
};