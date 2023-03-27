import React, { useEffect } from 'react'
import './Color.scss'

interface colorProps {
    color: {
        hex: string,
        rgb: number[],
        removable: boolean
    };
}

const Color: React.FC<colorProps> = ({color}) => {

  const deleteColor = () => { /* Deletes color from LocalStorage */
    const newArray = JSON.parse(localStorage.getItem("colors") || "[]").filter((item: { hex: string; }) => item.hex !== color.hex);
    localStorage.setItem("colors", JSON.stringify(newArray)); 
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => { /* Set color of rectangle */
    document.getElementById(color.hex)!.style.backgroundColor = color.hex ;
  })
  
  return (
    <li className="list-item">
      <div id={color.hex} className="triangle-color" />
      <p className="color-text">HEX: {color.hex}</p>
      <p className="color-text">RGB: [ {color.rgb[0]} , {color.rgb[1]} , {color.rgb[2]} ]</p>
      {color.removable &&
        <button className="button-delete" onClick={deleteColor}>Delete Color</button>
      }
    </li>
  )
}

export default Color