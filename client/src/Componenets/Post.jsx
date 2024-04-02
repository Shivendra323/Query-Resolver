import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';

function Post({ username, content, imageUrl, initialComments }) {
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    if (!likedByUserId.includes(userId)) {
      setLikes(likes + 1);
      setLikedByUserId([...likedByUserId, userId]);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      handleCommentSubmit();
    }
  };

  return (
    <Card className='mx-auto max-w-7xl h-auto my-3
     bg-white rounded-lg shadow-lg'>
      <Card.Header>{username}</Card.Header>
      <Card.Body>
      {imageUrl && <img src={imageUrl} className='mb-2.5 w-full h-80'/>}
        <Card.Text>{content}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="light" onClick={handleLike}>
            <FontAwesomeIcon icon={faThumbsUp} /> ({likes})
        </Button>
        <Button variant="light" onClick={toggleComments} className='ml-2'>
          <FontAwesomeIcon icon={faComment} />
        </Button>
        {showComments && (
          <>
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
            <Form.Control
              type="text"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mb-2 mt-2"
            />
          </>
        )}
      </Card.Footer>
    </Card>
  );
}

export default Post;
