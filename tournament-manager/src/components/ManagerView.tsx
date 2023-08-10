import PoolTable from "./PoolTable";

const pool = [
  { name: "Team 1", teamNumber: 1 },
  { name: "Team 2", teamNumber: 2 },
  { name: "Team 3", teamNumber: 3 },
  { name: "Team 4", teamNumber: 4 },
];

const ManagerView = () => {
  return (
    <div id="poolTableContainer">
      <PoolTable poolNumber={1} pool={pool} />
    </div>
  );
};

export default ManagerView;
