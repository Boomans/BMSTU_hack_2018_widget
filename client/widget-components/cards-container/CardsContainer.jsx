import React from 'react';
import myCardsData from './MyCardsData.jsx';
import Card from '../../components/card/Card.jsx'

export default class MyCardsContainer extends React.Component {
    constructor(props) {
        super(props);
        this._imgWidth = 200;
        this._imgHeight = 200;
    }

    render() {
        return (
            <div>
                {
                    myCardsData.map((card, i) => {
                        return (<Card img={card.image}
                                      imgSize={[this._imgWidth, this._imgHeight]}
                        />)
                    })
                }
            </div>

        )
    }
};