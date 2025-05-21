import { Link } from "react-router-dom";

function Home() {
    return (
      <>
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-12 bg-pink-50 mt-10 pt-20">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold text-gray-700 mb-4">
              Fresh Blooms Delivered To Your Doorstep.
            </h2>
            <p className="text-gray-600 mb-6">
              Discover a curated selection of seasonal flowers perfect for every occasion.
            </p>
            <div className="flex items-center">
              <Link to="/signup" className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-500">
                Sign Up Now
              </Link>
              <img className="w-20 h-15 ml-4" src="cart0.png" alt="FloraCart Logo" />
            </div>
          </div>
          <img src="florals.jpg" alt="Flowers" className="w-full md:w-1/2 rounded-lg shadow-lg" />
        </section>
  
        {/* About Section */}
        <section id="about" className="bg-white px-6 py-20 text-center">
          <div className="mb-16">
            <i className="fa-solid fa-earth-americas fa-2xl" style={{ color: "#db2778" }}></i>
            <h1 className="font-bold mt-3 text-[#374152] text-xl">Online Shopping</h1>
            <p className="text-sm mt-3">Stay Home and Shop online</p>
          </div>
  
          <div className="mb-16">
            <i className="fa-solid fa-house fa-2xl" style={{ color: "#db2778" }}></i>
            <h1 className="font-bold mt-3 text-[#374152] text-xl">Home Delivery</h1>
            <p className="text-sm mt-3">Free and Fast Delivery</p>
          </div>
  
          <div>
            <h3 className="text-3xl font-bold text-pink-600 mb-4">About Us</h3>
            <p className="text-gray-700 max-w-3xl mx-auto">
              At <span className="font-semibold">FloraCart</span>, we believe that flowers speak the language of love, joy, and celebration.
              We're committed to bringing you the freshest, most beautiful floral arrangements for every occasion.
              Our carefully selected blooms are handpicked to make every moment special.
            </p>
          </div>
        </section>
      </>
    );
  }
  
  export default Home;
  