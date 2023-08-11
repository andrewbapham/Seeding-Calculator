import { useEffect, useState } from "react";

interface PoolTableProps {
  poolNumber: number;
  pool: Team[];
}

interface Team {
  name: string;
  //teamNumber: number;
}

const singleScoreRe = /^\d{1,2}-\d{1,2}$/;
const twoScoreRe = /^\d{1,2}-\d{1,2},\s?\d{1,2}-\d{1,2}$/;

// Table of scores for a pool. The table is organized so that the rows and columns represent the teams,
// and the cells represent the scores of the matches between the teams.
// The diagonal of the table is empty, since a team cannot play against itself.
const PoolTable = (props: PoolTableProps) => {
  const defaultScores: string[][] = [];
  for (let i = 0; i < props.pool.length; i++) {
    defaultScores.push([]);
    for (let j = 0; j < props.pool.length; j++) {
      defaultScores[i].push("");
    }
  }

  const [scores, setScores] = useState<string[][]>(defaultScores);

  const teamNameHeaders = props.pool.map((team) => {
    return <th>{team.name}</th>;
  });

  //onMount, set the diagonal of the table to Xs
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

  useEffect(() => {}, [scores]);

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

    //TODO use this code to set sets won and point differential also?
    if (singleScoreRe.test(event.target.value)) {
      const split = event.target.value.split("-");
      newScores[colIndex][rowIndex] = split[1] + "-" + split[0];
    }

    if (twoScoreRe.test(event.target.value)) {
      const split = event.target.value.split(",");
      const game1 = split[0].split("-");
      const game2 = split[1].split("-");
      newScores[colIndex][rowIndex] =
        game1[1].trim() +
        "-" +
        game1[0].trim() +
        ", " +
        game2[1].trim() +
        "-" +
        game2[0].trim();
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
            <th>Sets Won</th>
            <th>Point Differential</th>
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

            let setsWon = 0;
            let pointDifferential = 0;

            for (let i = 0; i < props.pool.length; i++) {
              if (singleScoreRe.test(scores[index][i])) {
                const split = scores[index][i].split(",");
                const game1 = split[0].split("-");
                const diff = parseInt(game1[0]) - parseInt(game1[1]);
                setsWon += diff > 0 ? 1 : 0;
                pointDifferential += diff;
              }
              if (twoScoreRe.test(scores[index][i])) {
                const split = scores[index][i].split(",");
                const game1 = split[0].split("-");
                const diff1 = parseInt(game1[0]) - parseInt(game1[1]);
                setsWon += diff1 > 0 ? 1 : 0;
                pointDifferential += diff1;

                const game2 = split[1].split("-");
                const diff2 = parseInt(game2[0]) - parseInt(game2[1]);
                pointDifferential += diff2;
                setsWon += diff2 > 0 ? 1 : 0;
              }
            }

            const setsWonElement = <td>{setsWon}</td>;
            const pointDifferentialElement = <td>{pointDifferential}</td>;

            return (
              <tr key={team.name}>
                <td>{team.name}</td>
                {inputCells}
                {setsWonElement}
                {pointDifferentialElement}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PoolTable;
