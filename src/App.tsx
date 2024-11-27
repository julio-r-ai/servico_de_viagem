import { Outlet } from "react-router-dom";
import './index.css';

export const App= () => {
  return (
    <div className="App">
      <Outlet/>
    </div>
  );
}