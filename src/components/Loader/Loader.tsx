import './Loader.scss';
import { useDarkTheme } from '../../context/DarkThemeContext';

export default function Loader() {
  const { darkTheme } = useDarkTheme();
  return (
    <div
      data-testid="loader"
      className={`lds-roller ${darkTheme ? 'lds-roller--dark-theme' : ''}`}
    >
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
