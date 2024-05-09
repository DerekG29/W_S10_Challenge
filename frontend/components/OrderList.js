import React from 'react';
import { useGetOrdersQuery } from '../state/pizzaApi';
import { useSelector, useDispatch } from 'react-redux';
import { setSizeFilter } from '../state/filterSlice';

export default function OrderList() {
  const { data: orders } = useGetOrdersQuery();
  const sizeFilter = useSelector(st => st.filters.size);
  const dispatch = useDispatch();
  
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders?.filter(order => sizeFilter === 'All' || order.size === sizeFilter).map(order => {
            return (
              <li key={order.id}>
                <div>
                  {`${order.customer} ordered a size ${order.size} with ${order.toppings?.length || 'no'} topping${order.toppings?.length === 1 ? '' : 's'}`}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === sizeFilter ? ' active' : ''}`
            return <button
              onClick={() => dispatch(setSizeFilter(size))}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
