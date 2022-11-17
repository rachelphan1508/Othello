
//class Board{
// public:
//          vector<vector<int> ps;
//          vector<string> move;
//          int white = 0;
//          int black = 0;
//          clearMove();
//          availableMove();
//}
//ps is a 2d vector that stores the value of the board
//1 is white
//2 is black
//3 is available move
//0 is empty
//white stores the white pieces on in the board right now
//black stores the black pieces in the board right now
//clearMove() empty all of the moves in the 2d board;
//availableMove() update the board with availeble moves in the board and turn that move spot into value 3
//and push the direciton move string into the move value;

//import {minimax, boardAfterClicked, nextPossibleBoards} from "./minimax.js";

//****************************-Object Class Starts Here-************************************* */

class Board {
    constructor() {
        this.white = 0;
        this.black = 0;
        this.skip = false;
        this.score = 0; // mobility + corner + edge
        //move is a string vector that takes U,D,R,L,UR,UL,DL,DR as direction in the corresponded 2d board
        this.move = [
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
        ]
        this.pieces = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]
        // number of moves played - used to determined which phase of the
        // game we are at to use the correct evaluation function
        // for our MiniMax Algorithm.

        // number of corners taken by user
        this.cornerTaken = 0;
        this.pieces = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]

        // at initialization, Black plays first. Black's turn is 2.
        this.curTurn=2;
    }
    clearMove() {
        this.move = [
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
        ]
    }
    flipBoard(row, column) {
        var direction = this.move[row][column];
        for(var i = 0; i < direction.length; i++) {
            //U flips to the downwards direction
            if(direction[i] == "U") {
                for(var j = row+1; j < 8; j++) {
                    if(board.pieces[j][column] != turn){
                        board.pieces[j][column] = turn;
                    }
                    else {
                        j = 8;
                    }
                }
            }
            //D flips the upwards direction
            if(direction[i] == "D") {
                for(var j = row-1; j >= 0; j--) {
                    if(this.pieces[j][column] != turn){
                        this.pieces[j][column] = turn;
                    }
                    else {
                        j = -1;
                    }
                }
            }
            //R flips the leftwards direction
            if(direction[i] == "R") {
                for(var j = column-1; j >= 0; j--) {
                    if(this.pieces[row][j] != turn){
                        this.pieces[row][j] = turn;
                    }
                    else {
                        j = -1;
                    }
                }
            }
            //L flips the rightwards direction
            if(direction[i] == "L") {
                for(var j = column+1; j < 8; j++) {
                    if(this.pieces[row][j] != turn){
                        this.pieces[row][j] = turn;
                    }
                    else {
                        j = 8;
                    }
                }
            }
            //UR flips to the down left direction
            if(direction[i] == "UR") {
                var k = row+1;
                var q = column-1;
                while(k < 8 && q >= 0) {
                    if(this.pieces[k][q] != turn){
                        this.pieces[k][q] = turn;
                    }
                    else {
                        k = 8;
                        q = -1;
                    }
                    k++;
                    q--;
                }
            }
            //DR flips to the up left direction
            if(direction[i] == "DR") {
                var k = row-1;
                var q = column-1;
                while(k >= 0 && q >= 0) {
                    if(this.pieces[k][q] != turn){
                        this.pieces[k][q] = turn;
                    }
                    else {
                        k = -1;
                        q = -1;
                    }
                    k--;
                    q--;
                }
            }
            //DL flips the up right direction
            if(direction[i] == "DL") {
                var k = row-1;
                var q = column+1;
                while(k >= 0 && q < 8) {
                    if(this.pieces[k][q] != turn){
                        this.pieces[k][q] = turn;
                    }
                    else {
                        k = -1;
                        q = 8;
                    }
                    k--;
                    q++;
                }
            }
            //UL flips the down right direction
            if(direction[i] == "UL") {
                var k = row+1;
                var q = column+1;
                while(k < 8 && q < 8) {
                    if(this.pieces[k][q] != turn){
                        this.pieces[k][q] = turn;
                    }
                    else {
                        k = 8;
                        q = 8;
                    }
                    k++;
                    q++;
                }
            }
        }
    }
    //#region availableBoard
    availableBoard() {
        //check is the int that marks the opponent's piece
        //if ur turn is white check = 0 indicating black
        //else check = 1 indication white
        var check = 0;
        this.skip = true;
        if (turn == 2) check = 1;
        else check = 2;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                //check for UL U UR L R DL D DR directions
                //check for U
                if (i != 0 && i != 1) {
                    if (this.pieces[i][j] == turn && this.pieces[i - 1][j] == check) {
                        for (var k = i - 1; k >= 0; k--) {
                            if (this.pieces[k][j] == turn)
                                k = -1;
                            else if (this.pieces[k][j] == 0|| this.pieces[k][j] == 3) {
                                this.pieces[k][j] = 3;
                                //console.log("was at increment.");
                                this.skip = false;
                                this.move[k][j].push("U");
                                //we have to some how store this
                                k = -1;
                            }
                        }
                    }
                }

                //check for D
                if (i != 6 && i != 7) {
                    if (this.pieces[i][j] == turn && this.pieces[i + 1][j] == check) {
                        for (var k = i + 1; k < 8; k++) {
                            if (this.pieces[k][j] == turn) k = 8;
                            else if (this.pieces[k][j] == 0|| this.pieces[k][j] == 3) {
                                this.pieces[k][j] = 3;
                                this.skip = false;
                                this.move[k][j].push("D");
                                k = 8;
                            }
                        }
                    }
                }
                //check for L
                if (j != 0 && j != 1) {
                    if (this.pieces[i][j] == turn && this.pieces[i][j - 1] == check) {
                        for (var k = j - 1; k >= 0; k--) {
                            if (this.pieces[i][k] == turn) k = -1;
                            else if (this.pieces[i][k] == 0|| this.pieces[i][k] == 3) {
                                this.pieces[i][k] = 3;
                                this.skip = false;
                                this.move[i][k].push("L");
                                k = -1;
                            }
                        }
                    }
                }

                //check for R
                if (j != 6 && j != 7) {
                    if (this.pieces[i][j] == turn && this.pieces[i][j + 1] == check) {
                        for (var k = j + 1; k < 8; k++) {
                            if (this.pieces[i][k] == turn) k = 8;
                            else if (this.pieces[i][k] == 0|| this.pieces[i][k] == 3) {
                                this.pieces[i][k] = 3;
                                this.skip = false;
                                this.move[i][k].push("R");
                                k = 8;
                            }
                        }
                    }
                }

                //check for top right
                if (i > 1 && j < 6) {
                    if (this.pieces[i][j] == turn && this.pieces[i - 1][j + 1] == check) {
                        var k = i -1;
                        var q = j + 1;
                        while(k >= 0 && q < 8) {
                            if (this.pieces[k][q] == turn) {
                                k = -1;
                                q = 8;
                            }
                            else if (this.pieces[k][q] == 0 || this.pieces[k][q] == 3) {
                                this.pieces[k][q] = 3;
                                this.skip = false;
                                this.move[k][q].push("UR");
                                k = -1;
                                q = 8;
                            }
                            else {
                                k--;
                                q++;
                            }
                        }
                    }
                }

                //check for bottom right
                if (i < 6 && j < 6) {
                    if (this.pieces[i][j] == turn && this.pieces[i + 1][j + 1] == check) {
                        var k = i + 1;
                        var q = j + 1;
                        while(k < 8 && q < 8) {
                            if (this.pieces[k][q] == turn) {
                                k = 8;
                                q = 8;
                            }
                            else if (this.pieces[k][q] == 0 || this.pieces[k][q] == 3) {
                                this.pieces[k][q] = 3;
                                this.skip = false;
                                this.move[k][q].push("DR");
                                k = 8;
                                q = 8;
                            }
                            else {
                                k++;
                                q++;
                            }
                        }
                    }
                }

                //check for bottom left
                if (i < 6 && j > 1) {
                    if (this.pieces[i][j] == turn && this.pieces[i + 1][j - 1] == check) {
                        var k = i + 1;
                        var q = j - 1;
                        while(k < 8 && q >= 0) {
                            if (this.pieces[k][q] == turn) {
                                k = 8;
                                q = -1;
                            }
                            else if (this.pieces[k][q] == 0 || this.pieces[k][q] == 3) {
                                this.pieces[k][q] = 3;
                                this.skip = false;
                                this.move[k][q].push("DL");
                                k = 8;
                                q = -1;
                            }
                            else {
                                k++;
                                q--;
                            }
                        }
                    }
                }

                //check for top left
                if (i > 1 && j > 1) {
                    if (this.pieces[i][j] == turn && this.pieces[i - 1][j - 1] == check) {
                        var k = i - 1;
                        var q = j - 1;
                        while(k >= 0 && q >= 0) {
                            if (this.pieces[k][q] == turn) {
                                k = -1;
                                q = -1;
                            }
                            else if (this.pieces[k][q] == 0 || this.pieces[k][q] == 3) {
                                this.pieces[k][q] = 3;
                                this.skip = false;
                                this.move[k][q].push("UL");
                                k = -1;
                                q = -1;
                            }
                            else {
                                k--;
                                q--;
                            }
                        }
                    }
                }
            }
        }
    }

    //#endregion availableBoard

    copyToPieces(s) {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                this.pieces[i][j] = s[i][j];
            }
        }
    }

    //calculate the white and black pieces
    calScore() {
        this.black = 0;
        this.white = 0;
        for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++){
                if(this.pieces[i][j] == 2) this.black++;
                if(this.pieces[i][j] == 1) this.white++;
            }
        }
    }

    // get number of corners
    getNumCorner(b, turn) {
        var count=0;
        if (b[0][0]==turn) count++;
        if (b[0][7]==turn) count++;
        if (b[7][0]==turn) count++;
        if (b[7][7]==turn) count++;
        return count;
    }

    // calculate evaluation score for this board.
    getEvaluationScore() {
        var score = 0;

        //this is very inefficient. Please change the availableBoard() function soon.
        this.availableBoard();

        //if at opening or mid game
        if (this.white + this.black <= 48) {
           // get total playable moves
            for (var i=0; i<8; i++) {
                for (var j=0; j<8; j++) {
                    if (this.pieces[i][j]==3) {
                        //check if it's a corner
                        if ((i==0 && j==0) || (i==0 && j==8) || (i==8 && j==0) || (i==8 && j==8))
                        {
                            score+=10;
                        }
                        else if (i==0 || i==8 || j==0 || j==8) {
                            score+=2;
                        }
                        else score++;
                    }
                }
            }
        }

        return score;
    }
}

