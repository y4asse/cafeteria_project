import React, { ReactNode } from 'react';
import '../styles/style.css';
import Link from 'next/link';
import Header from '../components/Header'; 
import Footer from '../components/Footer';
import { ChakraProvider } from "@chakra-ui/react";
interface LayoutProps {
  children: ReactNode;
}

// それぞれのページの共有部分
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container">
       <ChakraProvider>
        <Header/>
        {children}
        <Footer/>
       </ChakraProvider>
  </div>
  );
};

export default Layout;
