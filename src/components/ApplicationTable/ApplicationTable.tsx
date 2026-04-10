import type { Application } from "../../types/application";

type Props = {
    data: Application[];
};

function ApplicationTable({ data } : Props) {
    return (
        <div >
        <div  className="overflow-x-auto mt-4 mx-4">
        <table className="table table-zebra w-full table-fixed">
            <thead>
                <tr>
                    <th className="hidden sm:table-cell">Application ID</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>

            <tbody >
                {data.map((item) => (
                    <tr key={item.id}>
                        <td className="hidden sm:table-cell">{item.id}</td>
                        <td className="max-w-[120px] truncate">{item.company}</td>
                        <td className="max-w-[120px] truncate">{item.role}</td>
                        <td className="max-w-[120px] truncate">{item.status}</td>
                        <td className="max-w-[120px] truncate">{item.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
    );
}

export default ApplicationTable;