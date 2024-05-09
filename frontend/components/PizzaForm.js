import React, { useRef } from 'react';
import { useSubmitOrderMutation } from '../state/pizzaApi';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setSize, setToppings, resetForm } from '../state/pizzaFormSlice';

export default function PizzaForm() {
  const state = useSelector(st => st.pizzaForm);
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const sizeRef = useRef(null);

  const [submitOrder, {
    isLoading: orderLoading,
    error: orderFailed,
  }] = useSubmitOrderMutation();

  const onSubmit = evt => {
    evt.preventDefault();
    const { fullName, size } = state;
    const toppings = ['1', '2', '3', '4', '5'].filter(topping => state[topping]);
    const order = { fullName, size, toppings };
    submitOrder(order)
      .unwrap()
      .then(() => {
        dispatch(resetForm())
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Pizza Form</h2>
      {orderLoading && <div className='pending'>Order in progress...</div>}
      {orderFailed && <div className='failure'>Order failed: {orderFailed.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={state.fullName}
            ref={nameRef}
            onChange={() => dispatch(setName(nameRef.current.value))}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" ref={sizeRef} value={state.size}
            onChange={() => dispatch(setSize(sizeRef.current.value))}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" checked={state['1']}
            onChange={() => dispatch(setToppings('1'))}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={state['2']}
            onChange={() => dispatch(setToppings('2'))}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={state['3']}
            onChange={() => dispatch(setToppings('3'))}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={state['4']}
            onChange={() => dispatch(setToppings('4'))}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={state['5']}
            onChange={() => dispatch(setToppings('5'))}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
