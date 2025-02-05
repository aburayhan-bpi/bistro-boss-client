import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  //   const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const { user } = useAuth();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  console.log(totalPrice);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error.message);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      //   card.clear();
      setError("");
      setMessage("");
    }

    // confirm payment

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "annonymouse",
            name: user?.displayName || "annonymouse",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
      setError(confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      setMessage(paymentIntent.status);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const paymentData = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.menuId),
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", paymentData);
        console.log("payment saved", res);
        if (res.data?.result?.insertedId) {
          navigate("/dashboard/payment-history");
          refetch();
          Swal.fire({
            title: "Payment success!",
            text: "Thanks for payment!",
            icon: "success",
          });
        }
        // if (res.data.result.insertedId && deletedCount > 0) {
        // }
      }
    }
  };

  return (
    <div>
      <div className="max-w-xs mx-auto mt-10 border border-yellow-700 p-6 rounded-lg shadow-lg bg-white">
        <form onSubmit={handleSubmit}>
          {/* Wrapper for CardElement */}
          <div className="border border-gray-300 rounded-md p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1A202C", // Matches Tailwind's text-gray-900
                    fontFamily: "'Inter', sans-serif",
                    "::placeholder": {
                      color: "#A0AEC0", // Matches Tailwind's text-gray-400
                    },
                  },
                  invalid: {
                    color: "#E53E3E", // Matches Tailwind's text-red-500
                  },
                },
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            className="btn w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
          {error && (
            <p className="p-1 rounded-md bg-red-100 text-red-500 text-xs mt-2">
              {error}
            </p>
          )}
          {message && (
            <p className="p-1 rounded-md bg-green-100 text-green-500 text-xs mt-2">
              {message}
            </p>
          )}
          {transactionId && (
            <p className="p-1 rounded-md bg-green-100 text-green-500 text-xs mt-2">
              Your trx Id: {transactionId}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
