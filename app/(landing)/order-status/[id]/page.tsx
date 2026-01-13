import { getTransactionById } from "@/app/services/transaction.services";
import OrderConfirmed from "../../components/order-status/order-confirmed";
import OrderRejected from "../../components/order-status/order-rejected";
import OrderSubmitted from "../../components/order-status/order-submitted";
import { TPageProps } from "../../product/[id]/page";

const OrderStatus = async ({ params }: TPageProps) => {
  const { id } = await params;
  const transaction = await getTransactionById(id);

  return (
    <main className="bg-gray-100 min-h-[80vh]">
      <div className="max-w-5xl mx-auto py-20">
        <h1 className="text-5xl font-bold text-center mb-10">Order Status</h1>
        {transaction.status === "paid" && <OrderConfirmed />}
        {transaction.status === "pending" && <OrderSubmitted />}
        {transaction.status === "rejected" && <OrderRejected />}
      </div>
    </main>
  );
};

export default OrderStatus;
