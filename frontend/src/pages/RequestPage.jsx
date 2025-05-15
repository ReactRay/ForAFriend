import { useEffect, useState } from "react";
import { useRequestStore } from "../store/request.store";
import { useAuthStore } from "../store/auth.store";

import { PayPalButtons } from "@paypal/react-paypal-js";

function RequestPage() {
    const [requests, setRequests] = useState([]);
    const { getRequests, updateStatus } = useRequestStore(); // Make sure this updates backend
    const { user } = useAuthStore();

    async function getRequestsResult() {
        const results = await getRequests(user._id, 'sender');
        setRequests(results);
    }

    useEffect(() => {
        getRequestsResult();
    }, []);

    async function handlePaymentSuccess(requestId) {
        await updateStatus(requestId, 'paid'); // or 'finished'
        getRequestsResult(); // refresh UI
    }

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
                            <td>
                                {req.status === 'waiting for payment' ? (
                                    <div>
                                        <span className={`status-box ${req.status.replace(/\s+/g, "-")}`}>waiting for payment</span>
                                        <PayPalButtons
                                            style={{ layout: "horizontal" }}
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [{
                                                        amount: {
                                                            value: req.post.price || "10.00",
                                                        },
                                                    }],
                                                });
                                            }}
                                            onApprove={(data, actions) => {
                                                return actions.order.capture().then(() => {
                                                    handlePaymentSuccess(req._id);
                                                });
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <span className={`status-box ${req.status.replace(/\s+/g, "-")}`}>{req.status}</span>
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

export default RequestPage;
