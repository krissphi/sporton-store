"use client";

import { useCartStore } from "@/app/hooks/use-cart-store";
import { transactionCheckout } from "@/app/services/transaction.services";
import PriceFormatter from "@/app/utils/price-formatter";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import Button from "../ui/button";
import CardWithHeader from "../ui/card-with-header";
import FileUpload from "../ui/file-upload";

const PaymentSteps = () => {
  const { push } = useRouter();
  const { customerInfo } = useCartStore();
  const [file, setFile] = useState<File | null>(null);

  const { items } = useCartStore();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handleConfirmPayment = async () => {
    if (!file) {
      alert("Please upload the payment receipt.");
      return;
    }

    if (!customerInfo) {
      alert("Customer information is missing, please go back to checkout.");
      push("/checkout");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("customerName", customerInfo.customerName);
      formData.append("customerContact", customerInfo.customerContact);
      formData.append("customerAddress", customerInfo.customerAddress);
      formData.append(
        "purchaseItems",
        JSON.stringify(
          items.map((item) => ({
            productId: item._id,
            quantity: item.qty,
          }))
        )
      );
      formData.append("totalPayment", totalPrice.toString());

      const res = await transactionCheckout(formData);
      alert("Payment confirmed! Your transaction ID is: " + res._id);
      push(`/order-status/${res._id}`);
    } catch (error) {
      console.log("Error confirming payment:", error);
    }
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
          <FileUpload onFileSelect={setFile} />
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
            onClick={handleConfirmPayment}
          >
            <FiCheckCircle /> Upload Receipt & Confirm
          </Button>
        </div>
      </div>
    </CardWithHeader>
  );
};

export default PaymentSteps;
