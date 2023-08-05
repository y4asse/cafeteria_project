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
  profileImageUrl: string;
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
      <div>
        {/* 投稿内容 */}
        <div className="flex-col justify-center items-center m-10 border-2 border-gray-400 rounded-2xl shadow-xl">
          {/* 投稿写真 */}
          <h1 className="text-5xl text-center my-5 ">{post.title}</h1>
          <img
            width={300}
            src={post.picture}
            alt="post-picture"
            className="bg-black shadow-2xl mx-auto"
          />
          {/* 投稿者内容 */}
          <div className="text-center p-5 mt-5 text-xl">
            <p className="text-3xl mb-3">{post.description} </p>
            <p className="mb-3">大学名: {post.university}</p>
            <p className="mb-3">
              投稿日時: {format(Date.parse(post.update_at), 'yyyy/MM/dd')}
            </p>
          </div>
        </div>

        {/* コメント */}
        <div className="flex-col justify-center items-center w-full">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border-2 border-black p-5 flex gap-3  shadow-2xl m-5 rounded-xl">
              <img
                className="w-20 h-20 rounded-full"
                src={comment.user.profileImageUrl}
                alt="comment-user-profile-profileImageUrl"
              />
              <div className=" rounded">
                <p className="font-bold">
                  {comment.user.username}
                  <span className="font-thin">
                    {format(Date.parse(comment.created_at), 'yyyy/MM/dd')}
                  </span>
                </p>
                {comment.content}
              </div>
              <br />
            </div>
          ))}

          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border-2 border-black p-5 flex gap-3  shadow-lg m-5 rounded-xl">
              <img
                className="w-20 h-20 rounded-full"
                src={comment.user.profileImageUrl}
                alt="comment-user-profile-profileImageUrl"
              />
              <div className=" rounded">
                <p className="font-bold">
                  {comment.user.username}:{' '}
                  <span className="font-thin">
                    {format(Date.parse(comment.created_at), 'yyyy/MM/dd')}
                  </span>
                </p>
                {comment.content}
              </div>
              <br />
            </div>
          ))}
        </div>
        <br />
        <br />
      </div>
    </Layout>
  );
};

export default Post;
