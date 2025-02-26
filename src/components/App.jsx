// src/components/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Layout from './Layout/Layout';


const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const CatalogPage = lazy(() =>
  import('../pages/CatalogPage/CatalogPage')
);
const CarPage = lazy(() => import('../pages/CarPage/CarPage'));

function App() {
  
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/catalog"
            element={<CatalogPage />} />
          <Route
            path="/catalog/:id"
            element={<CarPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;