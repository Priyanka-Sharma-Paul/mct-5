import React, { useRef, useState } from "react";
import DisplayParagraphs from "./DisplayParagraphs";
import { paragraphs } from "../data/constants";

const Input = () => {
  const [data, setData] = useState([]);
  const inputCount = useRef(0);

  const handleButtonClick = () => {
    let paragraphsCount =
      inputCount.current.value != "" ? Number(inputCount.current.value) : 0;
    if (paragraphsCount < 0) {
      alert(" Ayyo ! you know that you wrote negative input 😵");
      paragraphsCount = 1;
    } else if (paragraphsCount > 8) {
      alert(
        " Ayyo ! you are demanding very much paragraph in one go, kindly take little litlle 😀"
      );
      paragraphsCount = paragraphs.length;
    }
    setData(paragraphs.slice(0, paragraphsCount));
  };

  return (
    <>
      <div className='input'>
        <label htmlFor='count'>Paragraphs:</label>
        <input type='number' name='count' id='count' ref={inputCount} />
        <button onClick={handleButtonClick}>GENERATE</button>
      </div>
      <DisplayParagraphs data={data} />
    </>
  );
};

export default Input;
