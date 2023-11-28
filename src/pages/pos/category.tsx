import Button from "@/components/button";
import Table from "@/components/category-table";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/searchbar";
import { CategoryData } from "../api/category/[catId]";
import { categoryData } from "../../../data";
import { useState } from "react";
import AddCategoryModal, { FormDataProps } from "@/components/add-category-modal";
import { useRouter } from 'next/router';
import EditCategoryModal from "@/components/edit-category-modal";
import DeleteCategoryModal from "@/components/delete-category-modal";

interface CategoryPageProps {
    data: CategoryData[];
}

export async function getServerSideProps({query} : any): Promise<{ props: CategoryPageProps }> {
    const searchQuery = query.keyword || '';

    const response = await fetch(`http://localhost:3000/api/category?keyword=${encodeURIComponent(searchQuery)}`);
    const data: CategoryData[] = await response.json();
    return { props: { data } };
}

export default function CategoryPage({ data }: CategoryPageProps) {
    // Your data and logic go here
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState<CategoryData>({
        id : -1,
        initial : '',
        name : '',
        active : false,
        created_by : '',
        created_on : 0,
        modified_by : null,
        modified_on : null
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteData, setDeleteData] = useState<CategoryData>({
        id : -1,
        initial : '',
        name : '',
        active : false,
        created_by : '',
        created_on : 0,
        modified_by : null,
        modified_on : null
    });
    const router = useRouter();

    async function handleCreateCategory(formData: FormDataProps) {
        // Handle category creation logic here
        console.log('Form Data:', formData);
        router.replace(router.asPath);
    };

    
    async function handleEditCategory(formData: FormDataProps) {
        // Handle category creation logic here
        console.log('Form Data:', formData);
        router.replace(router.asPath);
    };

    async function handleDeleteCategory(formData: FormDataProps) {
        // Handle category creation logic here
        console.log('Form Data:', formData);
        router.replace(router.asPath);
    };

   
    const handleAddClick = () => {
        setShowAddModal(true)
    };
   
    const handleEditClick = (id: number) => {
        const filterEdit = data.filter(cData => cData.id == id)
        console.log(filterEdit)
        setEditData(filterEdit[0])
        setShowEditModal(true)
        // Implement pagination logic
    };

    const handleDeleteClick = (id: number) => {
        const filterDelete = data.filter(cData => cData.id == id)
        console.log(filterDelete)
        setDeleteData(filterDelete[0])
        setShowDeleteModal(true)
    };

    const handleSearch = (query: string) => {
        console.log(query)
        router.push(`/pos/category?keyword=${encodeURIComponent(query)}`);
    };

    const handlePageChange = (pageNumber: number) => {
        // Implement pagination logic
    };

    return (
        <div className="container p-5 mt-5">
            <h1 className="mb-4">Category</h1>
            <div className="row mb-4">
                <div className="col-10"><SearchBar onSearch={handleSearch} /></div>
                <div className="col-2 text-end"><Button onClick={handleAddClick} label="Add Category" /></div>
            </div>

            <Table data={data} onEditClick={({ id }) => handleEditClick(id)} onDeleteClick={({ id }) => handleDeleteClick(id)} />
            <Pagination onPageChange={handlePageChange} />

            <AddCategoryModal
                showModal={showAddModal}
                handleClose={() => setShowAddModal(false)}
                handleCreate={handleCreateCategory}
            />
            <EditCategoryModal
                showModal={showEditModal}
                formDataProps={editData}
                handleClose={() => setShowEditModal(false)}
                handleEdit={handleEditCategory}
            />
            <DeleteCategoryModal
                showModal={showDeleteModal}
                categoryData={deleteData}
                handleClose={() => setShowDeleteModal(false)}
                handleDelete={handleDeleteCategory}
            />
        </div>
    );
};
