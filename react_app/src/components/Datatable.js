import React, { useMemo } from 'react';
import { useTable } from 'react-table';

function DataTable({ data }) {
  // Define the columns dynamically based on the keys in the data
  const columns = useMemo(() => {
    if (data.length === 0) return [];

    const keys = Object.keys(data[0]);

    // Sort the keys alphabetically
    keys.sort((a, b) => a.localeCompare(b));

    return keys.map((key) => ({
      Header: key.replace(/_/g, ' '), // Replace underscores with spaces for headers
      accessor: key,
    }));
  }, [data]);

  // Define the table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Render the table
  return (
    <table
      {...getTableProps()}
      style={{ width: '100%', borderCollapse: 'collapse' }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                  padding: '10px',
                  whiteSpace: 'nowrap', // Prevent headers from wrapping
                  textAlign: 'left',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '10px',
                    border: 'solid 1px gray',
                    background: 'papayawhip',
                    textAlign: 'left',
                    whiteSpace: 'nowrap', // Prevent cells from wrapping
                  }}
                >
                  {typeof cell.value === 'object' && cell.value !== null
                    ? JSON.stringify(cell.value)
                    : cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataTable;
