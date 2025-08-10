import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import "react-quill/dist/quill.snow.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import ReactQuill from 'react-quill';
import toast from "react-hot-toast";

import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const {token} = useContext(AuthContext);

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleGenerateAIContent = async () => {
        if(!title) {
            toast.error("Please enter a title first for AI content suggestion generation");
            return;
        }
        console.log("Title: ", title)
        setAiLoading(true);
        try {
            const res = await api.post("/ai/generate", {title}, {
                headers: {Authorization: `Bearer ${token}`}
            });
            
            console.log("res: ", res);
            setContent(res.data.content);
            console.log("Content: ",res.data.content);
            toast.success("AI content generated!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to generate AI content");
        } finally {
            setAiLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title || !content) {
            toast.error("Please fill in all fields");
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            if(image) formData.append("image", image);

            await api.post(
                '/post/', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success("Post created successfully!");
            setTitle("");
            setContent("");
            setImage(null);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast("Error craeting post");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <input type="text" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} 
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"/>

                <label className="flex items-center gap-2 cursor-pointer">
                    <FaCloudUploadAlt size={20} />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" 
                        onChange={handleImageChange} className="hidden"/>
                    <span>{image ?  `Image name: ${image}` : "No image selected"}</span>
                </label>
                
                <div className="flex justify-between items-center">
                    <span className="font-semibold">Content</span>
                    <button type="button" onClick={handleGenerateAIContent} disabled={aiLoading} 
                        className="flex items-center gap-2 px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 cursor-pointer">
                        <FaRobot /> {aiLoading ? "Generating..." : "AI Generate"}
                    </button>
                </div>

                <ReactQuill theme="snow" value={content} 
                    onChange={setContent} className="bg-white h-40 mb-2" />

                <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 mt-16 rounded-md hover:bg-blue-600" >
                    {loading ? "Creating..." : "Create Post" }
                </button>
            </form>
        </div>
    )
}

export default CreatePost;