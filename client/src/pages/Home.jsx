import { useEffect, useState } from "react";
import api from "../utils/axios.js";
import PostCard from "../components/PostCard";


export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get("/post")
            .then(res => setPosts(res.data))
            .catch(err => console.error(err));
    }, []);

    return(
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">📝 Latest Blog Posts</h1>
            <div className="grid gap-8">
                {posts.length > 0 ? (
                    posts.map(post => <PostCard key={post._id} post={post} />)
                ) : (
                    <p className="text-gray-500 text-center">No posts found.</p>
                )}
            </div>
        </div>
    );
}