export async function getAllPosts() {
  const response = await fetch('http://localhost:3000/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
