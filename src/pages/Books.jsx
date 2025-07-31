import { useEffect, useState } from 'react';
import axios from 'axios';

function Books({ currentUser, setCurrentUser }) {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadAllBooks = async () => {
      try {
        const response = await axios('http://localhost:3000/books');
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching all books:", error);
      }
    };
    loadAllBooks();
  }, []);

  useEffect(() => {
    if (books.length === 0) {
      return;
    }

    const updatebookWithCartStatus = async () => {
      let newBooksState = [];

      if (!currentUser) {
        newBooksState = books.map(books => ({
          ...books,
          isBooksInCart: false,
          quantity: 0,
          cartId: undefined
        }));
      } else {
        try {
          const userRes = await axios.get(`http://localhost:3000/users/${currentUser.id}`);
          const userCart = userRes.data.cart || [];

          newBooksState = books.map(book => {
            const cartItem = userCart.find(item => item.productId === book.id);
            return cartItem
              ? { ...book, isBookInCart: true, quantity: cartItem.quantity, cartId: cartItem.id }
              : { ...book, isBookInCart: false, quantity: 0 };
          });

          setCurrentUser(prevUser => {
            const isCartChanged = JSON.stringify(prevUser?.cart) !== JSON.stringify(userCart);
            if (isCartChanged) {
              return { ...prevUser, cart: userCart };
            }
            return prevUser;
          });

        } catch (error) {
          console.error("Error fetching user cart:", error);
          if (error.response && error.response.status === 404) {
            localStorage.removeItem('storyheavenUser');
            setCurrentUser(null);
          }
          return;
        }
      }

      const isBooksStateDifferent = books.some((book, index) => {
        const newBook = newBooksState[index];
        return (
          book.isBookInCart !== newBook.isBookInCart ||
          book.quantity !== newBook.quantity ||
          book.cartId !== newBook.cartId
        );
      });

      if (isBooksStateDifferent || books.length !== newBooksState.length) {
        setBooks(newBooksState);
      }
    };

    updatebookWithCartStatus();
  }, [currentUser, books]);

  const generateCartItemId = () => Math.random().toString(36).substring(2, 8);

  const addToCart = async (book) => {
    if (!currentUser) return alert('Please login to add items to cart.');
    try {
      const updatedCart = [...(currentUser.cart || []), {
        id: generateCartItemId(),
        productId: book.id,
        name: book.name,
        quantity: 1,
        imgSrc: book.imgSrc,
        price: book.price,
        discount: book.discount
      }];

      await axios.patch(`http://localhost:3000/users/${currentUser.id}`, { cart: updatedCart });

      setBooks(prevBooks => prevBooks.map(f =>
        f.id === book.id
          ? { ...f, isBookInCart: true, quantity: 1, cartId: updatedCart.at(-1).id }
          : f
      ));
      setCurrentUser(prevUser => ({ ...prevUser, cart: updatedCart }));

    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateQuantity = async (book, increment = true) => {
    if (!currentUser) return alert('Please login.');

    const updatedCart = (currentUser.cart || []).map(item => {
      if (item.id === book.cartId) {
        let newQty = increment ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQty };
      }
      return item;
    });

    try {
      await axios.patch(`http://localhost:3000/users/${currentUser.id}`, { cart: updatedCart });

      setBooks(prevBooks => prevBooks.map(b =>
        b.id === book.id
          ? { ...b, quantity: increment ? b.quantity + 1 : Math.max(1, b.quantity - 1) }
          : b
      ));
      setCurrentUser(prevUser => ({ ...prevUser, cart: updatedCart }));

    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const getDiscountedPrice = (book) =>
    (book.price - (book.price * book.discount) / 100).toFixed();

  const categories = ['All', 'Kids', 'Comic', 'Trading', 'Romance', 'Biography & Autobiography', 'Mythology', 'Age 5-11', 'Fiction'];

  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter(b => b.category === selectedCategory);

  return (
    <div className="pt-20">
      <h1 className="text-center text-4xl font-bold text-pink-700 mb-6">Books</h1>

      <div className="flex justify-center mb-8 gap-4 flex-wrap px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border ${selectedCategory === cat
                ? 'bg-pink-600 text-white'
                : 'bg-white text-pink-600 border-pink-600'
              } hover:bg-pink-500 hover:text-white transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div id="books" className="flex gap-10 flex-wrap justify-center mb-12">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white shadow-md rounded-2xl p-4 w-72 flex flex-col justify-between h-[500px] hover:shadow-lg transition text-center"
          >
            <div>
              <img
                src={book.imgSrc}
                alt={book.name}
                className="rounded-xl h-60 w-full object-cover mb-3"
              />
              <p className="font-semibold text-lg text-pink-700">{book.name}</p>
              <p className="text-sm text-gray-600 mb-1 h-[40px] overflow-hidden">{book.description}</p>
              <p className="bg-green-100 text-green-700 w-fit mx-auto mt-2 rounded-full px-3 py-1 text-sm font-medium">
                <span className="border-r border-green-600 pe-1">
                  {book.avgRating}
                  <i className="fa-solid fa-star text-yellow-400 text-md ms-1"></i>
                </span>
                <span className="pl-2">{book.ratingCount}k</span>
              </p>
              <p className="mt-2">
                <span className="text-lg font-bold text-gray-800">₹{getDiscountedPrice(book)}</span>
                <span className="ml-2 line-through text-gray-400">₹{book.price}</span>
                <span className="ml-2 text-pink-600 font-medium">({book.discount}% OFF)</span>
              </p>
            </div>

            {book.isBookInCart ? (
              <div className="border border-gray-300 rounded-lg flex justify-between py-1 px-2 w-30 items-center my-2">
                <i
                  className="fa-solid fa-minus text-pink-600 cursor-pointer"
                  onClick={() => updateQuantity(book, false)}
                ></i>
                <span>{book.quantity}</span>
                <i
                  className="fa-solid fa-plus text-pink-600 cursor-pointer"
                  onClick={() => updateQuantity(book, true)}
                ></i>
              </div>
            ) : (
              <button
                onClick={() => addToCart(book)}
                className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-5 mt-4 rounded-xl w-full transition cursor-pointer"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;