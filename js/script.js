
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
//3 is avalible move
//0 is empty
//move is a string vector that takes U,D,R,L,UR,UL,DL,DR as direction in the corresponded 2d board
//white stores the white pieces on in the board right now
//black stores the black pieces in the board right now
//clearMove() empty all of the moves in the 2d board;
//availableMove() update the board with availeble moves in the board and turn that move spot into value 3 
//and push the direciton move string into the move value;
//****************************-Object Class Starts Here-************************************* */
class Board {
    constructor (ps) {
        this.pieces = ps;
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
        this.white = 0;
        this.black = 0;
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
    availableBoard() {
        var check = 0;
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
    //we check the direction array from the board object
    //flip the corresponding direction
    flipBoard(row, column) {
        var direction = this.move[row][column];
        for(var i = 0; i < direction.length; i++) {
            //U flips to the downwards direction
            if(direction[i] == "U") {
                for(var j = row+1; j < 8; j++) {
                    if(this.pieces[j][column] != turn){
                        this.pieces[j][column] = turn;
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
    //calculate the white and black pieces
    calScore() {
        this.black = 0;
        this.white = 0;
        for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++){
                if(this.pieces[i][j] == "2") this.black++;
                if(this.pieces[i][j] == "1") this.white++;
            }
        }
    }
}
//****************************-Object Class Ends Here-************************************* */
var gap = 5;
var cellWidth = 60;
var pieces_layer;
//turn 1 = white turns
//turn 2 = black turns
var turn = 1;
var pieces = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]

//initalize the starting board
const initial_state = new Board(pieces);


window.onload = function () {
    pieces_layer = document.getElementById("pieces_layer");
    drawBoard();
    drawpieces();
}


function updatescoreboard() {
    const w_score = document.getElementById("white-score");
    const b_score = document.getElementById("black-score");
    initial_state.calScore();
    w_score.textContent = initial_state.white;
    b_score.textContent = initial_state.black;
}

function drawpieces() {
    updatescoreboard();
    pieces_layer.innerHTML = "";
    initial_state.availableBoard();
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (initial_state.pieces[i][j] != 0) {
                var piece = document.createElement("div");
                piece.classList.add("piece");
                piece.style.width = cellWidth - 4;
                piece.style.height = cellWidth - 4;
                piece.style.left = (cellWidth + gap) * j + gap + 2;
                piece.style.top = (cellWidth + gap) * i + gap + 2;
                if (initial_state.pieces[i][j] == 1) piece.style.backgroundColor = "white";
                if (initial_state.pieces[i][j] == 2) piece.style.backgroundColor = "black";
                if (initial_state.pieces[i][j] == 3) {
                    piece.style.width = cellWidth - 50;
                    piece.style.height = cellWidth - 50;
                    piece.style.left = (cellWidth + gap) * j + gap + 25;
                    piece.style.top = (cellWidth + gap) * i + gap + 25;
                    piece.style.backgroundColor = "red";
                }
                document.getElementById("board").appendChild(piece);
            }

        }
    }
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
            if (initial_state.pieces[i][j] == 3) initial_state.pieces[i][j] = "0";
        }
    }
    initial_state.clearMove();
}

//clickedBoard gives i and j position that the user clicked on the boar
//call clearBoard to get rid of the 3s in the board and clean the div
//and update the new board by calling drawpieces function 
function clickedBoard(row, column) {
    if (initial_state.pieces[row][column] == 3) {
        if (turn == 1) {
            initial_state.pieces[row][column] = "1";
            initial_state.flipBoard(row, column);
            turn = 2;
        }
        else if (turn == 2) {
            initial_state.pieces[row][column] = "2";
            initial_state.flipBoard(row, column);
            turn = 1;
        }
    }
    
    clearBoard();
    drawpieces();
}
//*****till this point we are just rendering the board ******/