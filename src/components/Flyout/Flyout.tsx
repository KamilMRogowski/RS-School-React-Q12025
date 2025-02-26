import styles from './Flyout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { clearSelectedItems } from '../../store/slices/selectedItemsSlice';
import generateCSV from '../../utils/generateCSV';

export default function Flyout() {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => {
    return state.selectedItems.SelectedItems;
  });

  const handleUnselectAll = () => {
    dispatch(clearSelectedItems());
  };

  if (selectedItems.length) {
    return (
      <div className={styles.flyout}>
        <p className={styles.flyout__text}>
          {`${String(selectedItems.length)} item${selectedItems.length > 1 ? 's' : ''} selected`}
        </p>
        <div className={styles.flyout__buttons}>
          <button className="main-button" onClick={handleUnselectAll}>
            Unselect All
          </button>
          <a
            href={generateCSV(selectedItems)}
            download={`${String(selectedItems.length)}_pokemon.csv`}
            className="main-button"
          >
            Download
          </a>
        </div>
      </div>
    );
  }
}
