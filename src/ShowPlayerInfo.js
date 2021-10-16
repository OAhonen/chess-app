import React from 'react';
import { useSortBy, useTable } from 'react-table'

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
  }
  
  return (
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
  );
}

export default ShowPlayerInfo;