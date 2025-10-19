'use client';
import { error } from 'console';
import css from './error.module.css';

interface Props {
  message?: string;
  error: Error;
  reset: () => void;
}

const ErrorMessage = ({ message = 'Failed to load notes', reset }: Props) => {
  return (
    <>
      <p className={css.text} role="alert">
        {message}
      </p>
      <button className={css.button} onClick={reset}>
        <b>Try again</b>
      </button>
    </>
  );
};

export default ErrorMessage;