//****************************-Object Class Ends Here-************************************* */
var gap = 5;
var cellWidth = 60;
var pieces_layer;
//turn 1 = white turns
//turn 2 = black turns
var turn = 2;

//initalize the starting board
const curBoard = new Board();


window.onload = function () {
    pieces_layer = document.getElementById("pieces_layer");
    drawBoard();
    drawpieces();
}

let skip_bot = document.getElementById("skip_btn");

skip_bot.onclick = function () {
    if(turn == 1) turn = 2;
    else turn = 1;
    skip_bot.style.display = "none";
    drawpieces();
}

function updatescoreboard() {
    const w_score = document.getElementById("white-score");
    const b_score = document.getElementById("black-score");
    const player = document.getElementById("turn");
    if (turn == 2) {
        player.textContent = "Black's turn";
    }
    else player.textContent = "White's turn";
    curBoard.calScore();
    w_score.textContent = curBoard.white;
    b_score.textContent = curBoard.black;
}

function drawpieces() {
    updatescoreboard();
    pieces_layer.innerHTML = "";
    curBoard.availableBoard();
    if(curBoard.skip == true){
        if(turn == 2) {
            skip_bot.style.display = "flex";
        }
        else {
            turn = 2;
            curBoard.availableBoard();
        }
    }
    //else{
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (curBoard.pieces[i][j] != 0) {
                    var piece = document.createElement("div");
                    piece.classList.add("piece");
                    piece.style.width = cellWidth - 4;
                    piece.style.height = cellWidth - 4;
                    piece.style.left = (cellWidth + gap) * j + gap + 2;
                    piece.style.top = (cellWidth + gap) * i + gap + 2;
                    if (curBoard.pieces[i][j] == 1) piece.style.backgroundColor = "white";
                    if (curBoard.pieces[i][j] == 2) piece.style.backgroundColor = "black";
                    if (curBoard.pieces[i][j] == 3) {
                        console.log("was at i.");
                        piece.style.width = cellWidth - 55;
                        piece.style.height = cellWidth - 55;
                        piece.style.left = (cellWidth + gap) * j + gap + 27.5;
                        piece.style.top = (cellWidth + gap) * i + gap + 27.5;
                        piece.style.backgroundColor = "yellow";
                    }
                    document.getElementById("board").appendChild(piece);
                }
    
            }
        }

    //}
}

