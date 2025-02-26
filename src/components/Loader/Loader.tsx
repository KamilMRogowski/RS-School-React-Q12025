import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div data-testid="loader" className={styles['lds-roller']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
