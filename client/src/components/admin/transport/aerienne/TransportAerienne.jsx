import { useState, useContext } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { MdEdit, MdDelete, MdVisibility, MdAdd, MdSearch, MdClear } from 'react-icons/md';
import '../../clients/Client.scss';
import { Link } from "react-router-dom";
import AjoutTransA from '../../../../pages/admin/AjoutTransA';

const initialData = [
    { idTransAerienne: 1, numVol: '21458', nomCompagnie: 'Air France', dateDepart: '14/09/2024', dateArriver: '14/09/2024',},
    { idTransAerienne: 2, numVol: '68452', nomCompagnie: 'Air France', dateDepart: '14/09/2024', dateArriver: '14/09/2024',},
    { idTransAerienne: 3, numVol: '25212', nomCompagnie: 'Air France', dateDepart: '14/09/2024', dateArriver: '14/09/2024',},
    
];
const TransportAerienne = () => {
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
        if (selectedPerson && selectedPerson.idTransAerienne === person.idTransAerienne) {
            setSelectedPerson(null); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setSelectedPerson(person); // Sélectionne la personne cliquée
        }
    };
  
    const filteredData = data.filter(item =>
        item.numVol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nomCompagnie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dateDepart.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h3 className="title">LISTE DE TOUT LES TRANSPORTS AERIENNE</h3>
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
                              <AjoutTransA open={open} handleClose={handleClose}/>{}
                              
                      </div>
                      <table className="table">
                          <thead>
                              <tr >
                                  <th>#</th>
                                  <th>ID</th>
                                  <th>N° Vol</th>
                                  <th>Nom Compagnie</th>
                                  <th>Date Départ</th>
                                  <th>Date Arrivé</th>
                                  <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {currentData.map(item => (
                                  <tr
                                      key={item.idTransAerienne}
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
                                      <td>{item.idTransAerienne}</td>
                                      <td>{item.numVol}</td>
                                      <td>{item.nomCompagnie}</td>
                                      <td>{item.dateDepart}</td>
                                      <td>{item.dateArriver}</td>
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
                          {selectedPerson && <img src='' alt={selectedPerson.nomCompagnie} className="detailImage" />}
                          <h3>Détails : {selectedPerson ? selectedPerson.numVol : ''}</h3>
                      </div>
                      <p><strong>N° Vol :</strong> {selectedPerson ? selectedPerson.numVol : ''}</p>
                      <p><strong>Nom Compagnie :</strong> {selectedPerson ? selectedPerson.nomCompagnie : ''}</p>
                      <p><strong>Date Départ :</strong> {selectedPerson ? selectedPerson.dateDepart : ''}</p>
                      <p><strong>Date Arrivé :</strong> {selectedPerson ? selectedPerson.dateArriver : ''}</p>
                      <button className="editButton">
                          <MdEdit /> Modifier
                      </button>
                  </div>
  
              </div>
          </div>
    );
}

export default TransportAerienne
