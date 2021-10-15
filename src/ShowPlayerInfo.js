import React from 'react';

function ShowPlayerInfo(props) {
  let playerInfo = props.playerInfo;
  let wins = 0;

  function calculateWins() {
    playerInfo.forEach(e => {
      if ((e.white.username === 'ahone9' && e.white.result === 'win') ||
          (e.black.username === 'ahone9' && e.black.result === 'win')) {
        wins = wins + 1;
      }
    });
  }

  calculateWins();
  console.log(wins);
  
  return (
    <div>{playerInfo[0].url} {wins}</div>
  );
}

export default ShowPlayerInfo;