import { useState } from "react";
import { AppBar, InputBase, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import GistList from "./components/GistList";
import useStyles from "./App.styles.js";

const App = () => {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [gists, setGists] = useState([]);

  const getGistsByUser = (e) => {
    e.preventDefault();
    setGists([]);
    if (!userName) {
      return setFieldError("Enter the username...");
    }
    return fetch(`https://api.github.com/users/${userName}/gists`, {
      headers: { accept: "application/vnd.github.v3+json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) setGists(data);
      })
      .catch((error) => {
        console.error("API call failed. " + error);
        throw error;
      });
  };

  const handleChange = (e) => {
    const user = e.target.value;
    if (!user) {
      setFieldError("Enter the username...");
    } else {
      setFieldError("");
    }
    setUserName(e.target.value);
  };

  console.log(gists);

  return (
    <div className={classes.root}>
      <form onSubmit={(e) => getGistsByUser(e)}>
        <AppBar position="fixed" className={classes.appBar}>
          <InputBase
            id="searchGist"
            value={userName}
            onChange={handleChange}
            placeholder={fieldError || "Search..."}
            className={classes.input}
            error
          />
          <IconButton className={classes.btn} type="submit">
            <SearchIcon style={{ fontSize: 40 }} />
          </IconButton>
        </AppBar>
      </form>
      <GistList {...{ gists }} />
    </div>
  );
};

export default App;
