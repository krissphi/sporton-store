import { FiCreditCard } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";

const paymentList = [
  {
    bank_name: "BCA",
    account_number: "0123182312",
    account_holder: "John Doe",
  },
  {
    bank_name: "Mandiri",
    account_number: "83923912013203123",
    account_holder: "John Doe",
  },
  {
    bank_name: "BTPN",
    account_number: "5238218923",
    account_holder: "John Doe",
  },
];

const PaymentOptions = () => {
  return (
    <CardWithHeader title="Payment Options">
      {paymentList.map((payment, index) => (
        <div key={index} className="flex gap-5 p-5 border-b border-gray-100">
          <div className="bg-blue-100 p-4 text-blue-500 aspect-square h-fit self-center">
            <FiCreditCard />
          </div>
          <div className="self-center">
            <div className="font-bold">{payment.bank_name}</div>
            <div className="text-sm">{payment.account_number}</div>
            <div className="text-sm opacity-70">{payment.account_holder}</div>
          </div>
          <div className="ml-auto bg-blue-50 text-gray-800 text-xs h-fit self-center py-1 px-2">
            Bank Transfers
          </div>
        </div>
      ))}
    </CardWithHeader>
  );
};

export default PaymentOptions;
