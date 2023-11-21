import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
export default function ShareModal({
    showModalShare,
    handleCloseModalShare,
    index,
    setRefresh,
  }) {
    const[email, setEmail] = useState("");
    const[emailMessage, setEmailMessage] = useState("");

    const handleSharePasteCard = async (event) => {
        event.preventDefault();

        if(event.currentTarget.checkvalidity() === false){
            event.stopPropagation();
        }

        setEmailMessage("");


        //this is copied from ForgotModel Needs to be changed 
        // const response = await fetch("http://localhost:3000/email/share", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ email, password }),
        //   });
      
        //   if (response.ok) {
        //     setEmailMessage("Email sent");
        //   } else {
        //     const errorMessage = await response.text();
        //     console.log(errorMessage);
        //     setEmailMessage(errorMessage);
        //   }


    };

    return (
        <Modal
            show={showModalShare}
            onHide={handleCloseModalShare}
            size="lg"
            aria-labelledby="Share"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="Share">
                    Share
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSharePasteCard}>
                    <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Who do you want to share with?"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Form.Text className="text-muted mb-3"> 
                            We'll send a share link to this email.
                        </Form.Text>
                    </Form.Group>
                    <p>{emailMessage}</p>
                    <Button variant="primary" type="submit" className="mt-1">
                        Send Share Link
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

    );
  }
