"use client";

import { CustomerInfo } from "@/app/hooks/use-cart-store";
import React from "react";
import CardWithHeader from "../ui/card-with-header";

type TOrderInformationProps = {
  formData: CustomerInfo;
  setFormData: React.Dispatch<React.SetStateAction<CustomerInfo>>;
};

const OrderInformation = ({
  formData,
  setFormData,
}: TOrderInformationProps) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <CardWithHeader title="Order Information">
      <div className="p-5">
        <div className="input-group">
          <label htmlFor="customerName">Full Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            placeholder="Type your full name"
            value={formData.customerName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="customerContact">Whatsapp Number</label>
          <input
            type="text"
            id="customerContact"
            name="customerContact"
            placeholder="+62xxxxxxxxx"
            value={formData.customerContact}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="customerAddress">Shipping address</label>
          <textarea
            id="customerAddress"
            name="customerAddress"
            placeholder="Example Street, 18, West Jakarta, Indonesia, 66521"
            rows={7}
            value={formData.customerAddress}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </CardWithHeader>
  );
};

export default OrderInformation;
