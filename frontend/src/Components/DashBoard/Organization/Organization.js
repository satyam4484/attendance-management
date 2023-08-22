import React, { useEffect, useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { getDepartments } from '../../../network/agent';
import AddDepartment from './AddDepartment';
import AllTeachers from './AllTeachers';
import AllDepartments from './AllDepartments';
import { useGlobalContext } from '../../../context/Context';

export const Organization = () => {

  const { isLoading } = useGlobalContext();
  const [departments, setDepartments] = useState([]);
  const [showInput, setShowInput] = useState(false);

  const handleAddDepartmentClick = () => {
    setShowInput(true);
  };

  useEffect(() => {
    getDepartments().then(response => {
      if (response.error === false) {
        setDepartments(response.data);
      }
    }).catch(error => {
      console.log(error);
    })
  }, [departments])

  return (
    <>
      <Row className="my-4">
        <Col>
          <div className="border shadow px-4 py-4 rounded-4">
            <p className="fs-2 text-center">Departments</p>
            <Row>
              <Col xs={1} md={8} className="g-4 my-2">
                <Button onClick={handleAddDepartmentClick}>
                  Add Department
                </Button>
                {showInput && (<AddDepartment setShowInput={setShowInput} />)}
              </Col>
            </Row>

            <hr />

            <Row xs={1} md={2} className="g-3">
              {
                isLoading ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  <AllDepartments departments={departments} />
                )
              }
            </Row>
          </div>
        </Col>

        <Col>
          <div className="border shadow px-4 py-4 rounded-4">

            <p className="fs-2 text-center">Teachers</p>
            <AllTeachers />
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Organization;