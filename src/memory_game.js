
window.onload = function() {
    // Fade in the body
document.querySelector('body').style.opacity = 0;

setTimeout(() => {
    document.querySelector('body').style.opacity = 1;
});


const body = document.querySelector('body'),
    tilesNumber = document.querySelector('#settings p span'),
    tilesInput = document.querySelector('#settings input'),
    startBtn = document.querySelector('#settings button[name=start]'),
    resetBtn = document.querySelector('#settings button[name=reset]'),
    restartBtn = document.querySelector('#restartbtn'),
    playArea = document.querySelector('#play-area');
    restartBtn.setAttribute('onclick', 'refreshPage()');
    // restartBtn.setAttribute('onclick', 'refreshPage()');
    

// resetBtn.addEventListener('onclick', () =>{
// 	resetBtn.setAttribute('refreshPage()','');
// });

tilesInput.addEventListener('input', () => {
    tilesNumber.innerHTML = tilesInput.value;
});

resetBtn.addEventListener('click', () => {
    startBtn.removeAttribute('disabled', '');
    tilesInput.removeAttribute('disabled', '');
    playArea.innerHTML = '';
});

startBtn.addEventListener('click', () => {
startBtn.setAttribute('disabled', '');
tilesInput.setAttribute('disabled', '');
    

// Create tiles
    for (let i = 0; i < tilesInput.value; i++) {
        playArea.innerHTML += '<div class="tile"><p></p></div>';
    }
    var letterToPush = [];
    var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
    for (let i = 0; i < tilesInput.value;i++){
        
        letterToPush.push(memory_array[i]);
    }
    // Assign each letter of `memory_array` to each tile randomly
    
    var rArray = Math.floor(Math.random() * tilesInput.value);
    var randomTile = document.querySelectorAll('.tile p')[rArray];
    

    for (let i = 0; i < tilesInput.value; i++) {
        do {
            if (!randomTile.innerHTML) {
                randomTile.innerHTML = letterToPush.shift();
            }

            rArray = Math.floor(Math.random() * tilesInput.value);
            randomTile = document.querySelectorAll('.tile p')[rArray];
        } while (randomTile.innerHTML && letterToPush.length > 0)
    }

    startGame();
});


function startGame() {
    let tiles = document.querySelectorAll('.tile');
    let firstClickedTile;
    let secondClickedTile;

    // Add click event for every tile
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener('click', matching);
    }

    function matching(e) {
        if (!firstClickedTile) {
            firstClickedTile = e.target.parentNode;
            firstClickedTile.firstChild.style.filter = 'blur(0px)';
        } else if (e.target.parentNode !== firstClickedTile) {
            secondClickedTile = e.target.parentNode;
            secondClickedTile.firstChild.style.filter = 'blur(0px)'

            

            if (firstClickedTile.firstChild.innerText == secondClickedTile.firstChild.innerText) {
                firstClickedTile.classList.add('matched');
                secondClickedTile.classList.add('matched');

                firstClickedTile.removeEventListener('click', matching);
                secondClickedTile.removeEventListener('click', matching);

                firstClickedTile.firstChild.style.filter = 'blur(0px)';
                secondClickedTile.firstChild.style.filter = 'blur(0px)';

                tilesClickDelayAndWinCheck();
            } else {
                setTimeout(() => {
                    firstClickedTile.firstChild.style.filter = 'blur(15px)';
                    secondClickedTile.firstChild.style.filter = 'blur(15px)';
                }, 400);

                tilesClickDelayAndWinCheck();
            }

            setTimeout(() => {
                firstClickedTile = undefined;
            }, 400);
        }
    }

    // Removes click events on tiles to be able to see the second tile, then adds events back.
    function tilesClickDelayAndWinCheck() {
        let notMatchedTiles = 0;

        for (let i = 0; i < tiles.length; i++) {
            tiles[i].removeEventListener('click', matching);

            if (!tiles[i].classList.contains('matched')) {
                notMatchedTiles++;
            }
        }

        if (notMatchedTiles === 0) {
            console.log('You win!');
            winMenu();
            return;
        }

        setTimeout(() => {
            for (let i = 0; i < tiles.length; i++) {
                tiles[i].addEventListener('click', matching);
            }
        }, 400);
    }

    function winMenu() {
        body.innerHTML += '<div id="winScreen"></div>';
        document.querySelector('#winScreen').innerHTML = '<p>You win!</p>';

        setTimeout(() => {
            document.querySelector('#winScreen').style.background = 'rgba(0, 0, 0, .7)';
        }, 100);
        
        setTimeout(() => {
            body.removeChild(document.querySelector('#winScreen'));
        }, 2000);
    }
    
}
}
