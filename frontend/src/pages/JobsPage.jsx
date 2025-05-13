import { useEffect } from "react";
import { useRequestStore } from "../store/request.store";
import { useAuthStore } from "../store/auth.store";

function JobsPage() {
    const { getRequests, updateStatus, requests } = useRequestStore();
    const { user } = useAuthStore();

    useEffect(() => {
        if (user?._id) {
            getRequests(user._id, "receiver");
        }
    }, [user]);

    const acceptRequest = async (id) => {
        await updateStatus(id, "waiting for payment");
        getRequests(user._id, 'receiver')
    };

    const rejectRequest = (id) => {
        updateStatus(id, "canceled");
    };

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
                    {requests?.map((req) => (
                        <tr key={req._id}>
                            <td>{req.post?.title}</td>
                            <td>{req.post?.description}</td>
                            <td>{req.sender?.fullName}</td>
                            <td>{req.receiver?.fullName}</td>
                            <td>
                                {req.status === "pending" ? (
                                    <div>
                                        pending:
                                        <button onClick={() => acceptRequest(req._id)} className="btn">Accept</button>
                                        <button onClick={() => rejectRequest(req._id)} className="btn">Reject</button>
                                    </div>
                                ) : (
                                    req.status
                                )}
                            </td>
                            <td>{new Date(req.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default JobsPage;
