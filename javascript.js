let restartLite = undefined;
            
let board = [
    [9, 9, 9],
    [9, 9, 9],
    [9, 9, 9]
];

let tac;
let tacTurn;
if(Math.floor(Math.random() * 2) % 2){
    tacTurn = 'Your';
    tac = 'X';
}else{
    tacTurn = 'My';
    tac = 'O';
}
document.getElementById('display').innerHTML = tacTurn + ' turn';

function addTic(el){
    if(el.innerHTML === ''){
        if(tac == 'X'){
            el.innerHTML = tac;
            el.style.color = 'maroon';
            board[parseInt(el.id.charAt(0)) - 1][parseInt(el.id.charAt(1)) - 1] = 1;
            checkIfPlayerWins();
            tac = 'O';
            tacTurn = 'My';
        }else{
            addMyTic();
        }
        document.getElementById('display').innerHTML = tacTurn + ' turn';
    }
}

function addMyTic(){
    let packed = getTic();
    let x = packed[0];
    let y = packed[1];
    let el = document.getElementById((y + (10 * x)).toString());
    el.innerHTML = tac;
    el.style.color = 'yellowgreen';
    board[parseInt(el.id.charAt(0)) - 1][parseInt(el.id.charAt(1)) - 1] = 0;
    checkIfPlayerWins();
    tac = 'X';
    tacTurn = "Your";
}

function getTic(){
    let x, y;
    x = Math.ceil(Math.random() * 3);
    y = Math.ceil(Math.random() * 3);
    let el = document.getElementById((y + (10 * x)).toString());
    while(el.innerHTML != ''){
        x = Math.ceil(Math.random() * 3);
        y = Math.ceil(Math.random() * 3);
        el = document.getElementById((y + (10 * x)).toString());
    }
    return [x, y];
}

function checkIfPlayerWins(){
    /*********\
    * a b c * 
    * d e f *  
    * g h i *
    \*********/

    /////////////////////////////////////
    // abc def ghi adg beh cfi aei ceg //
    /////////////////////////////////////

    function eqs(aX, aY, bX, bY, cX, cY){
        let a = board[aX][aY];
        let b = board[bX][bY];
        let c = board[cX][cY];
        if((a == 0 || a == 1) && (a == b && b == c)){
            return true;
        }else{
            return false;
        }
    }

    let cond = 
        eqs(0, 0, 0, 1, 0, 2) ||
        eqs(1, 0, 1, 1, 1, 2) ||
        eqs(2, 0, 2, 1, 2, 2) ||
        eqs(0, 0, 1, 0, 2, 0) ||
        eqs(0, 1, 1, 1, 2, 1) ||
        eqs(0, 2, 1, 2, 2, 2) ||
        eqs(0, 0, 1, 1, 2, 2) ||
        eqs(2, 0, 1, 1, 0, 2);

    if(cond){
        let toe = tac;
        setTimeout(function(){document.getElementById('display').innerHTML = 'The ' + toe + ' sign win!'}, 1);
        document.getElementById('11').onclick = '';
        document.getElementById('12').onclick = '';
        document.getElementById('13').onclick = '';
        document.getElementById('21').onclick = '';
        document.getElementById('22').onclick = '';
        document.getElementById('23').onclick = '';
        document.getElementById('31').onclick = '';
        document.getElementById('32').onclick = '';
        document.getElementById('33').onclick = '';
        restartLite = setInterval(restartLight, 1500);
    }
}

function restartLight(){
    document.getElementById('restart').style.transform = 'scale(1.6)';
    setTimeout(function(){
        document.getElementById('restart').style.transform = 'scale(1)';
    }, 600);
}

function restart(){
    location.reload();
}