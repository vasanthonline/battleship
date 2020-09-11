import React, {Component} from 'react';
import ShipBoard from './ShipBoard';

export default class Cell extends Component {

  onCellClick(){
    this.props.onCellClick && this.props.onCellClick(this.props.x, this.props.y);
  }

  onGameOver(player){
    const answer = window.confirm(`Player ${player === 1 ? 2 : 1} WINS!. All ships of player ${player} destroyed. Restart game?`);
    if(answer){
      window.location.reload();
    }
  }

  render(){
    return (<div className="container-fluid">
              <div className="row text-center">
                <h1 className="col-md-12">Battle Ship</h1>
              </div>
              <div className="row">
                <div className="player-1 col-md-6">
                  <h3 className="text-center">Player 1</h3>
                  <ShipBoard onGameOver={this.onGameOver.bind(this, 1)} />
                </div>
                <div className="player-2 col-md-6">
                  <h3 className="text-center">Player 2</h3>
                  <ShipBoard onGameOver={this.onGameOver.bind(this, 2)} />
                </div>
              </div>
            </div>)
  }
}