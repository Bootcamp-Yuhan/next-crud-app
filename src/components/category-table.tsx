// components/Table.tsx
import { CategoryData } from '@/pages/api/category';
import React from 'react';
import IconButton from './icon-button';

interface OnActionClick {
    id: number;
}

interface TableProps {
    data: CategoryData[];
    onEditClick: ({ id }: OnActionClick ) => void;
    onDeleteClick: ({ id }: OnActionClick ) => void;
}

const CategoryTable: React.FC<TableProps> = ({ data, onEditClick, onDeleteClick } : TableProps) => {

    const handleEditButton = (id :number) => {
        onEditClick({id})
    };

    const handleDeleteButton = (id :number) => {
        onDeleteClick({id})
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Initial</th>
                    <th scope="col">Name</th>
                    <th scope="col">Active</th>
                    <th scope="col">Action</th>
                    {/* Add more headers as needed */}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.initial}</td>
                        <td>{item.name}</td>
                        <td>{item.active ? 'true' : 'false'}</td>
                        <td>
                            <IconButton colorClassName = 'btn-success' iconClassName='bi bi-pencil-fill' onClick={() => handleEditButton(item.id)}/>
                            <IconButton colorClassName = 'btn-danger' iconClassName='bi bi-trash-fill' onClick={() => handleDeleteButton(item.id)}/>
                        </td>
                        {/* Add more cells as needed */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CategoryTable;
