// core
import React, { PropTypes } from 'react';
import { Link } from 'react-router'

// data store
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

import cssGlobals from '../../../scss/global.scss';
import css from './styles.scss';

class Display extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userFetched: false
    };
  }
  componentWillMount() {
    this.props.dispatch(actions.clearUser());
  }
  componentDidMount() {
    if(this.props.params && this.props.params.username) {
      this.props.dispatch(actions.fetchUser(this.props.params.username)).then((response) => {
        if(response) {
          console.log(response)
          this.props.dispatch(actions.storeUser({
            name: response.name,
            image: response.avatar_url
          }))
          this.props.dispatch(actions.storeRepoMeta(response.public_repos));
        }
      });
    }
  }
  render() {
    const { user, words } = this.props;
    return(
      <article className={ css.Display }>
        <h1 className={ css.h1 }>User Details</h1>
        <p className={ css.copy }>
          <span style={ { display: user.fetchingUser ? 'inline' : 'none' } }>Fetching { this.props.params.username }</span>
        </p>
        <div className={ css.info }>
          <img src={ user.image } className={ css.avatar }/>
          <p>{ user.name }</p>
          <p>{ user.numRepos } public repositories</p>
        </div>
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

export default connect(mapStateToProps)(Display);