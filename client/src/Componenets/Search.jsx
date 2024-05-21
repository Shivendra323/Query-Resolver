import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Search({ data }) {
    const [likes, setLikes] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [newReply, setNewReply] = useState({});
    const [showReplies, setShowReplies] = useState({});
    const [liked, setLiked] = useState(false);
    const sessionData = localStorage.getItem('session');
    const session = JSON.parse(sessionData);
    const results = Array.isArray(data) ? data : [];

    const handleLike = () => {
        if (!liked) {
            setLikes(likes + 1);
            setLiked(true);
            // Add animation here if needed
        }
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() !== '') {
            try {
                const response = await axios.post('http://localhost:3000/addComment', {
                    contents: `${session.username}: ${newComment}`,
                    postId: results[0]._id
                });
                setComments([...comments, response.data.comment]);
                setNewComment('');
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
        }
    };

    const handleShowReplies = (commentId) => {
        setShowReplies({ ...showReplies, [commentId]: !showReplies[commentId] });
    };

    const handleAddReply = (commentId) => {
        setReplyTo(commentId);
    };

    const handleReplySubmit = async (commentId) => {
        if (newReply[commentId]?.trim() !== '') {
            try {
                const response = await axios.post('http://localhost:3000/addReply', {
                    commentId,
                    contents: `${session.username}: ${newReply[commentId]}`
                });
                const updatedComments = comments.map((comment) => {
                    if (comment._id === commentId) {
                        return {
                            ...comment,
                            replies: [...comment.replies, response.data.reply]
                        };
                    }
                    return comment;
                });
                setComments(updatedComments);
                setNewReply({ ...newReply, [commentId]: '' });
                setShowReplies({ ...showReplies, [commentId]: true });
            } catch (error) {
                console.error('Error submitting reply:', error);
            }
        }
    };

    const handleKeyDown = (e, commentId) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (e.shiftKey) {
                return; // Allow multiline comments with Shift + Enter
            }
            if (showComments) {
                if (commentId) {
                    handleReplySubmit(commentId);
                } else {
                    handleCommentSubmit();
                }
            }
        }
    };

    useEffect(() => {
        if (results.length > 0 && results[0].comments) {
            setComments(results[0].comments);
        }
    }, [results]);

    return (
        <>
            {results.length === 0 ? (
                <div className="search-results">
                    <h5>No post found</h5>
                </div>
            ) : (
                results.map((post, index) => (
                    <Card key={post._id || index} className='mx-auto max-w-7xl h-auto my-3 bg-white rounded-lg shadow-lg'>
                        <Card.Header>{post.username}</Card.Header>
                        <Card.Body>
                            {post.image && <img src={post.image} className='mb-2.5 w-full h-80' />}
                            <Card.Text>{post.content}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="light" onClick={handleLike} disabled={liked}>
                                <FontAwesomeIcon icon={faThumbsUp} /> ({likes})
                            </Button>
                            <Button variant="light" onClick={toggleComments} className='ml-2'>
                                <FontAwesomeIcon icon={faComment} />
                            </Button>
                            {showComments && (
                                <div>
                                    <ul>
                                        {comments.map((comment, index) => (
                                            <li key={index}>
                                                <strong>{comment.contents}</strong>
                                                {comment.replies && (
                                                    <div>
                                                        <Button variant="link" onClick={() => handleShowReplies(comment._id)}>
                                                            {showReplies[comment._id] ? 'Hide Replies' : 'Show Replies'}
                                                        </Button>
                                                    </div>
                                                )}
                                                {showReplies[comment._id] && comment.replies && (
                                                    <ul>
                                                        {comment.replies.map((reply, index1) => (
                                                            <li key={index1} style={{ paddingLeft: '20px' }}>
                                                                <p>{reply.contents}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                <div>
                                                    <Button variant="link" onClick={() => handleAddReply(comment._id)}>
                                                        Add Reply
                                                    </Button>
                                                    {replyTo === comment._id && (
                                                        <div style={{ paddingLeft: '20px' }}>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Reply to this comment"
                                                                value={newReply[comment._id] || ''}
                                                                onChange={(e) => setNewReply({ ...newReply, [comment._id]: e.target.value })}
                                                                onKeyDown={(e) => handleKeyDown(e, comment._id)}
                                                                className="mb-2 mt-2"
                                                            />
                                                            <Button variant="link" onClick={() => setReplyTo(null)}>
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Add a comment"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="mb-2 mt-2"
                                    />
                                </div>
                            )}
                        </Card.Footer>
                    </Card>
                ))
            )}
        </>
    );
}

export default Search;
