var squares:HTMLElement[] = [];

//INITIATION
function initiateGame(): void {
    for(let i = 0;i<9;i++) {
        let elm:HTMLElement = document.getElementById(`a${i+1}`);
        squares.push(elm);
    }
    console.log(squares);
}
