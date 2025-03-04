import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div data-testid="loader" className={styles.ldsRoller}>
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
