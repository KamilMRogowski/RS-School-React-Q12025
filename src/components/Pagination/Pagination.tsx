import './Pagination.scss';
import { useParams, Link } from 'react-router';

export default function Pagination() {
  const { pageId } = useParams();
  const currentPage = Number(pageId) || 1;
  return (
    <div className="pagination">
      <Link
        aria-disabled={currentPage === 1}
        className={
          currentPage === 1 ? 'search-button disabled' : 'search-button'
        }
        to={`/page/${String(currentPage - 1)}`}
      >
        Previous Page
      </Link>
      {currentPage - 1 > 0 && (
        <Link className="search-button" to={`/page/${String(currentPage - 1)}`}>
          {currentPage - 1}
        </Link>
      )}
      <div className="search-button current" data-testid="current-page">
        {currentPage}
      </div>
      <Link className="search-button" to={`/page/${String(currentPage + 1)}`}>
        {currentPage + 1}
      </Link>
      <Link className="search-button" to={`/page/${String(currentPage + 1)}`}>
        Next Page
      </Link>
    </div>
  );
}
