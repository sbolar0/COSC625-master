import React, { useEffect, useState } from "react";
import styles from "../Styles/Components/HeaderFooter.module.css";
import Select from "react-select";

export default function Header() {
  const data = [
    {
      value: 1,
      label: "LogIn",      
      // <Router path='/' exact component 
      //= {SignUP}/>
      //<a href="/signup">
      
    },
    {
      value: 2,
      label: "LogOut",
    },
    {
      value: 3,
      label: "About",
      // <Link to='/'>go</link>,
      
    },
    {
      value: 4,
      label: "Register",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedOption(e);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.dropdownleft}>
        <Select
          placeholder="Select Option"
          value={selectedOption} // set selected value
          options={data} // set list of the data
          onChange={handleChange} // assign onChange function
        />
      </div>
      <div className={styles.right}>
        <a href="#">
          <img
            className="right"
            src="/imgs/logo.png"
            height="60"
            width="60"
          ></img>
        </a>
      </div>
      <div className={styles.centerForm}>   
      <div class="search">          
        <input          
          className={styles.inputField}
          //square box
          // class="searchTerm"
          type="text"
          name="stockSearch"
          placeholder="Search for stock or crypto by ticker"
          // onChange={handleInputChange}
          // value={inputs.username || ""}
          // required
        ></input>
        </div> 
      </div>

      {/* {selectedOption && (
        <div style={{ marginTop: 20, lineHeight: "25px" }}>
          <b>Selected Option</b>
          <br />
          <div style={{ marginTop: 10 }}>
            <b>Label: </b> {selectedOption.label}
          </div>
          <div>
            <b>Value: </b> {selectedOption.value}
          </div>
        </div>
    )} */}
    </div>
  );
}
