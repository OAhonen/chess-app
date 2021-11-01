import Chess from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useState } from 'react';
import ShowPlayerData from './ShowPlayerData';

function ShowChessBoard(props) {
  let playerInfo = props.playerInfo;
  let name = props.name;

  const [game, setGame] = useState(new Chess());

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // always promote to a queen for example simplicity
      });
    });
    console.log(game.history())
    return true;
  }

  const buttonClick = (event) => {
    event.preventDefault();
    window.location.reload();
  }

  return (
    <div>
      <button onClick={buttonClick}>Back to search</button>
      <Chessboard position={game.fen()} onPieceDrop={onDrop}></Chessboard>
      <ShowPlayerData playerInfo={playerInfo} name={name} history={game.history()}></ShowPlayerData>
    </div>
  )
}

export default ShowChessBoard;