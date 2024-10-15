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
import "../../clients/Client.scss";
import AjoutTransM from "../../../../pages/admin/AjoutTransM";
import axios from "axios";

const TransportMaritime = () => {
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    allTransMaritime();
  }, []);

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
    if (
      selectedPerson &&
      selectedPerson.idTransMaritime === person.idTransMaritime
    ) {
      setSelectedPerson(null); // Désélectionne si la même personne est déjà sélectionnée
    } else {
      setSelectedPerson(person); // Sélectionne la personne cliquée
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.numHBL.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.numBateau.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nomBateau.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dateArriver.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      <h3 className="title">LISTE DE TOUT LES TRANSPORTS MARITIME</h3>
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
            <AjoutTransM 
              open={open}
              handleClose={handleClose}
              allTransMaritime={allTransMaritime}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                {/* <th>ID</th>  */}
                <th>N° HBL</th>
                <th>N° Bateau</th>
                <th>Nom Bateau</th>
                <th>Date Départ</th>
                <th>Date Arrivé</th>
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
                  {/* <td>{item.idTransMaritime}</td> */}
                  <td>{item.numHBL}</td>
                  <td>{item.numBateau}</td>
                  <td>{item.nomBateau}</td>
                  <td>{item.dateDepart}</td>
                  <td>{item.dateArriver}</td>
                  <td>
                    <span className="actionIcons">
                      <MdEdit className="editIcon" />
                      <MdDelete
                        className="deleteIcon"
                        onClick={() => supprimer(item.idTransMaritime)}
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

        <div className="detailContainer">
          <div className="detailHeader">
            {selectedPerson && (
              <img
                src=""
                alt={selectedPerson.nomBateau}
                className="detailImage"
              />
            )}
            <h3>Détails : {selectedPerson ? selectedPerson.numHBL : ""}</h3>
          </div>
          <p>
            <strong>N° HBL :</strong>{" "}
            {selectedPerson ? selectedPerson.numHBL : ""}
          </p>
          <p>
            <strong>N° Bateau :</strong>{" "}
            {selectedPerson ? selectedPerson.numBateau : ""}
          </p>
          <p>
            <strong>Nom Bateau :</strong>{" "}
            {selectedPerson ? selectedPerson.nomBateau : ""}
          </p>
          <p>
            <strong>Date Départ :</strong>{" "}
            {selectedPerson ? selectedPerson.dateDepart : ""}
          </p>
          <p>
            <strong>Date Arrivé :</strong>{" "}
            {selectedPerson ? selectedPerson.dateArriver : ""}
          </p>
          <button className="editButton">
            <MdEdit /> Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransportMaritime;
