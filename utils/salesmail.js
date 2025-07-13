import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderConfirmationEmail = async ({ to, paymentId, orderId, total, address, items }) => {
  const itemList = items.map(
    (item) => `<li>${item.name} (${item.netwt}) × ${item.quantity}</li>`
  ).join("");

  const mailOptions = {
    from: `"Manasa Spices" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Order Confirmation - ${orderId}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <div style="padding: 20px; border-bottom: 1px solid #eee;">
            <h2 style="color: #d35400; margin-bottom: 0;">Order Confirmed!</h2>
            <p style="margin-top: 5px;">Thank you for shopping with <strong>Manasa Spices</strong>.</p>
          </div>
          <div style="padding: 20px;">
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Payment ID:</strong> ${paymentId}</p>
            <p><strong>Total Amount:</strong> <span style="color: #27ae60; font-weight: bold;">₹${total}</span></p>
            
            <h3 style="margin-top: 30px;">Shipping Address</h3>
            <p style="margin: 5px 0;">${address.name}</p>
            <p style="margin: 5px 0;">${address.street}</p>
            <p style="margin: 5px 0;">${address.city}, ${address.state} - ${address.zip}</p>
            <p style="margin: 5px 0;">${address.country}</p>
            <p style="margin: 5px 0;">📞 ${address.phone}</p>
            <p style="margin: 5px 0;">✉️ ${address.email}</p>
  
            <h3 style="margin-top: 30px;">Items Ordered</h3>
            <ul style="padding-left: 20px;">${itemList}</ul>
          </div>
          <div style="padding: 20px; border-top: 1px solid #eee; text-align: center; font-size: 14px; color: #888;">
            &copy; ${new Date().getFullYear()} Manasa Spices. All rights reserved.
          </div>
        </div>
      </div>
    `,
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response); 
    return { success: true, info };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
};
