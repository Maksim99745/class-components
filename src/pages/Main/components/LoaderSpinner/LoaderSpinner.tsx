import styles from './LoaderSpinner.module.scss';

export default function LoaderSpinner() {
  return <div className={styles.loaderSpinner} data-testid="loader" />;
}
