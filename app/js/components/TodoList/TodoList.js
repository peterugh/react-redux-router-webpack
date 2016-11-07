// core
import React, { PropTypes } from 'react';
import { Link } from 'react-router'

// data store
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

import css from './styles.scss';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  updateTitle = (evt) => {
    this.props.dispatch(actions.setTitle(evt.target.value))
  };
  addToDo = () => {
    this.props.dispatch(actions.addItem(this.refs.toDoInput.value));
    this.refs.toDoInput.value = '';
  };
  removeToDoItem = (item) => {
    this.props.dispatch(actions.removeItem(item));
  };
  componentDidMount = () => {
    this.props.dispatch(actions.addItem('Add title to to-do list'));
  }
  render() {

    const { user, todos } = this.props;
    let toDoListDisplay = [];

    todos.items.map((item, i) => {
      toDoListDisplay.push(
        <li key={ i } className={ css.li }>
          { item } <button onClick={ this.removeToDoItem.bind(this, item) }>X</button>
        </li>);
    })

    return (
      <div className={ css.Hello }>
        <h1 className={ css.h1 }>To dos for: { todos.title }</h1>
        <h3 className={ css.h3 } style={ { display: ( todos.items.length > 0 ? 'block' : 'none' ) } }>
          To Do List:
        </h3>
        <ul className={ css.ul } style={ { display: ( todos.items.length > 0 ? 'block' : 'none' ) } }>
          { toDoListDisplay }
        </ul>
        <div className={ css.inputs }>
          <label className={ css.label }>
            List Title:<br/>
            <input type='text' onChange={ this.updateTitle } className={ css.textInput } placeholder='Enter To Do List Title' />
          </label>
          <label className={ css.label }>
            Add a To Do Item:<br/>
            <input type='text' ref='toDoInput' className={ css.textInput } placeholder='Task Name'/>
          </label>
        </div>
        <div className={ css.submits }>
          <button onClick={ this.addToDo } className={ css.button }>Add To Do Item</button>
        </div>
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

export default connect(mapStateToProps)(TodoList);