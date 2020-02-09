import React, { Component } from 'react';
import '../css/main.css';
import classes from '../scss/App.module.scss';
//import classes from '../scss/App.scss';
//import Radium, { StyleRoot } from 'radium';
//import Person from '../components/Persons/Person/Person';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';
//import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
    { id: 'asd',name: 'Miles', age: 28 },
    { id: 'as23',name: 'Rachael', age: 29 },
    { id: 'a343dfa',name: 'Eric', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false,
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

  loginHandler = () => {
    this.setState({authenticated: true });
  };

/*  componentWillMount() {
    console.log('[App.js] componentWIllMount]'); 
  } */



  componentDidMount(nextProps, nextState) {
    console.log('[App.js] componentDidMount'); 
  }


  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] should update');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] component did update')
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

    this.setState( (prevState, props) => { 
      return {persons: persons, 
      changeCounter: prevState.changeCounter + 1 
      };
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
          isAuthenticated={this.state.authenticated}
           />;
    }



    return (

      <Aux>
      <button onClick={() => {this.setState({ showCockpit: false });
      }}
      >
      Remove Cockpit
      </button>
      <AuthContext.Provider value={{authenticated: this.state.authenticated,
      login: this.loginHandler
      }}
      >
      {this.state.showCockpit ? (
        <Cockpit 
        title={this.props.appTitle}
        showPersons={this.state.showPersons}
        personsLength={this.state.persons.length}
        click={this.togglePersonsHandler}
      /> ) : null}
      {persons}
      </AuthContext.Provider>
      </Aux>
  
      );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
