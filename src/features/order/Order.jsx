// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher(); //This is used to fetch data from another component file

  useEffect(
    function () {
      //fetch data from menu page when fetcher state is idle and haven't fetch any data
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  console.log(fetcher.data);
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #${id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span
              className="rounded-full bg-red-500 to-red-50 px-3 py-1 
			text-sm font-semibold uppercase tracking-wide"
            >
              Priority
            </span>
          )}
          <span
            className="tracking-wid rounded-full bg-green-500 to-green-50 px-3 
			py-1 text-sm font-semibold uppercase"
          >
            {status} order
          </span>
        </div>
      </div>

      <div
        className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 
		px-7 py-5"
      >
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className=" divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId)?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <ptext-sm font-medium text-stone-600>
            Price priority: {formatCurrency(priorityPrice)}
          </ptext-sm>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

//eslint-disable-next-line
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
