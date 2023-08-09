
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";



const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    console.log("handle submit has been called");
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.log("Stripe not found yet");
      return;
    }
    // retrievePayment(clientSecret);
    props.insertDB();

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/StudentBookings",
      },
      
    });

    console.log(result, "result");

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div>
      {/* {clientSecret.length > 0 && ( */}

      <form id="payment-form">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={!stripe}
          id="submit"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
