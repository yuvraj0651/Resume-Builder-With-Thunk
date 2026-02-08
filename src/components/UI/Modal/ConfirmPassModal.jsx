import { useState } from "react";
import { useSelector } from "react-redux";

const ConfirmPasswordModal = ({ onClose, onSuccess }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { authData } = useSelector((state) => state.auth);

    const userPassword = authData.password;
    console.log(userPassword);

    const handleConfirm = () => {
        if (!password) {
            setError("Password is required");
            return;
        }

        if (password === userPassword) {
            onSuccess();
        } else {
            setError("Incorrect password");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-4">
                    Confirm Password
                </h3>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="Enter your password"
                />

                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

                <div className="flex justify-end gap-3 mt-5">
                    <button onClick={onClose}>Cancel</button>
                    <button
                        onClick={handleConfirm}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPasswordModal;