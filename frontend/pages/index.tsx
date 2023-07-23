import '../styles/style.css';
import Layout from './layout'; // layout.tsxをインポート


export default function Home() {
    return (
      <Layout>
      <div>
        <ul>
          <li>記事1</li>
          <li>記事2</li>
          <li>記事3</li>
        </ul>
      </div>

      </Layout>

    )
  }
