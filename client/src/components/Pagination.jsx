import React from 'react';

const Pagination = ({ page, pages, onPageChange }) => {
    if (pages <= 1) {
        return null;
    }

    return (
        <nav className="flex justify-center mt-4">
            <ul className="flex list-style-none">
                {[...Array(pages).keys()].map((x) => (
                    <li key={x + 1}>
                        <button onClick={() => onPageChange(x + 1)} className={`relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${x + 1 === page ? 'bg-blue-500 text-white' : ''}`}>
                            {x + 1}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
