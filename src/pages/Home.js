import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";

const Home = ({ title, data, columns, options, usersInfo, setUsersInfo }) => {
  return (
    <div>
      <MUIDataTable
        title={"მომხმარებლების მონაცემთა ცხრილი"}
        data={usersInfo}
        columns={columns}
        options={options}
      />
      <Link to="/form">
        <button id="new_user_button">ახალი მომხმარებლის დამატება</button>
      </Link>
    </div>
  );
};

export default Home;
