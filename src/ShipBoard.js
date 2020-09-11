import React, {Component} from 'react';
import './App.css';

import BattleField from './components/BattleField';
import Cell from './components/Cell';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ships: {
        battleship: {
          coords: [{fromX: 5, fromY: 1, toX: 5, toY: 4}],
          length: 4
        },
        cruise: {
          coords: [{fromX: 1, fromY: 5, toX: 3, toY: 5}],
          length: 3
        },
        destroyer: {
          coords: [{fromX: 0, fromY: 0, toX: 1, toY: 0},
            {fromX: 1, fromY: 1, toX: 2, toY: 1}],
          length: 2
        },
        submarine: {
          coords: [{fromX: 4, fromY: 0, toX: 4, toY: 0},
                    {fromX: 1, fromY: 3, toX: 1, toY: 3},
                    {fromX: 3, fromY: 2, toX: 3, toY: 2}
                  ],
          length: 1
        }
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
      const isShipDestroyed = this.findIfShip(ship, 'injured', x, y);
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
    this.setState({'matrix': newState}, () => {
      const isGameOver = this.findIfGameOver();
      if(isGameOver){
        this.props.onGameOver();
      }
    });
  }
  findIfShip(ship, shipState = 'injured', x, y){
    let shipDestroyed = true;
    for( let i = ship.fromY; i<= ship.toY; i++){
      for( let j = ship.fromX; j<= ship.toX; j++){
        shipDestroyed = (shipDestroyed && 
                          (
                            this.state.matrix[i][j].state === shipState ||
                            (!isNaN(x) && !isNaN(y) && i === y && j === x)
                          )
                        );
      }
    }
    return shipDestroyed;
  }
  findShipAtCoord(x, y){
    const _this = this;
    const foundShip = Object.keys(this.state.ships).reduce((mem, shipName) => {
      const ship = _this.state.ships[shipName].coords.find((shipObj) => {
        return shipObj.fromX <= x && shipObj.fromY <= y && shipObj.toX >= x && shipObj.toY >= y;
      })
      if(ship)
          mem.push(Object.assign({}, ship, {'ship': shipName}));
       return mem;
    }, [])
    return foundShip && foundShip[0];
  }
  findIfGameOver(){
    const availableShips = Object.keys(this.state.ships).filter((shipName) => {
      const ships = this.state.ships[shipName].coords.filter((ship) => {
        const destroyedShip = this.findIfShip(ship, 'destroyed');
        return destroyedShip ? false : true;
      })
      return ships.length > 0;
    })
    return availableShips.length === 0;
  }
  render(){
    return (
      <div className="app container">
        <dl className="row list-unstyled ships-list text-center">
          {Object.keys(this.state.ships).map((shipName) => {
            return (<div className="col-md-12" key={shipName}>
              <dd className="col-sm-6">{shipName}</dd>
              <dt className="col-sm-6">
                {this.state.ships[shipName].coords.length} x 
                {new Array(this.state.ships[shipName].length).fill(0).map((cell, index) => {
                  return <Cell key={index} />
                })}
              </dt>
            </div>);
          })}
        </dl>
        <BattleField matrix={this.state.matrix} ships={this.state.ships} findShipAtCoord={this.findShipAtCoord.bind(this)} onCellClick={this.cellClick.bind(this)} />
      </div>
    );
  }
}
