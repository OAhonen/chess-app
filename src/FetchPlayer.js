import React, { useState } from 'react'

function FetchPlayer() {
  const [player, setPlayer] = useState([]);

  React.useEffect(() => {
    fetch('https://api.chess.com/pub/player/ahone9/games/2021/04')
      .then(response => response.json())
      .then(data => setPlayer(data.games));
  }, []);

  return (
    <div>Player: {player[0].url}</div>
  );
}

export default FetchPlayer;