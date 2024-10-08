import { useState, useContext } from 'react';
import { ThemeContext } from "./../../../context/ThemeContext";
import { MdEdit, MdDelete, MdVisibility, MdAdd, MdSearch, MdClear } from 'react-icons/md';
import '../clients/Client.scss'


import { Link } from "react-router-dom";

const initialData = [
    { id: 1, nom: 'Alice Dupont', adresse: '123 Rue A', contact: '0123456789', email: 'alice@example.com', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, nom: 'Bob Martin', adresse: '456 Rue B', contact: '0987654321', email: 'bob@example.com', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, nom: 'Charlie Smith', adresse: '789 Rue C', contact: '0147852369', email: 'charlie@example.com', imageUrl: 'https://via.placeholder.com/150' },
    
];
const Importation = () => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };
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
            <h3 className="title">LISTE DE TOUT LES IMPORTATIONS</h3>
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
                            <button className="addButton" >
                                <MdAdd /> Ajouter
                            </button>
                            
                    </div>
                    <table className="table">
                        <thead>
                            <tr >
                                <th>#</th>
                                <th>ID</th>
                                <th>ID Client</th>
                                <th>Type importation</th>
                                <th>Compagnie</th>
                                <th>Genre</th>
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

export default Importation;
