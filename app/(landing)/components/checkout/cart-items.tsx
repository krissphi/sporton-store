"use client";

import PriceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiCreditCard, FiTrash2 } from "react-icons/fi";
import Button from "../ui/button";
import CardWithHeader from "../ui/card-with-header";
import { cartList } from "../ui/cart-popup";

const CartItems = () => {
  const { push } = useRouter();

  const totalPrice = cartList.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const goToPayment = () => {
    push("/payment/");
  };

  return (
    <CardWithHeader title="Cart Items">
      <div className="overflow-auto max-h-75">
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
      </div>
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
          onClick={goToPayment}
        >
          <FiCreditCard /> Proceed to Payment
        </Button>
      </div>
    </CardWithHeader>
  );
};

export default CartItems;
