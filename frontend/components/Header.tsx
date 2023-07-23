import Image from 'next/image';
import "../styles/header.css";

const Header = () => {
    return (
        <header className="header_body">
        <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
            />
        </header>
    )
  };
  
  export default Header;