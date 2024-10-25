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
import AjoutAgentP from "../../../pages/admin/AjoutAgentP";

const Agent = () => {

    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const { theme } = useContext(ThemeContext);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const [data, setData] = useState([]);
  
    const allAgent = async () => {
      try {
        const response = await axios.get("http://localhost:3001/agent/");
        setData(response.data);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    };
    const supprimer = (id) => {
      axios
        .delete("http://localhost:3001/agent/" + id)
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Supprimé!",
            text: "Le agent a été supprimé.",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          });
          allAgent();
        })
        .catch((err) => alert(err));
    };
    useEffect(() => {
      allAgent();
    }, []);
    const handleClickOpen = () => {
      setSelectedPerson(null);
      setIsEditMode(false);
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      setSelectedPerson(null);
    };
  
    const handleEditClickOpen = (agent) => {
      setSelectedPerson(agent);
      setIsEditMode(true); // Mode modification
      setOpen(true);
    };
    const handleSelect = (person) => {
      if (selectedPerson && selectedPerson.idAgent === person.idAgent) {
        setSelectedPerson(person); // Désélectionne si la même personne est déjà sélectionnée
      } else {
        setSelectedPerson(person); // Sélectionne la personne cliquée
      }
    };
    const filteredData = data.filter(
      (item) =>
        item.nomAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paysAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.adresseAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contactAgent.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleDeleteClick = (id) => {
      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "De supprimmer ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Supprimer!",
        cancelButtonText: "Annuler",
        reverseButtons:true
      }).then((result) => {
        if (result.isConfirmed) {
          supprimer(id); // Appeler la fonction de suppression si confirmé
        }
      });
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
    <h3 className="title">LISTE DE TOUT LES AGENTS</h3>
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
          <AjoutAgentP
            open={open}
            allAgent={allAgent}
            handleClose={handleClose}
            isEditMode={isEditMode}
            selectedPerson={selectedPerson}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom Agent</th>
              <th>Pays Agent</th>
              <th>Adresse</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr
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
                <td>{item.nomAgent}</td>
                <td>{item.paysAgent}</td>
                <td>{item.adresseAgent}</td>
                <td>{item.contactAgent}</td>
                <td>
                  <span className="actionIcons">
                    <MdEdit
                      className="editIcon"
                      onClick={() => handleEditClickOpen(item)}
                    />
                    <MdDelete
                      className="deleteIcon"
                      onClick={() => handleDeleteClick(item.idAgent)}
                    />
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

    </div>
  )
}

export default Agent