"use client";
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
import "./Client.scss";
import AjoutCLi from "../../../pages/admin/AjoutCLi";
import axios from "axios";

const Client = () => {
  const [data, setData] = useState([]);

  const allClient = async () => {
    try {
      const response = await axios.get("http://localhost:3001/client/");
      setData(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const supprimer = (id) => {
    axios.delete('http://localhost:3001/client/'+id)
        .then(res =>  {
         console.log(res);
         allClient();
        })
        .catch(err=> alert(err))
  };

  useEffect(() => {
    allClient();
  }, []);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { theme } = useContext(ThemeContext);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const handleSelect = (person) => {
    if (selectedPerson && selectedPerson.id === person.id) {
      setSelectedPerson(null); // Désélectionne si la même personne est déjà sélectionnée
    } else {
      setSelectedPerson(person); // Sélectionne la personne cliquée
    }
  };
  const filteredData = data.filter(
    (item) =>
      item.nomClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.emailClient.toLowerCase().includes(searchTerm.toLowerCase())
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
                  onClick={() => setSearchTerm("")}
                />
              )}
            </div>
            <button className="addButton" onClick={handleClickOpen}>
              <MdAdd /> Ajouter
            </button> 
            <AjoutCLi open={open} allClient={allClient} handleClose={handleClose} />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Email</th>
                <th>CNI</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                //   initialData.map((item) =>
                <tr
                  key={item.idClient}
                  onClick={() => handleSelect(item)}
                  className={item === selectedPerson ? "selectedRow" : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={item === selectedPerson}
                      readOnly
                    />
                  </td>
                  <td>{item.nomClient}</td>
                  <td>{item.emailClient}</td>
                  <td>{item.CINClient}</td>
                  <td>
                    <span className="actionIcons">
                      <MdEdit className="editIcon" />
                      <MdDelete className="deleteIcon" onClick={()=>supprimer(item.idClient)} />
                      <MdVisibility className="viewIcon" />
                    </span>
                  </td>
                </tr>
              ))}
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

        <div className="detailContainer">
          <div className="detailHeader">
            {selectedPerson && (
              <img
                src={selectedPerson.imageUrl}
                alt={selectedPerson.nom}
                className="detailImage"
              />
            )}
          </div>
          <p>
            <strong>Nom :</strong> {selectedPerson ? selectedPerson.nomClient : ""}
          </p>
          <p>
            <strong>Email :</strong>{" "}
            {selectedPerson ? selectedPerson.emailClient : ""}
          </p>
          <p>
            <strong>CNI :</strong>{" "}
            {selectedPerson ? selectedPerson.CINClient : ""}
          </p>
          
          <button className="editButton">
            <MdEdit /> Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Client;
