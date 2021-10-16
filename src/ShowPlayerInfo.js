import React from 'react';
import { useTable } from 'react-table'

function ShowPlayerInfo(props) {
  let playerInfo = props.playerInfo;
  let wins = 0;
  let games = [];
  let name = props.name;
  calculateWins();

  const data = React.useMemo(() => games, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'White',
        accessor: 'white', // accessor is the "key" in the data
      },
      {
        Header: 'Black',
        accessor: 'black',
      },
      {
        Header: 'Winner',
        accessor: 'winner',
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
  } = useTable({ columns, data })
  
  if (playerInfo.length === 0) {
    return <div>No games played in this month.</div>
  }

  function calculateWins() {
    playerInfo.forEach(e => {
      
      let playerWon = "";

      if (e.white.result === 'win') {
        playerWon = e.white.username;
      } else if (e.black.result === 'win') {
        playerWon = e.black.username;
      } else {
        playerWon = 'Draw';
      }

      games.push({white: e.white.username, black: e.black.username, winner: playerWon});
    });
  }
  
  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
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
  );
}

export default ShowPlayerInfo;