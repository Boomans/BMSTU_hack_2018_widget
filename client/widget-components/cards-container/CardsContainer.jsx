import React from 'react';
import myCardsData from './CardsData.jsx';
import Card from '../../components/card/Card.jsx'
import Label from '../../components/label/Label.jsx'

import './cards-container.scss'

export default class CardsContainer extends React.Component {
    constructor(props) {
        super(props);
        this._imgWidth = 300;
        this._imgHeight = 200;
        this._itemSize = 20;
    }

    render() {
        return (
            <div className='cards-container'>
                {
                    myCardsData.map((card, i) => {
                        return (
                            <div className='cards-container__item'>
                                <Card img={card.image}
                                      imgSize={[this._imgWidth, this._imgHeight]}
                                      title={card.title}
                                      content={
                                          card.info.map((item, i)=>{
                                              return (
                                                  <div className='info-item'>
                                                      <div className='info-item__image'>
                                                          <img src={item.image} alt=""
                                                               width={this._itemSize}
                                                               height={this._itemSize}
                                                          />
                                                      </div>
                                                      <div className='info-item__value'>
                                                          {item.value}
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