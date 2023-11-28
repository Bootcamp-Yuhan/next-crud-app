import Button from "@/components/button";
import Table from "@/components/category-table";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/searchbar";
import { CategoryData } from "../api/category/[catId]";
import { categoryData } from "../../../data";

const CategoryPage: React.FC = () => {
    // Your data and logic go here

    const handleSearch = (query: string) => {
        // Implement search logic
    };

    const handleAddClick = () => {
        // Implement button click logic
    };

    const handlePageChange = (pageNumber: number) => {
        // Implement pagination logic
    };

    const handleEditClick = (id : number) => {
        // Implement pagination logic
    };

    const handleDeleteClick = (id: number) => {
        // Implement pagination logic
    };

    const data: CategoryData[] = categoryData

    return (
        <div className="container p-5 mt-5">
            <h1 className="mb-4">Category</h1>
            <div className="row mb-4">
                <div className="col-10"><SearchBar onSearch={handleSearch} /></div>
                <div className="col-2 text-end"><Button onClick={handleAddClick} label="Add Category" /></div>
            </div>

            <Table data={data} onEditClick={({id}) => handleEditClick(id)} onDeleteClick={({id}) => handleDeleteClick(id)} />
            <Pagination onPageChange={handlePageChange} />
        </div>
    );
};

export default CategoryPage;