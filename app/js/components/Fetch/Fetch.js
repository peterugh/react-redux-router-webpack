// core
import React from 'react';
import { browserHistory } from 'react-router'

import css from './styles.scss';
import cssGlobals from '../../../scss/global.scss';

class Fetch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null
    };
  }
  fetchUser = (evt) => {
    evt.preventDefault();
    browserHistory.push(`/fetch/${ this.refs.username.value }`);
  }
  render() {
    const { user, words } = this.props;
    
    return(
      <article className={ css.Fetch }>
        <h1 className={ css.h1 }>Async Example Using Fetch</h1>
        <p className={ css.copy }>
          Enter a github username below to see the async data store function.
        </p>
        <form onSubmit={ this.fetchUser }>
          <input type='search' ref='username' className={ css.textInput }/> <button onClick={ this.fetchUser } className={ css.button }>Fetch Github User Info</button>
        </form>
      </article>
    )
  }
}

export default Fetch;