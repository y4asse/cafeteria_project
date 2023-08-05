export async function getAllPosts() {
    const response = await fetch("https://localhost:3000/posts",{
        method: "Get",    
    })
    const data = await response.json();
    return data;
}