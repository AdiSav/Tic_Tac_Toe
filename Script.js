let boxes = Array.from(document.getElementsByClassName("box"));
let turn = "X";
let isGameOver = false;

boxes.forEach(function(box) {
    box.innerHTML = "";
    box.addEventListener("click", function() {
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn;
            changeTurn();
            checkWin_Draw();
        }
    });
});

function changeTurn() {
    if (!isGameOver) {
        if (turn === "X") {
            turn = "O";
            document.getElementById("bg").style.left = "95px";
        } else {
            turn = "X";
            document.getElementById("bg").style.left = "0";
        }
    }
}

function checkWin_Draw() {
    let WinCombo = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < WinCombo.length; i++) {
        let firstSymbol = boxes[WinCombo[i][0]].innerHTML;
        let secondSymbol = boxes[WinCombo[i][1]].innerHTML;
        let thirdSymbol = boxes[WinCombo[i][2]].innerHTML;

        if (firstSymbol != "" && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
            isGameOver = true;
            document.getElementById("results").innerHTML = `${firstSymbol} wins!`;

            for (let j = 0; j < 3; j++) {
                boxes[WinCombo[i][j]].style.backgroundColor = "#08D9D6";
                boxes[WinCombo[i][j]].style.color = "#000";
            }
        }

           if (!isGameOver && boxes.every(box => box.innerHTML !== "")) {
            isGameOver = true;
            document.getElementById("results").innerHTML = "It's a draw!";
        }
    }
}

document.getElementById("play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.getElementById("bg").style.left = "0";
    document.getElementById("results").innerHTML = "";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});

