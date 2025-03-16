import { Link, Outlet, useLocation } from 'react-router';
import './HomePage.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function HomePage() {
  const location = useLocation();
  const formData = useSelector((state: RootState) => state.formData);
  const formlocation = useSelector(
    (state: RootState) => state.formData.location
  );
  return (
    <main>
      <h1>React Forms Task</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/uncontrolled-form">Uncontrolled form</Link>
        <Link to="/react-hook-form">React Hook Form</Link>
      </nav>
      <Outlet />
      {location.pathname === '/' && (
        <>
          <h2>
            {formlocation ? `Form Data from ${formlocation}` : 'Form data'}
          </h2>
          <div className={`data-display ${formlocation ? 'updated-form' : ''}`}>
            <div className="data-row">
              <span className="label">Name:</span>
              <span className="value">{formData.data?.name || '-'}</span>
            </div>
            <div className="data-row">
              <span className="label">Age:</span>
              <span className="value">{formData.data?.age || '-'}</span>
            </div>
            <div className="data-row">
              <span className="label">Country:</span>
              <span className="value">{formData.data?.country || '-'}</span>
            </div>
            <div className="data-row">
              <span className="label">Gender:</span>
              <span className="value">
                {formData.data ? formData.data.gender : '-'}
              </span>
            </div>
            <div className="data-row">
              <span className="label">Email:</span>
              <span className="value">{formData.data?.email || '-'}</span>
            </div>
            <div className="data-row">
              <span className="label">Password:</span>
              <span className="value">
                {formData.data?.passwordForm.password || '-'}
              </span>
            </div>
            <div className="data-row">
              <span className="label">Terms Accepted:</span>
              <span className="value">
                {formData.data ? (formData.data.terms ? 'Yes' : 'No') : '-'}
              </span>
            </div>
            <div className="data-row">
              <span className="label">Picture:</span>
              <span className="value">
                {formData.data?.picture ? (
                  <img src={formData.data.picture as string} alt="Picture" />
                ) : (
                  '-'
                )}
              </span>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
