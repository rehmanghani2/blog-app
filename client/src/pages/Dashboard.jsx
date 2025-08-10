import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import api from "../utils/axios.js";

export default function Dashboard() {
    const {user, token} = useContext(AuthContext);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if(!token) navigate("/login");
        console.log("User is: ", user);
        const fetchUserPosts = async () => {
            try {
                const res = await api.get(`/post/user/${user.id}`, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
        }
        fetchUserPosts();
    }, [token, user, navigate]);

    const deletePost = async (postId) => {
        if(!window.confirm("Are you want to delete this post?")) return;
        try {
            await api.delete(`/post/${postId}`, {
                headers: { Authorization: `Bearer ${token}`}
            });
            setPosts(posts.filter((post) => post._id !== postId));
        } catch (error) {
            console.error("Error deleting post: ", error);
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button onClick={() => navigate("/create-post")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                    <FaPlus />New Post
                </button>
            </div>
            { posts.length === 0 ? (
                <p className="text-gray-500">You haven't created any posts yet.</p>
            ) : (
                <div className="space-y-4">
                    { posts.map((post) => (
                        <div key={post._id}
                            className="border p-4 rounded-lg shadow-sm flex justify-between items-center">              
                            <div>
                                <h2 className="text-xl font-semibold">{post.title}</h2>
                                <p className="text-gray-500 text-sm">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => navigate(`/edit-post/${post._id}`)}
                                    className="text-yellow-500 hover:text-yellow-600">
                                    <FaEdit size={18} />
                                </button>
                                <button onClick={() => deletePost(post._id)}
                                    className="text-red-500 hover:text-red-600">
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        </div>
                    )
                    )}
                </div>  
            )}

        </div>
    )
}