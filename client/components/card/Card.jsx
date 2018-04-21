import React from 'react';
import Label from '../../components/label/Label.jsx'
import './card.scss';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`card`}>
                <div className='card__container'>
                    <div className='card__container__image'>
                        <img src={this.props.img} width={this.props.imgSize[0]} height={this.props.imgSize[1]}/>
                    </div>
                    <div className='card__container__info'>
                        <div className='card__container__info__title'>
                            <Label text={`<h3 style="text-align:center;margin:0;color:#418c8b">${this.props.title}</h3>`}/>
                        </div>
                        {
                            this.props.content
                        }
                    </div>
                </div>
            </div>)
    }
}