import React, { useState } from 'react';
import ShowPlayerInfo from './ShowPlayerInfo';

function FetchPlayer() {
  const [player, setPlayer] = useState([]);

  React.useEffect(() => {
    fetch('https://api.chess.com/pub/player/ahone9/games/2021/04')
      .then(response => response.json())
      .then(data => setPlayer(data.games));
  }, []);

  return (
    <ShowPlayerInfo playerInfo={player}/>
  );
}

export default FetchPlayer;