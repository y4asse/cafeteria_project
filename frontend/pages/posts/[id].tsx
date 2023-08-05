import React from 'react';
import Layout from '../layout';
import {GetServerSideProps, GetStaticPaths, GetStaticProps} from 'next';
import {format} from 'date-fns';
import {Flex} from '@chakra-ui/react';

type Post = {
  id: string;
  title: string;
  description: string;
  picture: string;
  uid: string;
  university: string;
  isActive: boolean;
  update_at: string;
};

type Comment = {
  id: string;
  pid: string;
  uid: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: User;
};

type User = {
  id: string;
  username: string;
  university: string;
  image: string;
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  if (params === undefined) {
    return {
      notFound: true,
    };
  }
  const {id} = params;
  const postData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`
  );
  try {
    const post = await postData.json();
    const pid = post.id;
    const commentData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${pid}`
    );
    const comments: Comment[] = await commentData.json();
    return {
      props: {post, comments},
    };
  } catch (e) {
    //notfound
    return {
      notFound: true,
    };
  }
};

type Props = {
  post: Post;
  comments: Comment[];
};
const Post = (props: Props) => {
  const {post, comments} = props;
  return (
    <Layout>
      <Flex></Flex>
      {post.title}
      <br />
      {post.description}
      <br />
      <img src={post.picture} />
      <br />
      {post.uid}
      <br />
      {post.university}
      <br />
      {post.isActive}
      <br />
      {format(Date.parse(post.update_at), 'yyyy/MM/dd')}
      <br />
      <hr></hr>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            {comment.content}
            <br />
            {format(Date.parse(comment.created_at), 'yyyy/MM/dd')}
            <br />
            {comment.user.username}
            <br />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Post;
