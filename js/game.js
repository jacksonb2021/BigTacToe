const error = document.getElementById("error")
const winPatterns = [
    [1,2,3],[4,5,6],[7,8,9],//horiz
    [1,4,7],[2,5,8],[3,6,9],//vert
    [1,5,9],[3,5,7]
]

let game = {
    curMove:"X",
    location:0,
    wonBoxes:[]
}
resetBoxBorders();
showTurn();

function changeMove(){
    if (game.curMove==="X"){
        game.curMove="O";
    } else {
        game.curMove="X";
    }
}

function setError(message){
    error.innerText=message;
}

function resetBoxBorders() {
	/*todo: highlight last move*/
	for (let i = 1; i <= 9; i++) {
        let cell = document.getElementById(`cell${i}`);
        cell.style.border = "2px solid black"; // Reset to normal border
    }
}

function setBoxColor(cell) {
    resetBoxBorders();
    let box = document.getElementById(`cell${cell}`);
    box.style.border = "3px solid red"; // Highlight the target box
}

function showTurn(){
	let elem = document.getElementById('turn')
	elem.innerText=game.curMove;
}

function placeBox(elem) {

    //another check to make sure the current location is not filled in already

    let [outerbox, innerbox] = elem.id.split("-").map(Number);
//de morgans law hehe
    if (game.location !== 0 && game.location !== outerbox&& !game.wonBoxes.includes(game.location) ) {
        setError(`You cannot go in this square, try again! You must go in square ${game.location}`);
        return;
    }
    if (elem.innerText !== "") {
        setError('Try again, this space is occupied');
        return;
    }

	//todo if square is taken, then can go anywhere


	//todo erset error after turn - reset tun function
    elem.innerText = game.curMove;
    game.location = innerbox;
    setBoxColor(innerbox);
    changeMove();
    checkWin(outerbox)
	showTurn()

}

//TODO: win condition checker

function checkWin(curCell){
    let XBox = [];
    let OBox = [];
    let i = 1;
    let box = document.getElementById(`cell${curCell}`).firstElementChild.children;
    if(curCell!==undefined) {
        for(const child of box){
            if(child.innerText==="X"){
                XBox.push(i);
            }
            if(child.innerText==="O"){
                OBox.push(i);
            }
            i++
        }

        for(const pattern of winPatterns){
            if(pattern.every(pos=>OBox.includes(pos))){
                document.getElementById(`cell${curCell}`).innerHTML="O"
                game.wonBoxes.push(curCell);

            }
            if(pattern.every(pos=>XBox.includes(pos))){
                document.getElementById(`cell${curCell}`).innerHTML="X"
                game.wonBoxes.push(curCell);

            }

    }


}
}