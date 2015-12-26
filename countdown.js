add/*var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
*/
//const endTime = new Date(2015,11,25,0,0,0);
var endTime = new Date();
endTime.setTime(endTime.getTime() + 15*1000);

var curShowTimeSeconds = 0;

var k = 0;
var l = 14;
var temp = [];

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload = function(){

    WINDOW_WIDTH = document.body.clientWidth
    WINDOW_HEIGHT = document.body.clientHeight

    MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1

    MARGIN_TOP = Math.round(WINDOW_HEIGHT /5);

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds()
    setInterval(
        function(){
            render( context );
            update();
        }
        ,
        50
    );
}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round( ret/1000 )

    return ret;
}

function update(){

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 )
    var nextSeconds = nextShowTimeSeconds % 60

    var curHours = parseInt( curShowTimeSeconds / 3600);
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 )
    var curSeconds = curShowTimeSeconds % 60
    
    if(nextShowTimeSeconds > 0 && nextSeconds != curSeconds ){
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    
    }else if(nextShowTimeSeconds == 0 && nextSeconds != curSeconds){
        addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , 0);
        addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , 0);
        addBalls( MARGIN_LEFT + 30*(RADIUS+1) , MARGIN_TOP , 0);
        addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , 10);
        addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , 0);
        addBalls( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 0);
        addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , 10);
        addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , 0);
        curShowTimeSeconds = nextShowTimeSeconds;
        var mychar = document.getElementById("title");
        mychar.innerHTML = "Christmas!"

        for(var i = 0;i < balls.length;i++){
            if(balls[i].color == "#FFFFFF"){
                balls[i].vx = Math.pow(-1,Math.ceil(Math.random()*1000))*5;
                balls[i].g = 1.5+Math.random();
                balls[i].vy = -5;
                balls[i].s = WINDOW_HEIGHT+100;
            }
        }  
    }else if(nextShowTimeSeconds <= 11){
        if(k > 0 && l >= 0){
            for(var n = 0;n < 4;n++){
                var i = Math.floor(Math.random()*k);
                var j = temp[i];

                addBall(MARGIN_LEFT+(2*RADIUS+1),MARGIN_TOP-(2*RADIUS+1),l,j);
                k--;

                for(;i < k;i++){
                    temp[i] = temp[i+1];
                }
            }
        }else if(k == 0){
            k = 52;
            l--;
            temp = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];
        }
    }

    

    updateBalls();

    console.log( balls.length)
}

function updateBalls(){

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y > balls[i].s){
            balls[i].y = balls[i].s;
            balls[i].vy = 0;
            balls[i].g = 0;
        }else if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }

    var cnt = 0
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
            balls[cnt++] = balls[i]

    while( balls.length > cnt ){
        balls.pop();
    }
}

function addBalls( x , y , num ){

    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }

                balls.push( aBall )
            }
}

function render( cxt ){

    cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
    cxt.fillStyle = "#FFECEC";
    cxt.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours = parseInt( curShowTimeSeconds / 3600);
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 )
    var seconds = curShowTimeSeconds % 60
    
    if(curShowTimeSeconds > 0){
        renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt )
        renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )
        renderDigit( MARGIN_LEFT + 30*(RADIUS+1) , MARGIN_TOP , 10 , cxt )
        renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
        renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
        renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
        renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
        renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);
    }
    

    for( var i = 0 ; i < balls.length ; i ++ ){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();
    }
}

function renderDigit( x , y , num , cxt ){

    cxt.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath()

                cxt.fill()
            }
}

function addBall(x,y,i,j){
    if(mx[i][j] == 1){
        var aBall = {
            x:x+j*2*(RADIUS+1)+(RADIUS+1),
            y:y+Math.pow(-1,Math.ceil(Math.random()*1000))*50,
            s:y+(2*i+1)*(RADIUS+1),
            g:1+Math.random(),
            vx:0,
            vy:0,
            color:colors[Math.floor(Math.random()*colors.length)]
        }
    }else{
        var aBall = {
            x:x+j*2*(RADIUS+1)+(RADIUS+1),
            y:y+Math.pow(-1,Math.ceil(Math.random()*1000))*50,
            s:y+(2*i+1)*(RADIUS+1),
            g:1+Math.random(),
            vx:0,
            vy:0,
            color:"#FFFFFF"
        }
    }

    balls.push(aBall);
}