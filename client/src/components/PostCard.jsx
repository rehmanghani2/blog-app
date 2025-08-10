import { CalendarDays, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
    return(
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-3 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>

            <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span className="flex items-center"><User className="h-4 w-4 mr-1" />{post.author?.username}</span>
                <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1" />{new Date(post.createdAt).toDateString()}</span>
            </div>

            <p className="text-gray-600">{post.content.slice(0, 150)}...</p>

            <Link to={`/post/${post._id}`} className="text-blue-600 hover:underline font-semibold">
                Read More →
            </Link>
        </div>
    )
}