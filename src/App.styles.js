import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    color: "#fff",
  },
  input: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRadius: 5,
    width: 300,
  },
  appBar: {
    height: 72,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2f363d",
  },
}));

export default useStyles;
