import React from 'react';
import {Form, Button} from 'react-bootstrap';

const ReviewForm = ({revText, handleSubmit, labelText}) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId='reviewFormText'>
        <Form.Label>
        </Form.Label>
        <Form.Control ref={revText} as="textarea" rows={3} placeholder={labelText}/>
      </Form.Group>  
      <Button variant="outline-info" onClick={handleSubmit}>Submit</Button>
    </Form>
  )
}

export default ReviewForm;