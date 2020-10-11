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

function intersectsAt(p1,p2, p3, p4 ){
    //TODO: special cases for vertical lines
    //TODO: Figure out why alex's edits weren't working

    //Make sure that righttmost point comes first
    if (p1[0] < p2[0]){
        let temp = p1;
        p1 = p2;
        p2 = temp;
    };
    if (p3[0] < p4[0]){
        let temp = p3;
        p3 = p4;
        p4 = temp;
    };

    //Convert to fourth quadrant cartesian
    p1[1] = (-1)*p1[1];
    p2[1] = (-1)*p2[1];
    p3[1] = (-1)*p3[1];
    p4[1] = (-1)*p4[1];

    //Set boundaries for intersection point
    //Otherwise any two non-parallel lines would intersect
    let xSet = [p1[0], p2[0], p3[0], p4[0]].sort();
    let ySet = [p1[1], p2[1], p3[1], p4[1]].sort();
    let xMax = xSet[2];
    let xMin = xSet[1];
    let yMax = ySet[1];
    let yMin = ySet[2];
    //alert('1' + xMax);

    //Finding Slopes of two line segments
    let m1 = (p1[1] - p2[1]) / (p1[0] - p2[0]);
    let m2 = (p3[1] - p4[1]) / (p3[0] - p4[0]);
    //alert('m1: ' + m1);
    //alert('m2: ' + m2);
    
    //Setting x,y of a point on each segment
    let x1 = p1[0]; let y1 = p1[1];
    let x2 = p3[0]; let y2 = p3[1];
    //alert('3' + x1)

    //Calculate coordinates of intersection
    let xInt = (m1*x1 - y1 - m2*x2 + y2) / (m1 - m2);
    //alert(m1*x1 - y1 - m2*x2 + y2);
    //alert('X: ' + xInt);
    let yInt = m1*(xInt - x1) + y1;
    //alert('Y: ' + yInt);

    if (xInt < xMax && xInt > xMin && yInt < yMax && yInt > yMin){

        //Invert the Y back
        p1[1] = (-1)*p1[1];
        p2[1] = (-1)*p2[1];
        p3[1] = (-1)*p3[1];
        p4[1] = (-1)*p4[1];
        yInt = (-1)*yInt;

        return(
            //Draw circle at intersection point
            [<Circle center={[xInt,yInt]} radius={15}color='#FF0000' />,
            ]
        );
    }else{
        return null;
    };
}

