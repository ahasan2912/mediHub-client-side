import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../Hook/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useOrder from "../../../Hook/useOrder";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const [error, setError] = useState([]);
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [orders, refetch,] = useOrder();
    const totalPrice = orders.reduce((total, item) => total + parseInt(item.price), 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod);
            setError('');
        }
        // atar por backende gese
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email || 'anonymous',
                    name: user.displayName || 'anonymous',
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            // console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id ', paymentIntent.id)
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user?.email,
                    cName: user?.displayName,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc data convert. use moment js to 
                    orderId: orders.map(item => item._id),
                    seller: orders.map(order => order.seller),
                    medicineId: orders.map(order => order.medicineId),
                }
                const res = await axiosSecure.post('/payments', payment);
                // console.log('Payment saved', res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        title: "Thank you for the taka paisa!",
                        icon: "success",
                        draggable: true
                    });
                    navigate('/dashboard/paymentHistory')
                }
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-sm bg-blue-500 text-white my-4' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className='text-red-600'>
                {error}
            </p>
            {
                transactionId && <p className='text-green-600'>Your transaction id: {transactionId}</p>
            }
        </form>
    );
};
export default CheckoutForm;