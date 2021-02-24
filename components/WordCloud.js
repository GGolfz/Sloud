import React, { Fragment, useEffect, useState } from "react";

const WordCloud = ({ words }) => {
  const [data, setData] = useState([]);
  const COLOR = [
    "#A880F7",
    "#A6CEEE",
    "#5D36DF",
    "#FDD4C1",
    "#D5C1FC",
    "#00C6BE",
    "#EA3568",
    "#C980E3",
  ];
  useEffect(() => {
    let temp = [];
    let max = 1;
    words.forEach((e) => {
      if (e.value > max) {
        max = e.value;
      }
    });
    words.forEach((e) => {
      temp.push({
        text: e.text,
        size: (32 * e.value) / max + 10 + "px",
      });
    });
    setData(temp);
  }, [words]);
  return (
    <Fragment>
      <div
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "95%", textAlign: "center" }}>
          {data?.map((e, index) => {
            return (
              <Fragment>
                <span
                  style={{
                    fontSize: e.size,
                    color: COLOR[Math.floor(Math.random() * COLOR.length)],
                  }}
                >
                  {e.text}
                </span>
                {index % (Math.floor(data.length / 3) + 1) == 0 ? <br /> : null}
              </Fragment>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default WordCloud;
