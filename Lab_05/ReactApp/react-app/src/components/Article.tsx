import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Article{
    id: number,
    title: string,
    body: string
  }

export default function Article() {
    const [article, setArticle] = useState<Article | null>(null)
    const { id } = useParams<{id: string}>()

    const storedPosts = localStorage.getItem('posts');

    useEffect(() => {
        if(!storedPosts){
            fetch('https://jsonplaceholder.typicode.com/posts/'+id)
                .then((response) => response.json())
                    .then((data) => {setArticle(data)})
            }
        else{
            const posts = JSON.parse(storedPosts);
            const post = posts.find((post: { id: number }) => post.id === parseInt(id!));
            setArticle(post);
        }
        }, [id, storedPosts])
    
        if (!article) {
            return <h3>Loading...</h3>;
        }

    return (
        <div style={{ minWidth: "900px"}}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-between" , alignContent: "center" }}>
                    <h2 style={{ fontSize:"40px", textAlign:"left", margin: "0px", marginRight:"10px" }}>{id +"."}</h2>
                    <h3 style={{ maxWidth:"50%", fontSize:"40px", textAlign: "left", margin: "0px" }}>{article.title}</h3>
            </div>
            <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent:"space-between" , alignContent: "center" }}>
                {article && (
                    <>
                        <p style={{minWidth:"100%", maxWidth: "100%", paddingLeft: "8px", paddingRight: "8px",fontSize:"24px", overflowWrap: 'break-word', textAlign: "left", lineHeight: "40px", borderTop: "1px solid black", borderBottom: "1px solid black" }}>{article.body}</p>
                    </>
                )}
            </div>
        </div>
    );
}