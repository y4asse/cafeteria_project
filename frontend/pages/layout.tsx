import React, {ReactNode} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {ChakraProvider} from '@chakra-ui/react';
interface LayoutProps {
  children: ReactNode;
}

// それぞれのページの共有部分
const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateColumns: '100%',
        minHeight: '100vh',
      }}>
      <ChakraProvider>
        <Header />
        {children}
        <Footer />
      </ChakraProvider>
    </div>
  );
};

export default Layout;
