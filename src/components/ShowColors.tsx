import React, { useState , useEffect } from 'react';
import './ShowColors.scss'
import Color from './Color'


interface colorProps {
      hex: string,
      rgb: number[],
      removable: boolean
}

const normalize = (e: number ) => { 
  return e / 100 * 255
}

const calculateSaturation = (e: number[]) => { /* Get saturation from rgb */
  const max = Math.max(e[0] / 255, e[1] / 255, e[2] / 255)
  const min = Math.min(e[0] / 255, e[1] / 255, e[2] / 255)
  const L = (1 / 2) * (max + min)
  if (L === 0) {
    return 0;
  }
  else {
    return ((max - min)) / (1 - Math.abs(2*L - 1)) * 100
  }
}

const ShowColors: React.FC = () => {

  const [ colors , setColors ] = useState(JSON.parse(window.localStorage.getItem('colors') || "[]"));
  const [ sortedColors , setSortedColors ] = useState([]);
  const [ filteredColors , setFilteredColors ] = useState([]);
  const [ red , setRed ] = useState(0);
  const [ green , setGreen ] = useState(0);
  const [ blue , setBlue ] = useState(0);
  const [ saturationSet , setSaturationSet ] = useState(0);

  window.addEventListener('storage', () => {  /* Update colors on every change to local storage */
    setColors(JSON.parse(window.localStorage.getItem('colors') || "[]"));
  });

  useEffect(() => {  /* Sort colors by rgb values */
     const sortedArray = colors.sort((a: { rgb: number[]; }, b: { rgb: number[]; }) => {
        if (a.rgb[0] === b.rgb[0]) {
          if(a.rgb[1] === b.rgb[1]) {
              return b.rgb[2] - a.rgb[2];
          }
          return b.rgb[1] - a.rgb[1];
        }
        return b.rgb[0] - a.rgb[0];
      });
      setSortedColors(sortedArray)
  }, [ colors ])

  useEffect(() => { /* filter colors by all conditions */
    const colors = sortedColors.filter((color: {rgb: number[]}) => {
      return (color.rgb[0] >= normalize(red) && color.rgb[1] >= normalize(green) && color.rgb[2] >= normalize(blue) && calculateSaturation(color.rgb) >= saturationSet)
    });
    setFilteredColors(colors)
  },[ sortedColors, red, green, blue , saturationSet ])
  return (
    <div>
      <form id="secondForm" className="show-colors-form">
          <div>
            <div className="input-flex-box border-bottom">
              <label>Red</label>
              <input type="range" name="red" value={red} min="0" max="100" onChange={(e) => setRed(parseInt(e.target.value))} />
              <p>{red} %</p>
            </div>
            <div className="input-flex-box border-bottom">
              <label>Green</label>
              <input type="range" name="red" value={green} min="0" max="100" onChange={(e) => setGreen(parseInt(e.target.value))} />
              <p>{green} %</p>
            </div>
            <div className="input-flex-box border-bottom">
              <label>Blue</label>
              <input type="range" name="red" value={blue} min="0" max="100" onChange={(e) => setBlue(parseInt(e.target.value))} />
              <p>{blue} %</p>
            </div>
            <div className="input-flex-box">
              <label>Saturation</label>
              <input type="range" name="red" value={saturationSet} min="0" max="100" onChange={(e) => setSaturationSet(parseInt(e.target.value))} />
              <p>{saturationSet} %</p>
            </div>
          </div>
      </form>
      <ul className="list-unorder">
        {filteredColors.map((color: colorProps) => (
            <Color color={color} key={color.hex} />
        ))} 
      </ul>
    </div>
  )
}

export default ShowColors;