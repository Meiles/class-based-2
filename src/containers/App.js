import React, { Component } from 'react';
import '../css/main.css';
import classes from '../scss/App.module.scss';
//import classes from '../scss/App.scss';
//import Radium, { StyleRoot } from 'radium';
//import Person from '../components/Persons/Person/Person';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
//import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
    { id: 'asd',name: 'Max', age: 28 },
    { id: 'as23',name: 'Manu', age: 29 },
    { id: 'a343dfa',name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice(); //copies array
    const persons = [...this.state.persons]; //another way to copy but more modern with the spread operator ...
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  };

  componentWillMount() {
    console.log('[App.js] componentWIllMount]'); 
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount'); 
  }

  nameChangeHandler = (event, id) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons
    });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  };

  render() {
    console.log('[App.js] render');
    let persons = null;
    

    if (this.state.showPersons) {
      persons = <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
           />;
    }



    return (

      <div className={classes.App}>
      <Cockpit 
        title={this.props.appTitle}
        showPersons={this.state.showPersons}
        persons={this.state.persons}
        click={this.togglePersonsHandler}
      />
      {persons}
      </div>
  
      );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
