import React from 'react';
import './header.scss';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='lk-header' style={this.props.style}>
                <div className='lk-header__container'>
                    <ul>
                    {this.props.titles.map((title, i) => {
                        return (<li key={`${i}-lk-header-buttons`}>
                            {title}
                        </li>)
                    })}
                    </ul>
                </div>
            </div>
        )
    }
}