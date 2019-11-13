import React from 'react';
//import Radium from 'radium';
//import '../css/main.css';
import classes from './Person.module.scss';

const person = ( props ) => {
    console.log('[Person.js] rendering...'); 
    return (
        <div className = {classes.Person}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
};

export default person;