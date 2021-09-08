import React, { ChangeEvent, useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Settings from "../../models/HelperSettings";

export default function SettingsTab() {
    const [fontSize, setFontSize] = useState(Settings.Instance.fontSize);
    const [helperWidth, setHelperWidth] = useState(Settings.Instance.helperWidth);
    
    function UpdateFontSize(event: ChangeEvent<HTMLInputElement>) {
        const newFSize = parseFloat(event.currentTarget.value);
        setFontSize(newFSize);
        
        Settings.Instance.fontSize = newFSize;
        Settings.Instance.Save();
    }
    
    function UpdateHelperWidth(event: ChangeEvent<HTMLInputElement>) {
        const newWidth = parseInt(event.currentTarget.value);
        setHelperWidth(newWidth);
        
        Settings.Instance.helperWidth = newWidth;
        Settings.Instance.Save();
    }

    return (
        <>
            <Form.Group>
                <Form.Label>Font size:</Form.Label>&#32;{fontSize}
                <Form.Range min={0.8} max={2} step={0.05} defaultValue={fontSize} onChange={UpdateFontSize} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Width:</Form.Label>
                <InputGroup>
                    <Form.Control type="number" step={10} defaultValue={helperWidth} onChange={UpdateHelperWidth} />
                    <InputGroup.Text>px</InputGroup.Text>
                </InputGroup>
            </Form.Group>
        </>
    )
}