export async function getAllPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
