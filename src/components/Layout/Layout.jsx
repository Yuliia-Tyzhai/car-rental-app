import React from 'react';
import { Suspense } from 'react';
import Navigation from '../Navigation/Navigation';

const Layout = ({ children }) => {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
      <Navigation />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};

export default Layout;