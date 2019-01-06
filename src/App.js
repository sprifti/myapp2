import React, { Component } from 'react';
import './App.css';
// import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons:[
      {id: '12' ,name: 'hello'},
      {id: '23' ,name: 'hi'},
      {id: '45' ,name: 'Serena'}
    ],
    showPersons: false
  }

  togglePersonHandler = () =>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  switchNameHandler = (name) =>{
    // console.log('was clicked');
      this.setState({persons:[
        {name: name},
        {name: 'switchNameHandler'}
      ]
    });
  }

    deletePersonHandler = (personIndex) => {
        //always create a copy when you want to modify an object
        //after creating the copy you can modify it and then give that value to your object
        const persons = this.state.persons.slice();
        persons.splice(personIndex,1);
        this.setState({persons: persons})
    }

    nameChange = (event,id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id; 
        });
        const person = {
            ...this.state.persons[personIndex]
        };
        person.name = event.target.value;
        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState ({ persons: persons });
  }

  render() {
    const  style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
     
    };

    let persons = null;

    if(this.state.showPersons){

        persons = (
            <div>
                {this.state.persons.map((person, index) => {
                    return <Person 
                    click = {() => this.deletePersonHandler(index)}
                    name={person.name}
                    key = {person.id}
                    changed={(event) => this.nameChange(event, person.id)} />
                })}
            </div>

        );
    style.backgroundColor = 'red';
    // style[':hover'] = {
    //     backgroundColor: 'blue',
    //     color:'black'
    // }
    style.border = '2px solid black';
    }
    
    let classes = [];
    let h2Style = [];

    if(this.state.persons.length <= 2){
        classes.push('red');
        h2Style.push('blue');
    }

    if(this.state.persons.length <= 1){
        classes.push('red');
        h2Style.push('bold');
    }



    return (
    
        <div className="App">
            <h2 className = {h2Style.join(' ')}>Hello</h2>
            <p className={classes.join(' ')}>Trying some new things!</p>
            <button style = {style} onClick={this.togglePersonHandler}>Switch</button>
            {persons}
        </div>
    
      );
    // return React.createElement('div', {className : 'App'}, React.createElement('h1',null, 'Hi i need sleep!!!!'))
  }
}


export default App;