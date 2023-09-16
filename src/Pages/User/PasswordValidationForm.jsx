import React, { forwardRef, useState } from 'react';


function PasswordValidationForm({ errors, passwordField }, ref) {


    const [passwordChecklist, setPasswordChecklist] = useState({
        uppercase: false,
        lowercase: false,
        number: false,
        symbol: false,
        length: false,
    });

    const [icon, setIcon] = useState(true);

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        const updatedChecklist = {
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            symbol: /[@$!%*?&]/.test(password),
            length: password.length >= 8,
        };
        setPasswordChecklist(updatedChecklist);
        setIcon(false);
    };

    return (
        <div>
            <div className="mb-4">
                <input
                    type="password"
                    placeholder="Password"
                    ref={ref}
                    onChange={(e) => {
                        passwordField.onChange(e); // Update the value in the field
                        handlePasswordChange(e); // Handle password validation
                    }}
                    className={`border-b border-t rounded-full ps-6 shadow-lg bg-transparent/10 placeholder:text-white/60 w-full p-2 ${errors ? "border-b border-red-500" : ""} focus:outline-none`}
                />
            </div>
            <div className="flex flex-col space-y-1 mb-4 text-sm text-gray-700 font-extralight">
                <ChecklistItem
                    label="At least one uppercase letter"
                    checked={passwordChecklist.uppercase}
                    icon={icon}
                />
                <ChecklistItem
                    label="At least one lowercase letter"
                    checked={passwordChecklist.lowercase}
                    icon={icon}
                />
                <ChecklistItem
                    label="At least one number"
                    checked={passwordChecklist.number}
                    icon={icon}
                />
                <ChecklistItem
                    label="At least one special symbol (@$!%*?&)"
                    checked={passwordChecklist.symbol}
                    icon={icon}
                />
                <ChecklistItem
                    label="Minimum 8 characters"
                    checked={passwordChecklist.length}
                    icon={icon}
                />
            </div>
        </div>
    );
}

function ChecklistItem({ label, checked, icon }) {

    return (
        <div className="flex items-center">
            {
                icon ?
                    <span
                        className={`mr-2 font-semibold text-white`}
                    >
                        {checked ? "✓" : "✗"}
                    </span>
                    :
                    <span
                        className={`mr-2 font-semibold  ${checked ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {checked ? "✓" : "✗"}
                    </span>
            }

            <p className='text-white'>{label}</p>
        </div>
    );
}

const PasswordValidationFormWithRef = forwardRef(PasswordValidationForm);

export default PasswordValidationFormWithRef;
