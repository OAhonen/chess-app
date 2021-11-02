function ShowPlayerData(props) {
  let playerInfo = props.playerInfo;
  let name = props.name.toLowerCase();
  let history = props.history;
  const parser = require('chess-pgn-parser');
  let chessMoves = [];
  let gameCounter = 0;
  let winCounter = 0;
  let drawCounter = 0;
  let lossCounter = 0;
  let blackWinCounter = 0;
  let whiteWinCounter = 0;
  let whiteGameCounter = 0;
  let blackGameCounter = 0;
  let whiteDrawCounter = 0;
  let blackDrawCounter = 0;
  let whiteLossCounter = 0;
  let blackLossCounter = 0;

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
        if (e.black.toLowerCase() === name) {
          blackGameCounter++;
          if (e.blackResult === 'win') {
            winCounter++;
            blackWinCounter++;
          } else if (e.blackResult === 'checkmated' ||
                    e.blackResult ==='timeout' ||
                    e.blackResult === 'resigned' ||
                    e.blackResult === 'lose' ||
                    e.blackResult === 'abandoned') {
            lossCounter++;
            blackLossCounter++;
          } else {
            drawCounter++;
            blackDrawCounter++;
          }
        }
        if (e.white.toLowerCase() === name) {
          whiteGameCounter++;
          if (e.whiteResult === 'win') {
            winCounter++;
            whiteWinCounter++;
          } else if (e.whiteResult === 'checkmated' || 
                    e.whiteResult === 'timeout' ||
                    e.whiteResult === 'resigned' ||
                    e.whiteResult === 'lose' ||
                    e.whiteResult === 'abandoned') {
            lossCounter++;
            whiteLossCounter++;
          } else {
            drawCounter++;
            whiteDrawCounter++;
          }
        }
      }
    })
  }

  compareMoves();
  calcGames();

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Total</th>
            <th>White</th>
            <th>Black</th>
          </tr>
          <tr>
            <th>Games</th>
            <td>{gameCounter}</td>
            <td>{whiteGameCounter}</td>
            <td>{blackGameCounter}</td>
          </tr>
          <tr>
            <th>Wins</th>
            <td>{winCounter}</td>
            <td>{whiteWinCounter}</td>
            <td>{blackWinCounter}</td>
          </tr>
          <tr>
            <th>Draws</th>
            <td>{drawCounter}</td>
            <td>{whiteDrawCounter}</td>
            <td>{blackDrawCounter}</td>
          </tr>
          <tr>
            <th>Losses</th>
            <td>{lossCounter}</td>
            <td>{whiteLossCounter}</td>
            <td>{blackLossCounter}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ShowPlayerData;