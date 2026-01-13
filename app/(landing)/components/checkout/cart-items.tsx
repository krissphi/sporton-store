"use client";

import { useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";
import PriceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { FiCreditCard, FiTrash2 } from "react-icons/fi";
import Button from "../ui/button";
import CardWithHeader from "../ui/card-with-header";

type TCartItems = {
  handlePayment?: () => void;
};

const CartItems = ({ handlePayment }: TCartItems) => {
  const { items, removeItem } = useCartStore();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <CardWithHeader title="Cart Items">
      <div className="flex flex-col justify-between h-[calc(100%-70px)]">
        <div className="overflow-auto max-h-75">
          {items.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 p-4 flex gap-3"
            >
              <div className="bg-primary-light aspect-square w-16 flex justify-center items-center">
                <Image
                  src={getImageUrl(item.imageUrl)}
                  alt={item.name}
                  width={63}
                  height={63}
                  unoptimized
                  className="aspect-square object-contain"
                />
              </div>
              <div className="self-center">
                <div className="text-sm font-medium">{item.name}</div>
                <div className="flex gap-3 font-medium text-xs">
                  <div>{item.qty}x</div>
                  <div className="text-primary">
                    {PriceFormatter(item.price)}
                  </div>
                </div>
              </div>
              <Button
                size="small"
                variant="ghost"
                className="self-center ml-auto w-7 h-7 p-0!"
                onClick={() => removeItem(item._id)}
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
            onClick={handlePayment}
          >
            <FiCreditCard /> Proceed to Payment
          </Button>
        </div>
      </div>
    </CardWithHeader>
  );
};

export default CartItems;
