import { Link } from "react-router-dom"

export default function Title({ id, title }: { id: number, title: string }) {

    return (
        <>
            <Link to={`/article/${id}`}>
                <h3 style={{textAlign:"left"}}>{id+". "+title}</h3>
            </Link>
        </>
    );
}