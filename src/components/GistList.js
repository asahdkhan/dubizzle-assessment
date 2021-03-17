import { List, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GistItem from "./GistItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 80,
    display: "flex",
    justifyContent: "center",
  },
}));

const GistList = ({ gists }) => {
  const classes = useStyles();

  if (!gists) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <div className={classes.root}>
      <List style={{ width: 375 }}>
        {gists?.map((item) => (
          <GistItem {...{ item }} />
        ))}
      </List>
    </div>
  );
};

export default GistList;
