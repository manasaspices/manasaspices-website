import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log(process.env.RAZORPAY_KEY_ID);
console.log(process.env.RAZORPAY_KEY_SECRET);
export async function POST(req) {
  try {
    console.log('Received payment request...');
    const formData = await req.json();
    console.log('Request Body:', formData);

    if (!formData.amount) {
      console.error('Amount is required in request body');
      return new Response(JSON.stringify({ message: 'Amount is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { name, amount, orderid } = formData;
    const orderOptions = {
      amount: amount * 100, 
      currency: 'INR',
      receipt: orderid || `order_${Date.now()}`,
      payment_capture: 1,
    };

    console.log('Creating Razorpay order with options:', orderOptions);

    const order = await razorpay.orders.create(orderOptions);

    console.log('Razorpay Order Created Successfully:', order);

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error Creating Razorpay Order:', err);
    return new Response(JSON.stringify({ message: 'Error creating order', error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
