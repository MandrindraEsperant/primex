import { useState, useContext } from 'react';
import { ThemeContext } from "./../../../context/ThemeContext";
import { MdEdit, MdDelete, MdVisibility, MdAdd, MdSearch, MdClear } from 'react-icons/md';
import './Client.scss';

import { Link } from "react-router-dom";

const initialData = [
    { id: 1, nom: 'Alice Dupont', adresse: '123 Rue A', contact: '0123456789', email: 'alice@example.com', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, nom: 'Bob Martin', adresse: '456 Rue B', contact: '0987654321', email: 'bob@example.com', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, nom: 'Charlie Smith', adresse: '789 Rue C', contact: '0147852369', email: 'charlie@example.com', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, nom: 'David Johnson', adresse: '321 Rue D', contact: '0789123456', email: 'david@example.com', imageUrl: 'https://via.placeholder.com/150' },
    { id: 5, nom: 'Emma Brown', adresse: '654 Rue E', contact: '0765432190', email: 'emma@example.com', imageUrl: 'https://via.placeholder.com/150' },
    { id: 6, nom: 'Frank White', adresse: '987 Rue F', contact: '0192837465', email: 'frank@example.com', imageUrl: 'https://via.placeholder.com/150' },
    { id: 7, nom: 'Grace Green', adresse: '234 Rue G', contact: '0456789123', email: 'grace@example.com', imageUrl: 'https://via.placeholder.com/150' },
    { id: 8, nom: 'Henry Blue', adresse: '876 Rue H', contact: '0567894321', email: 'henry@example.com', imageUrl: 'https://via.placeholder.com/150' },
    { id: 9, nom: 'Isabella Black', adresse: '345 Rue I', contact: '0678901234', email: 'isabella@example.com', imageUrl: 'https://via.placeholder.com/150' },
    { id: 10, nom: 'Jack Grey', adresse: '654 Rue J', contact: '0789012345', email: 'jack@example.com', imageUrl: 'https://via.placeholder.com/150' },
    { id: 11, nom: 'Kathy Yellow', adresse: '321 Rue K', contact: '0890123456', email: 'kathy@example.com', imageUrl: 'https://via.placeholder.com/150' },
];
const Client = () => {
    const { theme } = useContext(ThemeContext);
    const [data] = useState(initialData);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const handleSelect = (person) => {
        if (selectedPerson && selectedPerson.id === person.id) {
            setSelectedPerson(null); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setSelectedPerson(person); // Sélectionne la personne cliquée
        }
    };

    const filteredData = data.filter(item =>
        item.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={`client-container ${theme}`}>
            <h3 className="title">LISTE DE TOUT LES CLIENTS</h3>
            <div className="container">
                <div className="tableContainer">
                    <div className="actionsContainer">
                        <div className="searchContainer">
                            <MdSearch className="searchIcon" />
                            <input
                                type="text"
                                placeholder="Recherche..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="searchInput"
                            />
                            {searchTerm && (
                                <MdClear
                                    className="clearIcon"
                                    onClick={() => setSearchTerm('')}
                                />
                            )}
                        </div>
                        <Link to="/admin/ajoutclient">
                        <button className="addButton">
                            <MdAdd /> Ajouter
                        </button>
                        </Link>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Adresse</th>
                                <th>Contact</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map(item => (
                                <tr
                                    key={item.id}
                                    onClick={() => handleSelect(item)}
                                    className={item === selectedPerson ? 'selectedRow' : ''}
                                >
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={item === selectedPerson}
                                            readOnly
                                        />
                                    </td>
                                    <td>{item.id}</td>
                                    <td>{item.nom}</td>
                                    <td>{item.adresse}</td>
                                    <td>{item.contact}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <span className="actionIcons">
                                            <MdEdit className="editIcon" />
                                            <MdDelete className="deleteIcon" />
                                            <MdVisibility className="viewIcon" />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button
                                key={pageNumber}
                                className={`pageButton ${currentPage === pageNumber ? 'activePage' : ''}`}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="detailContainer">
                    <div className="detailHeader">
                        {selectedPerson && <img src={selectedPerson.imageUrl} alt={selectedPerson.nom} className="detailImage" />}
                        <h3>Détails : {selectedPerson ? selectedPerson.nom : ''}</h3>
                    </div>
                    <p><strong>Nom :</strong> {selectedPerson ? selectedPerson.nom : ''}</p>
                    <p><strong>Adresse :</strong> {selectedPerson ? selectedPerson.adresse : ''}</p>
                    <p><strong>Contact :</strong> {selectedPerson ? selectedPerson.contact : ''}</p>
                    <p><strong>Email :</strong> {selectedPerson ? selectedPerson.email : ''}</p>
                    <button className="editButton">
                        <MdEdit /> Modifier
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Client;
