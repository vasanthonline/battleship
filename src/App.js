import React from 'react';
import './App.css';

import BattleField from './components/BattleField';

function App() {
  const matrix = [
    [
      {'state': 'open', 'ship': 'destroyer'},
      {'state': 'open', 'ship': 'destroyer'},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': 'battleship'}
    ],
    [
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': 'destroyer'},
      {'state': 'open', 'ship': 'destroyer'},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': 'battleship'}
    ],
    [
      {'state': 'open', 'ship': 'submarine'},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': 'cruiser'},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': 'battleship'}
    ],
    [
      {'state': 'open', 'ship': 'submarine'},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': 'cruiser'},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': 'battleship'}
    ],
    [
      {'state': 'open', 'ship': 'submarine'},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': 'cruiser'},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': ''}
    ],
    [
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': 'cruiser'},
      {'state': 'open', 'ship': 'cruiser'},
      {'state': 'open', 'ship': 'cruiser'},
      {'state': 'open', 'ship': ''},
      {'state': 'open', 'ship': ''}
    ]
  ]
  return (
    <div className="App">
      <BattleField matrix={matrix} />
    </div>
  );
}

export default App;
