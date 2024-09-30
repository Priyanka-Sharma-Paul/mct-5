import React from "react";

const DisplayParagraphs = ({ data }) => {
  return (
    <div className='display'>
      {data.map((paragraph) => (
        <p>{paragraph}</p>
      ))}
    </div>
  );
};

export default DisplayParagraphs;
