import React, { useState } from "react";
import "./ColorInput.scss";

const predefinedList = [
  { hex: "#FF0000", rgb: [255, 0, 0], removable: false },
  { hex: "#008000", rgb: [0, 128, 0], removable: false },
];
localStorage.setItem("colors", JSON.stringify(predefinedList));

const hexToRgb = (hex: string) => {
  /* convert hex string to rgb array */
  let validHEXInput = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!validHEXInput) {
    return false;
  }
  let output = {
    r: parseInt(validHEXInput[1], 16),
    g: parseInt(validHEXInput[2], 16),
    b: parseInt(validHEXInput[3], 16),
  };
  let arr = [output.r, output.g, output.b];
  return arr;
};

const ColorInput: React.FC = () => {
  const [color, setColor] = useState("");

  const validateInput = (e: { target: HTMLInputElement }) => {
    /* allows only to type # as first character in input */
    let value = e.target.value.replace(/^[^#]/, "");
    setColor(value);
  };
  const sendColor = (
    e: React.FormEvent<HTMLFormElement> & {
      target: { elements: { hexvalue: HTMLInputElement } };
    }
  ) => {
    /* Create new object and push to array in LocalStorage if not included */
    e.preventDefault();
    let storedColors = JSON.parse(localStorage.getItem("colors") || "[]");
    let flag = storedColors.find(
      (o: { hex: string }) => o.hex === e.target.elements.hexvalue.value
    );
    if (typeof flag == "undefined") {
      let arr = hexToRgb(e.target.elements.hexvalue.value);
      let color = {
        hex: e.target.elements.hexvalue.value,
        rgb: arr,
        removable: true,
      };
      storedColors.push(color);
      localStorage.setItem("colors", JSON.stringify(storedColors));
      window.dispatchEvent(new Event("storage"));
      alert("You Saved Color.");
    } else {
      alert("Color already exist.");
    }
  };
  return (
    <form id="firstForm" onSubmit={sendColor}>
      <div className="input-box">
        <label>Type color in Hex value (e.g."#ABABAB")</label>
        <input
          type="text"
          value={color}
          required
          name="hexvalue"
          pattern="^#([A-Fa-f0-9]{6})$"
          onChange={validateInput}
        />
        <input type="submit" value="Add" />
      </div>
    </form>
  );
};

export default ColorInput;
