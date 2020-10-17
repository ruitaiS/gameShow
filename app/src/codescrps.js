



/*
function drawSegment(p1, p2){

}

function checkCollision(p1, p2, p3, p4){

}

function drawLimb(l1, l2)
*/


function drawFigure(jsArray){
    return (<h1>{jsArray}</h1>);
}



class Figure extends React.Component{
    render(){
        return(drawFigure(props.jsArray));
    }
}

class Display extends React.Component{
    let js = 'hi';
    return(
        <Figure jsArray={js}>
    );
}
