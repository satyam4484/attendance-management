import React from 'react'
import { Modal } from 'react-bootstrap';

const OrganizationModal = ({ selectedOrganization, show, handleClose }) => {
    return (
        <Modal
            show={show}
            animation={true}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Organization Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedOrganization && (
                    <div>
                        <p>User ID: {selectedOrganization.user._id}</p>
                        <p>Organization ID: {selectedOrganization._id}</p>
                        <p>Name: <span className="text-uppercase">{selectedOrganization.user.name} </span></p>
                        <p>Is verified: {selectedOrganization.is_verified ? "Yes" : "No"}</p>
                    </div>
                )}
            </Modal.Body>
        </Modal>

    )
}

export default OrganizationModal