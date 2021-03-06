import React, { useState } from 'react';
import ShowChessBoard from './ShowChessBoard';
import ShowPlayerInfo from './ShowPlayerInfo';

function FetchPlayer(props) {
  const [player, setPlayer] = useState([]);
  const [loading, isLoading] = useState(true);
  let name = props.name;
  let month = props.month;
  let datatype = props.datatype;

  React.useEffect(() => {
    const url = 'https://api.chess.com/pub/player/' + name + '/games/2021/' + month;

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
    player === undefined
    ?
    <div>No player found.</div>
    :
    loading
    ?
    <div>Loading...</div>
    :
    player.length === 0
    ?
    <div>No games played.</div>
    :
    datatype === 'Table'
    ?
    <ShowPlayerInfo playerInfo={player} name={name}/>
    :
    <ShowChessBoard playerInfo={player} name={name}/>
  );
}

export default FetchPlayer;