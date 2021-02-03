import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";

const style = () => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "200px",
  },
});

class SmallCard extends React.Component {
  getImage(num) {
    if (num === 800) {
      const weather = this.props.data;
      const sunrise = new Date(this.props.current[0].sr * 1000).getHours();
      const sunset = new Date(this.props.current[0].ss * 1000).getHours();
      const current = new Date(weather.time * 1000).getHours();
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
    if (num === 7) return "/images/haze.png";
    if (num === 8) return "/images/cloud.png";
    if (num === 6) return "/images/snow-cloud.png";
    else return "/images/sun.png";
  }

  UnixToStandardTime = (timestamp) => {
    let d = new Date(timestamp * 1000);
    let h = d.getUTCHours();
    let tm = "AM";
    if (h === 0) h = 12;
    else if (h > 12) {
      h = h % 12;
      tm = "PM";
    }

    let zero = h < 10 ? "0" : "";
    return `${zero}${h} ${tm}`;
  };

  render() {
    const { classes, data, current } = this.props;
    return (
      <Grow in={true}>
      <Card className={classes.root} elevation={10}>
        <Typography variant="h4">
          {this.UnixToStandardTime(data.time + current[0].timezone)}
        </Typography>
        <img
          src={this.getImage(data.weather_id)}
          alt="Italian Trulli"
          style={{ minWidth: 50, maxWidth: 60 }}
        />
        <Typography variant="h4">{data.temp}°</Typography>
        <Typography variant="h6">{data.weather_main}</Typography>
        </Card>
        </Grow>
    );
  }
}
export default withStyles(style)(SmallCard);
