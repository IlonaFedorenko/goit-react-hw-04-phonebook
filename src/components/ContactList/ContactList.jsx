import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export function ContactList({ contacts, deleteContact }) {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <>
            <li className={css.item}>
              <p>
                {name}:{number}
              </p>
              <button
                className={css.button}
                type="button"
                onClick={() => deleteContact(id)}
                value="delete"
              >
                Delete contact
              </button>
            </li>
          </>
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
