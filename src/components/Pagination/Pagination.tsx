import './Pagination.scss';
import { useParams, Link } from 'react-router';

export default function Pagination() {
  const { pageId } = useParams();
  const currentPage = Number(pageId) || 1;
  return (
    <div className="pagination">
      <Link
        aria-disabled={currentPage === 1}
        className={`main-button ${currentPage === 1 ? 'disabled' : ''}`}
        to={`/page/${String(currentPage - 1)}`}
      >
        Previous Page
      </Link>
      {currentPage - 1 > 0 && (
        <Link className="main-button" to={`/page/${String(currentPage - 1)}`}>
          {currentPage - 1}
        </Link>
      )}
      <div className="main-button current" data-testid="current-page">
        {currentPage}
      </div>
      <Link className="main-button" to={`/page/${String(currentPage + 1)}`}>
        {currentPage + 1}
      </Link>
      <Link className="main-button" to={`/page/${String(currentPage + 1)}`}>
        Next Page
      </Link>
    </div>
  );
}