//createing a board here
function drawBoard() {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var tile = document.createElement("div");
            tile.style.position = "absolute";
            tile.style.width = cellWidth;
            tile.style.height = cellWidth;
            tile.style.backgroundColor = "green";
            tile.style.left = (cellWidth + gap) * j + gap;
            tile.style.top = (cellWidth + gap) * i + gap;
            tile.setAttribute("onClick", "clickedBoard(" + i + " , " + j + ")");
            document.getElementById("board").appendChild(tile);
        }
    }
}

//clear all of the div that we rendered on the board with the class name "piece"
function clearBoard() {
    const elements = document.getElementsByClassName("piece");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (curBoard.pieces[i][j] == 3) curBoard.pieces[i][j] = 1;
        }
    }
    curBoard.clearMove();
}

//clickedBoard gives i and j position that the user clicked on the boar
//call clearBoard to get rid of the 3s in the board and clean the div
//and update the new board by calling drawpieces function
function clickedBoard(row, column) {
    // default the bot to play at turn 1 -- Bot plays White
    console.log("cur turn: " + turn);
    curBoard.availableBoard();
    if (curBoard.pieces[row][column] == 3 && turn == 1) {
        curBoard.pieces[row][column] = 1;
        curBoard.flipBoard(row, column);
        turn = 2;
        updatescoreboard();
    }
    else if (curBoard.pieces[row][column] == 3 && turn == 2) {
        curBoard.pieces[row][column] = 2;
        curBoard.flipBoard(row, column);

        updatescoreboard();
        turn = 1;
        setTimeout(function(){
            minimaxdepth2();
        },500);

    }
    clearBoard();
    drawpieces();
}

