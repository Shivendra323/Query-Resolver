import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';

function NewPost({ onClose }) {
  const [formData, setFormData] = useState({
    userInput: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    try {
      //let url = isLogin ? '' : 'http://localhost:3000/signup'; // Determine the correct endpoint based on isLogin state
      const response = await fetch("http://localhost:3000/post", {
        method: 'POST',
        body: formData,

      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from server:', data.message);
        console.log('Session:', data.session);
        // You can handle the response from the server accordingly, such as redirecting the user or showing a success message
        if (isLogin) {
          // Example: Set session data in local storage after successful login
          localStorage.setItem('session', JSON.stringify(data.session));
          // Example: Redirect user to dashboard page after successful login
          alert('Login successful.');
          // Redirect to dashboard or home page
          window.location.href = '/';
        } else {
          // Example: Show a success message to the user after successful signup
          alert('Signup successful. Please login to continue.');
          // Optionally, you can also toggle the form to show the login form after successful signup
          setIsLogin(true);
        }
      } 
      else {
        console.error('Failed to submit form:', response.statusText);
        // Handle error response from server
      }
    } 
    catch (error) {
      console.error('Error submitting form:', error);
      // Handle any errors that occur during the form submission process
    }
    onClose();
  };
  return (
    <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-50'>
      <div className='w-96 bg-white rounded-md shadow-lg'>
        <Form encType='multipart/form-data' onSubmit={handleSubmit} className='p-6'>
          <Form.Group >
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Query</Form.Label>
            <Form.Control type="text" placeholder="Enter your text" name="userInput" value={formData.userInput} onChange={handleChange} required className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500' />
            <Form.Text className="text-xs text-gray-500">*This field is mandatory.</Form.Text>
          </Form.Group>

          <Form.Group  className='mt-4'>
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Image Attachment</Form.Label>
            <Form.Control type='file' id="imageAttachment" name="image" label="Choose image" onChange={handleImageChange} accept=".jpg,.jpeg,.png" className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500' />
          </Form.Group>

          <div className='mt-6'>
            <Button variant="primary" type="submit" className='w-full font-semibold py-2 text-sm
                 text-white bg-indigo-600 border border-transparent rounded-md
                  hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo'>
              Submit
            </Button>
            <Button variant="danger" onClick={onClose}
              className='mt-3 w-full py-2 text-sm font-semibold 
                  text-white border border-gray-300 rounded hover:bg-red-600 focus:outline-none
                  focus:text-gray-500 focus:border-gray-500'
            >
              Close
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default NewPost