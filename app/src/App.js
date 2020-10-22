import React, {useState, useEffect} from 'react';
// import './App.css';
import GameShow from './Components/GameShow';
import ReactCamera from './Components/ReactCamera';
import {Line} from 'draw-shape-reactjs';

function drawLine(x1, y1, x2, y2){
    return(
        <Line from={[x1, y1]} to={[x2, y2]} color='#1DBFE7'/>
    );
}

class Overlay extends React.Component{
    drawFigure(scale, xOffset, yOffset){
        //let scale = 480;

        //Origin is the top-left corner
        //(-Scale/2) + Offset ensures proper centering
        let yOrigin = -scale/2 + xOffset;
        let xOrigin = -scale/2 + yOffset;

        let output = [];        
        for (let i = 0; i < this.props.segments.length + 1; i += 2){
            let x1 = this.props.joints[2*this.props.segments[i]];
            let y1 = this.props.joints[2*this.props.segments[i]+1];
            let x2 = this.props.joints[2*this.props.segments[i+1]];
            let y2 = this.props.joints[2*this.props.segments[i+1]+1];

            if (x1 > 0 && y1 > 0 && x2 > 0 && y2 > 0){
                output.push(
                    drawLine(x1*scale+xOrigin, y1*scale+yOrigin,
                        x2*scale+xOrigin, y2*scale+yOrigin)
                );
            };
        };

        //Draw Boundary Box
        //(0,0) -> (1,0)
        output.push(drawLine(xOrigin, yOrigin, scale + xOrigin, yOrigin));
        //(0,0) -> (0,1)
        output.push(drawLine(xOrigin, yOrigin, xOrigin, scale + yOrigin));
        //(1,0) -> (1,1)
        output.push(drawLine(scale + xOrigin, yOrigin, scale + xOrigin, scale + yOrigin));
        //(0,1) -> (1,1)
        output.push(drawLine(xOrigin, scale + yOrigin, scale + xOrigin, scale + yOrigin));
        return output;
    }

    //Temporarily render a copy in the top-left corner (along with webcam snap)
    //TODO: after timer, remove this
    render(){
        return (
            <div>
                <div class ="overlay">{this.drawFigure(480, 0,0)}</div>
                <div>{this.drawFigure(480,240,240)}</div>
            </div>            
        );
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        //sTF function is sent as a parameter to ReactCamera, so we need to ensure "this" is bound to the Game instance
        this.sendToFlask = this.sendToFlask.bind(this);

        this.state = {
            //Init with Default JSON Placeholder
            joints: new Array(24),
            
            //Pairs of connected indices in JSON array
            segments: [0,21, 0,23, 0,1, 1,2, 2,6, 2,12, 6,3, 3,13, 3,4, 4,5, 5,24, 5,22, 13,14, 14,15, 12,11, 11,10, 12,8, 8,7, 7,13, 8,9, 18,20],

            //TODO Implement Shapes
            shapes: [0,1,2,3,4,5,6,7,8,9,10],
            shapeIndex: 0,
        };

    }

    updateJoints(str){
        this.setState({joints: JSON.parse(str).frames[0].persons[0].pose2d.joints});
    }

    nextShape(){
        this.setState({shapeIndex: Math.floor((Math.random() * this.state.shapes.length))});
    }

    sendToFlask(img){

        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            this.updateJoints(xhr.responseText);
        })
        // open the request with the verb and the url
        xhr.open('POST', 'http://localhost:5000/img');
        // send the request
        xhr.send(img);
    }  

    render(){
        //TODO: Figure out how to make this prettier / Centered Properly
        return(
            <div>
            <Overlay joints={this.state.joints} segments={this.state.segments} />
            <ReactCamera sendToFlask={this.sendToFlask}/>
            <div class = "centered">
                <button onClick={()=>this.nextShape()}>Pick Shape</button>
                <button onClick={()=> alert(this.state.shapes[this.state.shapeIndex])}>Show Shape</button>
            </div>
            </div>
        );
    }//end render

    
    

}

function App () {
    return <Game/> ;
}

export default App;
