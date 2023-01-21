
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
//-1 is black
//3 is available move
//0 is empty
//move is a string vector that takes U,D,R,L,UR,UL,DL,DR as direction in the corresponded 2d board
//white stores the white pieces on in the board right now
//black stores the black pieces in the board right now
//clearMove() empty all of the moves in the 2d board;
//availableMove() update the board with availeble moves in the board and turn that move spot into value 3 
//and push the direciton move string into the move value;

// HIGH SCORE = GOOD FOR WHITE
// Evaluation Score calculation:



//****************************-Object Class Starts Here-************************************* */
class Board {

    constructor() {
        this.white = 0;
        this.black = 0;
        this.skip = false;
        this.score = 0; // mobility + corner + edge
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
        this.turn = 2;
        this.is_max = {max: false};
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
    // where do we call clearBoard
    //clear all of the div that we rendered on the board with the class name "piece"
    clearBoard() {
        const elements = document.getElementsByClassName("piece");
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (this.pieces[i][j] == 3) this.pieces[i][j] = 0;
            }
        }
        this.clearMove();
    }
    availableBoard() {
        //check is the int that marks the opponent's piece
        //if ur turn is white check = 0 indicating black
        //else check = 1 indication white
        var check = 0;
        this.skip = true;
        if (this.turn == 2) check = 1;
        else check = 2;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                //check for UL U UR L R DL D DR directions
                //check for U
                if (i != 0 && i != 1) {
                    if (this.pieces[i][j] == this.turn && this.pieces[i - 1][j] == check) {
                        for (var k = i - 1; k >= 0; k--) {
                            if (this.pieces[k][j] == this.turn)
                                k = -1;
                            else if (this.pieces[k][j] == 0|| this.pieces[k][j] == 3) {
                                this.pieces[k][j] = 3;
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
                    if (this.pieces[i][j] == this.turn && this.pieces[i + 1][j] == check) {
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
                    if (this.pieces[i][j] == this.turn && this.pieces[i][j - 1] == check) {
                        for (var k = j - 1; k >= 0; k--) {
                            if (this.pieces[i][k] == this.turn) k = -1;
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
                    if (this.pieces[i][j] == this.turn && this.pieces[i][j + 1] == check) {
                        for (var k = j + 1; k < 8; k++) {
                            if (this.pieces[i][k] == this.turn) k = 8;
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
                    if (this.pieces[i][j] == this.turn && this.pieces[i - 1][j + 1] == check) {
                        var k = i -1;
                        var q = j + 1;
                        while(k >= 0 && q < 8) {
                            if (this.pieces[k][q] == this.turn) {
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
                    if (this.pieces[i][j] == this.turn && this.pieces[i + 1][j + 1] == check) {
                        var k = i + 1;
                        var q = j + 1;
                        while(k < 8 && q < 8) {
                            if (this.pieces[k][q] == this.turn) {
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
                    if (this.pieces[i][j] == this.turn && this.pieces[i + 1][j - 1] == check) {
                        var k = i + 1;
                        var q = j - 1;
                        while(k < 8 && q >= 0) {
                            if (this.pieces[k][q] == this.turn) {
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
                    if (this.pieces[i][j] == this.turn && this.pieces[i - 1][j - 1] == check) {
                        var k = i - 1;
                        var q = j - 1;
                        while(k >= 0 && q >= 0) {
                            if (this.pieces[k][q] == this.turn) {
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

    //#region flipBoard
    //we check the direction array from the board object
    //flip the corresponding direction
    flipBoard(row, column) {
        var direction = this.move[row][column];
        for(var i = 0; i < direction.length; i++) {
            //U flips to the downwards direction
            if(direction[i] === "U") {
                for(var j = row+1; j < 8; j++) {
                    if(this.pieces[j][column] != this.turn){
                        this.pieces[j][column] = this.turn;
                    }
                    else {
                        j = 8;
                    }
                }
            }
            //D flips the upwards direction
            if(direction[i] === "D") {
                for(var j = row-1; j >= 0; j--) {
                    if(this.pieces[j][column] != this.turn){
                        this.pieces[j][column] = this.turn;
                    }
                    else {
                        j = -1;
                    }
                }
            }
            //R flips the leftwards direction
            if(direction[i] === "R") {
                for(var j = column-1; j >= 0; j--) {
                    if(this.pieces[row][j] != this.turn){
                        this.pieces[row][j] = this.turn;
                    }
                    else {
                        j = -1;
                    }
                }
            }
            //L flips the rightwards direction
            if(direction[i] === "L") {
                for(var j = column+1; j < 8; j++) {
                    if(this.pieces[row][j] != this.turn){
                        this.pieces[row][j] = this.turn;
                    }
                    else {
                        j = 8;
                    }
                }
            }
            //UR flips to the down left direction
            if(direction[i] === "UR") {
                var k = row+1;
                var q = column-1;
                while(k < 8 && q >= 0) {
                    if(this.pieces[k][q] != this.turn){
                        this.pieces[k][q] = this.turn;
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
            if(direction[i] === "DR") {
                var k = row-1;
                var q = column-1;
                while(k >= 0 && q >= 0) {
                    if(this.pieces[k][q] != this.turn){
                        this.pieces[k][q] = this.turn;
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
            if(direction[i] === "DL") {
                var k = row-1;
                var q = column+1;
                while(k >= 0 && q < 8) {
                    if(this.pieces[k][q] != this.turn){
                        this.pieces[k][q] = this.turn;
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
            if(direction[i] === "UL") {
                var k = row+1;
                var q = column+1;
                while(k < 8 && q < 8) {
                    if(this.pieces[k][q] != this.turn){
                        this.pieces[k][q] = this.turn;
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
    //#endregion flipBoard

    //calculate the white and black pieces
    calCoinParity() {
        this.black = 0;
        this.white = 0;
        for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++){
                if(this.pieces[i][j] == 2) this.black++;
                if(this.pieces[i][j] == 1) this.white++;
            }
        }
    }

    getNumberOfPossibleMoves() {
        var s = 0;
        // get total playable moves
        for (var i=0; i<8; i++) {
            for (var j=0; j<8; j++) {
                if (this.pieces[i][j]==3) {
                    s++;
                }
            }
        }

        return s;
    }

    // set Evaluation Score
    setEvalScore(score) {
        this.score = score;
    }

    // get Evaluation Score
    getEvaluationScore() {
        // higher score is better for White
        var ai = turn;
        var opp = turn == 1 ? 2 : 1;
        var multi = this.turn == 1 ? -1 : 1;

        // check if a corner is taken by this player - wanted move
        // Corner Hunter
        if (this.pieces[0][0] == turn) this.score += multi * 20;
        if (this.pieces[0][7] == turn) this.score += multi * 20;
        if (this.pieces[7][0] == turn) this.score += multi * 20;
        if (this.pieces[7][0] == turn) this.score += multi * 20;

        // get number of next possible moves
        this.score += multi * this.getNumberOfPossibleMoves();

        // Parity
        var aiPieces = 0;
        var oppPieces = 0;
        for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++){
                if(this.pieces[i][j] === ai) aiPieces++;
                if(this.pieces[i][j] === opp) oppPieces++;
            }
        }
        this.score += Math.ceil(10 * ((aiPieces - oppPieces) / (aiPieces + oppPieces)));

        return this.score;
    }

    setPieces(pieces) {
        this.pieces = pieces;
    }

    setMoves(directions) {
        this.move = directions;
    }

    setTurn(t) {
        this.turn = t;
    }
    displayPieces() {
        console.log(this.pieces);
    }

    removePossibleMoves() {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (this.pieces[i][j] === 3) this.pieces[i][j] = 0;
            }
        }
        this.clearMove();
        this.availableBoard();
    }
}


//****************************-Object Class Ends Here-************************************* */
var gap = 5;
var cellWidth = 60;
var pieces_layer;
//ai = true to play with the ai: plays with p2
let ai = true;
let is_max = false;

//initalize the starting board
const curBoard = new Board();


window.onload = function () {
    pieces_layer = document.getElementById("pieces_layer");
    drawBoard();
    drawpieces(curBoard);
}

let btn_p2 = document.querySelector(".btn-p2")
btn_p2.onclick = function() {
    let blk_block = document.querySelector(".starting-page");
    blk_block.style.display = "none";
    ai = false;
}

let btn_sean = document.querySelector(".btn-sean")
btn_sean.onclick = function() {
    let s_p = document.querySelector(".starting-page");
    s_p.style.display = "none";
}


let skip_bot = document.getElementById("skip_btn");
skip_bot.onclick = function () {
    // if current turn is the board.
    if(curBoard.turn == 1) {
        curBoard.turn = 2;
    }
    // if skipping human turn, board's turn (turn == 1): use minimax.
    else {
        curBoard.turn = 1;
        setTimeout(function(){
            var s = curBoard;
            var nextMove = new Array(2);
            var nextScore = minimax(s, true, 0, curBoard.turn, nextMove);
            console.log("next Score: " + nextScore);
            console.log("curTurn: " + curBoard.turn);
            // after minimax, we should have the next move saved in our nextMoves array
            //var n = nextMove.length;
            var r = nextMove[0];
            var c = nextMove[1];
            if (0 <= r && r <8 && 0 <= c && c <8) {
                console.log("Bot flipping " + r + " " + c);

                // Display curBoard's pieces
                curBoard.displayPieces();
                curBoard.pieces[r][c] = 1;
                curBoard.flipBoard(r, c);
            }
            curBoard.turn = 2;
            curBoard.clearBoard();
            drawpieces(curBoard);

        },3000);

    }
    skip_bot.style.display = "none";
    curBoard.clearBoard();
    drawpieces(curBoard);
}

function updatescoreboard() {
    const w_score = document.getElementById("white-score");
    const b_score = document.getElementById("black-score");
    curBoard.calCoinParity();
    w_score.textContent = curBoard.white;
    b_score.textContent = curBoard.black;
    const player = document.getElementById("turn");
    if (curBoard.turn == 2) {
        player.textContent = "Black's turn";
    }
    else player.textContent = "White's turn";
}

function drawpieces(curBoard) {
    updatescoreboard();
    pieces_layer.innerHTML = "";
    curBoard.availableBoard();
    if(curBoard.skip == true){
        if(curBoard.turn == 2) {
            skip_bot.style.display = "flex";
        }
        else {
            curBoard.turn = 2;
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

//creating a board here
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
// function clearBoard() {
//     const elements = document.getElementsByClassName("piece");
//     while (elements.length > 0) {
//         elements[0].parentNode.removeChild(elements[0]);
//     }
//     for (var i = 0; i < 8; i++) {
//         for (var j = 0; j < 8; j++) {
//             if (curBoard.pieces[i][j] == 3) curBoard.pieces[i][j] = 0;
//         }
//     }
//     curBoard.clearMove();
// }



//clickedBoard gives i and j position that the user clicked on the boar
//call clearBoard to get rid of the 3s in the board and clean the div
//and update the new board by calling drawpieces function
//and update the new board by calling drawpieces function
function clickedBoard(row, column) {
    //curBoard.played++;
    if (curBoard.pieces[row][column] === 3) {
        if (curBoard.turn === 1) {
            curBoard.pieces[row][column] = 1;
            curBoard.flipBoard(row, column);
            curBoard.clearBoard();
            curBoard.turn = 2;
            //console.log("Turn: " + curBoard.turn);
        }
        // default the bot to play at turn 1 -- Bot plays White
        else if (curBoard.turn == 2) {
            curBoard.pieces[row][column] = 2;
            curBoard.flipBoard(row, column);
            curBoard.turn = 1;
            curBoard.clearBoard();
            drawpieces(curBoard);
            drawpieces(curBoard);
            // RP: comment this if you don't the bot
            if(ai) {
                setTimeout(function(){
                    var s = curBoard;
                    var nextMove = new Array(2);
                    var nextScore = minimax(s, true, 0, curBoard.turn, nextMove);
                    console.log("next Score: " + nextScore);

                    // after minimax, we should have the next move saved in our nextMoves array
                    //var n = nextMoves.length;
                    var r = nextMove[0];
                    var c = nextMove[1];
                    if (r != -1 && c != -1) {
                        console.log("Bot flipping " + r + " " + c);
                        // Display curBoard's pieces
                        curBoard.displayPieces();
                        //clickedBoard(r,c);
                        curBoard.pieces[r][c] = 1;
                        curBoard.flipBoard(r, c);
                    }
                    // //curBoard.turn = 1;
                    curBoard.turn = 2;
                    curBoard.clearBoard();
                    drawpieces(curBoard);

                },500);
            }
        }
    }
    curBoard.clearBoard();
    drawpieces(curBoard);
}
//****************************-End Rendering-************************************* */
//****************************-Minimax algorithm Starts Here-************************************* */

function boardAfterClicked(board, row, column, curTurn) {
    var newBoard = copyBoard(board);
    if (curTurn == 1 && newBoard.pieces[row][column] === 3) { //white
        newBoard.pieces[row][column] = 1;
        newBoard.flipBoard(row, column);
        newBoard.clearBoard();
        newBoard.availableBoard();
        newBoard.turn = 2;
        //curTurn = 2;
    }
    else if (curTurn == 2 && newBoard.pieces[row][column] === 3) { //black
        newBoard.pieces[row][column] = 2;
        newBoard.flipBoard(row, column);
        newBoard.clearBoard();
        newBoard.availableBoard();
        newBoard.turn = 1;
        //curTurn = 1;
    }
    return newBoard;
}

// Return the array of all possible next board from a starting board
 function possibleMoves(p) {

    let boardCopy = copyPieces(p);
    var moves = [];
    // for each available move in s.pieces
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            // for each possible next move, represented by number 3
            if (boardCopy[i][j] === 3) {
                if (checkBadMove(i,j))
                {
                    moves.push({i: i, j: j, avoid: true, score: 0, wanted: false});
                }
                else moves.push({i: i, j: j, avoid: false, score: 0, wanted: false});
            }
        }
    }
    return moves;
}

//****************************-Minimax algorithm Starts Here-************************************* */

// Pay attention to the case when a user skips
 function minimax(s, is_max, depth, curTurn, nextMove){
    var nextTurn = curTurn == 1 ? 2 : 1;
    var moves = possibleMoves(s.pieces);
    var model, count;

    console.log("possible next boards: " + moves.length);

    // increase to 6 after things work
    if(depth === 4 || moves.length === 0) {
        console.log("score " + s.getEvaluationScore());
        return s.getEvaluationScore();
    }
    // If we are at the maximizer
    if(is_max == true) {
        console.log("was in maximizer at depth " + depth);
        var highest = -100000;

        // if there's no next move, means we are skipping this move
        // increase depth by one, change turns
        if (moves.length===0) {
            // if no next move
            if (depth === 0)
            {
                console.log("no move for bot");
                // nextMove[0] = -1;
                // nextMove[1] = -1;
                return 0;
            }
            var cur = minimax(s, false, depth+1, nextTurn, nextMove);
            if (cur>highest) {
                highest = cur;
            }
        }
        // if there are multiple next moves, we evaluate each of them
        // by making the "fake" moves, get evaluation score of that next board,
        // save it in the move data structure.
        //else {
            // evaluate all possible next moves
            console.log("Evaluating next moves\n");
            for (var n = 0; n < moves.length; n++) {
                model = copyBoard(s);

                console.log(" clicking " + moves[n].i + " " +  moves[n].j);
                // make the next move
                model.displayPieces();
                console.log("Testing the move " + moves[n].i + " " + moves[n].j);
                // apply the move
                var nextBoard = boardAfterClicked(model, moves[n].i, moves[n].j, curTurn);
                // display next board

                // forces take a move if it is a corner and player is White
                if (curTurn == 1 && checkWantedMove(moves[n].i, moves[n].j) && depth===0)
                {
                    console.log("Got to the forced take");
                    nextMove[0] = moves[n].i;
                    nextMove[1] = moves[n].j;
                    return 10000;
                }
                // forces skip if it's a bad move
                else if (checkBadMove(moves[n].i, moves[n].j) && moves.length > 0)
                {
                    console.log("Got to the bad move");
                    continue;
                }
                else {
                    // call minimax
                    var cur = minimax(nextBoard, false, depth+1, nextTurn, nextMove);
                    console.log("value at depth " + depth + "is " + cur + "\n");
                    if (cur > highest) {
                        highest = cur;
                        if (depth == 0) {
                            nextMove[0] = moves[n].i;
                            nextMove[1] = moves[n].j;
                        }
                    }
                }

            }
            return highest;
        //}
    }
    // If we are at the minimizer
    else {
        console.log("was in minimizer at depth " + depth);
        var lowest = 100000;
        var nextRow = 0;
        var nextCol = 0;

        // if there's no next move, means we are skipping this move
        // increase depth by one, change turns
        if (moves.length==0) {
            var cur = minimax(s, true, depth+1, nextTurn, nextMove);
            if (cur < lowest) {
                lowest = cur;
            }
        }
        // if there are multiple next moves, we evaluate each of them
        // by making the "fake" moves, get evaluation score of that next board,
        // save it in the move data structure.
        else {
            // evaluate all possible next moves
            console.log("Evaluating next moves\n");
            // get the value for score multiplication. if White (turn=1) playing, it's 1
            // if Black (turn=2) playing, it's -1
            // So, higher score is better for White
            var multi = curTurn == 1 ? 1 : -1;
            for (var n = 0; n < moves.length; n++) {

                // forces take a move if it is a corner and player is White
                if (curTurn == 1 && checkWantedMove(moves[n].i, moves[n].j))
                {
                    console.log("Got to the forced take at minimizer.");
                    nextMove[0] = moves[n].i;
                    nextMove[1] = moves[n].j;
                    return -10000;
                }
                // forces skip if it's a bad move
                else if (checkBadMove(moves[n].i, moves[n].j) && moves.length > 0)
                {
                    console.log("Got to the bad move");
                    continue;
                }
                else {
                    model = copyBoard(s);
                    // make the next move
                    var nextBoard = boardAfterClicked(model, moves[n].i, moves[n].j, curTurn);
                    // display next board
                    nextBoard.displayPieces();
                    // call minimax
                    var cur = minimax(nextBoard, true, depth+1, nextTurn, nextMove);

                    // get the score for
                    moves[n].score = cur;
                    if (cur < lowest) {
                        lowest = cur;
                    }
                }

            }
            // add the next move into our array of moves
            return lowest;
        }
    }
}


// Returns a copy the board we are judging
function copyBoard(p) {
    var newPieces = copyPieces(p.pieces);
    var newMoveBoard = copyMoves(p.move);
    var newBoard = new Board();
    newBoard.setPieces(newPieces);
    newBoard.setMoves(newMoveBoard);
    if(p.turn !== 2) {
        newBoard.setTurn(2);
    }
    else {
        newBoard.setTurn(1);
    }
    return newBoard;
}

//copyPieces returns the board from the Board class;
function copyPieces(p) {
    var newPieces = new Array(8);
    for (var i = 0; i < 8; i++) {
        newPieces[i] = new Array(8);
        for (var j = 0; j < 8; j++) {
            newPieces[i][j] = p[i][j];
        }
    }
    return newPieces;
}


//copy moves copies the move board from the class of Board
function copyMoves(p) {
    var newMoves = new Array(8);
    for(var i = 0; i < 8; i++) {
        newMoves[i] = new Array(8);
       for(var j = 0; j < 8; j++) {
        newMoves[i][j] = p[i][j];
       }
    }
    return newMoves;
}

// check for near-corner moves -- moves we don't want
function checkBadMove(i, j){
    if ((i==1 && j==1) || (i==1 && j==6) || (i==6 && j==1) || (i==6 && j==6))
        return true;
    return false;
}
``
// check for corner moves -- moves we want
function checkWantedMove(i, j) {
    if ((i==0 && j==0) || (i==0 && j==7) || (i==7 && j==0) || (i==7 && j==7))
        return true;
    return false;
}

