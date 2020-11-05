import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ListGrid from "../components/ListGrid";
import MenuTask from "../components/MenuTask";
import axios from "axios";
import fetchAllTasks from "../utils/fetchAllTasks";
import searhByKeyWord from "../utils/searchByKeyWord";
import filterByAlphabet from "../utils/filterByAlphabet";
import filterByDate from "../utils/filterByDate";
import filterRangeDate from "../utils/filterRangeDate";

const Workers = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    setLoading(true);

    const cancelToken = axios.CancelToken.source();
    fetchAllTasks(cancelToken, setTasks, setLoading);

    return () => {
      cancelToken.cancel();
    };
  }, []);
  const refresh = () => {
    setLoading(true);

    const cancelToken = axios.CancelToken.source();
    fetchAllTasks(cancelToken, setTasks, setLoading);
  };
  return (
    <div className="worker-task-container">
      <MenuTask />
      <Container>
        <AddNewTask />
        <div className="search">
          <Search setTasks={setTasks} />
          <FilterByDate tasks={tasks} setTasks={setTasks} />
        </div>
        <ExpireDate setTasks={setTasks} />
        <button
          className="ui button mini"
          style={{ margin: "10px 20px" }}
          onClick={refresh}
        >
          Refresh
        </button>
        <ListGrid tasks={tasks} setTasks={setTasks} loading={loading} />
      </Container>
    </div>
  );
};

const AddNewTask = () => {
  return (
    <div className="add-new">
      <Link to="requesters" className="btn">
        Add New Task
      </Link>
    </div>
  );
};

const FilterByDate = ({ tasks, setTasks }) => {
  const handleChange = async (e) => {
    const filterType = e.target.value;
    let filteredTasks;
    if (filterType === "title-ascending") {
      filteredTasks = await filterByAlphabet();
      setTasks([...filteredTasks]);
    } else if (filterType === "title-descending") {
      filteredTasks = await filterByAlphabet(tasks);
      setTasks([...filteredTasks].reverse());
    } else if (filterType === "created-ascending") {
      filteredTasks = await filterByDate(tasks);
      setTasks([...filteredTasks]);
    } else if (filterType === "created-descending") {
      filteredTasks = await filterByDate(tasks);
      setTasks([...filteredTasks].reverse());
    }
  };
  return (
    <div className="filter-container">
      <select className="ui" onChange={handleChange}>
        <option value="original">Filter</option>
        <option value="title-ascending">Alphabetically, A-Z</option>
        <option value="title-descending">Alphabetically, Z-A</option>
        <option value="created-ascending">
          Expire date, nearest to furthest
        </option>
        <option value="created-descending">
          Expire date, furthest to nearest
        </option>
      </select>
    </div>
  );
};
const Search = ({ setTasks }) => {
  const handleChange = async (e) => {
    let searchTasks = await searhByKeyWord(e.target.value);
    setTasks([...searchTasks]);
  };
  return (
    <div className="ui input small">
      <input type="text" placeholder="Search..." onChange={handleChange} />
    </div>
  );
};
const ExpireDate = ({ setTasks }) => {
  let now = new Date(Date.now());
  const [from, setFrom] = useState(now.getTime());
  const [to, setTo] = useState(now.getTime());
  const handleChangeFrom = async (e) => {
    setFrom(e.target.value);
    let returnedTasks = await filterRangeDate(e.target.value, to);
    setTasks([...returnedTasks]);
  };
  const handleChangeTo = async (e) => {
    setTo(e.target.value);
    let returnedTasks = await filterRangeDate(from, e.target.value);
    setTasks([...returnedTasks]);
  };
  return (
    <div className=" date-filter-expire">
      <label>From</label>
      <input className="from-date" type="date" onChange={handleChangeFrom} />
      <label>To</label>
      <input className="to-date" type="date" onChange={handleChangeTo} />
    </div>
  );
};

export default Workers;
