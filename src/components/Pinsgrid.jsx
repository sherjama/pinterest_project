// loader
import { ThreeCircles } from "react-loader-spinner";
// react
import React, { useState } from "react";
import Pin from "./Pin";
import InfiniteScroll from "react-infinite-scroll-component";

const PinsGrid = ({ pin }) => {
  const pinsDisplayed = pin ? [...pin] : [];

  const [visibleImages, setVisibleImages] = useState(
    pinsDisplayed.slice(0, 20)
  );

  const fetchMoreData = () => {
    const newImages = pinsDisplayed.slice(
      visibleImages.length,
      visibleImages.length + 20
    );
    setVisibleImages([...visibleImages, ...newImages]);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={visibleImages.length}
        next={fetchMoreData}
        hasMore={visibleImages.length < pinsDisplayed.length}
        loader={
          <ThreeCircles
            visible={true}
            height="30"
            width="30"
            color="#ffff"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        }
        className={` columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 p-4`}
      >
        {pinsDisplayed.map((pinInfo, index) => (
          <Pin key={pinInfo.$id} pinData={pinInfo} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PinsGrid;
