import React, { useState } from "react";
import { makeStyles, CardMedia } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
const useStyles = makeStyles((theme) => ({
  image: {
    backgroundSize: "contain",
    paddingTop: "56.25%", // 16:9
  },
}));

const SwipeableImages = ({ images }) => {
  const classes = useStyles();
  let blobImgs = [];

  // Convert to blob if dealing with files.
  if (images.length > 0 && images[0] instanceof File) {
    for (let i = 0; i < images.length; i++) {
      blobImgs.push(URL.createObjectURL(images[i]));
    }
  } else {
    blobImgs = images;
  }
  return (
    <div>
      {blobImgs.length > 0 ? (
        <Carousel
          autoPlay={false}
          navButtonsAlwaysVisible={true}
          animation="slide"
          // cycleNavigation={false}
        >
          {blobImgs.map((img, id) => {
            return (
              <CardMedia
                className={classes.image}
                image={img}
                key={id}
                title="Uploaded images"
              />
            );
          })}
        </Carousel>
      ) : null}
    </div>
  );
};

export default SwipeableImages;
