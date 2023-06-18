import React from 'react';
import PropTypes from 'prop-types';

import css from './contactItem.module.css';

export default function ContactItem({ id, name, number, onClick }) {
  return (
    <li>
      {name}: {number}{' '}
      <button
        className={css.deleteBtn}
        type="button"
        onClick={() => onClick(id)}
      >
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  onClick: PropTypes.func.isRequired,
};