// TODO: 
// since clickedBoard is triggered by a click on the screen, the computer won't
// be able to play there.
function playGame() {
    if (turn==2) {

    }
}


//****************************-End Rendering-************************************* */



//****************************- Minimax Helper Functions -************************************* */

// returns the board after a move at [row,column]
 function boardAfterClicked(board, row, column, curTurn) {
    let newBoard = board;
    if (curTurn == 1) { //white
        newBoard.pieces[row][column] = 1;
        newBoard.flipBoard(row, column);
        curTurn = 2;
    }
    else if (curTurn == 2) { //black
        newBoard.pieces[row][column] = 2;
        newBoard.flipBoard(row, column);
        curTurn = 1;
    }
    return newBoard;
}

// Return the array of all possible next board from a starting board
// if at maximizer, curTurn = 2. If at minimizer, curTurn = 1.
 function possibleMoves(s, curTurn) {
    let boardCopy = copyBoard(s);
    var moves = [];
    // for each available move in s.pieces
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            if (boardCopy[i][j] == 3) {
                console.log("here:"+ i + " " + j);
                // TODO: might add evaluation score here
                moves.push({i: i, j: j, opponentScore: -1, avoid: false});
            }
        }
    }
    return moves;
}

//****************************-Minimax algorithm Starts Here-************************************* */


// Pay attention to the case when a user skips
 function minimax(s, is_max, depth, moves, map){

    var curTurn = is_max ? 1 : 2;
    var nextRow;
    var nextCol;

    var moves = possibleMoves(s.pieces, curTurn);
    var model, count;

    console.log("possible next boards: " + moves.length);

    //console.log("We are at turn " + curTurn);
    // if reaches the maximum depth, returns value
    if(depth == 4) {
        console.log("score " + s.getEvaluationScore());
        return s.getEvaluationScore();
    }
    // If we are at the maximizer
    if(is_max == true) {
        console.log("was in maximizer at depth " + depth);
        var highest = -100000;
        // if there's no next move,
        if (moves.length==0) {
            var cur = minimax(s, false, depth+1, moves, map);
            if (cur>highest) {
                highest = cur;
                nextRow = map.get(s).at(0);
                nextCol = map.get(s).at(1);

                console.log("next " + nextRow + " " + nextCol);
            }
        }
        else {
            // evaluate all possible next moves
            for (var p = 0; p < moves.length; p++) {
                model = copyBoard(s.pieces);
                // make the fake move
                makeFakeMove(model, curTurn, moves[p].i, moves[p].j);

                // calculate score for this move.

            }
        }
    }
    // If we are at the minimizer
    else {
        console.log("was in minimizer at depth " + depth);
        var lowest = 100000;
        // if there's no next move,
        if (nextBoards.length==0) {
            var cur = minimax(s, true, depth+1, moves, map);
            if (cur < lowest) {
                lowest = cur;
                nextRow = map.get(s).at(0);
                nextCol = map.get(s).at(1);
            }
        }
        else {
            // evaluate all possible next moves
            nextBoards.forEach((board) => {
                var cur = minimax(board, true, depth+1, moves, map);

            })
        }
        var pos = new Position(nextRow, nextCol);
        moves.push(pos);
    }
}

