class Game{
    constructor(){
        this.curMove="X";
        this.location=0;
        this.OWins=[];
        this.XWins=[];
        this.wonBoxes=[];

    }

    changeMove(){
        if (game.curMove==="X"){
            game.curMove="O";
        } else {
            game.curMove="X";
        }
    }
}

const error = document.getElementById("error")
const winPatterns = [
    [1,2,3],[4,5,6],[7,8,9],//horiz
    [1,4,7],[2,5,8],[3,6,9],//vert
    [1,5,9],[3,5,7]
]

let lastMove;


let game = new Game;
resetBoxBorders();
// disableButtons()

function resetBoard(){
    game = new Game();
    location.reload()
    resetBoxBorders();
    showTurn();
}

function disableButtons(){
    document.querySelectorAll("button").forEach(btn=>{
        btn.disabled=true;
    })
}

function setWinner(winner){
    //TODO - mark a big line through where they won - might be hard for diagonals
    //reset method
    let winElem = document.getElementById("winner")
    //hide elements
    document.getElementById("board").classList.add("hidden")
    document.getElementById("turn").classList.add("hidden")
    winElem.innerText=`${winner} Wins!`
    winElem.classList.remove("hidden")
    disableButtons();





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
    elem.innerText=game.curMove+" move";
}

function placeBox(elem) {
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



    // todo ; if move is in taken square, highlight whole box

    if(lastMove!==undefined){
        lastMove.classList.remove("last-move")
    }
    elem.innerText = game.curMove;
    elem.classList.add("last-move")
    lastMove=elem;
    game.location = innerbox;
    setBoxColor(innerbox);
    game.changeMove();
    checkWin(outerbox)
    checkWin()
    showTurn()
    setError("")

}

//TODO: win condition checker

function checkWin(curCell){
    let XBox = [];
    let OBox = [];
    let i = 1;
    //check individual cell
    if(curCell!==undefined) {
        let box = document.getElementById(`cell${curCell}`).firstElementChild.children;
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
            //check every possible combination of wins
            if(pattern.every(pos=>OBox.includes(pos))){
                document.getElementById(`cell${curCell}`).innerHTML="O"
                game.wonBoxes.push(curCell);
                game.OWins.push(curCell);

            }
            if(pattern.every(pos=>XBox.includes(pos))){
                document.getElementById(`cell${curCell}`).innerHTML="X"
                game.wonBoxes.push(curCell);
                game.XWins.push(curCell);

            }

        }

    //todo test
    } else {
        for(const pattern of winPatterns){
            if(pattern.every(pos=>game.OWins.includes(pos))){
                setWinner("O")

            }
            if(pattern.every(pos=>game.XWins.includes(pos))){
                setWinner("X")


            }

        }
    }
}