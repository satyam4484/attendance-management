import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Button, Modal, Badge } from 'react-bootstrap';
import { getAllOrganizations, verifyOrganization, deleteUser } from '../../../network/agent';
import Icon from '../../UI/Icon';
import { useGlobalContext } from '../../../context/Context';
import OrganizationModal from './OrganizationModal';

const Admin = () => {

  const { setMessage } = useGlobalContext();

  const [organizations, setOrganizations] = useState([]);
  const [isVerifiedFiltered, setIsVerifiedFiltered] = useState(null);

  const [show, setShow] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    const response = await getAllOrganizations();
    setOrganizations(response.message);
  };

  const handleVerifyOrganization = async (organizationId, isVerified) => {
    try {
      const response = await verifyOrganization({ organization_id: organizationId });

      // Check if the response indicates success
      if (!response.error) {
        setMessage(true, "success", "Organization verified successfully!");

        // Update the local organization list with the verified status
        const updatedOrganizations = organizations.map((org) =>
          org._id === organizationId ? { ...org, is_verified: !isVerified } : org
        );
        setOrganizations(updatedOrganizations);

      } else {
        setMessage(true, "error", `${response.message}!`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleIsVerifiedFilter = () => {
    if (isVerifiedFiltered === null) {
      setIsVerifiedFiltered(true);
    } else {
      setIsVerifiedFiltered(!isVerifiedFiltered);
    }
  };

  const filteredOrganizations = isVerifiedFiltered !== null
    ? organizations.filter(org => org.is_verified === !isVerifiedFiltered)
    : organizations;


  // DELETE USER NOT WORKING
  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUser({ _id: userId }); // Pass the user_id as _id
      if (!response.error) {
        setMessage(true, "success", "User deleted successfully!");

        // Remove the deleted user from the local organization list
        const updatedOrganizations = organizations.filter(
          (org) => org.user._id !== userId
        );
        setOrganizations(updatedOrganizations);
      } else {
        setMessage(true, "error", "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <p className="fs-1 text-center">Admin</p>
      <Table bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>Sr. no</th>
            <th>Name</th>
            <th onClick={handleIsVerifiedFilter} style={{ cursor: 'pointer' }}>
              Verify
              <Icon name={isVerifiedFiltered ? "ArrowUp" : "ArrowDown"} size="20" />
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrganizations.map((organization, index) => {
            const { _id, user, is_verified } = organization;
            return (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td
                  onClick={() => {
                    setSelectedOrganization(organization);
                    handleShow();
                  }}
                  style={{ cursor: 'pointer' }}>
                  <span className="float-start">
                    <Icon name={is_verified ? "BadgeCheck" : "BadgeX"} color={is_verified ? "green" : "red"} />
                  </span>

                  <span className="text-uppercase text-decoration-underline">
                    {user.name}
                  </span>

                </td>
                <td>
                  <Form.Check
                    inline
                    type="radio"
                    className="btn-danger"
                    checked={is_verified}
                    onChange={() => handleVerifyOrganization(_id, is_verified)}
                    label={is_verified ? "Verified" : "Not verified"}
                  />
                </td>
                <td>
                  <Button className="rounded-pill bg-transparent border-0" size="sm" onClick={() => handleDeleteUser(user._id)}>
                    <Icon name="Trash2" color="red" size="20" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {show && (
        <OrganizationModal selectedOrganization={selectedOrganization} show={show} handleClose={handleClose} />
      )}
    </Container>
  );
};

export default Admin;
