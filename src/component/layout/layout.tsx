import React, { ReactNode } from 'react';
import Header from '../header/header';
import './layout.css';

interface LayoutProps {
  children: ReactNode;
}

// Layout component to wrap the header and the main content
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='main-content'>
        {children}
      </div>
    </div>
  );
};

export default Layout;