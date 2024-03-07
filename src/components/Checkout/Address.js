import React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function Address(props) {
  const { user } = props;
  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      {user ? (
        <>
          <Typography variant="subtitle1" gutterBottom>
            {`${user.firstName} ${user.lastName} (${user.email}) `}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {`${user.street}, ${user.city} `}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {`${user.zip}`}
          </Typography>
          <IconButton
            aria-label="edit"
            size="large"
            LinkComponent={Link}
            to={`/account/${user.email}`}
          >
            <EditIcon />
          </IconButton>
        </>
      ) : (
        ""
      )}
    </Box>
  );
}
