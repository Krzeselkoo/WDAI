import { useState } from "react";

interface User {
    id: number;
    username: string;
    fullName: string;
}

export default function Komentarz({ id, body, postId, likes, user }: { id: number, body: string, postId: number, likes: number, user: User }) {
    const [likeCount, setLikeCount] = useState(likes);

    return (
        <>
        <h2 style={{ textAlign:"left", margin: "0px" }}>{id +"." + postId}</h2>
        <div style={{ width: "40%", display: "flex", flexDirection: "column", justifyContent: "left", alignItems: "left", border: "1px solid black", padding: "10px", margin: "10px" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-between" , alignContent: "center" }}>
                    <div> 
                        <h3 style={{ textAlign:"left", margin: "0px" }}>{user.username+" #"+user.id}</h3>
                        <h4 style={{ textAlign:"left", margin: "0px" }}>{"(" + user.fullName + ")"}</h4>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ marginRight: "50px" }}>{likeCount}</p>
                        <button
                            style={{ textAlign:"center", height:"40px", backgroundColor: "white", color: "black", border: "none", borderRadius: "5px" }}
                            onClick={() => setLikeCount(likeCount + 1)}>Like!</button>
                    </div>
            </div>
            <p style={{ textAlign: "left", lineHeight: "32px", borderTop: "1px solid black", borderBottom: "1px solid black" }}>{body}</p>
            
        </div>
        </>
    );
}