import React, { ReactNode } from 'react';
import Link from 'next/link';
import Header from '../components/Header'; 
import Footer from '../components/Footer';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
        <Header/>
        {children}
        <Footer/>
  </div>
  );
};

export default Layout;
