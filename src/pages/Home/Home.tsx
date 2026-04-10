import { useEffect, useState } from "react";
import AddApplicationModal from "../../components/AddApplicationModal/AddApplicationModal";
import { getApplications, addApplication } from "../../services/applicationService";
import type { Application } from "../../types/application";
import Navbar from "../../components/Navbar/Navbar";
import ApplicationTable from "../../components/ApplicationTable/ApplicationTable";

function Home() {
    const [data, setData] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Calling mock service to retrieve a list of applications 
    useEffect(() => {
        getApplications()
        .then(setData)
        .finally(() => setLoading(false));
    }, []);

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => setShowModal(false);

    const handleAdd = async (formData: Omit<Application, "id">) => {
        const newApp: Application = {
        id: data.length + 1,
        ...formData,
        };

        await addApplication(newApp);

        setData((prev) => [...prev, newApp]);
    };

    return (
    <div>
        <Navbar
            onAddClick={handleOpenModal}
        />

        {/* Applications Table */}
        {loading ? 
        (
            // Loading spinner while waiting for json data retrieval
            <div className="flex justify-center mt-4">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        ) : (
            <ApplicationTable 
                data={data}
            />
        )}
        
        {/* Form popup: Displayed when "Add application" button clicked */}
        {showModal && 
        (
            <AddApplicationModal
                onClose={handleCloseModal}
                onAdd={handleAdd}
            />
        )}

    </div>
    );
}

export default Home;
