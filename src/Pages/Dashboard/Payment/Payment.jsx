import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    return (
        <div className="p-10 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-semibold text-center">Payment System</h1>
            </div>
            <div className=" mt-10">
                <h1 className="text-xl font-semibold">Payment Method Stripe</h1>
                <div className="mt-5">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm></CheckoutForm>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;