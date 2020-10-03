import React from 'react';
// import './App.css';
import GameShow from './Components/GameShow'
import{
    Line,
    SteppedLine,
    PolyLine,
    Circle,
    Rectangle
} from 'draw-shape-reactjs';

function App() {
  return (
    <div className="App">
        <p>
          Game Show App!
        </p>

        <Line
            position='fixed'
            from={[110, 610]}
            to={[600, 850]}
            color='#1DBFE7'
        />

        <GameShow/>
    </div>
  );
}

export default App;
