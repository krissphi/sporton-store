"use client";

import { useCartStore } from "@/app/hooks/use-cart-store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import CartPopup from "../ui/cart-popup";

const Header = () => {
  const { items } = useCartStore();

  const totalItem = items.length;

  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("#hero-section");

  const activeStyle =
    "relative after:content-[''] after:block after:bg-primary after:rounded-full after:h-0.75 after:w-1/2 after:absolute after:left-1/2 after:-translate-x-1/2 after:translate-y-1";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Category", href: "#category-section" },
    { name: "Explore Products", href: "#products-section" },
  ];

  return (
    <header className="fixed w-full z-20 backdrop-blur-xl bg-white/50">
      <div className="flex justify-between gap-10 container mx-auto px-4 py-5">
        <Link href={"/"}>
          <Image
            src="/images/logo-1.svg"
            alt="sporton logo"
            width={127}
            height={20}
          />
        </Link>
        <nav className="flex gap-24 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setActiveNav(link.href)}
              className={
                activeNav === link.href
                  ? activeStyle
                  : "text-gray-600 hover:text-primary transition"
              }
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="relative flex gap-10">
          <FiSearch size={24} />
          <button
            className="relative cursor-pointer"
            onClick={() => setIsCartPopupOpen(!isCartPopupOpen)}
          >
            <FiShoppingBag size={24} />
            <div className="bg-primary rounded-full w-3.5 h-3.5 absolute -top-1 -right-1 text-[10px] text-white text-center">
              {totalItem}
            </div>
          </button>
          {isCartPopupOpen && <CartPopup />}
        </div>
      </div>
    </header>
  );
};

export default Header;
