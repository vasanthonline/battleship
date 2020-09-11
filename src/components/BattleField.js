import React, {Component} from 'react';
import Cell from './Cell';

export default class BattleField extends Component {
  render(){
    return (<div className="container battlefield">
      {this.props.matrix.map((row, rowIndex) => {
        return (<div className="row" key={rowIndex}>
          {row.map((cellItem, colIndex) => {
            return <Cell {...cellItem} x={rowIndex} y={colIndex} key={`${rowIndex}_${colIndex}`}/>
          })}
        </div>)
      })}
    </div>)
  }
}