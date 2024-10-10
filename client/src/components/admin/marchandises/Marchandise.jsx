import { useState, useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { MdEdit, MdDelete, MdVisibility, MdAdd, MdSearch, MdClear } from 'react-icons/md';
import '../clients/ajoutClient/ClientForm.css'
import { Link } from "react-router-dom";
import AjoutMarchandisePage from '../../../pages/admin/AjoutMarchandisePage';

const initialData = [
    { idMarchandise: 1, typeExpedition: 'Importation', idExpedition: '14MNB', numConteneur: '14587',  typeConteneur: '20', numPlomb: '14/09/2024', nature:'Lunette', nbColis:'4', poid:'20', volume:'300'},
    
];
const Marchandise = () => {
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
        if (selectedPerson && selectedPerson.idMarchandise === person.idMarchandise) {
            setSelectedPerson(null); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setSelectedPerson(person); // Sélectionne la personne cliquée
        }
    };
  
    const filteredData = data.filter(item =>
        item.typeExpedition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.idExpedition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.numConteneur.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.numPlomb.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h3 className="title">LISTEs DE TOUT LES MARCHANDISES</h3>
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
                               <AjoutMarchandisePage open={open} handleClose={handleClose}/>
                              
                      </div>
                      <table className="table">
                          <thead>
                              <tr >
                                  <th>#</th>
                                  <th>ID</th>
                                  <th>Type Expedition</th>
                                  <th>ID  Expedition</th>
                                  <th>N° Conteneur</th>
                                  <th>Type Conteneur</th>
                                  <th>N° Plomb</th>
                                  <th>Nature</th>
                                  <th>N° Colis</th>
                                  <th>Poids</th>
                                  <th>Volume</th>
                                  <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {currentData.map(item => (
                                  <tr
                                      key={item.idMarchandise}
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
                                      <td>{item.idMarchandise}</td>
                                      <td>{item.typeExpedition}</td>
                                      <td>{item.idExpedition}</td>
                                      <td>{item.numConteneur}</td>
                                      <td>{item.typeConteneur}</td>
                                      <td>{item.numPlomb}</td>
                                      <td>{item.nature}</td>
                                      <td>{item.nbColis}</td>
                                      <td>{item.poid}KG</td>
                                      <td>{item.volume}m<sup>3</sup></td>
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
                          {selectedPerson && <img src='' alt={selectedPerson.nature} className="detailImage" />}
                          <h3>Détails : {selectedPerson ? selectedPerson.idExpedition : ''}</h3>
                      </div>
                      <p><strong>Type d'expédition :</strong> {selectedPerson ? selectedPerson.typeExpedition : ''}</p>
                      <p><strong>ID expédition :</strong> {selectedPerson ? selectedPerson.idExpedition : ''}</p>
                      <p><strong>N° Conteneur :</strong> {selectedPerson ? selectedPerson.numConteneur : ''}</p>
                      <p><strong>Type Conteneuer :</strong> {selectedPerson ? selectedPerson.typeConteneur : ''}</p>
                      <p><strong>N° Plomb :</strong> {selectedPerson ? selectedPerson.numPlomb : ''}</p>
                      <p><strong>Nature :</strong> {selectedPerson ? selectedPerson.nature : ''}</p>
                      <p><strong>Nombre Colis :</strong> {selectedPerson ? selectedPerson.nbColis : ''}</p>
                      <p><strong>Poid :</strong> {selectedPerson ? selectedPerson.poid : ''}KG</p>
                      <p><strong>Volume :</strong> {selectedPerson ? selectedPerson.volume : ''}m<sup>3</sup></p>
                      <button className="editButton">
                          <MdEdit /> Modifier
                      </button>
                  </div>
  
              </div>
          </div>
    );
}

export default Marchandise;