function drawSegment(p1,p2){
    //let json =
    //

    let json = JSON.parse('{"file_info":{"joint_definitions":{"hands":"hand21","head":"wrFace20","pose2d":"j25","pose3d_ik":"extended","pose3d_raw":"j25"}},"frames":[{"frame_time":0,"height":3532,"persons":[{"head_pose":{"bbox":{"height":0.1146659106016159,"minX":0.399773508310318,"minY":0.2565118968486786,"width":0.1146659106016159},"face_arrow":{"base":[0.46573203802108765,0.3157695233821869],"tip":[0.5154340863227844,0.2688548266887665]},"landmarks":[0.4669605493545532,0.3510216772556305,0.43157538771629333,0.326386421918869,0.44142946600914,0.3080219626426697,0.4365024268627167,0.30309492349624634,0.4481481909751892,0.34475088119506836,0.44142946600914,0.2995116114616394,0.4553148150444031,0.3317613899707794,0.4494919180870056,0.3089177906513214,0.44904401898384094,0.3026469945907593,0.45576271414756775,0.3116052746772766,0.4593460261821747,0.32190728187561035,0.48174169659614563,0.3223552107810974,0.46248140931129456,0.3102615475654602,0.45979392528533936,0.3048865795135498,0.4781584143638611,0.3438550531864166,0.46516889333724976,0.30040743947029114,0.4723355174064636,0.33400097489356995,0.46920013427734375,0.3107094466686249,0.4714396893978119,0.30443865060806274,0.4633772373199463,0.33131349086761475]},"id":0,"pose2d":{"bbox":{"height":1.017052173614502,"minX":0.17344334721565247,"minY":0.024667322635650635,"width":0.7780347466468811},"is_main":true,"joints":[0.7031022310256958,0.9217901825904846,0.7265412211418152,0.7304983735084534,0.7070966958999634,0.5507307052612305,0.7266349792480469,0.4882248640060425,0.8866418600082397,0.32805612683296204,0.8438493609428406,0.17960655689239502,0.7168658375740051,0.5194777846336365,0.5409532189369202,0.3868039846420288,0.5390177369117737,0.38681796193122864,0.4569843113422394,0.31386780738830566,0.2382795810699463,0.41785600781440735,0.3514482080936432,0.4258462190628052,0.4765131175518036,0.4180503785610199,0.6053934097290039,0.3555575907230377,0.7265907526016235,0.32416844367980957,0.8398270010948181,0.28112733364105225,0.4335137605667114,0.3242572546005249,-0.003906250465661287,-0.00390625,-0.003906250465661287,-0.00390625,0.44535478949546814,0.3047938048839569,0.4920843541622162,0.3125523328781128,0.6095114350318909,0.9569650888442993,0.8360527753829956,0.10942166298627853,0.7226426601409912,0.9530225992202759,0.8163356184959412,0.17977823317050934],"scores":[0.9934269189834595,0.8767242431640625,0.9107080698013306,0.8118381500244141,0.9291325211524963,0.9388746023178101,0.8612731099128723,0.9399352669715881,1.0258841514587402,0.9648143649101257,0.9600675106048584,0.9170497059822083,0.8863959312438965,0.9934746026992798,1.015063762664795,0.9641562104225159,0.9574224352836609,0.0,0.0,0.9749346375465393,0.9620858430862427,0.9436413049697876,0.953711748123169,0.983814537525177,0.9186974763870239]}}],"width":3532}]}');
    
    let joints = json.frames[0].persons[0].pose2d.joints;
    
    let result = [];

    //Testing Intersects
    let intersection = intersectsAt([500,0],[501,1000],[joints[2*p1]*1000, joints[2*p1+1]*1000],[ joints[2*p2]*1000, joints[2*p2+1]*1000]);
    if (intersection != null){
        //alert("intersects!");
        result.push(intersection
        );
    };

    intersection = intersectsAt([0,500],[1000,500],[joints[2*p1]*1000, joints[2*p1+1]*1000],[ joints[2*p2]*1000, joints[2*p2+1]*1000]);
    if (intersection != null){
        //alert("intersects!");
        result.push(intersection
        );
    };


    //Conditional Return for if the joint pos is negative (don't display)
    /*if (joints[2*p1] >=0 && joints[2*p1+1] >= 0 && joints[2*p2] >= 0 && joints[2*p2+1] >= 0){*/
    result.push(
        <Line
            //position='fixed'
            from={[joints[2*p1]*1000, joints[2*p1+1]*1000]}
            to={[joints[2*p2]*1000, joints[2*p2+1]*1000]}
            color='#1DBFE7'
        />        
    );

    return(result);
}



//Probably should find a better place to put this, but for now...
function DrawFigure(){
    let segments=[
        0,21, 
        0,23,
        0,1,
        1,2,
        2,6,
        2,12,
        6,3,
        3,13,
        3,4,
        4,5,
        5,24,
        5,22,
        13,14,
        14,15,
        12,11,
        11,10,
        12,8,
        8,7,
        7,13,
        8,9,
        18,20
        ];

    let result = [];

    //Turning this off for now to test intersections
    
    for (let i = 0; i < segments.length + 1; i += 2){
    //for (let i = 0; i < 10; i += 2){
        //alert(i);
        result.push(
            drawSegments(segments[i], segments[i +1])
        );
    };

    //Testing intersect:
    result.push(
        [

        <Line
            //position='fixed'
            from={[500, 0]}
            to={[510, 1000]}
            color='#1DBFE7'
        />,
        <Line
            //position='fixed'
            from={[0, 500]}
            to={[1000, 501]}
            color='#1DBFE7'
        />
        ]
    );

    result.push(intersectsAt([500, 0],[510, 1000],[0, 500],[1000, 501]));
    return(<div>{result}</div>);
}

function sendToFlask(img){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      alert(xhr.responseText);

    })
    // open the request with the verb and the url
    xhr.open('POST', 'http://localhost:5000/img');
    // send the request
    xhr.send(img);     
}       

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    fetch('http://localhost:5000/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
        <p>
          Game Show App!<br></br>
          The current time is {currentTime}.
        </p>

        <DrawFigure/>

        <GameShow/>
        <ReactCamera callBack={sendToFlask}/>
    </div>
  );
}

export default App;
