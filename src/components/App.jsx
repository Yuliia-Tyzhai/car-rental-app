import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';

const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'));
const CatalogPage = React.lazy(() =>
  import('../pages/CatalogPage/CatalogPage')
);
const CarPage = React.lazy(() => import('../pages/CarPage/CarPage'));
const NotFoundPage = React.lazy(() =>
  import('../pages/NotFoundPage/NotFoundPage')
);

const Loader = () => <div>Loading...</div>;

function App() {
  return (
    <div>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<CarPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
