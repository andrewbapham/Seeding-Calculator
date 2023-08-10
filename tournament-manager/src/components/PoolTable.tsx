import { useEffect, useState } from "react";

interface PoolTableProps {
  poolNumber: number;
  pool: Team[];
}

interface Team {
  name: string;
  teamNumber: number;
}

// Table of scores for a pool. The table is organized so that the rows and columns represent the teams,
// and the cells represent the scores of the matches between the teams.
// The diagonal of the table is empty, since a team cannot play against itself.
const PoolTable = (props: PoolTableProps) => {
  const defaultScores: string[][] = [];
  for (let i = 0; i < props.pool.length; i++) {
    defaultScores.push([]);
    for (let j = 0; j < props.pool.length; j++) {
      defaultScores[i].push("2-0");
    }
  }

  const [scores, setScores] = useState<string[][]>(defaultScores);

  const teamNameHeaders = props.pool.map((team) => {
    return <th>{team.name}</th>;
  });

  useEffect(() => {
    Array.from(document.getElementsByTagName("td")).forEach((element) => {
      if (
        element.parentNode != null &&
        element.cellIndex ===
          (element.parentNode as HTMLTableRowElement).rowIndex
      ) {
        element.innerHTML = "X";
      }
    });
  });

  //When a score is changed, update the scores array, and update the table including the related game which will have the opposite score
  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newScores = [...scores];
    const rowIndex =
      (
        (event.target.parentNode as HTMLTableCellElement)
          .parentNode as HTMLTableRowElement
      ).rowIndex - 1;
    const colIndex =
      (event.target.parentNode as HTMLTableCellElement).cellIndex - 1;

    newScores[rowIndex][colIndex] = event.target.value;

    const re = /\d{1,2}-\d{1,2}/;
    if (re.test(event.target.value)) {
      const split = event.target.value.split("-");
      newScores[colIndex][rowIndex] = split[1] + "-" + split[0];
    }
    //newScores[colIndex][rowIndex] = event.target.value;
    setScores(newScores);
  };

  return (
    <div>
      <h1>Pool {props.poolNumber}</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            {teamNameHeaders}
          </tr>
        </thead>
        <tbody>
          {props.pool.map((team, index) => {
            const inputCells = [];
            for (let i = 0; i < props.pool.length; i++) {
              inputCells.push(
                <td>
                  <input
                    type="text"
                    value={scores[index][i]}
                    onChange={handleScoreChange}
                  ></input>
                </td>
              );
            }

            return (
              <tr key={team.name}>
                <td>{team.name}</td>
                {inputCells}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PoolTable;
