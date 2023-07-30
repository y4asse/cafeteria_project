import React, {ReactNode} from 'react';
import Footer from '../components/Footer';
import {ChakraProvider} from '@chakra-ui/react';
import Header from '@/components/Header';
interface LayoutProps {
  children: ReactNode;
}

// それぞれのページの共有部分
const Layout: React.FC<LayoutProps> = ({children}) => {
  const MemoizedHeader = React.memo(Header);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateColumns: '100%',
        minHeight: '100vh',
      }}
    >
      <ChakraProvider>
        <MemoizedHeader />
        {children}
        <Footer />
      </ChakraProvider>
    </div>
  );
};

export default Layout;
