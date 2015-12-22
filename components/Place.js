import React, { Component, PropTypes } from 'react';

export default class Place extends Component {


    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const {handleClick,data}  = this.props;
        handleClick(data);
    }

    render() {


        const K_WIDTH = 26;
        const K_HEIGHT = 26;

        const greatPlaceStyle = {
            // initially any map object has left top corner at lat lng coordinates
            // it's on you to set object origin to 0,0 coordinates
            position: 'absolute',
            //width: K_WIDTH,
            width: "auto",
            //height: K_HEIGHT,
            height: "40px",
            left: -K_WIDTH / 2,
            top: -K_HEIGHT / 2,
            textAlign:"center",
            border: '5px solid ' + this.props.color,
            //borderRadius: K_HEIGHT,
            borderRadius: 10,
            backgroundColor: 'white',
            textAlign: 'right bottom',
            fontSize: '14px',
            fontWeight: 'bold',
            padding: 4,
            overflow: 'visible',
            //textIndent: "10px",
            font: 'Arial',
            color: 'blue',
            // textShadow: '0 1px 0 #ccc,    0 2px 0 #c9c9c9,            0 3px 0 #bbb,            0 4px 0 #b9b9b9,            0 5px 0 #aaa,            0 6px 1px rgba(0,0,0,.1),            0 0 5px rgba(0,0,0,.1),            0 1px 3px rgba(0,0,0,.3),            0 3px 5px rgba(0,0,0,.2),            0 5px 10px rgba(0,0,0,.25),            0 10px 10px rgba(0,0,0,.2),            0 20px 20px rgba(0,0,0,.15)'
        };
        const arrowStyle = {position: "absolute", top: "12px",fontSize:'24px',color:'blue'}
        return (
            <div className="gpsPlace">
                <div  style={greatPlaceStyle} onClick={this.onClick}>
                    {this.props.text}

                </div>
                <div className="hoverInfo">{this.props.hoverText}</div>
                <div style={arrowStyle}>▼</div>

            </div>
        );
    }
}