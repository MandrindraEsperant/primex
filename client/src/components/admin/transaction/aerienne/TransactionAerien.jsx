import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { MdEdit, MdDelete, MdVisibility, MdAdd, MdSearch, MdClear } from 'react-icons/md';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../Dashboard/areaTable/AreaTable.scss"
import AreaTableAction from "../../Dashboard/areaTable/AreaTableAction";
import AjoutTransactionAe from '../../../../pages/admin/AjoutTransactionA';

const TransactionAerien = () => {
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState([]);

    const allTransactionAerienne = async () => {
        try {
            const response = await axios.get("http://localhost:3001/transactionAerienne/");
            setData(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    const handleEditClickOpen = (transactionAerienne) => {
        setSelectedPerson(transactionAerienne);
        setIsEditMode(true); // Mode modification
        setOpen(true);
    };
   // SUPPRESSION
    const supprimer = (id) => {
        axios
            .delete("http://localhost:3001/transactionAerienne/" + id)
            .then((res) => {
                allTransactionAerienne();
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
        allTransactionAerienne();
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
    const { theme } = useContext(ThemeContext);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const handleSelect = (person) => {
        if (selectedPerson && selectedPerson.idtransactionAerienne === person.idtransactionAerienne) {
            setSelectedPerson(person); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setSelectedPerson(person); // Sélectionne la personne cliquée
        }
    };
    const filteredData = data.filter(item =>
        item.numMWL.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.idTransport.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.idAgentDest.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.idAgentExp.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dateEmission.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dateDestination.toLowerCase().includes(searchTerm.toLowerCase()) 
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
    <h3 className="title">LISTE DE TOUT LES TRANSACTIONS AERIENNE</h3>
    <div className="flex flex-col space-y-6">
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
            <AjoutTransactionAe
                open={open}
                allTransactionAerienne={allTransactionAerienne}
                handleClose={handleClose}
                isEditMode={isEditMode}
                selectedPerson={selectedPerson} />

        </div>
        <section className="content-area-table pd-5">
        <div className="data-table-diagram">
        <table >
            <thead>
                <tr >
                    <th>#</th>
                    <th>N° MWL</th>
                    <th>ID Transport</th>
                    <th>ID Agent Destinataire</th>
                    <th>ID Agent EXpediteur</th>
                    <th>Date destination</th>
                    <th>Date Emission</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {currentData.map(item => (
                    <tr
                        key={item.idTransactionAerienne}
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
                        <td>{item.numMWL}</td>
                        <td>{item.idTransport}</td>
                        <td>{item.idAgentDest}</td>
                        <td>{item.idAgentExp}</td>
                        <td>{new Date(item.dateDestination).toLocaleDateString('fr-FR')}</td>
                        <td>{new Date(item.dateEmission).toLocaleDateString('fr-FR')}</td>
                        <td className="dt-cell-action">
                            <AreaTableAction
                                id={item.id}
                                onEditClick={() => handleEditClickOpen(item.idTransactionAerienne)}
                                onDeleteClick={() => handleDeleteClick(item.idTransactionAerienne)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </section>
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
</div>
  )
}

export default TransactionAerien
