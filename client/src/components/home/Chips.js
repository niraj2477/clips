import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
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
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue" },
    { key: 5, label: "Knockout" },
    { key: 6, label: "Ember" },
    { key: 7, label: "D3" },
    { key: 8, label: "Google Charts" },
  ]);

  //   const handleDelete = (chipToDelete) => () => {
  //     setChipData((chips) =>
  //       chips.filter((chip) => chip.key !== chipToDelete.key)
  //     );
  //   };

  return (
    <div>
      <Divider variant="middle" />
      <div component="ul" className={classes.root}>
        {chipData.map((data) => {
          return (
            <li key={data.key}>
              <Chip label={data.label} className={classes.chip} />
            </li>
          );
        })}
      </div>
      <Divider variant="middle" />
    </div>
  );
}
