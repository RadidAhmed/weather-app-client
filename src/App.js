import Search from "./Search";
import SmallCard from "./SmallCard";
import Title from "./Title";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import MainCard from "./MainCard";
import React from "react";

let darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#D90429",
    },

    type: "dark",
    background: {
      paper: "#0B1D51",
    },
  },
});
let lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#ffffff",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#ffffff",
      contrastText: "#ffffff",
    },
  },
});
darkTheme = responsiveFontSizes(darkTheme);
lightTheme = responsiveFontSizes(lightTheme);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      location: "",
    };
  }

  getLocation = (values, loc) => {
    this.setState({ data: values });
    this.setState({ location: loc });
  };


  render() {
    if (this.state.data != null) {
      return (
        <ThemeProvider theme={darkTheme}>
          <Paper elevation={0}>
            <div className="zone">
              <Title />
              <Typography color="textPrimary">
           Made by Radid Ahmed
          </Typography>
              <Search getLocation={this.getLocation} />
            </div>
            <div>
              <div className="zone">
                <ThemeProvider theme={lightTheme}>
                  <div className="comp">
                    {" "}
                    <MainCard
                      loc={this.state.location}
                      data={this.state.data}
                    />{" "}
                  </div>
                </ThemeProvider>
              </div>
              <div className="zone">
                <ThemeProvider theme={lightTheme}>
                  <div className="box">
                    <div className="grid">
                      <div className="comp">
                        <SmallCard
                          data={this.state.data[2]}
                          current={this.state.data}
                        />
                      </div>
                      <div className="comp">
                        <SmallCard
                          data={this.state.data[3]}
                          current={this.state.data}
                        />
                      </div>
                      <div className="comp">
                        <SmallCard
                          data={this.state.data[4]}
                          current={this.state.data}
                        />
                      </div>
                    </div>
                  </div>
                </ThemeProvider>
              </div>
            </div>
          </Paper>
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider theme={darkTheme}>
          <Paper elevation={0}>
            <div className="landingpage">
              <Title />
              <Search getLocation={this.getLocation} />
            </div>
          </Paper>
        </ThemeProvider>
      );
    }
  }
}
export default App;
