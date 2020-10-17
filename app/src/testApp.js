import React, {useState, useEffect} from 'react';
// import './App.css';
import GameShow from './Components/GameShow';
import ReactCamera from './Components/ReactCamera';
import{
    Line,
    SteppedLine,
    PolyLine,
    Circle,
    Rectangle
} from 'draw-shape-reactjs';

class Display extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            json: '',
            count: 0,
        };
    }

    updateState(){
        this.setState({});
    }

    render(){
        return (<button onClick={this.updateState()}>"hi"</button>);
    }
}

function App () {
    return <Display/> ;
}

export default App;
