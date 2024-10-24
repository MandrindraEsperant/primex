import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "./../../../context/ThemeContext";
import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdAdd,
  MdSearch,
  MdClear,
} from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import AjoutTransactionP from "../../../pages/admin/AjoutTransactionP";
const Transaction = () => {
    const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [data, setData] = useState([]);


  const handleClickOpen = () => {
    setSelectedPerson(null);
    setIsEditMode(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedPerson(null);
  };

  const handleEditClickOpen = (client) => {
    setSelectedPerson(client);
    setIsEditMode(true); // Mode modification
    setOpen(true);
  };
  const handleSelect = (person) => {
    if (selectedPerson && selectedPerson.idClient === person.idClient) {
      setSelectedPerson(person); // Désélectionne si la même personne est déjà sélectionnée
    } else {
      setSelectedPerson(person); // Sélectionne la personne cliquée
    }
  };
  const filteredData = data.filter(
    (item) =>
      item.nomClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.CINClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.emailClient.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const allTransaction = async () => {
    try {
      const response = await axios.get("http://localhost:3001/transaction/");
      setData(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
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
      <h3 className="title">LISTE DE TOUT LES TRANSACTIONS</h3>
      <div className="flex flex-col space-y-6">
          <div className="actionsContainer flex items-center space-x-4">
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
                  onClick={() => setSearchTerm("")}
                />
              )}
            </div>
            <button className="addButton" onClick={handleClickOpen}>
              <MdAdd /> Ajouter
            </button>
            <AjoutTransactionP
              open={open}
              allTransaction={allTransaction}
              handleClose={handleClose}
              isEditMode={isEditMode}
              selectedPerson={selectedPerson}
            />
          </div>
          
              <input
                type="text"
                placeholder="Filtrer numéro MBL..."
                // value={searchTermMbl}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="searchInput"
              />
              {searchTerm && (
                <MdClear
                  className="clearIcon"
                  onClick={() => setSearchTerm("")}
                />
              )}
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>NumMBL</th>
                <th>Mode de transport</th>
                <th>ID Transport</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {currentData.map((item) => ( */}
                <tr
                 /*  onClick={() => handleSelect(item)}
                  className={item === selectedPerson ? "selectedRow" : ""} */
                >
                  <td>
                    <input
                      type="checkbox"
                    //   checked={item === selectedPerson}
                      readOnly
                    />
                  </td>
                  <td>MMM</td>
                  <td>LLL</td>
                  <td>MM</td>
                  <td>
                    <span className="actionIcons">
                      <MdEdit
                        className="editIcon"
                        // onClick={() => handleEditClickOpen(item)}
                      />
                      <MdDelete
                        className="deleteIcon"
                        // onClick={() => handleDeleteClick(item.idClient)}
                      />
                      <MdVisibility className="viewIcon" />
                    </span>
                  </td>
                </tr>
              {/* ))} */}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`pageButton ${
                    currentPage === pageNumber ? "activePage" : ""
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </div>

      </div>
    
  )
}

export default Transaction
