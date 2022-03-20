import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import { getCategory } from "../../apis/Category";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "nowrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    overflow: "auto",
    maxWidth: "auto",
  },
  chip: {
    margin: theme.spacing(0.5),
    fontSize: "15px",
  },
}));

export default function Chips() {
  const classes = useStyles();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory().then((response) => {
      setCategory(response.data);
    });
  }, []);

  const handleClick = (value) => {
    console.info("You clicked the Chip.", value);
  };

  return (
    <div>
      <Divider variant="middle" />
      <div component="ul" className={classes.root}>
        {category.map((data) => {
          return (
            <li key={data._id}>
              <Chip
                label={data.name}
                clickable={true}
                className={classes.chip}
                onClick={() => handleClick(data.name)}
              />
            </li>
          );
        })}
      </div>
      <Divider variant="middle" />
    </div>
  );
}
