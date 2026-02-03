"use client";

import Button from "@/app/(landing)/components/ui/button";
import {
  deleteCategory,
  getAllCategories,
} from "@/app/services/category.service";
import { Category } from "@/app/types";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import CategoryModal from "../../components/categories/category-modal";
import CategoryTable from "../../components/categories/category-table";
import DeleteModal from "../../components/ui/delete-modal";

const CategoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categoryToDeleteId, setCategoryToDeleteId] = useState("");

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategoryToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDeleteId) return;
    try {
      await deleteCategory(categoryToDeleteId);
      fetchCategories();
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category.");
    } finally {
      setIsDeleteModalOpen(false);
      setCategoryToDeleteId("");
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Category Management</h1>
          <p className="opacity-50">Organize your products into categories.</p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={24} />
          Add Category
        </Button>
      </div>
      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        category={selectedCategory}
        onSuccess={fetchCategories}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default CategoryManagement;