function copyBoard(s) {
    var newBoard = new Array(8);
    for (var i = 0; i < 8; i++) {
        newBoard[i] = new Array(8);
        for (var j = 0; j < 8; j++) {
            newBoard[i][j] = s[i][j];
            //console.log(s[i][j] + " ");
        }
    }
    return newBoard;
}

// turn 1: white, turn 2: black -- value = 3: ok to flip
// function makeFakeMove(board, turn, i, j) {
//     var newBoard = copyBoard(board);
//     if (state[i][j]!=3) return;

// }


// set value and then call flipBoard
function makeRealMove(i, j) {

}

// function checkHorizontal(board, turn, i, j) {
//     for ()
// }


// check for near-corner moves -- moves we don't want
function checkBadMove(i, j){
    if ((i==1 && j==1) || (i==1 && j==6) || (i==6 && j==1) || (i==6 && j==6))
        return true;
    return false;
}

// check for corner moves -- moves we want
function checkWantedMove(i, j) {
    if ((i==0 && j==0) || (i==0 && j==7) || (i==7 && j==0) || (i==7 && j==7))
        return true;
    return false;
}

function minimaxdepth2(){
    var moves = possibleMoves(curBoard, turn);
    var enemy = -1, nextPieces, evalScore;
    turn = 1;
    for (var p = 0; p < moves.length; p++) {
        var myBoard = new Board();
        nextPieces = copyBoard(curBoard.pieces);
        console.log("reach inside");
        myBoard.copyToPieces(nextPieces);
        myBoard.availableBoard();
        myBoard.pieces[i][j] = 1;
        myBoard.flipBoard(moves[p].i, moves[p].j);

        // judge player's moves -- at
        playerMoves = possibleMoves(myBoard, 1);
        var playerPieces;
        for (var k = 0; k < playerMoves.length; k++) {
            var playerBoard = new Board();
            playerPieces = copyBoard(myBoard.pieces);
            playerBoard.availableBoard();
            playerBoard.pieces[i][j] = 2;
            playerBoard.flipBoard(moves[k].i, moves[k].j);

            // bot's number of moves after
            agentNextMoves = possibleMoves(playerBoard, 2);
            minScoreForPlayer = 10000;

            // mobility score. TODO: add more (..)
            evalScore = agentNextMoves.length;
            for(var n = 0; n < agentNextMoves.length; n++) {
                if (checkBadMove(agentNextMoves[n].i, agentNextMoves[n].j))
                    evalScore = evalScore - 10;
                if (checkWantedMove(agentNextMoves[n].i, agentNextMoves[n].j))
                    evalScore = evalScore + 200;
            }

            // get minimium for user
            if (minScoreForPlayer > evalScore)
                minScoreForPlayer = evalScore;

            // if user can move to corner, avoid
            if (checkWantedMove(agentNextMoves[k].i, agentNextMoves[k].j))
                moves[p].avoid = true;
        }
        moves[p].opponentScore = minScoreForPlayer;

    }

    // sort
    moves.sort(moveSort);

    for (var p = 0; p <moves.length; p++) {
        if (checkWantedMove(moves[p].i, moves[p].j))
            // move to corner if available
            curBoard.pieces[i][j] = 1;
            curBoard.flipBoard(moves[p].i, moves[p].j);
            
            curBoard.availableBoard();
            return;
    }

    // look until we see a not-disaster move
    var index;
    for (index = 0; index <moves.length-1; index++) {
        if (!moves[index].avoid && !checkBadMove(moves[index].i, moves[index].j))
            break;
    }

    var nextRow = moves[index].i;
    var nextCol = moves[index].j;
    curBoard.pieces[nextRow][nextCol] = 1;
    curBoard.flipBoard(nextRow, nextCol);
    curBoard.availableBoard();
    return;
}

// better for agent means lower score for player
function moveSort(move1, move2) {
    if (move1.opponentScore < move2.opponentScore)
        return 1;
    else if (move1.opponentScore > move2.opponentScore)
        return -1;
    else {
        // central judging --
        if (move1.i < move2.i)
            return -1;
        if (move1.i > move2.i)
            return 1;
        if (move1.j < move2.j)
            return -1;
        if (move1.j > move2.j)
            return 1;
        return 0;
    }
}

