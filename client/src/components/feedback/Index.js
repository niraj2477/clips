import React from "react";
import { IconButton, Tooltip, makeStyles } from "@material-ui/core";

import FeedbackIcon from "@material-ui/icons/Feedback";
import { FeedbackDialog } from "mui-feedback-dialog";

export default function Index() {
  const [dialogVisible, setDialogVisible] = React.useState(true);

  return (
    <>
      <Tooltip title="Send Feedback" arrow>
      <IconButton onClick={() => setDialogVisible(true)} size="medium">
          <FeedbackIcon fontSize="large" />
        </IconButton> 
      </Tooltip>
      <FeedbackDialog
        open={dialogVisible}
        onClose={() => setDialogVisible(false)}
        onSubmit={console.log}
      />
    </>
  );
}
