import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

const fetchData = async ()=>{
  try{
    const response = await fetch('http://localhost:3000/getPost',{
      method:'GET'
    });
    if(!response.ok){
      throw new Error("Server issue");
    }
    const jsonData = await response.json();
    //console.log(jsonData);
    return jsonData;
  }
  catch(error){
    console.log("Failed to fetch data");
  }
}
function Post({ Mydata }) {

  //console.log(Mydata);
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
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

  const handleCommentSubmit = async() => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      const sessionData = localStorage.getItem('session');
      const session = JSON.parse(sessionData);
      const commentdata = {
        contents : newComment,
        userId: session.username,
        postId: Mydata.post._id
      }
      setNewComment('');
      try {
        //let url = isLogin ? '' : 'http://localhost:3000/signup'; // Determine the correct endpoint based on isLogin state
        const response = await axios.post('http://localhost:3000/addComment', commentdata);
      }
      catch (error) {
        console.error('Error submitting form:', error);
        // Handle any errors that occur during the form submission process
        throw error;
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      handleCommentSubmit();
    }
  };
  //console.log(Mydata)
  return (
    <Card className='mx-auto max-w-7xl h-auto my-3
     bg-white rounded-lg shadow-lg'>
      <Card.Header>{Mydata.post.username}</Card.Header>
      <Card.Body>
      {Mydata.post.image && <img src= {Mydata.post.image} className='mb-2.5 w-full h-80'/>}
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
          <>
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
              {Mydata.comments.map((commentObj, index) => (
                <ul key={index}>
                  {commentObj.content.map((comment, commentIndex) => (
                    <li key={commentIndex}>{comment}</li>
                  ))}
                </ul>
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

function ParentPost() {
  //console.log();
  const [data, setData] = useState([]);
  //console.log(data);
  useEffect(() => {
    fetchData().then((jsonData) => {
      setData(jsonData);
    }).catch(error => {
      console.error("Failed to fetch data:", error);
    });
  }, []); // Empty dependency array, so the effect runs only once after the initial render
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
