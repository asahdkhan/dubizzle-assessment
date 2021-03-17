import { useState, useEffect } from "react";
import { ListItem, ListItemText, Avatar, Link } from "@material-ui/core";

const GistItem = ({ item }) => {
  const { owner, description, files } = item;
  const fileName = Object.keys(files)[0];
  const [forks, setForks] = useState([]);

  useEffect(() => {
    if (item?.forks_url) {
      getForksUser(item?.forks_url);
    }
  }, [item]);

  const getForksUser = (url) => {
    return fetch(url, {
      headers: { accept: "application/vnd.github.v3+json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) setForks(data);
      })
      .catch((error) => {
        console.error("API call failed. " + error);
        throw error;
      });
  };

  return (
    <Link key={item?.url} href={files[fileName].raw_url} target="blank">
      <ListItem>
        <Avatar alt={owner?.login} src={owner?.avatar_url} />
        <p
          style={{
            fontSize: 10,
            border: "1px solid black",
            padding: 2,
            marginLeft: 8,
            marginRight: 8,
          }}
        >
          {(fileName?.match(/\.([^.]*?)(?=\?|#|$)/) || [])[1]?.toUpperCase()}
        </p>
        <ListItemText
          primary={owner?.login}
          secondary={Object.keys(files)[0]}
        />
        {forks?.slice(0, 3).map((f) => (
          <Link key={f?.owner?.url} href={f?.owner?.url} target="blank">
            <Avatar
              style={{ width: 20, height: 20 }}
              alt="Remy Sharp"
              src={f?.owner?.avatar_url}
            />
          </Link>
        ))}
      </ListItem>
    </Link>
  );
};

export default GistItem;
