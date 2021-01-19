import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Title() {
  return (
    <div>
      <Typography color="textPrimary" variant="h1">
        The Weather App
      </Typography>
      <Typography className='zone'>Made by Radid Ahmed </Typography>
    </div>
  );
}
