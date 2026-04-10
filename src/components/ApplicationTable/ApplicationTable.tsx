import type { Application } from "../../types/application";

// Receive data from home page
type Props = {
    data: Application[];
};

function ApplicationTable({ data } : Props) {
    return (
        // Added simple mobile responsiveness throughout, adjust styles based on tailwind breakpoints e.g. sm:xx
        <div className="overflow-x-auto mt-4 mx-4">
            <table className="table table-zebra w-full table-fixed [&_td]:whitespace-normal [&_td]:overflow-auto ">
                <thead>
                    <tr>
                        <th className="hidden sm:table-cell">Application ID</th>
                        <th>Company</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                
                <tbody>
                    {/* Load data retrieved from mock service */}
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="hidden sm:table-cell">{item.id}</td>
                            <td>{item.company}</td>
                            <td>{item.role}</td>
                            <td>{item.status}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ApplicationTable;