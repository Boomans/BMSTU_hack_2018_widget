import React from 'react';
import './blocker.scss';

export default class Blocker extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className={`blocker${this.props.isHidden ? ' hidden' : ''}`}>
            <div className='blocker__container'>
                {(function () {
                    const items = [];
                    for (let i = 0; i < 15; i++) {
                        items.push(<span key={`loader-span-${i}`}/>);
                    }
                    return items;
                })()}
            </div>
        </div>)
    }
}