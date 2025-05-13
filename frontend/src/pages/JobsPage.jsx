import { useEffect, useState } from "react";
import { useRequestStore } from "../store/request.store";
import { useAuthStore } from "../store/auth.store";

function JobsPage() {
    const [requests, setRequests] = useState([]);
    const { getRequests } = useRequestStore();
    const { user } = useAuthStore();

    async function getRequestsResult() {
        const results = await getRequests(user._id, 'receiver');
        setRequests(results);
    }

    useEffect(() => {
        getRequestsResult();
    }, []);

    return (
        <div className="request-page">
            <h2>Requests</h2>
            <table>
                <thead>
                    <tr>
                        <th>Post Title</th>
                        <th>Description</th>
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req) => (
                        <tr key={req._id}>
                            <td>{req.post?.title}</td>
                            <td>{req.post?.description}</td>
                            <td>{req.sender?.fullName}</td>
                            <td>{req.receiver?.fullName}</td>
                            <td>{req.status === 'pending' ? <div>pendeing: <button className="btn">accept</button> <button className="btn"> reject</button></div> : req.status}</td>
                            <td>{new Date(req.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default JobsPage;
