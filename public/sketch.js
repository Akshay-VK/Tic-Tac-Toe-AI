var squares = [];
//INITIATION
function initiate() {
    for (var i = 0; i < 9; i++) {
        var elm = document.getElementById("a" + (i + 1));
        squares.push(elm);
    }
}
initiate();
