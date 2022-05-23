import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Form from "./components/Form";
import Home from "./pages/Home";
import MoreVertIcon from '@mui/icons-material/MoreVert';



const columns = [
  "სახელი",
  "გვარი",
  "პირადი_ნომერი",
  "სქესი",
  "დაბადების_თარიღი",
  "დაბადების_ადგილი",
  "მისამართი",
  {
    name: "რედაქტირება",
    options: {
      filter: true,
      sort: false,
      empty: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <MoreVertIcon onClick={() => window.alert(`Clicked "Edit" for row ${tableMeta.rowIndex}`)} />
        
        );
      }
    }
  },
];

const options = {
  filterType: "checkbox",
};

function App() {
  const [usersInfo, setUsersInfo] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              title={"User List"}
              data={usersInfo}
              columns={columns}
              options={options}
              usersInfo={usersInfo}
              setUsersInfo={setUsersInfo}
            />
          }
        />
        <Route
          path="/form"
          element={<Form usersInfo={usersInfo} setUsersInfo={setUsersInfo} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
