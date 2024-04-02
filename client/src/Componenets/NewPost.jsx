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
        
      };
    return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', background: '#fff', borderRadius: '5px' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUserInput">
                        <Form.Label>User Input</Form.Label>
                        <Form.Control type="text" placeholder="Enter your text" name="userInput" 
                        value={formData.userInput} onChange={handleChange} required />
                        <Form.Text className="text-muted">This field is mandatory.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formImageAttachment">
                        <Form.Label>Image Attachment</Form.Label>
                        <Form.Control
                            type='file'
                            name="image"
                            label="Choose image"
                            onChange={handleImageChange}
                            accept=".jpg,.jpeg,.png"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="danger" onClick={onClose} style={{ marginLeft: '10px' }}>
                        Close
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default NewPost