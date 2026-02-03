"use client";

import {
  getAllTransactions,
  updateTransaction,
} from "@/app/services/transaction.services";
import { Transaction } from "@/app/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify/unstyled";
import TransactionModal from "../../components/transactions/transaction-modal";
import TransactionTable from "../../components/transactions/transaction-table";

const TransactionManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setIsModalOpen(true);
    setSelectedTransaction(transaction);
  };

  const handleStatusChange = async (
    id: string,
    status: "paid" | "rejected",
  ) => {
    try {
      const formData = new FormData();
      formData.append("status", status);
      await updateTransaction(id, formData);

      toast.success("Transaction status updated");

      await fetchTransactions();
    } catch (error) {
      console.error("Failed to update transaction status", error);
      toast.error("Failed to update transaction status");
    } finally {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Transaction Management</h1>
          <p className="opacity-50">
            Verify incoming payments and manage orders.
          </p>
        </div>
      </div>
      <TransactionTable
        transactions={transactions}
        onViewDetails={handleViewDetails}
      />
      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default TransactionManagement;
