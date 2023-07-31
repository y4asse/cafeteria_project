//user登録ページ
import Layout from '../../layout';
import {Button} from '@chakra-ui/react';
import {signOut, useSession} from 'next-auth/react';
import Form1 from './form';
import Form2 from './form';

export default function Post() {
  const {data: session} = useSession();
  return (
    <Layout>
      <div>
        <Form1 />
      </div>
    </Layout>
  );
}
