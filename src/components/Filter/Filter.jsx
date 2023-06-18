import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './filter.module.css';

export default class Filter extends Component {
  state = {
    filter: '',
  };

  handleChange = event => {
    this.setState({ filter: event.target.value });
    this.props.onSearch(event);
  };

  render() {
    return (
      <>
        <h3 className={css.title}>Find contacts by name</h3>
        <input
          className={css.input}
          type="text"
          name="filter"
          value={this.state.filter}
          onChange={this.handleChange}
          title="Search contacts"
        />
      </>
    );
  }
}

Filter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
