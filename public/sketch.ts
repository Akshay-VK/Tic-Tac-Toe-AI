export {};
var squares:HTMLElement[] = [];
var state: boolean = true;
var moves: number = 0;
var playable:boolean = true;
var allMoves: Array<string> = [];
var positions: Array<string> = [
    "","","",
    "","","",
    "","","",    
];
// true = O
// false = X

var options : Array<Array<Number>> = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]        
];

for(let i = 0;i<9;i++) {
        let elm:HTMLElement = document.getElementById(`a${i+1}`);
        squares.push(elm);
    }
    console.log(squares);

//INITIATION
function initiateGame() :void{
    for(let i = 0;i<squares.length;i++) {
        squares[i].innerHTML = "";
    }
}

//SETTING VALUE
function setValue(id: number): void {
    if(playable) {
        moves = moves+1;
        console.log('setting value...');
        if(squares[id].innerHTML == "") {
            squares[id].innerHTML = state ? "O" : "X";
            positions[id] = state ? "O" : "X";
            
            state = !state;

            if(!state) {
                //GENERATE ID
                fetchStuff();
            }
            
        }
        var winner: string = findWinner();
        if(winner != "") {
            for(var i = 0; i < squares.length; i++) {
                document.getElementById(`a${i+1}`).disabled = true;
            }
            //alert(`Winner: ${winner}`);
            document.getElementById('winningDiv').innerHTML = `${winner} wins!`;

        }

        //alert(`Returned winner: ${winner}`);
        
        if(moves >= 9){
            if(winner == "") {
                document.getElementById('winningDiv').innerHTML = `DRAW`;
            }
        }
    }

}

function fetchStuff(): void{
    //GENERATE ID
    if(moves<9){
        var formatId:string = "";
        for(var i = 0;i < squares.length;i++) {
            if(squares[i].innerHTML == "X"){
                formatId += "X";
            }
            if(squares[i].innerHTML == "O"){
                formatId += "O";
            }
            if(squares[i].innerHTML == ""){
                formatId += "S";
            }                
        }
        console.log('format id: '+formatId);
        playable = false;
        allMoves.push(formatId);

        console.log("fetching...");
        fetch(`/get/${formatId}`)
        .then(response =>  {
            return response.json();
        })
        .then(data => {
            console.log(data);
            playable = true;
            //document.getElementById(`a${data.value}`).click();
            if("value" in data) {
                setValue(data.value);
            }else{
                alert('There was a error. please refresh');
            }
        });
    }
}

// 012
// 345
// 678


function findWinner(): string {
    var winner: string = "";
    for(var i = 0; i < options.length; i++) {
        var a: any = options[i][0];
        var b: any = options[i][1];
        var c: any = options[i][2];
        
        if(squares[a].innerHTML != "") {
            if(squares[a].innerHTML == squares[b].innerHTML){
                if(squares[b].innerHTML == squares[c].innerHTML){
                    winner = squares[a].innerHTML;
                }else{            
                    winner = "";
                }
            }else{            
                winner = "";
            }
        }else{            
            winner = "";
        }
        if(winner != ""){
            break;
        }
    }
    console.log(winner);
    return winner;
}

initiateGame();