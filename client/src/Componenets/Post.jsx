import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function Post({ username, content, imageUrl, initialComments }) {
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(initialComments);

  const handleLike = () => {
    if (!likedByUserId.includes(userId)) {
      setLikes(likes + 1);
      setLikedByUserId([...likedByUserId, userId]);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <Card className='mx-auto max-w-7xl h-auto my-3
    transform transition duration-300 hover:scale-105 bg-white rounded-lg shadow-lg'>
      <Card.Header>{username}</Card.Header>
      <Card.Body>
      {imageUrl && <img src={imageUrl} className='mb-2.5 w-full h-96'/>}
        <Card.Text>{content}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="light" onClick={handleLike}>
            <FontAwesomeIcon icon={faThumbsUp} /> ({likes})
        </Button>
        <Button variant="link" onClick={toggleComments}>
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </Button>
        {showComments && (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        )}
      </Card.Footer>
    </Card>
  );
}

export default Post;
