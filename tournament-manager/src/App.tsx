//import { useState } from "react";
import "./App.css";
import PoolTable from "./components/PoolTable";

function App() {
  //const [count, setCount] = useState(0);
  const pool = [
    { name: "Team 1", teamNumber: 1 },
    { name: "Team 2", teamNumber: 2 },
    { name: "Team 3", teamNumber: 3 },
    { name: "Team 4", teamNumber: 4 },
  ];

  return (
    <>
      <PoolTable poolNumber={1} pool={pool} />
    </>
  );
}

export default App;
