import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';

import './App.css';
import CartScreen from './screens/CartScreen';

function App() {

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  }

  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  }

  return (
    <Router>
        <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                    </button>

                    <Link to="/">amazona</Link>
                </div>

                <div className="header-links">
                    <a href="cart.html">Cart</a>
                    <a href="signin.html">Sign in</a>
                </div>
            </header>

            <aside className="sidebar">
                <h3>Shopping Categories</h3>

                <button className="sidebar-close-button" onClick={closeMenu}>x</button>

                <ul>
                    <li>
                        <a href="index.html">Pants</a>
                    </li>

                    <li>
                        <a href="index.html">Shorts</a>
                    </li>
                </ul>
            </aside>

            <main className="main">
                <div className="content">
                    <Route path="/product/:id">
                        <ProductScreen />
                    </Route>

                    <Route path="/cart/:id?">
                        <CartScreen />
                    </Route>

                    <Route exact path="/">
                        <HomeScreen />
                    </Route>
                </div>
            </main>

            <footer className="footer">
                All right reserved.
            </footer>
        </div>
    </Router>
  );
}

export default App;
