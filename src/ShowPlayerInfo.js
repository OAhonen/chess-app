import printf from 'printf';
import React from 'react';
import { useSortBy, useTable } from 'react-table'

function ShowPlayerInfo(props) {
  let playerInfo = props.playerInfo;
  const parser = require('chess-pgn-parser');
  let wins = 0;
  let draws = 0;
  let losses = 0;
  let winPercentage = 0;
  let drawPercentage = 0;
  let lossPercengtage = 0;
  let openingWinPercentage = 0;
  let games = [];
  let name = props.name;
  let chessMoves = [];
  let topThreeOpenings = [];
  let topThreeWins = [];
  let openingTotal = 0;
  calculateWins();
  checkOpenings();

  const data = React.useMemo(() => games, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Type',
        accessor: 'type', // accessor is the "key" in the data
      },
      {
        Header: 'White',
        accessor: 'white',
      },
      {
        Header: 'Rating',
        accessor: 'whiteRating',
      },
      {
        Header: 'Black',
        accessor: 'black',
      },
      {
        Header: 'Rating',
        accessor: 'blackRating',
      },
      {
        Header: 'Winner',
        accessor: 'winner',
        Cell: ({ value }) => {
          const nameArr = name.toLowerCase();

          if (value === 'Draw') {
            return <div style={{ background: "grey" }}>{value}</div>
          }

          return nameArr.includes(value.toLowerCase()) ? (
            <div style={{ background: "green" }}>{value}</div>
          ) : (
            <div style={{ background: "red" }}>{value}</div>
          );
        }
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy)
  
  if (playerInfo.length === 0) {
    return <div>No games played in this month.</div>
  }

  function calculateWins() {
    playerInfo.forEach(e => {

      let moves = JSON.parse(parser.pgn2json(e.pgn));
      let result = "";
      
      if (e.white.username.toLowerCase() === name.toLowerCase()) {
        if (e.white.result === 'win') {
          wins = wins + 1;
          result = 'win';
        } else if (e.white.result === 'checkmated' || 
                  e.white.result === 'timeout' ||
                  e.white.result === 'resigned' ||
                  e.white.result === 'lose' ||
                  e.white.result === 'abandoned') {
          losses = losses + 1;
          result = 'loss'
        } else {
          draws = draws + 1;
          result = 'draw'
        }
      }

      if (e.black.username.toLowerCase() === name.toLowerCase()) {
        if (e.black.result === 'win') {
          wins = wins + 1;
          result = 'win';
        } else if (e.black.result === 'checkmated' ||
                  e.black.result ==='timeout' ||
                  e.black.result === 'resigned' ||
                  e.black.result === 'lose' ||
                  e.black.result === 'abandoned') {
          losses = losses + 1;
          result = 'loss'
        } else {
          draws = draws + 1;
          result = 'draw'
        }
      }
      
      let playerWon = "";

      if (e.white.result === 'win') {
        playerWon = e.white.username;
      } else if (e.black.result === 'win') {
        playerWon = e.black.username;
      } else {
        playerWon = 'Draw';
      }

      chessMoves.push({result: result, moves: moves.moves});
      games.push({type: e.time_class, white: e.white.username, whiteRating: e.white.rating,
                  black: e.black.username, blackRating: e.black.rating,
                  winner: playerWon});
    });
    winPercentage = wins / games.length * 100;
    winPercentage = printf('%.2f', winPercentage);
    drawPercentage = draws / games.length * 100;
    drawPercentage = printf('%.2f', drawPercentage);
    lossPercengtage = losses / games.length * 100;
    lossPercengtage = printf('%.2f', lossPercengtage);
  }

  function checkOpenings() {
    let whitesIndex = [];
    let blacksIndex = [];
    let allMoves = [];
    let allOpenings = [];
    let onlyWins = [];
    let countedWins = [];

    for (let i = 0; i < playerInfo.length; i++) {
      if (playerInfo[i].white.username === name) {
        whitesIndex.push(i);
      } else {
        blacksIndex.push(i);
      }
    }

    for (let i = 0; i < whitesIndex.length; i++) {
      let x = whitesIndex[i];
      if (chessMoves[x].moves.length > 5) {
        allMoves.push({move1: chessMoves[x].moves[0],
                        move2: chessMoves[x].moves[1],
                        move3: chessMoves[x].moves[2],
                        move4: chessMoves[x].moves[3],
                        move5: chessMoves[x].moves[4],
                        move6: chessMoves[x].moves[5],
                        pieces: 'white'})
        if (chessMoves[x].result === 'win') {
          onlyWins.push({move1: chessMoves[x].moves[0],
                        move2: chessMoves[x].moves[1],
                        move3: chessMoves[x].moves[2],
                        move4: chessMoves[x].moves[3],
                        move5: chessMoves[x].moves[4],
                        move6: chessMoves[x].moves[5],
                        pieces: 'white'})
        }
      }
    }

    for (let i = 0; i < blacksIndex.length; i++) {
      let y = blacksIndex[i]
      if (chessMoves[y].moves.length > 5) {
        allMoves.push({move1: chessMoves[y].moves[0],
                      move2: chessMoves[y].moves[1],
                      move3: chessMoves[y].moves[2],
                      move4: chessMoves[y].moves[3],
                      move5: chessMoves[y].moves[4],
                      move6: chessMoves[y].moves[5],
                      pieces: 'black'})
        if (chessMoves[y].result === 'win') {
          onlyWins.push({move1: chessMoves[y].moves[0],
                        move2: chessMoves[y].moves[1],
                        move3: chessMoves[y].moves[2],
                        move4: chessMoves[y].moves[3],
                        move5: chessMoves[y].moves[4],
                        move6: chessMoves[y].moves[5],
                        pieces: 'black'})
        }
      }
    }

    console.log(allMoves)

    let counter = {};
    allMoves.forEach(function(obj) {
      let key = JSON.stringify(obj);
      counter[key] = (counter[key] || 0) + 1;
    });
    
    let winCounter = {};
    onlyWins.forEach(function(obj) {
      let key = JSON.stringify(obj);
      winCounter[key] = (winCounter[key] || 0) + 1;
    });

    let amount = Object.values(counter).length;
    let winAmount = Object.values(winCounter).length;

    for (let i = 0; i < amount; i++) {
      let opening = JSON.parse(Object.keys(counter)[i])
      opening.amount = Object.values(counter)[i]
      allOpenings.push(opening)
    }

    for (let i = 0; i < winAmount; i++) {
      let opening = JSON.parse(Object.keys(winCounter)[i])
      opening.amount = Object.values(winCounter)[i]
      countedWins.push(opening)
    }

    let sortable = allOpenings.sort((a, b) => (a.amount < b.amount) ? 1 : -1)
    for (let i = 0; i < 3; i++) {
      topThreeOpenings[i] = sortable[i];
    }

    let winSortable = countedWins.sort((a, b) => (a.amount < b.amount) ? 1 : -1)
    for (let i = 0; i < 3; i++) {
      topThreeWins[i] = winSortable[i];
    }

    for (let i = 0; i < allOpenings.length; i++) {
      if (topThreeWins[0].move1 === allOpenings[i].move1 &&
          topThreeWins[0].move2 === allOpenings[i].move2 &&
          topThreeWins[0].move3 === allOpenings[i].move3 &&
          topThreeWins[0].move4 === allOpenings[i].move4 &&
          topThreeWins[0].move5 === allOpenings[i].move5 &&
          topThreeWins[0].move6 === allOpenings[i].move6 &&
          topThreeWins[0].pieces === allOpenings[i].pieces) {
            openingWinPercentage = topThreeWins[0].amount / allOpenings[i].amount * 100;
            console.log(topThreeWins[0].amount)
            console.log(allOpenings[i].amount)
            openingWinPercentage = printf('%.2f', openingWinPercentage);
            openingTotal = allOpenings[i].amount;
          }
    }
    console.log(winSortable)
  }
  
  return (
    <div>
      {name}<br/>
      Games: {playerInfo.length}<br/>
      Wins: {wins} ({winPercentage}%)<br/>
      Draws: {draws} ({drawPercentage}%)<br/>
      Losses: {losses} ({lossPercengtage}%)<br/>
      The most common opening:&nbsp;
      {topThreeOpenings[0].move1}&nbsp;
      {topThreeOpenings[0].move2}&nbsp;
      {topThreeOpenings[0].move3}&nbsp;
      {topThreeOpenings[0].move4}&nbsp;
      {topThreeOpenings[0].move5}&nbsp;
      {topThreeOpenings[0].move6}&nbsp;
      ({topThreeOpenings[0].pieces})&nbsp;
      Amount: {topThreeOpenings[0].amount} games<br/>
      The second most common opening:&nbsp;
      {topThreeOpenings[1].move1}&nbsp;
      {topThreeOpenings[1].move2}&nbsp;
      {topThreeOpenings[1].move3}&nbsp;
      {topThreeOpenings[1].move4}&nbsp;
      {topThreeOpenings[1].move5}&nbsp;
      {topThreeOpenings[1].move6}&nbsp;
      ({topThreeOpenings[1].pieces})&nbsp;
      Amount: {topThreeOpenings[1].amount} games<br/>
      The third most common opening:&nbsp;
      {topThreeOpenings[2].move1}&nbsp;
      {topThreeOpenings[2].move2}&nbsp;
      {topThreeOpenings[2].move3}&nbsp;
      {topThreeOpenings[2].move4}&nbsp;
      {topThreeOpenings[2].move5}&nbsp;
      {topThreeOpenings[2].move6}&nbsp;
      ({topThreeOpenings[2].pieces})&nbsp;
      Amount: {topThreeOpenings[2].amount} games<br/>
      The most successful opening:&nbsp;
      {topThreeWins[0].move1}&nbsp;
      {topThreeWins[0].move2}&nbsp;
      {topThreeWins[0].move3}&nbsp;
      {topThreeWins[0].move4}&nbsp;
      {topThreeWins[0].move5}&nbsp;
      {topThreeWins[0].move6}&nbsp;
      ({topThreeWins[0].pieces})&nbsp;
      Amount: {topThreeWins[0].amount} out of {openingTotal} ({openingWinPercentage}%)<br/>
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps(column.getSortByToggleProps())}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
                 <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
     </div>
  );
}

export default ShowPlayerInfo;