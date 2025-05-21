import { Link } from "react-router-dom";

function Footer() {
    return (
      <footer id="footer" className="bg-pink-100 text-gray-700 px-6 py-8 mt-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h4 className="text-xl font-semibold text-pink-700 mb-2">FloraCart</h4>
            <p className="text-sm">
              Delivering fresh and beautiful blooms right to your doorstep. Perfect for every occasion!
            </p>
            <img className="w-32 h-15" src="cart0.png" alt="FloraCart Logo" />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-pink-700 mb-2">Contact Us</h4>
            <p className="text-sm"><i class="fa-solid fa-location-dot"></i> Hyderabad, India</p>
            <p className="text-sm"><i class="fa-solid fa-phone"></i> +91 9390844115</p>
            <p className="text-sm"><i class="fa-solid fa-envelope"></i> support@floracart.com</p>
          </div>
  
          <div>
            <h4 className="text-lg font-semibold text-pink-700 mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <Link to="/" className="hover:text-pink-600">Home</Link><br></br>
              <Link to="/signup" className="hover:text-pink-600">Sign Up</Link><br></br>
              <Link to="/login" className="hover:text-pink-600">Login</Link>
            </ul>
          </div>
        </div>
  
        <div className="text-center text-sm text-gray-500 mt-8">
          © {new Date().getFullYear()} FloraCart. All rights reserved.
        </div>
      </footer>
    );
  }
  
  export default Footer;