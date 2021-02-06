var squares = [];
var state = true;
var moves = 0;
var playable = true;
var allMoves = [];
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
    if (playable) {
        moves = moves + 1;
        console.log('setting value...');
        if (squares[id].innerHTML == "") {
            squares[id].innerHTML = state ? "O" : "X";
            positions[id] = state ? "O" : "X";
            state = !state;
            if (!state) {
                //GENERATE ID
                fetchStuff();
            }
        }
        var winner = findWinner();
        if (winner != "") {
            for (var i = 0; i < squares.length; i++) {
                document.getElementById("a" + (i + 1)).disabled = true;
            }
            //alert(`Winner: ${winner}`);
            document.getElementById('winningDiv').innerHTML = winner + " wins!";
            console.log(allMoves);
            for (var i = 0; i < allMoves.length; i++) {
                fetch("/update/" + allMoves[i]._id + "/" + allMoves[i].move + "/" + winner)
                    .then(function (response) {
                    return response.json();
                })
                    .then(function (data) {
                    console.log(data);
                });
            }
        }
        //alert(`Returned winner: ${winner}`);
        if (moves >= 9) {
            if (winner == "") {
                document.getElementById('winningDiv').innerHTML = "DRAW";
            }
        }
    }
}
function fetchStuff() {
    //GENERATE ID
    if (moves < 9) {
        var formatId = "";
        for (var i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == "X") {
                formatId += "X";
            }
            if (squares[i].innerHTML == "O") {
                formatId += "O";
            }
            if (squares[i].innerHTML == "") {
                formatId += "S";
            }
        }
        console.log('format id: ' + formatId);
        playable = false;
        //allMoves.push(formatId);
        console.log("fetching...");
        fetch("/get/" + formatId)
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            console.log(data);
            playable = true;
            //document.getElementById(`a${data.value}`).click();
            if ("value" in data) {
                setValue(data.value);
                allMoves.push({ '_id': formatId, 'move': data.value });
            }
            else {
                alert('There was a error. please refresh');
            }
        });
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
