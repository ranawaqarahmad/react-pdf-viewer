import React, {createContext, ReactElement, useState } from "react";
import { FC } from "react";
import { getPageFromElement } from "../../../src/lib/pdfjs-dom";

// const initialValue = "light"
const themes = {
    light: {
      foreground: '#000000',
      background: '#eeeeee',
    },
    dark: {
      foreground: '#ffffff',
      background: '#222222',
    },
  };
  export const ThemeContext = createContext(themes.light);

// export const ThemeContext = createContext(null);

const DarkMode: FC<{ initialValue?: string }> = ({ initialValue = "light" }): ReactElement => {
    // const [click, setClick] = useState(initialClick);
    const [theme, setTheme] = useState(initialValue);
    console.log(theme)
    // const toggleTheme = () => {
    //     setTheme((curr) => (curr === "light" ? "dark": "light"));
    //   };
    const toggleTheme = () => {
        setTheme((curr) => {
        //  (curr === "light" ? "ddark" : "light")
        if(curr === "light") {
            console.log("?",curr)
        //    document.body.style.backgroundColor = 'red';
       
        // const element = document.getElementsByClassName('textLayer')
        // console.log(element)

        // element.style.background = 'black'
        
      

            // const box = document.getElementsByClassName("textLayer");
          
            //     //    console.log(box) 
            //        box.style.backgroundColor = 'red';

        }
    } 
        // else
        // console.log("dark")
    
        //  (curr === "light" ? "dark": "light")
    
        );
      };
      
  
    return (
      <div>
          {/* <ThemeContext.Provider 
         value={{ theme, toggleTheme }}
         >  */}
      <div className="App" 
    //   id={theme}
      >
        {/* <Form /> */}
       
        <div className="switch">
          <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <button onClick={() => toggleTheme()}>Click Me!</button>
          {/* <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} /> */}
        </div>
      </div>
    {/* </ThemeContext.Provider> */}
        {/* <p>Click: {theme}</p> */}
        {/* <button onClick={() => toggleTheme()}>Click Me!</button> */}
 
        {/* <button onClick={() => setTheme(theme )}>Click Me!</button> */}
      </div>
      
    )
  };
  export default DarkMode;



//   const [theme, setTheme] = useState("dark");

//   const toggleTheme = () => {
//     setTheme((curr) => (curr === "light" ? "dark" : "light"));
//   };