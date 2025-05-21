import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar({ currentUser, setCurrentUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('floracartUser');
    setCurrentUser(null);
    navigate('/');
  };

  const handleScroll = (id) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="bg-pink-100 shadow p-4 fixed w-full z-10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img className="w-13 h-10" src="cart0.png" alt="FloraCart Logo" />
          <h1 className="text-2xl font-bold text-pink-600">FloraCart</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
          <Link to="/" className="hover:text-pink-600">Home</Link>
          <button onClick={() => handleScroll('about')} className="hover:text-pink-600">About</button>
          <Link to="/Flowers" className="hover:text-pink-600">Shop</Link>
          <Link to="/cart" className="hover:text-pink-600">Cart</Link>
          <button onClick={() => handleScroll('footer')} className="hover:text-pink-600">Contact</button>
          {currentUser ? (
            <>
              <span className="text-pink-600">Hello, {currentUser.username}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-pink-600">Login</Link>
          )}
        </nav>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            className="text-2xl text-pink-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-pink-50 p-4 mt-2 shadow rounded-lg space-y-3 text-gray-700 font-medium text-center">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block hover:text-pink-600">Home</Link>
          <button onClick={() => handleScroll('about')} className="block w-full hover:text-pink-600">About</button>
          <Link to="/Flowers" onClick={() => setIsMenuOpen(false)} className="block hover:text-pink-600">Shop</Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block hover:text-pink-600">Cart</Link>
          <button onClick={() => handleScroll('footer')} className="block w-full hover:text-pink-600">Contact</button>
          {currentUser ? (
            <>
              <span className="block text-pink-600">Hello, {currentUser.username}</span>
              <button
                onClick={handleLogout}
                className="w-full mt-2 bg-pink-600 text-white py-1 rounded hover:bg-pink-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block hover:text-pink-600">Login</Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
