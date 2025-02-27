import { useRouter } from 'next/router';
import styles from './Pagination.module.scss';
import Link from 'next/link';

export default function Pagination() {
  const router = useRouter();
  const pageId = router.query.pageId as string;
  const currentPage = Number(pageId) || 1;
  return (
    <div className={styles.pagination}>
      <Link
        aria-disabled={currentPage === 1}
        className={`main-button ${currentPage === 1 ? styles.disabled : ''}`}
        href={`/page/${String(currentPage - 1)}`}
      >
        Previous Page
      </Link>
      {currentPage - 1 > 0 && (
        <Link className="main-button" href={`/page/${String(currentPage - 1)}`}>
          {currentPage - 1}
        </Link>
      )}
      <div
        className={`main-button ${styles.current}`}
        data-testid="current-page"
      >
        {currentPage}
      </div>
      <Link className="main-button" href={`/page/${String(currentPage + 1)}`}>
        {currentPage + 1}
      </Link>
      <Link className="main-button" href={`/page/${String(currentPage + 1)}`}>
        Next Page
      </Link>
    </div>
  );
}
