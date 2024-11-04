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
import "../clients/Client.scss";
import AjoutImportPage from "../../../pages/admin/AjoutImportPage";
import axios from "axios";
import Swal from "sweetalert2";

const Importation = () => {
  const [data, setData] = useState([]);

  const allImportation = async () => {
    try {
      const response = await axios.get("http://localhost:3001/importation/");
      setData(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  // SUPPRESSION
  const supprimer = (id) => {
    axios
      .delete("http://localhost:3001/importation/" + id)
      .then((res) => {
        allImportation();
      })
      .catch((err) => alert(err));
  };
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "De supprimmer ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer!",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        supprimer(id); // Appeler la fonction de suppression si confirmé
      }
    });
  };
  useEffect(() => {
    allImportation();
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
  const itemsPerPage = 5;

  const handleSelect = (person) => {
    if (selectedPerson && selectedPerson.idImportation === person.idImportation) {
      setSelectedPerson(null); // Désélectionne si la même personne est déjà sélectionnée
    } else {
      setSelectedPerson(person); // Sélectionne la personne cliquée
    }
  };
  const filteredData = data;

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
              <MdSearch className="searchIcon" /><input
                type="text"
                placeholder="Recherche..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="searchInput"
              />              {searchTerm && (
                <MdClear
                  className="clearIcon"
                  onClick={() => setSearchTerm("")}
                />
              )}
            </div> <button className="addButton" onClick={handleClickOpen}>
              <MdAdd /> Ajouter
            </button>
            <AjoutImportPage open={open} handleClose={handleClose} />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>numéro MBL</th>
                <th>Mode de transport</th>
                <th>id transport</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr
                  key={item.idImportation}
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
                  <td>{item.dateImportation}</td>
                  <td>{item.numMBL}</td>
                  <td>{item.modeTransport}</td>
                  <td>{item.idTransport}</td>
                  <td>
                    <span className="actionIcons">
                      <MdEdit className="editIcon" />
                      <MdDelete
                        className="deleteIcon"
                        onClick={() => handleDeleteClick(item.idImportation)}
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
                  className={`pageButton ${currentPage === pageNumber ? "activePage" : ""
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
            <h3>Date  : {selectedPerson ? selectedPerson.dateImportation : ""}
            </h3>
          </div>
          <p>
            <strong>Numero MBL :</strong> {selectedPerson ? selectedPerson.numMBL : ""}
          </p>
          <p>
            <strong>Mode de transport :</strong>{" "}
            {selectedPerson ? selectedPerson.modeTransport : ""}
          </p>
          <p>
            <strong>ID de transport :</strong>{" "}
            {selectedPerson ? selectedPerson.idTransport : ""}
          </p>
          <button className="editButton">
            <MdEdit /> Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Importation;
