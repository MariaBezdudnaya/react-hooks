import {useState} from 'react';
import './TaskOne.css';

const useForm = () => {  // Мой пользовательский хук
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const validateForm = () => {
        const newError = {};

        if (!firstName || !lastName) {
            newError.name = 'First Name and Last Name are required';
        } else if (!email.match(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/)) {
            newError.email = 'Invalid email format';
        } else if (password.length < 5 || !password.match(/[0-9!@#$%^&*]/)) {
            newError.password = 'Password should be at least 5 characters and contain numbers or special characters';
        } else if (password !== confirmPassword) {
            newError.confirmPassword = 'Passwords do not match';
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const onSubmitHandle = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        alert(JSON.stringify({ firstName, lastName, email, password, confirmPassword }));
    };

    return { firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, error, onSubmitHandle };
};


function TaskOne() {
    const { firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, error, onSubmitHandle } = useForm();

    return (
        <div className="form-container">
            <form onSubmit={onSubmitHandle}> {/* Измените здесь на submitForm, когда он будет готов */}
                <div className="form-container_item">
                    <input type="text" name="firstName" placeholder="First Name" className="form-input"
                        onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                    {error.name && <div className="error-message">{error.name}</div>}
                </div>

                <div className="form-container_item">
                    <input type="text" name="lastName" placeholder="Last Name" className="form-input"
                        onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                    {error.name && <div className="error-message">{error.name}</div>}
                </div>

                <div className="form-container_item">
                    <input type="text" name="email" placeholder="Email" className="form-input"
                        onChange={(e) => setEmail(e.target.value)} value={email}/>
                    {error.email && <div className="error-message">{error.email}</div>}
                </div>

                <div className="form-container_item">
                    <input type="password" name="password" placeholder="Password" className="form-input"
                        onChange={(e) => setPassword(e.target.value)} value={password}/>
                    {error.password && <div className="error-message">{error.password}</div>}
                </div>

                <div className="form-container_item">
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" className="form-input"
                            onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                    {error.confirmPassword && <div className="error-message">{error.confirmPassword}</div>}
                </div>

                <button type="submit" className="form-button">Register</button>
            </form>
        </div>
    );
};

export default TaskOne;