// core
import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router'
// data store
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

import cssGlobals from '../../../scss/global.scss';
import css from './styles.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };
  }
  render() {
    return(
      <article className={ css.Home }>
        <h1 className={ css.h1 }>React Boilerplate</h1>
        <h3 className={ css.h3 }>Featuring React Router, Redux Store, and Webpack</h3>
        <div className={ css.images }>
          <img src='/images/react.png' className={ css.react }/>
          <img src='/images/react-router.png' className={ css.router }/>
          <img src='/images/redux.png' className={ css.redux }/>
          <img src='/images/webpack.png' className={ css.webpack }/>
        </div>
        <section>
          <p className={ css.copy }>
            This boilerplate illustrates the basics of running a react app using webpack as a task manager. On top of that, it includes a router and a cross component data store including asynchronous requests.
          </p>
          <p className={ css.copy }>
            Visit the <Link to='/todo'>to-do list</Link> page to see how Redux works.
          </p>
          <p className={ css.copy }>
            Visit the <Link to='/fetch'>fetch</Link> page to see how the data store handles async actions.
          </p>
        </section>
      </article>
    )
  }
}

const mapStateToProps = (state) => {
  const { user, todos } = state;
  return {
    user,
    todos
  };
};

export default connect(mapStateToProps)(Home);