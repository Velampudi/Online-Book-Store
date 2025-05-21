import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

function Checkout({ currentUser }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactNumber: '',
  });

  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      email: currentUser?.email || 'Not logged in',
      name: formData.name,
      address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      contactNumber: formData.contactNumber,
      orderId: orderId,
      cartItems: (currentUser?.cart || [])
        .map(item =>
          `${item.name} (x${item.quantity}) - ₹${item.price - (item.price * item.discount / 100)}`
        ).join('\n'),
      totalAmount: (currentUser?.cart || []).reduce((acc, item) =>
        acc + item.quantity * (item.price - (item.price * item.discount / 100)), 0).toFixed(2)
    };

    emailjs.send('service_13hrm7l', 'template_336il8s', templateParams, 'H2C94h6i63OZ1NjXB')
      .then(() => {
        navigate('/orderconfirmation');
      }).catch(error => {
        console.error('EmailJS error:', error);
        alert('Something went wrong while placing the order.');
      });
  };



  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-20 rounded shadow-md">
      <h2 className="text-2xl font-bold text-pink-700 mb-4 text-center">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} required placeholder="Full Name" className="w-full border p-2 rounded focus:outline-none" />
        <input name="address" onChange={handleChange} required placeholder="Flat, House no., Apartment, Area, Street" className="w-full border p-2 rounded focus:outline-none" />
        <input name="city" onChange={handleChange} required placeholder="City" className="w-full border p-2 rounded focus:outline-none" />
        <input name="state" onChange={handleChange} required placeholder="State" className="w-full border p-2 rounded focus:outline-none" />
        <input name="pincode" onChange={handleChange} required placeholder="Pincode" className="w-full border p-2 rounded focus:outline-none" type='tel' pattern="[0-9]{6}" maxLength={6} />
        <input name="contactNumber" onChange={handleChange} required placeholder="Contact Number" className="w-full border p-2 rounded focus:outline-none"  type="tel" pattern="[0-9]{10}" maxLength={10} />



      <button className="w-full bg-pink-600 text-white py-3 mt-4 rounded-md hover:bg-pink-700 cursor-pointer">
        Place Order
      </button>
      </form>
    </div>
  );
}

export default Checkout;
