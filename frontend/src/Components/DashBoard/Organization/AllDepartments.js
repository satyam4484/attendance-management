import React from 'react'
import { Card, Col } from 'react-bootstrap'

const AllDepartments = ({ departments }) => {
    return (
        <>
            {
                departments.length === 0 && (
                    <p>
                        No departments found!
                    </p>
                )
            }
            {
                departments?.map((department) => {
                    return (
                        <Col key={department._id}>
                            <Card className="h-100 border-0 shadow-sm rounded-4 text-center">
                                <Card.Body>
                                    <Card.Text>{department.name}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })
            }
        </>
    )
}

export default AllDepartments