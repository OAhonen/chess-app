function ShowPlayerData(props) {
  let playerInfo = props.playerInfo;
  let name = props.name.toLowerCase();
  let history = props.history;
  const parser = require('chess-pgn-parser');
  let chessMoves = [];
  let gameCounter = 0;
  let winCounter = 0;
  let blackWinCounter = 0;
  let whiteWinCounter = 0;

  function compareMoves() {
    playerInfo.forEach(e => {
      let moves = JSON.parse(parser.pgn2json(e.pgn));
      chessMoves.push({black: e.black.username,
                      blackResult: e.black.result,
                      white: e.white.username,
                      whiteResult: e.white.result,
                      moves: moves.moves, 
                      sameMoves: true});
    });
    chessMoves.forEach(e => {
      for (let i = 0; i < history.length; i++) {
        if (e.moves[i] !== history[i]) {
          e.sameMoves = false;
        }
      }
    });
  }

  function calcGames() {
    chessMoves.forEach(e => {
      if (e.sameMoves === true) {
        gameCounter++;
        if (e.black.toLowerCase() === name && e.blackResult === 'win') {
          winCounter++;
          blackWinCounter++;
        }
        if (e.white.toLowerCase() === name && e.whiteResult === 'win') {
          winCounter++;
          whiteWinCounter++;
        }
      }
    })
  }

  compareMoves();
  calcGames();

  return (
    <div>
      Total games played: {gameCounter}<br/>
      Wins: {winCounter} ({whiteWinCounter} as white) ({blackWinCounter} as black)
    </div>
  )
}

export default ShowPlayerData;