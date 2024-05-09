import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ListPhotos() {
    const [photos, setPhotos] = useState([{ id: 1, title: "hrisi", description: "Hello" }]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/photos');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setPhotos(result);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/photos/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            const updatedPhotos = photos.filter(photo => photo.id !== id);
            setPhotos(updatedPhotos);
            console.log('updatedPhotos');

        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div className="list-container">
            <div className="heading-container">
                <h1 className="list-title">Photos List</h1>
                <Link to="/create">
                    <button className="create-button">Create Photo</button>
                </Link>
            </div>
            {error ?
                <h3 className="error-message">{error}</h3> :
                <div className="photos-container">
                    {photos.length === 0 ?
                        <h3 className="no-photos-message">There is no photos to list!</h3> :
                        <ul>
                            {photos.map(photo =>
                                <li key={photo.id}>
                                    <h3>{photo.title}</h3>
                                    <p>{photo.description}</p>
                                    <div className="photo-buttons">
                                        <Link to={`/update/${photo.id}`}>
                                            <button className="update-button">Update</button>
                                        </Link>
                                        <button className="delete-button" onClick={() => handleDelete(photo.id)}>Delete</button>
                                    </div>
                                </li>)
                            }
                        </ul>
                    }
                </div>
            }

        </div>
    );
}

export default ListPhotos;