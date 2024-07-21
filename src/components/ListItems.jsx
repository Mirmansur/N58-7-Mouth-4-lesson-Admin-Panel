import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import "./List.css";
export const mainListItems = (
  <React.Fragment>
    <Link to="/dashbord" className="teacher">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Teacher" />
      </ListItemButton>
    </Link>
    <Link to="/students" className="teacher">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Students" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
