import { useState, useContext } from 'react';
import { ThemeContext } from "./../../../context/ThemeContext";
import { MdEdit, MdDelete, MdVisibility, MdAdd, MdSearch, MdClear } from 'react-icons/md';
import '../clients/Client.scss'
import AjoutEXportPage from '../../../pages/admin/AjoutEXportPage';


import { Link } from "react-router-dom";

const initialData = [
    { idExportation: 1, dateExportation: '14/09/2024', numMBL: '214587MKO', modeTransport: 'Maritime', idTransport: '15741DSZ',},
    { idExportation: 2, dateExportation: '10/01/2021', numMBL: '974585DREF', modeTransport: 'Aérienne', idTransport: '15741PKZ',},
    { idExportation: 2, dateExportation: '14/09/2024', numMBL: '321582GF', modeTransport: 'Maritime', idTransport: '5478QSX',},
    
];
const Exportation = () => {

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
      if (selectedPerson && selectedPerson.idExportation === person.idExportation) {
          setSelectedPerson(null); // Désélectionne si la même personne est déjà sélectionnée
      } else {
          setSelectedPerson(person); // Sélectionne la personne cliquée
      }
  };

  const filteredData = data.filter(item =>
      item.dateExportation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.numMBL.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.modeTransport.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h3 className="title">LISTE DE TOUT LES EXPORTATIONS</h3>
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
                            <button className="addButton" onClick={handleClickOpen}>
                                <MdAdd /> Ajouter
                            </button>
                            <AjoutEXportPage open={open} handleClose={handleClose}/>
                            
                    </div>
                    <table className="table">
                        <thead>
                            <tr >
                                <th>#</th>
                                <th>ID</th>
                                <th>Date de l'exportation</th>
                                <th>N° MBL</th>
                                <th>Mode de Transport</th>
                                <th>ID Transport</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map(item => (
                                <tr
                                    key={item.idExportation}
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
                                    <td>{item.idExportation}</td>
                                    <td>{item.dateExportation}</td>
                                    <td>{item.numMBL}</td>
                                    <td>{item.modeTransport}</td>
                                    <td>{item.idTransport}</td>
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
                        {selectedPerson && <img src='' alt={selectedPerson.modeTransport} className="detailImage" />}
                        <h3>Détails : {selectedPerson ? selectedPerson.modeTransport : ''}</h3>
                    </div>
                    <p><strong>Date :</strong> {selectedPerson ? selectedPerson.dateExportation : ''}</p>
                    <p><strong>Num MBL :</strong> {selectedPerson ? selectedPerson.numMBL : ''}</p>
                    <p><strong>Mode Transport :</strong> {selectedPerson ? selectedPerson.modeTransport : ''}</p>
                    <p><strong>Id Transport :</strong> {selectedPerson ? selectedPerson.idTransport : ''}</p>
                    <button className="editButton">
                        <MdEdit /> Modifier
                    </button>
                </div>

            </div>
        </div>
  );
};

export default Exportation;
