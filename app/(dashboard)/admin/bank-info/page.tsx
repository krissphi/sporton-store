"use client";

import Button from "@/app/(landing)/components/ui/button";
import { deleteBank, getAllBanks } from "@/app/services/bank.service";
import { Bank } from "@/app/types";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankInfoModal from "../../components/bank-info/bank-info-modal";
import DeleteModal from "../../components/ui/delete-modal";

const BankInfoManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bankToDeleteId, setBankToDeleteId] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBank(null);
  };

  const handleEdit = (bank: Bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setBankToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handlDeleteConfirm = async () => {
    if (!bankToDeleteId) return;

    try {
      await deleteBank(bankToDeleteId);
      toast.success("Bank info deleted succesfully");
      setBankToDeleteId("");
      setIsDeleteModalOpen(false);
      fetchBanks();
    } catch (error) {
      console.error("Failed to delete bank info", error);
      toast.error("Failed to delete bank info ");
    }
  };

  const fetchBanks = async () => {
    try {
      const data = await getAllBanks();
      if (data) {
        setBanks(data);
      }
    } catch (error) {
      console.error("Failed to fetch bank data", error);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Bank Info Management</h1>
          <p className="opacity-50">
            Manage destination accounts for customer transfers.
          </p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={24} />
          Add Bank Account
        </Button>
      </div>
      <BankInfoList banks={banks} onEdit={handleEdit} onDelete={handleDelete} />
      <BankInfoModal
        isOpen={isModalOpen}
        onSuccess={fetchBanks}
        onClose={handleCloseModal}
        bank={selectedBank}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handlDeleteConfirm}
      />
    </div>
  );
};

export default BankInfoManagement;
