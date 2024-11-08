import { useState, useContext } from 'react';
import { ThemeContext } from "./../../../context/ThemeContext";
import { MdEdit, MdDelete, MdVisibility, MdAdd, MdSearch, MdClear } from 'react-icons/md';
import '../clients/Client.scss'

const initialData = [
    { id: 1, dateimport: '14/09/2024', nummbl: '214587MKO', modetransport: 'Maritime', idtransport: '15741DSZ',},
    { id: 2, dateimport: '10/01/2021', nummbl: '974585DREF', modetransport: 'Aérienne', idtransport: '15741PKZ',},
    { id: 2, dateimport: '14/09/2024', nummbl: '321582GF', modetransport: 'Maritime', idtransport: '5478QSX',},
    
];


const Employe = () => {
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
        item.dateimport.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nummbl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.modetransport.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h3 className="titleCli">LISTE DE TOUT LES EMPLOYES</h3>
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
                              {/* <AjoutImportPage open={open} handleClose={handleClose}/>{} */}
                              
                      </div>
                      <table className="table">
                          <thead>
                              <tr >
                                  <th>#</th>
                                  <th>ID</th>
                                  <th>Nom</th>
                                  <th>Email</th>
                                  <th>Type</th>
                                  <th>ID Transport</th>
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
                                      <td>{item.dateimport}</td>
                                      <td>{item.nummbl}</td>
                                      <td>{item.modetransport}</td>
                                      <td>{item.idtransport}</td>
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
                          {selectedPerson && <img src='' alt={selectedPerson.modetransport} className="detailImage" />}
                          <h3>Détails : {selectedPerson ? selectedPerson.modetransport : ''}</h3>
                      </div>
                      <p><strong>Date :</strong> {selectedPerson ? selectedPerson.dateimport : ''}</p>
                      <p><strong>Num MBL :</strong> {selectedPerson ? selectedPerson.nummbl : ''}</p>
                      <p><strong>Mode Transport :</strong> {selectedPerson ? selectedPerson.modetransport : ''}</p>
                      <p><strong>Id Transport :</strong> {selectedPerson ? selectedPerson.idtransport : ''}</p>
                      <button className="editButton">
                          <MdEdit /> Modifier
                      </button>
                  </div>
  
              </div>
          </div>
    );
}

export default Employe
