import React, {Component} from 'react';
import './App.css';

import BattleField from './components/BattleField';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ships: {
        destroyer: [
            {fromX: 0, fromY: 0, toX: 1, toY: 0},
            {fromX: 1, fromY: 1, toX: 2, toY: 1}
        ],
        battleship: [
          {fromX: 5, fromY: 1, toX: 5, toY: 4}
        ],
        cruise: [
          {fromX: 1, fromY: 5, toX: 3, toY: 5}
        ],
        submarine: [
          {fromX: 4, fromY: 0, toX: 4, toY: 0},
          {fromX: 1, fromY: 3, toX: 1, toY: 3},
          {fromX: 3, fromY: 2, toX: 3, toY: 2}
        ]
      },
      matrix : [
        [
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
        ],
        [
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
        ],
        [
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
        ],
        [
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
        ],
        [
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
        ],
        [
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
          {'state': 'open'},
        ]
      ]
    }
  }

  cellClick(x, y){
    const newState = [...this.state.matrix]
    const cellState = newState[y][x];
    const ship = this.findShipAtCoord(x, y);
    if(cellState.state === 'open' && ship){
      const isShipDestroyed = this.findIfShipDestroyed(ship, x, y);
      if(isShipDestroyed){
        for( let i = ship.fromY; i<= ship.toY; i++){
          for( let j = ship.fromX; j<= ship.toX; j++){
            newState[i][j]['state'] = 'destroyed';
          }
        }
      } else {
        newState[y][x]['state'] =  'injured';
      }
    }else if(cellState.state === 'open' && !ship){
      newState[y][x]['state'] = 'inactive';
    }
    this.setState({'matrix': newState});
  }
  findIfShipDestroyed(ship, x, y){
    let shipDestroyed = true;
    for( let i = ship.fromY; i<= ship.toY; i++){
      for( let j = ship.fromX; j<= ship.toX; j++){
        shipDestroyed = (shipDestroyed && 
                          (
                            this.state.matrix[i][j].state === 'injured' ||
                            (i === y && j === x)
                          )
                        );
      }
    }
    return shipDestroyed;
  }
  findShipAtCoord(x, y){
    const _this = this;
    const foundShip = Object.keys(this.state.ships).reduce((mem, shipName) => {
      const ship = _this.state.ships[shipName].find((shipObj) => {
        return shipObj.fromX <= x && shipObj.fromY <= y && shipObj.toX >= x && shipObj.toY >= y;
      })
      if(ship)
          mem.push(Object.assign({}, ship, {'ship': shipName}));
       return mem;
    }, [])
    return foundShip && foundShip[0];
  }
  render(){
    return (
      <div className="App">
        <BattleField matrix={this.state.matrix} ships={this.state.ships} findShipAtCoord={this.findShipAtCoord.bind(this)} onCellClick={this.cellClick.bind(this)} />
      </div>
    );
  }
}
