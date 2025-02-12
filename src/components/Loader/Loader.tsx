import './Loader.scss';
import { useDarkTheme } from '../../context/DarkThemeContext';

export default function Loader() {
  const { darkTheme } = useDarkTheme();
  return (
    <div className={`lds-roller ${darkTheme ? 'lds-roller--dark-theme' : ''}`}>
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
