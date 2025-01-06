import { useEffect, useState } from "react";
import Komentarz from "./Komentarz";

interface User {
    id: number;
    username: string;
    fullName: string;
}

interface Comment {
    id: number;
    body: string; 
    postId: number; 
    likes: number; 
    user: User; 
}

export default function Komentarze(){
    const [comments, setComments] = useState<Comment[]>([]);
    useEffect(() => {
        fetch("https://dummyjson.com/comments")
            .then(response => response.json())
            .then(data => setComments(data.comments));
    }, []);

    return (
        <>
        <h2>Komentarze</h2>
        <div>
            {comments.length > 0 ? 
            comments.map((comment: Comment) => (
                <Komentarz
                    id={comment.id}
                    body={comment.body}
                    postId={comment.postId}
                    likes={comment.likes}
                    user={comment.user}
                    />
            )) : 
            <h2>Brak Komentarzy</h2>
            }
        </div>
        </>
    )
}