import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { MdEdit, MdDelete, MdVisibility, MdAdd, MdSearch, MdClear } from 'react-icons/md';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../Dashboard/areaTable/AreaTable.scss"
import AreaTableAction from "../../Dashboard/areaTable/AreaTableAction";
import AjoutSuiviHwb from './AjoutSuiviHwb';
import DetailsSuiviHwb from './DetailsSuiviHwb';

const SuiviHwb = () => {
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState([]);
    const allsuiviHWB = async () => {
        try {
            const response = await axios.get("http://localhost:3001/suiviHWB/");
            setData(response.data);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };
    const handleEditClickOpen = (suiviHWB) => {
        setSelectedPerson(suiviHWB);
        setIsEditMode(true); 
        setOpen(true);
    };
    const supprimer = (id) => {
        axios
            .delete("http://localhost:3001/suiviHWB/" + id)
            .then((res) => {
                allsuiviHWB();
            })
            .catch((err) => alert(err));
    };
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
        allsuiviHWB();
    }, []);
    const handleClickOpen = () => {
        setSelectedPerson(null);
        setIsEditMode(false);
        setOpen(true);
    };
    const { theme } = useContext(ThemeContext);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleSelect = (person) => {
        if (selectedPerson && selectedPerson.idSuiviHWB === person.idSuiviHWB) {
            setSelectedPerson(person); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setSelectedPerson(person); // Sélectionne la personne cliquée
        }
    };
    const filteredData = data.filter(item =>
        item.numHWB.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

  return (
    <div className={`client-container ${theme}`}>
            <h3 className="title">SUIVIS HWB</h3>
            <div className="flex flex-col space-y-6">
                <div className="actionsContainer">
                    <div className="searchContainer">
                        <MdSearch className="searchIcon" />
                        <input
                            type="text"
                            placeholder="Entrez votre numéro de suivi..."
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
                        <MdAdd /> Suivre
                    </button>
                </div>
                <section className="content-area-table pd-5">
                <div className="data-table-diagram">
                <table >
                    <thead>
                        <tr >
                            <th>#</th>
                            <th>N° HWB</th>
                            <th>Etape</th>
                            <th>Date etape</th>
                            <th>Status</th>
                            <th>Commentaire</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map(item => (
                            <tr
                                key={item.idSuiviHWB}
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
                                <td>{item.numHWB}</td>
                                <td>{item.etape}</td>
                                <td>{ new Date(item.dateEtape).toLocaleDateString('fr-FR') }</td>
                                <td>{item.status}</td>
                                <td>{item.commentaire}</td>
                                <td className="dt-cell-action">
                                    <AreaTableAction
                                        id={item.id}
                                        onEditClick={() => handleEditClickOpen(item.idSuiviHWB)}
                                        onDeleteClick={() => handleDeleteClick(item.idSuiviHWB)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table></div></section>
                <div className="pagination pb-2">
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
            <DetailsSuiviHwb/>
            <AjoutSuiviHwb className="pt-2"/>
        </div>
  )
}

export default SuiviHwb
