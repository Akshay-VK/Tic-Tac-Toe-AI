var squares = [];
var state = true;
var moves = 0;
var positions = [
    "", "", "",
    "", "", "",
    "", "", "",
];
// true = O
// false = X
var options = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
for (var i = 0; i < 9; i++) {
    var elm = document.getElementById("a" + (i + 1));
    squares.push(elm);
}
console.log(squares);
//INITIATION
function initiateGame() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].innerHTML = "";
    }
}
//SETTING VALUE
function setValue(id) {
    moves = moves + 1;
    console.log('setting value...');
    if (squares[id].innerHTML == "") {
        squares[id].innerHTML = state ? "O" : "X";
        positions[id] = state ? "O" : "X";
        state = !state;
    }
    var winner = findWinner();
    if (winner != "") {
        for (var i = 0; i < squares.length; i++) {
            document.getElementById("a" + (i + 1)).disabled = true;
        }
        //alert(`Winner: ${winner}`);
        document.getElementById('winningDiv').innerHTML = winner + " wins!";
    }
    //alert(`Returned winner: ${winner}`);
    if (moves >= 9) {
        if (winner == "") {
            document.getElementById('winningDiv').innerHTML = "DRAW";
        }
    }
}
// 012
// 345
// 678
function findWinner() {
    var winner = "";
    for (var i = 0; i < options.length; i++) {
        var a = options[i][0];
        var b = options[i][1];
        var c = options[i][2];
        if (squares[a].innerHTML != "") {
            if (squares[a].innerHTML == squares[b].innerHTML) {
                if (squares[b].innerHTML == squares[c].innerHTML) {
                    winner = squares[a].innerHTML;
                }
                else {
                    winner = "";
                }
            }
            else {
                winner = "";
            }
        }
        else {
            winner = "";
        }
        if (winner != "") {
            break;
        }
    }
    console.log(winner);
    return winner;
}
initiateGame();
