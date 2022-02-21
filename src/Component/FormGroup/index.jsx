import React from 'react';
import "./style.scss";
import { Form } from 'react-bootstrap'

function FormGroup({ label, id, type, name, placeholder, value, handleChange, error, disabled }) {

    return (
        <Form.Group className="form-gr" controlId={id}>
            <Form.Label className="form-label">{label} :</Form.Label>
            <Form.Control
                className="form-input"
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                disabled={disabled}
            />
            {
                error && (
                    <span className="err">{error}</span>
                )
            }
        </Form.Group>
    );
}

export default FormGroup;
