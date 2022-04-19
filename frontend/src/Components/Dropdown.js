import React, {useState} from "react";
import styles from '../Styles/Components/Chart.module.css';

const Dropdown = ({options,onChange,selectedOption}) => {
    return (
        <select 
            className={styles.inputField} type="text" id="coin_pair" name="coinpairing"
            value={selectedOption}
            onChange={onChange}>

            {options.map(o => (
                <option className={styles.selectOption} key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
    );
};

export default Dropdown;


