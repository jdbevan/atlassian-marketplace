import logo from './logo.svg';
import './App.css';
import React from 'react';
import { safeFetch } from './lib/fetch';
import { getOrElse } from 'fp-ts/lib/Either';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

type Product = {
  name: string;
  key: string;
  summary: string;
};

type Products = {
  count: number;
  _embedded: {
    products: Product[]
  }
};

const noProducts: Products = {
  count: 0,
  _embedded: {
    products: []
  }
};

(() => {
  safeFetch<Products>('https://marketplace.atlassian.com/rest/2/products')
    .then(either => {
      const products = getOrElse(() => noProducts)(either);
      console.log(products);
    });
})();

export default App;
