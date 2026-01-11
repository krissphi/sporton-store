import CartItems from "../components/checkout/cart-items";
import OrdrerInformation from "../components/checkout/order-information";

const Checkout = () => {
  return (
    <main className="bg-gray-100 min-h-[80vh]">
      <div className="max-w-5xl mx-auto py-20">
        <h1 className="text-5xl font-bold text-center mb-10">Checkout Now</h1>
        <div className="grid grid-cols-2 gap-14">
          <OrdrerInformation />
          <CartItems />
        </div>
      </div>
    </main>
  );
};

export default Checkout;
