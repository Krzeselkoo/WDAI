import { useState } from "react";

export default function Dodaj() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const storedPosts = localStorage.getItem('posts');
        const posts = storedPosts ? JSON.parse(storedPosts) : [];



        const newPost = { id: posts.length + 1,title, body };

        posts.push(newPost);

        localStorage.setItem('posts', JSON.stringify(posts));

        setTitle('');
        setBody('');
    };

    return (
        <>
            <h1>Add your article!</h1>
            <form style={{display: "flex", flexDirection: "column"}}onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        style={{width: "80%"}}
                    />
                </label>
                <br />
                <label>
                    <textarea
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Write your article here"
                        style={{height: "200px", width: "80%", textAlign: "left", verticalAlign: "top"}}
                    />
                </label>
                <br />
                <button type="submit">Add your article!</button>
            </form>
        </>
    )
}