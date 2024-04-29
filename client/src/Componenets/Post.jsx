import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/getPost', {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error("Server issue");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log("Failed to fetch data");
  }
}

function Post({ Mydata }) {
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null); // State to track which comment is being replied to
  const [newReply, setNewReply] = useState({}); // State for individual reply inputs
  const [showReplies, setShowReplies] = useState({}); // State to track which replies are visible
  const sessionData = localStorage.getItem('session');
  const session = JSON.parse(sessionData);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/addComment', {
          contents: session.username + ": " + newComment,
          postId: Mydata.post._id
        });
        setComments([...comments, response.data]);
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
          contents: session.username + ": " + newReply[commentId],
        });
        const updatedComments = comments.map(comment => {
          if (comment._id === commentId) {
            comment.replies.push(response.data);
          }
          return comment;
        });
        setComments(updatedComments);
        setNewReply({ ...newReply, [commentId]: '' });
        setShowReplies({ ...showReplies, [commentId]: true }); // Ensure replies are visible after submitting a new reply
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
    if (Mydata.comments) {
      setComments(Mydata.comments);
    }
  }, [Mydata.comments]);

  return (
    <Card className='mx-auto max-w-7xl h-auto my-3 bg-white rounded-lg shadow-lg'>
      <Card.Header>{Mydata.post.username}</Card.Header>
      <Card.Body>
        {Mydata.post.image && <img src={Mydata.post.image} className='mb-2.5 w-full h-80' />}
        <Card.Text>{Mydata.post.content}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="light" onClick={handleLike}>
          <FontAwesomeIcon icon={faThumbsUp} /> ({likes})
        </Button>
        <Button variant="light" onClick={toggleComments} className='ml-2'>
          <FontAwesomeIcon icon={faComment} />
        </Button>
        {showComments && (
          <div>
            <ul>
              {comments.map((comment, index) => (
                <li key={index} style={{ paddingLeft: comment.parent_id ? '20px' : '0' }}>
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
                          <strong>{reply.contents}</strong>
                        </li>
                      ))}
                    </ul>
                  )}

                  {!comment.parent_id && ( // Render "add reply" button only for main comments
                    <div>
                      <Button variant="link" onClick={() => handleAddReply(comment._id)}>
                        {replyTo === comment._id ? 'Add Reply' : 'Add Reply'}
                      </Button>
                      {replyTo === comment._id && ( // Display reply input field only for the selected comment
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
                  )}
                </li>
              ))}
            </ul>
            {/* Comment input field */}
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
  );
}


function ParentPost() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((jsonData) => {
      setData(jsonData);
    }).catch(error => {
      console.error("Failed to fetch data:", error);
    });
  }, []);

  return (
    <>
      {data.length === 0 ? (
        <>
          <h1 className='text-2xl font-bold text-center mt-8 mb-4'>
            Post your query to get answer from real human beings
          </h1>
        </>
      ) : (
        data.map((d, index) => <Post key={index} Mydata={d} />)
      )}
    </>
  )
}

export default ParentPost;
