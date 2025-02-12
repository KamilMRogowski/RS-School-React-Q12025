import './Pagination.scss';
import { useParams, Link } from 'react-router';
import { useDarkTheme } from '../../context/DarkThemeContext';

export default function Pagination() {
  const { darkTheme } = useDarkTheme();
  const { pageId } = useParams();
  const currentPage = Number(pageId) || 1;
  return (
    <div className="pagination">
      <Link
        aria-disabled={currentPage === 1}
        className={`main-button ${darkTheme ? 'main-button--dark-mode' : ''} ${currentPage === 1 ? 'disabled' : ''}`}
        to={`/page/${String(currentPage - 1)}`}
      >
        Previous Page
      </Link>
      {currentPage - 1 > 0 && (
        <Link
          className={`main-button ${darkTheme ? 'main-button--dark-mode' : ''}`}
          to={`/page/${String(currentPage - 1)}`}
        >
          {currentPage - 1}
        </Link>
      )}
      <div
        className={`main-button ${darkTheme ? 'main-button--dark-mode current--dark-mode' : 'current'}`}
        data-testid="current-page"
      >
        {currentPage}
      </div>
      <Link
        className={`main-button ${darkTheme ? 'main-button--dark-mode' : ''}`}
        to={`/page/${String(currentPage + 1)}`}
      >
        {currentPage + 1}
      </Link>
      <Link
        className={`main-button ${darkTheme ? 'main-button--dark-mode' : ''}`}
        to={`/page/${String(currentPage + 1)}`}
      >
        Next Page
      </Link>
    </div>
  );
}
