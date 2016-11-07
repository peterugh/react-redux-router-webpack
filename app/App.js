// Core
import React from 'react';
import css from './scss/App.scss';
import { Link } from 'react-router'
import { connect } from 'react-redux';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { };
  }
  render() {
    return(
      <div>
        <header className={ css.header }>
          <p className={ css.notifications }>{ this.props.todos.items.length } To do items</p>
          <nav className={ css.nav }>
            <Link to='/'>Home</Link> | 
            <Link to='/todo'>To-do List</Link> | 
            <Link to='/fetch'>Fetch</Link>
          </nav>
        </header>
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, todos } = state;
  return {
    user,
    todos
  };
};

export default connect(mapStateToProps)(App);