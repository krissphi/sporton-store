"use client";
import Button from "@/app/(landing)/components/ui/button";
import { deleteProduct, getAllProducts } from "@/app/services/product.service";
import { Product } from "@/app/types";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import ProductModal from "../../components/products/product-modal";
import ProductTable from "../../components/products/product-table";
import DeleteModal from "../../components/ui/delete-modal";

const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDeleteId, setProductToDeleteId] = useState("");

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProductToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDeleteId) return;
    try {
      await deleteProduct(productToDeleteId);
      fetchProducts();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product.");
    } finally {
      setIsDeleteModalOpen(false);
      setProductToDeleteId("");
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Product Management</h1>
          <p className="opacity-50">Manage your inventory, prices and stock.</p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={24} />
          Add Product
        </Button>
      </div>
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ProductModal
        product={selectedProduct}
        onSuccess={fetchProducts}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ProductManagement;
