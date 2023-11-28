import { useState, useEffect } from 'react';

interface DeleteCategoryModalProps {
    showModal: boolean;
    categoryData: FormData; // Data for the category being deleted
    handleClose: () => void;
    handleDelete: (formData: FormData) => void;
}

interface FormData {
    id: number;
    initial: string;
    name: string;
    active: boolean;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
    showModal,
    categoryData,
    handleClose,
    handleDelete,
}) => {
    const [formData, setFormData] = useState<FormData>({
        id: -1,
        initial: '',
        name: '',
        active: false,
    });

    useEffect(() => {
        // Update the form data when the categoryData prop changes
        setFormData(categoryData);
    }, [categoryData]);

    async function handleDeleteConfirm() {
        const response = await fetch('http://localhost:3000/api/category', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        if (response.status == 204) {
            handleDelete(formData);
            handleClose(); // Close the modal after confirming deletion
            setFormData({
                id: -1,
                initial: '',
                name: '',
                active: false,
            })
        } else {
            alert(response)
        }


    };

    return (
        <div className="modal" tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Category</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete the category "{formData.name}"?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            Cancel
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteCategoryModal;
