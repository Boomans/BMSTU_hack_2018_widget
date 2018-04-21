import React from 'react';
import myCardsData from './MyCardsData.jsx';
import Card from '../../components/card/Card.jsx'

import './my-cards-container.scss'

export default class MyCardsContainer extends React.Component {
    constructor(props) {
        super(props);
        this._imgWidth = 300;
        this._imgHeight = 200;
    }

    render() {
        return (
            <div className='my-cards-container'>
                {
                    myCardsData.map((card, i) => {
                        return (
                            <div className='my-cards-container__item'>
                                <Card img={card.image}
                                      imgSize={[this._imgWidth, this._imgHeight]}
                                      title={card.title}
                                      content={
                                          card.info.map((item, i) => {
                                              return (
                                                  <div className='info-item'>
                                                      <div className='info-item__key'>
                                                          {item.key}: <b>{item.value}</b>
                                                      </div>
                                                  </div>
                                              )
                                          })
                                      }
                                />
                            </div>
                        )
                    })
                }
            </div>

        )
    }
};