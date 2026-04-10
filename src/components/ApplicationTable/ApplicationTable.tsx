import type { Application } from "../../types/application";

type Props = {
    data: Application[];
};

function ApplicationTable({ data } : Props) {
    return (
        <table className="table table-zebra mt-4 mx-4">
            <thead>
                <tr>
                    <th>Application ID</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.company}</td>
                        <td>{item.role}</td>
                        <td>{item.status}</td>
                        <td>{item.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ApplicationTable;