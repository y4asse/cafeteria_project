import React, { ReactNode } from 'react';
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
    <div>
       <ChakraProvider>
        <Header/>
        {children}
        {/* <Footer/> */}
       </ChakraProvider>
  </div>
  );
};

export default Layout;
