import React, { Component } from 'react';
import CompassAndGridWrapper from './CompassAndGridWrapper';

class App extends Component {
    constructor() {
        super();
        this.state = {
            grid: {
                width: 6,
                length: 6
            },
            dirt: {
                x: 4,
                y: 2
            },
            roomba: {
                x: 0,
                y: 0
            },
            submitButtonClicked: true
        };
    }

    coordinatesCheckIfMaxY = (y) => {
        return y !== this.state.grid.length;
    };

    coordinatesCheckIfMaxX = (x) => {
        return x !== this.state.grid.width;
    };

    coordinatesCheckIfZero = (xOrY) => {
        return xOrY > 0;
    };

    north = () => {
        const roomba = this.state.roomba;

        if(this.coordinatesCheckIfMaxY(roomba.y + 1)) {
            roomba["y"] += 1;
            this.setState({roomba}, this.tileCleaned());
        }
    };

    east = () => {
        const roomba = this.state.roomba;

        if(this.coordinatesCheckIfMaxX(roomba.x + 1)) {
            roomba["x"] += 1;
            this.setState({roomba}, this.tileCleaned());
        }
    };

    south = () => {
        const roomba = this.state.roomba;

        if(this.coordinatesCheckIfZero(roomba.y)) {
            roomba["y"] -= 1;
            this.setState({roomba}, this.tileCleaned());
        }
    };

    west = () => {
        const roomba = this.state.roomba;

        if(this.coordinatesCheckIfZero(roomba.x)) {
            roomba["x"] -= 1;
            this.setState({roomba}, this.tileCleaned());
        }
    };

   

    tileCleaned() {
        if(JSON.stringify(this.state.roomba) === JSON.stringify(this.state.dirt)) {
            this.setState({
                dirt: "game over"
            })
        }
    }

    render() {
        return (
            <div>
                <div className="header">
                    <span>Roomba coding Challenge</span>
                </div>
                
                    <CompassAndGridWrapper
                        appState={this.state}
                        north={this.north}
                        east={this.east}
                        south={this.south}
                        west={this.west}
                    /> 
                
            </div>
        );
    }
}

export default App;

