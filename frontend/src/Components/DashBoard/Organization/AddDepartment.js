import React, { useState } from 'react'
import { FloatingLabel, Form, Button } from 'react-bootstrap'
import { createDepartment } from '../../../network/agent'
import { useGlobalContext } from '../../../context/Context'

const AddDepartment = ({ setShowInput }) => {

    const { organizationId, setMessage } = useGlobalContext()

    const [departmentName, setDepartmentName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: departmentName,
            organization: organizationId
        };

        createDepartment(data)
            .then((response) => {
                if (response.error === false) {
                    setDepartmentName('');
                    setMessage(true, "success", "Department added successfully!")
                } else {
                    setMessage(true, "error", response.message)
                }
            })
            .catch((error) => {
                console.error('Error creating department:', error);
            });
    };

    return (
        <div className="p-3 shadow rounded-4 my-2">
            <Form onSubmit={handleSubmit}>
                <FloatingLabel label="Department Name">
                    <Form.Control
                        type="text"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                        className="rounded-3"
                    />
                </FloatingLabel>
                <Button onClick={() => setShowInput(false)} className="btn btn-sm float-top my-2" variant="light">
                    Close
                </Button>
                <Button type="submit" className="btn btn-sm float-end my-2" variant="success">
                    Add
                </Button>
            </Form>
        </div>
    )
}

export default AddDepartment