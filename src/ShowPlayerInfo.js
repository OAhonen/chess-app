import printf from 'printf';
import React from 'react';
import { useSortBy, useTable } from 'react-table'

function ShowPlayerInfo(props) {
  let playerInfo = props.playerInfo;
  let wins = 0;
  let draws = 0;
  let losses = 0;
  let winPercentage = 0;
  let drawPercentage = 0;
  let lossPercengtage = 0;
  let games = [];
  let name = props.name;
  calculateWins();

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

          return nameArr.includes(value.toLowerCase()) ? (
            <div style={{ background: "red" }}>{value}</div>
          ) : (
            value
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
      
      if (e.white.username === name) {
        if (e.white.result === 'win') {
          wins = wins + 1;
        } else if (e.white.result === 'checkmated' || 
                  e.white.result === 'timeout' ||
                  e.white.result === 'resigned' ||
                  e.white.result === 'lose' ||
                  e.white.result === 'abandoned') {
          losses = losses + 1;
        } else {
          draws = draws + 1;
        }
      }

      if (e.black.username === name) {
        if (e.black.result === 'win') {
          wins = wins + 1;
        } else if (e.black.result === 'checkmated' ||
                  e.black.result ==='timeout' ||
                  e.black.result === 'resigned' ||
                  e.black.result === 'lose' ||
                  e.black.result === 'abandoned') {
          losses = losses + 1;
        } else {
          draws = draws + 1;
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
  
  return (
    <div>
      Games: {playerInfo.length}<br/>
      Wins: {wins} ({winPercentage}%)<br/>
      Draws: {draws} ({drawPercentage}%)<br/>
      Losses: {losses} ({lossPercengtage}%)<br/>
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