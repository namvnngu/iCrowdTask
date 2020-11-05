import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";

const listTab = ["requesters", "workers"];

const MenuTask = () => {
  const location = useLocation();
  let currentTab = location.pathname.slice(1);
  return (
    <div className="ui tabular menu menu-task">
      <Container>
        {listTab.map((tab, id) => {
          return (
            <Link
              key={id}
              className={currentTab === tab ? "item active" : "item"}
              to={`/${tab}`}
              id="item"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Link>
          );
        })}
        <div className="right menu">
          <h2 className="ui header item" style={{ color: "#444" }}>
            iCrowdTask
          </h2>
        </div>
      </Container>
    </div>
  );
};

export default MenuTask;
