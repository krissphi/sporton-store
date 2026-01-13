import { getAllBank } from "@/app/services/bank.service";
import { FiCreditCard } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";

const PaymentOptions = async () => {
  const banks = await getAllBank();

  return (
    <CardWithHeader title="Payment Options">
      {banks.map((bank) => (
        <div key={bank._id} className="flex gap-5 p-5 border-b border-gray-100">
          <div className="bg-blue-100 p-4 text-blue-500 aspect-square h-fit self-center">
            <FiCreditCard />
          </div>
          <div className="self-center">
            <div className="font-bold">{bank.bankName}</div>
            <div className="text-sm">{bank.accountNumber}</div>
            <div className="text-sm opacity-70">{bank.accountName}</div>
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
