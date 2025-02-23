import './Flyout.scss';
import { useDarkTheme } from '../../context/DarkThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { clearSelectedItems } from '../../store/slices/selectedItemsSlice';
import generateCSV from '../../utils/generateCSV';

export default function Flyout() {
  const { darkTheme } = useDarkTheme();
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => {
    return state.selectedItems.SelectedItems;
  });

  const handleUnselectAll = () => {
    dispatch(clearSelectedItems());
  };

  if (selectedItems.length) {
    return (
      <div className={`flyout ${darkTheme ? 'flyout--dark-mode' : ''}`}>
        <p className="flyout__text">
          {`${String(selectedItems.length)} item${selectedItems.length > 1 ? 's' : ''} selected`}
        </p>
        <div className="flyout__buttons">
          <button
            className={`main-button ${darkTheme ? 'main-button--dark-mode' : ''}`}
            onClick={handleUnselectAll}
          >
            Unselect All
          </button>
          <a
            href={generateCSV(selectedItems)}
            download={`${String(selectedItems.length)}_pokemon.csv`}
            className={`main-button ${darkTheme ? 'main-button--dark-mode' : ''}`}
          >
            Download
          </a>
        </div>
      </div>
    );
  }
}
