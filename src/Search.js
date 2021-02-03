import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      width: "95vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "600px",
    },
  },
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(2),
    },
  },
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      address: "",
      location: "",
    };
    this.getLocation = this.props.getLocation;
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const loc = await this.getLoc(results[0].address_components);
    const latLng = await getLatLng(results[0]);
    this.sendInput(latLng, loc);
  };

  getLoc(address) {
    let adr = {
      local: "",
      state_name: "",
      country: "",
    };

    let i;
    for (i = 0; i < address.length; i++) {
      let curr = address[i];
      let j;
      for (j = 0; j < curr.types.length; j++) {

        if (curr.types[j] === "locality") adr.local = curr.long_name + ", ";
        if (curr.types[j] === "country") adr.country = curr.long_name;
        if (curr.types[j] === "administrative_area_level_1")
          adr.state_name = curr.long_name + ", ";
      }
    }
    return adr.local + adr.state_name + adr.country;
  }

  async sendInput(latLng, loc) {
    const data = {
      lat: latLng.lat,
      long: latLng.lng,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      "https://polar-mountain-13399.herokuapp.com/location",
      options
    );
    const json = await response.json();
    this.setState({ data: json });
    this.getLocation(this.state.data, loc);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <TextField
                color="secondary"
                className={classes.root}
                id="filled-basic"
                label="Location"
                variant="filled"
                margin="dense"
                ref={this.Ref}
                {...getInputProps({
                  placeholder: "Search Places ...",
                })}
              />

              <div className="autocomplete-dropdown-container">
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: "#fafafa",
                        cursor: "pointer",
                        color: "black",
                        paddingLeft: "5px",
                      }
                    : {
                        backgroundColor: "#ffffff",
                        cursor: "pointer",
                        color: "black",
                        paddingLeft: "5px",
                      };
                  return (
                    <div
                      key={index}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <Typography>{suggestion.description}</Typography>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}
export default withStyles(styles)(Search);
