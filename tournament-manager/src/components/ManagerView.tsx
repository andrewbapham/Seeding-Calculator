import { useEffect, useState } from "react";
import PoolTable from "./PoolTable";

const hardCodedPools = [
  {
    poolNumber: "1A",
    pool: [
      { name: "Sameer & Friends" },
      { name: "Rush Hour" },
      { name: "Set on my face" },
      { name: "Fluffy and the Freds" },
    ],
  },
  {
    poolNumber: "1B",
    pool: [
      { name: "Sled Riders" },
      { name: "Sniper Team Dango" },
      { name: "Kamehameha" },
      { name: "They never believed in us!" },
    ],
  },
  {
    poolNumber: "3A",
    pool: [
      { name: "Jimmy's hoes" },
      { name: "Sally & Friends" },
      { name: "Kung Pow" },
      { name: "21 Bump Street" },
    ],
  },
  {
    poolNumber: "3B",
    pool: [
      { name: "Fly High" },
      { name: "Throwers" },
      { name: "Merlaw & Minions" },
      { name: "Donnie" },
    ],
  },
];

const hardCodedPoolElements: JSX.Element[] = [];
for (let i = 0; i < hardCodedPools.length; i++) {
  hardCodedPoolElements.push(
    <PoolTable
      poolNumber={hardCodedPools[i].poolNumber}
      pool={hardCodedPools[i].pool}
      key={hardCodedPools[i].poolNumber}
    />
  );
}

const ManagerView = () => {
  const [poolCount, setPoolCount] = useState(1);
  const [teamCount, setTeamCount] = useState(0);
  const [poolFormData, setPoolFormData] = useState<string[]>([]);
  //Placeholder for getting/setting localStorage data
  //const [poolData, setPoolData] = useState([pool]);
  const [poolTables, setPoolTables] = useState<JSX.Element[]>([]);

  //placeholder for getting/setting localStorage data
  useEffect(() => {
    setPoolTables([]);
  }, []);

  const handlePoolFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPoolFormData = [...poolFormData];
    const teamIndex = parseInt(event.target.name.split("-")[1]);
    newPoolFormData[teamIndex] = event.target.value;
    setPoolFormData(newPoolFormData);
  };

  const handleAddPool = () => {
    const pool = poolFormData.map((teamName) => {
      return { name: teamName.trim() };
    });

    console.log(pool);

    poolTables.push(
      <PoolTable
        poolNumber={poolCount.toString()}
        pool={pool}
        key={poolCount}
      />
    );
    setPoolCount(poolCount + 1);

    setPoolFormData([]);
  };

  const teamNameInputs = [];
  for (let i = 0; i < teamCount; i++) {
    teamNameInputs.push(
      <input
        type="text"
        name={"teamName-" + i}
        id={"teamName-" + i}
        key={"teamName-" + i}
        onChange={handlePoolFormChange}
      ></input>
    );
  }

  return (
    <>
      <details>
        <summary>Add pool</summary>
        <div>
          <label htmlFor="poolCount">Number of teams in pool: </label>
          <input
            type="number"
            name="poolCount"
            id="poolCount"
            onChange={(e) => setTeamCount(parseInt(e.target.value))}
          ></input>
          <p>Team names:</p>
          {teamNameInputs}
        </div>
        <button onClick={handleAddPool}>Add Pool</button>
      </details>

      <div id="poolTableContainer">
        {hardCodedPoolElements}
        {poolTables}
      </div>
    </>
  );
};

export default ManagerView;
