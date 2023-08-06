import React from 'react';
import Layout from '../layout';
import {getAllPosts} from '@/utils/api';
import Post from './[id]';
import {format} from 'date-fns';
import {useRouter} from 'next/router';

export async function getServerSideProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

const Posts = (props: {posts: Post[] | null}) => {
  const {posts} = props;
  const router = useRouter();
  return (
    <Layout>
      <h1 className="text-5xl text-center my-5 ">投稿一覧</h1>
      <div className="grid grid-cols-2 w-2/3 mx-auto">
        {posts &&
          posts.map((post) => {
            return (
              <div
                className="flex-coljustify-center items-center m-10 border-2 border-gray-400 rounded-2xl shadow-2xl p-3 cursor-pointer"
                onClick={() => {
                  router.push(`/posts/${post.id}`);
                }}>
                {/* 投稿写真 */}
                <h1 className="text-3xl text-center my-5 ">{post.title}</h1>
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
            );
          })}
      </div>
    </Layout>
  );
};

export default Posts;
