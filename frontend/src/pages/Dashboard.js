import React, { useState } from "react";
import ProfileComponent from "../components/ProfileComponent";
import DealsComponent from "../components/DealsComponent";
import PlansComponent from "../components/PlansComponent";
import "./dashboard.css";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import Dashnav from "../components/Dashnav";

function Dashboard() {
  const [selectedOption, setSelectedOption] = useState(null);
  const renderComponent = () => {
    switch (selectedOption) {
      case "profile":
        return <ProfileComponent />;
      case "deals":
        return <DealsComponent />;
      case "plans":
        return <PlansComponent />;
      default:
        return <ProfileComponent />;
    }
  };

  const { collapseSidebar } = useProSidebar();

  return (
    <div className="dashboardmaindiv">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Sidebar style={{ height: "auto", color: "black" }}>
          <Menu>
            <MenuItem
              icon={<MenuOutlinedIcon />}
              onClick={() => {
                collapseSidebar();
              }}
              style={{ textAlign: "center" }}
            ></MenuItem>
            <MenuItem
              icon={<PeopleOutlinedIcon />}
              onClick={() => setSelectedOption("profile")}
            >
              Profile
            </MenuItem>
            <MenuItem
              icon={<LocalOfferIcon />}
              onClick={() => setSelectedOption("deals")}
            >
              Deals
            </MenuItem>
            <MenuItem
              icon={<CardMembershipIcon />}
              onClick={() => setSelectedOption("plans")}
            >
              Plans
            </MenuItem>
          </Menu>
        </Sidebar>
        <div className="dash-right">
          <Dashnav />
          <div className="main-content">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
