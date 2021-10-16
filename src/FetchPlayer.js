import React, { useState } from 'react';
import ShowPlayerInfo from './ShowPlayerInfo';

function FetchPlayer() {
  console.log('hello');
  const [player, setPlayer] = useState([]);
  const [loading, isLoading] = useState(true)

  React.useEffect(() => {
    const url = 'https://api.chess.com/pub/player/ahone9/games/2021/04';

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setPlayer(json.games);
            isLoading(false);
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
}, []);

  return (
    loading ? <div>loading...</div> : <ShowPlayerInfo playerInfo={player}/>
  );
}

export default FetchPlayer;