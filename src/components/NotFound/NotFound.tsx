import styles from './NotFound.module.scss';
export default function Custom404() {
  return (
    <div className={styles['not-found']}>
      <h1>404</h1>
      <h1>PAGE NOT FOUND</h1>
    </div>
  );
}
