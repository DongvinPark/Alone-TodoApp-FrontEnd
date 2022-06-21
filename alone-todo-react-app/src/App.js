//import logo from './logo.svg';
import React from 'react';
import Todo from './Todo';
import './App.css';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items:[
        { id: "0", title: "Hello World 1", done: true },
        { id: "1", title: "Hello World 2", done: false }
      ]
    };
  }

  render(){

    var todoItems = this.state.items.map(
      (item, idx) => ( < Todo item={item} key={ item.id } /> )
    );//map

    return(

      <div className='App'>
        {todoItems}
      </div>

    );//return
  }//render
}//end of class

export default App;

/*
App.js에 처음 존재하던 내용들.
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
