import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function CreatePhoto() {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
    const navigateTo = useNavigate();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        console.log(formData);

        try {
            const response = await fetch('http://localhost:8080/photos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('Photo aded:', data);
            navigateTo('/')
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    function handleChange(ev) {
        const name = ev.target.name;
        const value = ev.target.value;
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div className="form-container">
            <h1>Create Photo</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Description</label>
                    <input type="textarea" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <button className="upload-button" type="submit">Upload</button>
            </form>
        </div>
    );
}

export default CreatePhoto;