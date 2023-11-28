import { useState, useEffect } from 'react';

interface EditCategoryModalProps {
    showModal: boolean;
    formDataProps: FormDataProps
    handleClose: () => void;
    handleEdit: (formData: FormDataProps) => void;
}

export interface FormDataProps {
    id: number;
    initial: string;
    name: string;
    active: boolean;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ showModal, formDataProps, handleClose, handleEdit: handleCreate }) => {
    const [formData, setFormData] = useState<FormDataProps>(formDataProps);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Update the form data when the categoryData prop changes
        setFormData(formDataProps);
    }, [formDataProps]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    async function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null) // Clear previous errors when a new request starts

        const response = await fetch('http://localhost:3000/api/category', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        if (response.status == 200) {
            handleCreate(formData);
            handleClose(); // Close the modal after submitting the form
            setFormData({
                id: -1,
                initial: '',
                name: '',
                active: false,
            })
        } else {
            const data = await response.json()
            const message = data.message
            setError(message);
        }


    };

    return (
        <div className="modal" tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Category</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label htmlFor="initial" className="form-label">
                                    Initial
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="initial"
                                    name="initial"
                                    value={formData.initial}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="active"
                                    name="active"
                                    checked={formData.active}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="active">
                                    Active
                                </label>
                            </div>
                            <div className='mb-3'>
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                            </div>
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCategoryModal;
