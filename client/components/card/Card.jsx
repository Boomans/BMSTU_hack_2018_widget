import React from 'react';
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

                        {/*<div className='skill' key={`skill-${i}`}>*/}
                            {/*<img*/}
                                {/*src={`/build/res/img/skills-icons/white/icons8-${skill.icon}.png`}*/}
                                {/*alt=""*/}
                                {/*style={{background: skill.color}}*/}
                                {/*width={this._iconSize}*/}
                                {/*height={this._iconSize}*/}
                            {/*/>*/}
                            {/*<div className='skill__text'>*/}
                                {/*<Label text={skill.text} type='midd-text'/>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>)
    }
}