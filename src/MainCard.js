import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";

const useStyles = (theme) => ({
  root: {
    paddingTop: 30,
    paddingBottom: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "100vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "960px",
    },
  },
  cards: {},
});

class MainCard extends React.Component {
  constructor(props) {
    super(props);
    this.location = this.props.location;
  }

  getImage(num) {
    if (num === 800) {
      const weather = this.props.data[0];
      const sunrise = new Date(weather.sr * 1000).getHours();
      const sunset = new Date(weather.ss * 1000).getHours();
      const current = new Date(weather.time * 1000).getHours();
      console.log(sunrise);
      console.log(sunset);
      console.log(current);
      if (current >= sunrise && current < sunset) {
        return "/images/sun.png";
      } else {
        return "/images/moon.png";
      }
    }
    num = parseInt(num / 100);
    if (num === 2) return "/images/flash-cloud.png";
    if (num === 3) return "/images/rain-cloud.png";
    if (num === 5) return "/images/rain-cloud.png";
    if (num === 8) return "/images/cloud.png";
    if (num === 7) return "/images/haze.png";
    if (num === 6) return "/images/snow-cloud.png";
    else return "/images/sun.png";
  }

  render() {
    const { classes, data } = this.props;
    return (
      <Grow in={true}>
        <Card className={classes.root} elevation={1}>
          <Typography className={classes.cards} variant="h4">
            {this.props.loc}
          </Typography>
          <Typography className={classes.cards} variant="h2">
            {data[0].temp}°C
          </Typography>
          <img
            src={this.getImage(data[0].weather_id)}
            alt="Italian Trulli"
            style={{ minWidth: 50, maxWidth: 160, paddingRight: 30 }}
          />
          <Typography className={classes.cards} variant="h3">
            {data[0].weather_main}
          </Typography>
        </Card>
      </Grow>
    );
  }
}
export default withStyles(useStyles)(MainCard);
