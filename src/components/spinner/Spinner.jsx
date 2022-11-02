import ReactDOM from 'react-dom';

import './Spinner.scss';
import spinnerImg from '../../assets/spinner.gif';

const Spinner = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
      <div className='spinner'>
        <img src={spinnerImg} alt='Loading...'></img>
      </div>
    </div>,
    document.getElementById('spinner')
  );
};

export default Spinner;
