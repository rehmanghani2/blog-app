import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { FaCalendarAlt, FaCommentDots, FaEdit, FaUser, FaTrash } from 'react-icons/fa';

const SinglePostPage = () => {
    const { id } = useParams();
    const { user, token } = useContext(AuthContext);

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState("");

    // Fetch post + comments
         const fetchData = async (id) => {
            try {
                const postRes = await api.get(`/post/${id}`);
                setPost(postRes.data);

                const commentRes = await api.get(`/comment/post/${id}`);
                // console.log("commentRes: ", commentRes);
                setComments(commentRes.data);
            } catch (error) {
                console.log(error);
            }
        };

    useEffect(() => {     
        fetchData(id);
        // console.log("user: ", user);     
    }, [id]);

    // Handle new comment 
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if(!newComment.trim()) return;

        try {
            const res = await api.post(
                `/comment/${id}`,
                {postId: id, text: newComment},
                { headers: { Authorization: `Bearer ${token}`}}
            );
            setComments([res.data, ...comments]);
            setNewComment("");
            
        } catch (error) {
            console.log(error);
        }
    }
    // Delete comment
    // const handleDeleteComment = async (commentId) => {
    //     const res = await fetch(`/api/comment/${commentId}`, {
    //         method: "DELETE",
    //         headers: {Authorization: `Bearer ${token}`},
    //     });
    //     if(res.ok) fetchData();
    // }
    const handleDeleteComment = async (commentId) => {
        try {
            await api.delete(`/comment/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchData(id);
        } catch (error) {
            console.log("Error deleting comment: ", error);
        }
    }

    // Start edit mode
    const startEditComment = (commentId, currentText) => {
        setEditingCommentId(commentId);
        setEditText(currentText);
    }
    // Save Edited comment
    // const handelEditComment = async () => {
    //     const res = await fetch(`/api/comment/${editingCommentId}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`,
    //         },
    //         body: JSON.stringify({ text: editText}),
    //     });
    //     if(res.ok) {
    //         setEditingCommentId(null);
    //         setEditText("");
    //         fetchData();
    //     }
    // }
    const handleEditComment = async () => {
    try {
        await api.put(`/comment/${editingCommentId}`,
        { text: editText },
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
        setEditingCommentId(null);
        setEditText("");
        fetchData(id);
    } catch (error) {
        console.error("Error editing comment:", error);
    }
};

    if(!post) return <div className='text-center mt-10'>Loading...</div>

  return (
    <div className='max-w-5xl mx-auto px-4 py-8'>
      {/* POST HEADER */}
      <h1 className='text-4xl font-bold mb-4'>{post.title}</h1>
      <div className='flex flex-col items-center text-gray-500 gap-4 mb-6'>
        <span className='flex items-center gap-1'>
            <FaUser />{post.author.username}
        </span>
        <span className='flex items-center gap-1'>
            <FaCalendarAlt />{new Date(post.createdAt).toLocaleDateString()}
        </span>
        {/* POST IMAGE */}
        {post.image && (
            <img src={`http://localhost:5000${post.image}`} alt={post.title} className='w-full h-[400px] object-cover rounded-lg mb-6 shadow' />
        )}
        {/* POST BODY */}
        <div className='prose max-w-none mb-10'
            dangerouslySetInnerHTML={{ __html: post.content}}>    
        </div>
        {/* COMMENTS SECTION */}
        <h2 className='text-2xl font-semibold flex items-center gap-2 mb-4'>
            <FaCommentDots /> Comments
        </h2>
         {/* ADD COMMENT */}
         {user ? (
         <form onSubmit={handleCommentSubmit} className='mb-6'>
            <textarea
                rows="3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder='Write your comment...'
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            ></textarea>
            <button type='submit'
                className='mt-2 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
                Post Comment
            </button>
         </form>
         ): (
            // <p className='text-gray-500 mb-6'>Please log in to post a comment</p>
            <p className='text-gray-500 mb-6'>
                <Link to="/login" className='text-blue-500 underline' >
                    Log in
                </Link>{" "} 
                to leave a comment
            </p>
         )}
         {/* DISPLAY COMMENTS  - Comment List */}
         {comments.length > 0 ? (
            <div className='space-y-4'>
                {comments.map((comment) => (
                    <div key={comment._id} className='p-4 bg-gray-100 rounded-lg shadow-sm'>
                        <div className='flex items-center justify-between mb-1 gap-2'>
                            <span className='font-semibold'>{comment.user?.username}</span>
                            <span className='text-sm text-gray-500'>
                                {new Date(comment.createdAt).toLocaleString()}
                            </span>
                         </div>
                            {/* EDit Mode */}
                            {editingCommentId === comment._id ? (
                                <div>
                                    <textarea 
                                        className='w-full border p-2 rounded'
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                    <div className='mt-2 flex gap-2'>
                                        <button onClick={handleEditComment}
                                            className='px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700'>
                                            Save
                                        </button>
                                        <button onClick={() => setEditingCommentId(null)}
                                            className='px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500'>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ): (                                
                                <p className='text-gray-700'>{comment.text}</p>                            
                            )}
                        {/* </div> */}
                        {/* <p>{comment.text}</p> */}
                         {/* Edit/Delete Button         */}
                 {/* user && user._id === comment.user?._id && editingCommentId !== comment._id  */}
                    {user && user.id === comment.user?._id && editingCommentId !== comment._id && (
                        <div className='flex gap-4 mt-2'>
                            <button onClick={() => startEditComment(comment._id, comment.tetx)}
                                className='text-blue-600 flex items-center gap-1 hover:underline'>
                                <FaEdit />Edit
                            </button>
                             <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-600 flex items-center gap-1 hover:underline"
                    >
                      <FaTrash /> Delete
                    </button>
                        </div>
                    )}
                    </div>                  
                ))}
            </div>
         ): (
            <p className='text-gray-500'>No comments yet</p>
         )}
      </div>     
    </div>
  )
}

export default SinglePostPage
