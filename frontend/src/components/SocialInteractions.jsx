import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaShareAlt, FaComment } from 'react-icons/fa';
import '../css/social.css';

const SocialInteractions = ({ item, type, onLike, onComment }) => {
    const [likes, setLikes] = useState(item.likes || 0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState(item.comments || []);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState({ user: '', comment: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleLike = async () => {
        if (liked) return; // Prevent spamming for this session (simple local check)
        setLiked(true);
        setLikes(prev => prev + 1);
        await onLike(item._id);
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: item.title,
                    text: `Check out this ${type}: ${item.title}`,
                    url: url,
                });
            } catch (err) {
                console.log('Error sharing', err);
            }
        } else {
            navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.user || !newComment.comment) return;

        setSubmitting(true);
        try {
            const addedComment = await onComment(item._id, newComment);
            setComments(addedComment.comments); // Assuming API returns updated comments list or object
            setNewComment({ user: '', comment: '' });
        } catch (err) {
            console.error(err);
            alert('Failed to post comment');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="social-interactions">
            <div className="interaction-bar">
                <button className={`like-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
                    {liked ? <FaHeart /> : <FaRegHeart />} {likes} Likes
                </button>
                <button className="comment-btn" onClick={() => setShowComments(!showComments)}>
                    <FaComment /> {comments.length} Comments
                </button>
                <button className="share-btn" onClick={handleShare}>
                    <FaShareAlt /> Share
                </button>
            </div>

            {showComments && (
                <div className="comments-section">
                    <h3>Comments</h3>
                    <ul className="comments-list">
                        {comments.length > 0 ? (
                            comments.map((c, i) => (
                                <li key={i} className="comment-item">
                                    <strong>{c.user}</strong>
                                    <span className="comment-date">{new Date(c.date).toLocaleDateString()}</span>
                                    <p>{c.comment}</p>
                                </li>
                            ))
                        ) : (
                            <p>No comments yet. Be the first!</p>
                        )}
                    </ul>

                    <form onSubmit={handleSubmitComment} className="comment-form">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={newComment.user}
                            onChange={e => setNewComment({ ...newComment, user: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Your Comment"
                            value={newComment.comment}
                            onChange={e => setNewComment({ ...newComment, comment: e.target.value })}
                            required
                        ></textarea>
                        <button type="submit" disabled={submitting}>
                            {submitting ? 'Posting...' : 'Post Comment'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SocialInteractions;
