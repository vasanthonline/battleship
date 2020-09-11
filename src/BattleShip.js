import React, {Component} from 'react';
import ShipBoard from './ShipBoard';

export default class Cell extends Component {

  onCellClick(){
    this.props.onCellClick && this.props.onCellClick(this.props.x, this.props.y);
  }

  render(){
    return (<div className="container-fluid">
              <div className="row text-center">
                <h1 className="col-md-12">Battle Ship</h1>
              </div>
              <div className="row">
                <div className="player-1 col-md-6">
                  <h3 className="text-center">Player 1</h3>
                  <ShipBoard />
                </div>
                <div className="player-2 col-md-6">
                  <h3 className="text-center">Player 2</h3>
                  <ShipBoard />
                </div>
              </div>
            </div>)
  }
}