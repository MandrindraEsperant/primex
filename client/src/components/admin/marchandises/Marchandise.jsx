import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdAdd,
  MdSearch,
  MdClear,
} from "react-icons/md";
import AjoutMarchandisePage from "../../../pages/admin/AjoutMarchandisePage";
import axios from "axios";
import Swal from "sweetalert2";

const Marchandise = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const allMarchandise = async () => {
    try {
      const response = await axios.get("http://localhost:3001/marchandise/");
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const supprimer = (id) => {
    axios
      .delete("http://localhost:3001/marchandise/" + id)
      .then((res) => {
        allMarchandise();
      })
      .catch((err) => alert(err));
  };
  // SUPPRESSION
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
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        supprimer(id); // Appeler la fonction de suppression si confirmé
      }
    });
  };

  useEffect(() => {
    allMarchandise();
  }, []);

  const handleClickOpen = () => {
    setSelectedPerson(null);
    setIsEditMode(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleEditClickOpen = (marchandise) => {
    setSelectedPerson(marchandise);
    setIsEditMode(true); // Mode modification
    setOpen(true);
  };

  const handleSelect = (person) => {
    if (
      selectedPerson &&
      selectedPerson.idMarchandise === person.idMarchandise
    ) {
      setSelectedPerson(person); // Désélectionne si la même personne est déjà sélectionnée
    } else {
      setSelectedPerson(person); // Sélectionne la personne cliquée
    }
  };

  const filteredData = data.filter(
    (item) =>
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
      <h3 className="title">LISTES DE TOUT LES MARCHANDISES</h3>
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
            <AjoutMarchandisePage
              open={open}
              handleClose={handleClose}
              allMarchandise={allMarchandise}
              isEditMode={isEditMode}
              selectedPerson={selectedPerson}
            />
          </div>
          <table className="table ">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Type Expedition</th>
                <th>ID Expedition</th>
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
            <tbody className="loader-container">
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                currentData.map((item) => (
                  <tr
                    key={item.idMarchandise}
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
                    <td>{item.idMarchandise}</td>
                    <td>{item.typeExpedition}</td>
                    <td>{item.idExpedition}</td>
                    <td>{item.numConteneur}</td>
                    <td>{item.typeConteneur}</td>
                    <td>{item.numPlomb}</td>
                    <td>{item.nature}</td>
                    <td>{item.nbColis}</td>
                    <td>{item.poid}KG</td>
                    <td>
                      {item.volume}m<sup>3</sup>
                    </td>
                    <td>
                      <span className="actionIcons">
                        <MdEdit
                          className="editIcon"
                          onClick={() => handleEditClickOpen(item)}
                        />
                        <MdDelete
                          className="deleteIcon"
                          onClick={() => handleDeleteClick(item.idMarchandise)}
                        />
                        <MdVisibility className="viewIcon" />
                      </span>
                    </td>
                  </tr>
                ))
              )}
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
              <img src="" alt={selectedPerson.nature} className="detailImage" />
            )}
            <h3>
              Détails : {selectedPerson ? selectedPerson.idExpedition : ""}
            </h3>
          </div>
          <p>
            <strong>Type d'expédition :</strong>{" "}
            {selectedPerson ? selectedPerson.typeExpedition : ""}
          </p>
          <p>
            <strong>ID expédition :</strong>{" "}
            {selectedPerson ? selectedPerson.idExpedition : ""}
          </p>
          <p>
            <strong>N° Conteneur :</strong>{" "}
            {selectedPerson ? selectedPerson.numConteneur : ""}
          </p>
          <p>
            <strong>Type Conteneuer :</strong>{" "}
            {selectedPerson ? selectedPerson.typeConteneur : ""}
          </p>
          <p>
            <strong>N° Plomb :</strong>{" "}
            {selectedPerson ? selectedPerson.numPlomb : ""}
          </p>
          <p>
            <strong>Nature :</strong>{" "}
            {selectedPerson ? selectedPerson.nature : ""}
          </p>
          <p>
            <strong>Nombre Colis :</strong>{" "}
            {selectedPerson ? selectedPerson.nbColis : ""}
          </p>
          <p>
            <strong>Poid :</strong> {selectedPerson ? selectedPerson.poid : ""}
            KG
          </p>
          <p>
            <strong>Volume :</strong>{" "}
            {selectedPerson ? selectedPerson.volume : ""}m<sup>3</sup>
          </p>
          <button className="editButton">
            <MdEdit /> Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marchandise;
