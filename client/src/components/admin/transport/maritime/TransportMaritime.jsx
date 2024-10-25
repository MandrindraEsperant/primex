import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdAdd,
  MdSearch,
  MdClear,
} from "react-icons/md";
import AjoutTransM from "../../../../pages/admin/AjoutTransM";
import axios from "axios";
import Swal from "sweetalert2";
import "../../Dashboard/areaTable/AreaTable.scss"
import AreaTableAction from "../../Dashboard/areaTable/AreaTableAction";

const TransportMaritime = () => {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState([]);

  const allTransMaritime = async () => {
    try {
      const response = await axios.get("http://localhost:3001/transMaritime/");
      setData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const supprimer = (id) => {
    axios
      .delete("http://localhost:3001/transMaritime/" + id)
      .then((res) => {
        allTransMaritime();
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
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        supprimer(id); // Appeler la fonction de suppression si confirmé
      }
    });
  };


  useEffect(() => {
    allTransMaritime();
  }, []);


  const handleEditClickOpen = (transmaritime) => {
    setSelectedPerson(transmaritime);
    setIsEditMode(true); // Mode modification
    setOpen(true);
  };


  const handleClickOpen = () => {
    setSelectedPerson(null);
    setIsEditMode(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPerson(null);
  };
  const { theme } = useContext(ThemeContext);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const handleSelect = (person) => {
    if (
      selectedPerson && selectedPerson.idTransMaritime === person.idTransMaritime
    ) {
      setSelectedPerson(person); // Désélectionne si la même personne est déjà sélectionnée
    } else {
      setSelectedPerson(person); // Sélectionne la personne cliquée
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.numIMO.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nomNavire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.armateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dateChargement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paysChargement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.villeChargement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paysDechargement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.villeDechargement.toLowerCase().includes(searchTerm.toLowerCase())
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
      <h3 className="title">LISTE DE TOUT LES TRANSPORTS MARITIME</h3>
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
          <AjoutTransM
            open={open}
            handleClose={handleClose}
            allTransMaritime={allTransMaritime}
            isEditMode={isEditMode}
            selectedPerson={selectedPerson}
          />
        </div>

        <section className="content-area-table pd-5">
          <div className="data-table-diagram">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>N° IMO</th>
                  <th>Nom Navire</th>
                  <th>Armateur</th>
                  <th>Date de chargement</th>
                  <th>Pays de chargement</th>
                  <th>Pays de déchargement</th>
                  <th>Ville de chargement</th>
                  <th>Ville de déchargement</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr
                    key={item.idTransMaritime}
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
                    <td>{item.numIMO}</td>
                    <td>{item.nomNavire}</td>
                    <td>{item.armateur}</td>
                    <td>{new Date(item.dateChargement).toLocaleDateString('fr-FR')}</td>
                    <td>{item.paysChargement}</td>
                    <td>{item.paysDechargement}</td>
                    <td>{item.villeChargement}</td>
                    <td>{item.villeDechargement}</td>
                    <td className="dt-cell-action">
                      <AreaTableAction
                        id={item.id}
                        onEditClick={() => handleEditClickOpen(item.idTransMaritime)}
                        onDeleteClick={() => handleDeleteClick(item.idTransMaritime)}
                      />
                    </td>
                  </tr>

                ))}
              </tbody>
            </table></div></section>


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
    </div>
  );
};

export default TransportMaritime;
