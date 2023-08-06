import Post from '@/pages/posts/[id]';

export async function getAllPosts(): Promise<Post[] | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    return null;
  }
  return response.json();
}
