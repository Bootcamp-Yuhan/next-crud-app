import Button from "@/components/button";
import Table from "@/components/category-table";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/searchbar";
import { CategoryData } from "../api/category/[catId]";
import { categoryData } from "../../../data";
import { useState } from "react";
import AddCategoryModal, { FormDataProps } from "@/components/add-category-modal";
import { useRouter } from 'next/router';

interface CategoryPageProps {
    data: CategoryData[];
}

export async function getServerSideProps(): Promise<{ props: CategoryPageProps }> {
    const response = await fetch("http://localhost:3000/api/category");
    const data: CategoryData[] = await response.json();
    return { props: { data } };
}

export default function CategoryPage({ data }: CategoryPageProps) {
    // Your data and logic go here
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    async function handleCreateCategory(formData: FormDataProps) {
        // Handle category creation logic here
        console.log('Form Data:', formData);
        router.replace(router.asPath);
    };

    const handleSearch = (query: string) => {
        // Implement search logic
    };

    const handleAddClick = () => {
        setShowModal(true)
    };

    const handlePageChange = (pageNumber: number) => {
        // Implement pagination logic
    };

    const handleEditClick = (id: number) => {
        // Implement pagination logic
    };

    const handleDeleteClick = (id: number) => {
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
                showModal={showModal}
                handleClose={() => setShowModal(false)}
                handleCreate={handleCreateCategory}
            />
        </div>
    );
};
