import { useEffect } from 'react'
import Title from '../components/Title'
import { Outlet } from 'react-router-dom'

function Blog() {

  const storedPosts = localStorage.getItem('posts');

  useEffect(() => {
    if(!storedPosts){
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('posts', JSON.stringify(data))
        })
    }
  }, [storedPosts])

  const posts = storedPosts ? JSON.parse(storedPosts) : [];
  return (
    <>
      <h1>Blog</h1>
      {posts.map((post: { userId: number, id: number, title:string, body: string }) => (
        <>
        <Title id={post.id} title={post.title} />
        <Outlet />
        </>
      ))}
    </>
  )
}

export default Blog
