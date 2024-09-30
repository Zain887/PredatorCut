import React from 'react';
import { Category } from '../../types'; // Import the Category type

interface Props {
    categories: Category[];            // Array of all categories passed as props
    selectedCategoryId: string;        // The ID of the selected category to filter subcategories
    onSelectProductType: (productTypeId: string) => void;  // Function to handle selection of a subcategory
}

const SubCategoryList: React.FC<Props> = ({ categories, selectedCategoryId, onSelectProductType }) => {
    // Find the selected category
    const selectedCategory = categories.find(category => category.id === selectedCategoryId);

    // Get subcategories based on the selected category
    const filteredSubcategories = selectedCategory ? selectedCategory.subcategories : [];

    return (
        <div className='p-5'>
            <h2 className="text-2xl font-bold mb-4 text-center bg-white text-[#242424] border rounded-md">Subcategories</h2>
            {filteredSubcategories.length > 0 ? (
                <ul className="space-y-4 rounded-md border border-white max-h-[600px] overflow-auto">
                    {filteredSubcategories.map((subcategory) => (
                        <li
                            key={subcategory.id}
                            className="p-1 px-2 shadow hover:bg-gray-100 transition-colors hover:text-gray-700 cursor-pointer"
                            onClick={() => onSelectProductType(subcategory.id)}  // Call onSelectProductType when clicked
                        >
                            <h3 className="text-lg font-semibold">{subcategory.name}</h3>
                            {subcategory.description && (
                                <p className="text-sm text-gray-600">{subcategory.description}</p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No subcategories available for this category.</p>
            )}
        </div>
    );
};

export default SubCategoryList;
