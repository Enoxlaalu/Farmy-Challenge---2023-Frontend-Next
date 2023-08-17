import styles from "./styles.module.scss";

const Table = ({ rows, columns }) => {
  const renderColumns = () => {
    return columns.map(({ id, name, description, width }) => {
      return (
        <th
          key={id}
          style={width ? { width: `${width}%` } : {}}
          className={styles.headerCell}
        >
          {name} <span>{description ? `(${description})` : ""}</span>
        </th>
      );
    });
  };

  const renderRows = () => {
    return rows.map((row) => {
      return (
        <tr key={row.id}>
          {columns.map(({ id, cell, unit }) => {
            const renderCell = () =>
              typeof cell === "function" ? cell(row) : cell;

            return (
              <td key={id} className={styles.rowCell}>
                {cell ? renderCell() : row[id]}
                {unit ? unit : ""}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>{renderColumns()}</tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default Table;
