import React, { useState } from 'react';
import { connect } from 'react-redux';
import './App.css';

const CounterComponent = ({ count, increment, decrement }) => {
  const [subscribed, setSubscribed] = useState(true);
  const [secondPanelDisabled, setSecondPanelDisabled] = useState(false);

  const handleUnsubscribe = () => {
    setSubscribed(false);
    setSecondPanelDisabled(true); // Ikkinchi divni ishlamay qilish
  };

  const handleSubscribe = () => {
    setSubscribed(true);
    setSecondPanelDisabled(false); // Ikkinchi divni qayta ishlash
  };

  const handleButtonClick = (e) => {
    if (!subscribed) return; // Faqatgina obuna bo'lgan holatda ishlaydi
    // Bosilgan tugmani aniqlash
    const buttonType = e.target.getAttribute('data-type');
    if (buttonType === 'increment') {
      increment();
    } else if (buttonType === 'decrement') {
      decrement();
    }
  };

  return (
    <div className='container'>
      <div className={`panel ${!subscribed ? 'disabled' : ''}`}>
        {subscribed && (
          <div>
            <div className='text'>{count}</div>
            <div className='btn'>
              <button onClick={handleButtonClick} data-type="increment">Increment (+)</button>
              <button onClick={handleButtonClick} data-type="decrement">Decrement (-)</button>
            </div>
          </div>
        )}

        <div>
          <button onClick={subscribed ? handleUnsubscribe : handleSubscribe}>
            {subscribed ? 'Unsubscribe' : 'Subscribe'}
          </button>
        </div>
      </div>

      <div className={`panel ${secondPanelDisabled ? 'disabled' : ''}`}>
        {subscribed && (
          <div>
            <div className='text'>{count}</div>
            <div className='btn'>
              <button onClick={handleButtonClick} data-type="increment">Increment (+)</button>
              <button onClick={handleButtonClick} data-type="decrement">Decrement (-)</button>
            </div>
          </div>
        )}

        <div>
          <button onClick={subscribed ? handleUnsubscribe : handleSubscribe}>
            {subscribed ? 'Unsubscribe' : 'Subscribe'}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
