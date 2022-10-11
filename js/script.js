var gap = 5;
var cellWidth = 60;
var pieces_layer;
//turn 1 = white turns
//turn 2 = black turns
var turn = 1;

//black is 2
//white is 1
//for the starting state
var pieces = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
]


window.onload=function() {
    pieces_layer = document.getElementById("pieces_layer")
    drawBoard();
    drawpieces();
}


function drawpieces() {
    pieces_layer.innerHTML = "";
    availableBoard();
    for(var i = 0; i < 8; i++) {
        for(var j = 0; j < 8; j++) {
            if(pieces[i][j] != 0){
                var piece = document.createElement("div");
                piece.style.position = "absolute";
                piece.style.width = cellWidth-4;
                piece.style.height = cellWidth-4;
                piece.style.borderRadius = "50px";
                piece.style.left = (cellWidth+gap)*j + gap + 2 ;
                piece.style.top = (cellWidth+gap)*i + gap + 2;
                if(pieces[i][j] == 1) piece.style.backgroundColor = "white";
                if(pieces[i][j] == 2) piece.style.backgroundColor = "black";
                if(pieces[i][j] == 3) {
                    piece.style.width = cellWidth-50;
                    piece.style.height = cellWidth-50;
                    piece.style.left = (cellWidth+gap)*j + gap + 25 ;
                    piece.style.top = (cellWidth+gap)*i + gap + 25;
                    piece.style.backgroundColor = "red";
                }
                document.getElementById("board").appendChild(piece);
            }
            
        }
    }
}

//createing a board here
function drawBoard() {
    for(var i = 0; i < 8; i++) {
        for(var j = 0; j < 8; j++) {
            var tile = document.createElement("div");
            tile.style.position = "absolute";
            tile.style.width = cellWidth;
            tile.style.height = cellWidth;
            tile.style.backgroundColor = "green";
            tile.style.left = (cellWidth+gap)*j + gap;
            tile.style.top = (cellWidth+gap)*i + gap;
            tile.setAttribute("onClick", "clickedBoard("+i+" , "+j+")") ;
            document.getElementById("board").appendChild(tile);
        }
    }
}

function clearBoard() {
    for(var i = 0; i < 8; i++) {
        for(var j = 0; j < 8; j++) {
            if(pieces[i][j] == 3) {
                pieces[i][j] = "0";
            }
        }
    }
    $('div#')
    drawpieces();
}

function clickedBoard(row, column) {
    if(pieces[row][column] == 3) {
        if(turn == 1){
            pieces[row][column] = "1";
            turn = 2;
        }
        else if(turn == 2) {
            pieces[row][column] = "2 ";
            turn = 1;
        }
    }
    clearBoard();
    drawpieces();
}

function returnAvailable(row, column, direction) {
    //only check for down direction
    if(direction == "U") {
        for(var i = row-1; i >= 0; i--) {
            if(pieces[i][column] == turn) 
                i = -1;
            else if(pieces[i][column] == 0) {
                pieces[i][column] = 3;
                i = -1;
            }
        }
    }
    //check for down direction
    if(direction == "D") {
        for(var i = row+1; i < 8 ; i++) {
            if(pieces[i][column] == turn) i = 8;
            else if(pieces[i][column] == 0) {
                pieces[i][column] = 3;
                i = 8;
            }
        }
    }
    //check for left side
    if(direction == "L") {
        for(var i = column-1; i >= 0; i--) {
            if(pieces[row][i] == turn) 
                i = -1;
            else if(pieces[row][i] == 0) {
                pieces[row][i] = 3;
                i = -1;
            }
        }
    }
    //check for right side
    if(direction == "R") {
        for(var i = column+1; i < 8 ; i++) {
            if(pieces[row][i] == turn) i = 8;
            else if(pieces[row][i] == 0) {
                pieces[row][i] = 3;
                i = 8;
            }
        }        
    }
}

function availableBoard() {
    var check = 0;
    if(turn == 2) check = 1;
    else  check = 2;
    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 8; j++) {
            //check for UL U UR L R DL D DR directions
            //check for U
            if(i != 0 && i != 1) {
                if (pieces[i][j] == turn && pieces[i-1][j] == check){
                    returnAvailable(i,j,"U"); 
                }
            }
            //check for D
            if(i != 6 && i != 7) {
                if (pieces[i][j] == turn && pieces[i+1][j] == check){
                    returnAvailable(i,j,"D"); 
                }
            }
            //check for L
            if(j != 0 && j != 1) {
                if (pieces[i][j] == turn && pieces[i][j-1] == check){
                    returnAvailable(i,j,"L"); 
                }
            }   
            //check for R
            if(j != 6 && j != 7) {
                if (pieces[i][j] == turn && pieces[i][j+1] == check){
                    returnAvailable(i,j,"R"); 
                }
            }    
        }
    }
}


//*****till this point we are just rendering the board ******/
