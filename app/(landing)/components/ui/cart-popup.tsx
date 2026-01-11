import PriceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import Button from "./button";

export const cartList = [
  {
    name: "SportsOn Product 1",
    category: "Running",
    price: 450000,
    qty: 2,
    imgUrl: "product-1.png",
  },
  {
    name: "SportsOn Product 2",
    category: "Tennis",
    price: 250000,
    qty: 3,
    imgUrl: "product-2.png",
  },
  {
    name: "SportsOn Product 3",
    category: "Running",
    price: 230000,
    qty: 1,
    imgUrl: "product-3.png",
  },
  {
    name: "SportsOn Product 3",
    category: "Running",
    price: 230000,
    qty: 1,
    imgUrl: "product-3.png",
  },
];

const CartPopup = () => {
  const { push } = useRouter();
  const totalPrice = cartList.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const goToCheckout = () => {
    push("/checkout");
  };

  return (
    <div className="absolute bg-white right-0 top-12 shadow-xl shadow-black/10 border border-gray-200 w-90 z-10">
      <div className="p-4 border-b border-gray-200 font-bold text-center">
        Shopping Cart
      </div>
      {cartList.map((cartItem, index) => (
        <div key={index} className="border-b border-gray-200 p-4 flex gap-3">
          <div className="bg-primary-light aspect-square w-16 flex justify-center items-center">
            <Image
              src={`/images/products/${cartItem.imgUrl}`}
              alt={cartItem.name}
              width={63}
              height={63}
              className="aspect-square object-contain"
            />
          </div>
          <div className="self-center">
            <div className="text-sm font-medium">{cartItem.name}</div>
            <div className="flex gap-3 font-medium text-xs">
              <div>{cartItem.qty}x</div>
              <div className="text-primary">
                {PriceFormatter(cartItem.price)}
              </div>
            </div>
          </div>
          <Button
            size="small"
            variant="ghost"
            className="self-center ml-auto w-7 h-7 p-0!"
          >
            <FiTrash2 />
          </Button>
        </div>
      ))}
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between">
          <div className="font-semibold text-sm">Total</div>
          <div className="text-primary text-xs">
            {PriceFormatter(totalPrice)}
          </div>
        </div>
        <Button
          className="w-full mt-4"
          variant="dark"
          size="small"
          onClick={goToCheckout}
        >
          Checkout Now <FiArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default CartPopup;
