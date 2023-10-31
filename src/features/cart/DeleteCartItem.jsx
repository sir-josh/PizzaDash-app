import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { removeFromCart } from "./cartSlice";

function DeleteCartItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(removeFromCart(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteCartItem;
