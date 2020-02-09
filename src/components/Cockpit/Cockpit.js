import React, { useEffect, useRef, useContext } from 'react';

import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {

  const toggleBtnRef = useRef(props);
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);

  //this is a react hook that runs on render of the react component
  useEffect( () => {
    console.log('[Cockpit.js] useEffect');
    //HTTP request... 
    //const timer = setTimeout(() => {
    //  alert('Saved data to cloud!');
    //}, 1000);
    

    toggleBtnRef.current.click();
  
    setTimeout(() => {
      alert('Saved data to cloud!');
    }, 10000);
    return () => {
      //clearTimeout(timer);
      console.log('[Cockpit.js] cleanup in useEffect')
    };
  }, []); //only effect on props.persons array or whatever
  //passing an empty array will run the non-dependency array only once

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  });
/*
  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  });
*/
  // useEffect();

        //let classes = ['red', 'bold'].join(' ');
        const assignedClasses = [];
        let btnClass = '';
        
        if (props.showPersons) {
            btnClass = classes.Red;
        }


        if (props.personsLength <=2) {
          assignedClasses.push(classes.red); //classes = ['red']
        }
        if (props.personsLength <=1) {
          assignedClasses.push(classes.bold); //classes = ['red', 'bold']
        }
       
        

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>Front-End Magic!</p>
            <button
            ref={toggleBtnRef}
            className={btnClass}
            onClick={props.click}>Toggle Persons
            </button>
             <button onClick={authContext.login}>Log in</button>
        </div>
    );  
};

export default React.memo(cockpit);