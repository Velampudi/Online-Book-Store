import { Link } from "react-router-dom";

function Home() {
    return (
      <>
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-12 bg-pink-50 mt-10 pt-20">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold text-gray-700 mb-4">
              Endless Stories Delivered to Your Imagination.
            </h2>
            <p className="text-gray-600 mb-6">
              Discover a curated collection of books across every genre — from timeless classics to modern bestsellers — perfect for every kind of reader.
            </p>
            <div className="flex items-center">
              <Link to="/signup" className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-500">
                Sign Up Now
              </Link>
              <img className="w-20 h-15 ml-4" src="storyheaven.png" alt="StoryHeaven Logo"/>
            </div>
          </div>
          <img src="Storyshop.png" alt="Books" className="w-[250px] h-[250px] md:w-[480px] md:h-[400px] rounded-lg shadow-lg" />
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
              At <span className="font-semibold">FloraCart</span>,we believe that books are more than just pages
               — they are journeys, ideas, and inspiration. Whether you're a fan of timeless classics, thrilling mysteries, 
               self-help, or the latest bestsellers, our carefully curated collection offers something for every reader.
            </p>
          </div>
        </section>
      </>
    );
  }
  
  export default Home;
  