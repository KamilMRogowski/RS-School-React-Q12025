import { Route, Routes } from 'react-router';
import HomePage from './views/Homepage/Homepage';
import ReactHookForm from './components/ReactHookForm';
import UncontrolledForm from './components/UncontrolledForm';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/react-hook-form" element={<ReactHookForm />} />
      </Route>
    </Routes>
  );
}
