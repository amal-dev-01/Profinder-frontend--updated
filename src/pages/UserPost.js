// Import React and Material-UI components
import React, { useState } from "react";
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
// import MoreVertIcon from "@material-ui/icons/MoreVert";

// Define custom styles for the card component
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

// Define a custom component for displaying a post
const Post = () => {
  const classes = useStyles();
  const [liked, setLiked] = useState(false);

  // Dummy data for the post
  const post = {
    user: "John Doe",
    date: "January 31, 2024",
    image: "https://example.com/image.jpg",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };

  // Define a function to toggle the like status
  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="user" className={classes.avatar}>
            {post.user.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title={post.user}
        subheader={post.date}
      />
      <CardMedia
        className={classes.media}
        image={post.image}
        title={post.caption}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          {/* <FavoriteIcon color={liked ? "secondary" : "inherit"} /> */}
        </IconButton>
        <IconButton aria-label="share">
          {/* <ShareIcon /> */}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
