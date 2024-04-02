import React, {useState} from 'react'
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
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData.userInput)
        console.log(formData.image)
      };
    return (
        <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-50'>
          <div className='w-96 bg-white rounded-md shadow-lg'>
            <Form onSubmit={handleSubmit} className='p-6'>
              <Form.Group controlId="formUserInput">
                <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Query</Form.Label>
                <Form.Control type="text" placeholder="Enter your text" name="userInput" value={formData.userInput} onChange={handleChange} required className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500' />
                <Form.Text className="text-xs text-gray-500">*This field is mandatory.</Form.Text>
              </Form.Group>
        
              <Form.Group controlId="formImageAttachment" className='mt-4'>
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