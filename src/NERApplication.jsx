import React, { useState } from 'react';

const NERApplication = () => {
    const [inputText, setInputText] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [results, setResults] = useState([]);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        if (event.target.value) {
            fetchNER(event.target.value);
        }
    };

    const fetchNER = (type) => {
        fetch(`http://localhost:8080/api/v1/ner?type=${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain; charset=utf-8'
            },
            body: inputText
        })
        .then(response => response.json())
        .then(data => setResults(data))
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className="container">
            <h3>Input:</h3>
            <div className="form-group">
                <label>Enter Your Text Here!!!</label>
                <textarea
                    id="input"
                    className="form-control"
                    rows="4"
                    value={inputText}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Select Type</label>
                <select
                    className="form-control"
                    id="type"
                    value={selectedType}
                    onChange={handleTypeChange}
                >
                    <option value="">Select Type</option>
                    <option value="PERSON">Person</option>
                    <option value="CITY">City</option>
                    <option value="STATE_OR_PROVINCE">State or Province</option>
                    <option value="COUNTRY">Country</option>
                    <option value="TITLE">(Job) Title</option>
                    <option value="EMAIL">Email</option>
                </select>
            </div>
            <h3>Output:</h3>
            <div id="result">
                {results.map((value, index) => (
                    <span key={index} className="badge badge-success">{value}</span>
                ))}
            </div>
        </div>
    );
};

export default NERApplication;
