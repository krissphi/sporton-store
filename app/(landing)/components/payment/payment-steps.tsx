"use client";

import PriceFormatter from "@/app/utils/price-formatter";
import { useRouter } from "next/navigation";
import { FiCheckCircle } from "react-icons/fi";
import Button from "../ui/button";
import CardWithHeader from "../ui/card-with-header";
import { cartList } from "../ui/cart-popup";
import FileUpload from "../ui/file-upload";

const PaymentSteps = () => {
  const { push } = useRouter();
  const totalPrice = cartList.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const uploadAndConfirm = () => {
    push("/order-status/123");
  };

  return (
    <CardWithHeader title="Payment Steps">
      <div className="p-5">
        <ol className="list-decimal text-xs pl-2 flex flex-col gap-4">
          <li>
            Transfer the total amount of <b>Rp. 1.035.000</b> to your preferred
            bank account listed under &apos;Payment Options&apos; (BCA, Mandiri,
            or BTPN).
          </li>
          <li>
            After completing the transfer, <b> keep the payment receipt </b> or
            a screenshot of the transfer confirmation. This will be needed for
            the next step.
          </li>
          <li>
            Upload the payment receipt/screenshot using the
            <b> &apos;Upload Receipt & Confirm &apos;</b> button below to
            validate your transaction.
          </li>
        </ol>
        <div className="pt-4 pb-8">
          <FileUpload />
        </div>
        <div className="border-t border-gray-200 py-4">
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
            onClick={uploadAndConfirm}
          >
            <FiCheckCircle /> Upload Receipt & Confirm
          </Button>
        </div>
      </div>
    </CardWithHeader>
  );
};

export default PaymentSteps;
