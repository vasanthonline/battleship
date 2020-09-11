import React, {Component} from 'react';
import Cell from './Cell';

export default class BattleField extends Component {
  render(){
    const _this = this;
    return (<div className="container battlefield">
      {this.props.matrix.map((row, rowIndex) => {
        return (<div className="row" key={rowIndex}>
          {row.map((cellItem, colIndex) => {
            const ship = _this.props.findShipAtCoord(colIndex, rowIndex);
            return <Cell {...cellItem} x={colIndex} y={rowIndex} ship={ship} key={`${rowIndex}_${colIndex}`} onCellClick={this.props.onCellClick} />
          })}
        </div>)
      })}
    </div>)
  }
}