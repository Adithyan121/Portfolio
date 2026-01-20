import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaShareAlt, FaComment } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import emailjs from '@emailjs/browser';
import '../css/social.css';

const SocialInteractions = ({ item, type, onLike, onComment }) => {
    const [likes, setLikes] = useState(item.likes || 0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState(item.comments || []);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState({ user: '', comment: '' });
    const [submitting, setSubmitting] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Effect to check if this item has been liked in local storage
    React.useEffect(() => {
        const hasLiked = localStorage.getItem(`liked_${item._id}`);
        if (hasLiked) {
            setLiked(true);
        }
    }, [item._id]);

    const handleLike = async () => {
        if (liked) return;

        // Optimistic UI update
        setLiked(true);
        setLikes(prev => prev + 1);
        localStorage.setItem(`liked_${item._id}`, 'true'); // Persist like state

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

    React.useEffect(() => {
        const storedUser = sessionStorage.getItem('google_user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setCurrentUser(user);
            setNewComment(prev => ({ ...prev, user: user.name }));
        }
    }, []);

    const handleGoogleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log("Logged in user:", decoded);
        const user = {
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture
        };
        setCurrentUser(user);
        sessionStorage.setItem('google_user', JSON.stringify(user));
        setNewComment(prev => ({ ...prev, user: decoded.name }));
    };

    const handleGoogleError = () => {
        console.log('Login Failed');
        alert("Google Login Failed");
    };

    const sendThankYouEmail = (userEmail, userName, userComment) => {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID2;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        const templateParams = {
            user_name: userName,
            user_email: userEmail,
            message: userComment,
            reply_to: userEmail,
            page_title: item.title
        };

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                console.log('FAILED...', error);
            });
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.user || !newComment.comment) return;

        setSubmitting(true);
        try {
            // Prepare comment payload, including image if logged in
            const commentPayload = {
                ...newComment,
                image: currentUser ? currentUser.picture : ''
            };

            const addedComment = await onComment(item._id, commentPayload);
            setComments(addedComment.comments); // Assuming API returns updated comments list or object

            // Send thank you email if user attempts to provide an email or is logged in
            if (currentUser && currentUser.email) {
                sendThankYouEmail(currentUser.email, currentUser.name, newComment.comment);
            }

            setNewComment({ user: currentUser ? currentUser.name : '', comment: '' });
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
                            comments.filter(c => !c.hidden).map((c, i) => (
                                <li key={i} className="comment-item" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                    {c.image && (
                                        <img src={c.image} alt={c.user} style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover' }} />
                                    )}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                                            <strong>{c.user}</strong>
                                        </div>
                                        <p style={{ margin: 0 }}>{c.comment}</p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No comments yet. Be the first!</p>
                        )}
                    </ul>


                    <div className="google-login-container" style={{ marginBottom: '15px' }}>
                        {!currentUser ? (
                            <div className="login-prompt" style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', color: '#333' }}>
                                <p style={{ marginBottom: '15px', fontWeight: '500' }}>Please sign in with Google to leave a comment.</p>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleError}
                                        theme="filled_blue"
                                        size="large"
                                        shape="pill"
                                    />
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitComment} className="comment-form">
                                <div className="user-profile-display" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    {currentUser.picture && (
                                        <img
                                            src={currentUser.picture}
                                            alt={currentUser.name}
                                            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                        />
                                    )}
                                    <span style={{ fontSize: '0.9rem', color: '#666' }}>
                                        Posting as <strong>{currentUser.name}</strong>
                                    </span>
                                </div>

                                {/* Overriding the display:none above to allow editing if desired, or we can make it readOnly.
                                   Let's make it visible but pre-filled. */}
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
                        )}
                    </div>

                </div>
            )}
        </div>
    );
};

export default SocialInteractions;
