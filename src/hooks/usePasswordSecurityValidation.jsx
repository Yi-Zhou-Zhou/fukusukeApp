import React, { useState, useEffect } from "react";

function usePasswordSecurityValidation() {
    const [password, setPassword] = useState("");
    // password valid
    const [passwordValid, setPasswordValid] = useState(true);
    useEffect(() => {
        if (password.length === 0) {
            setPasswordValid(true);
            return;
        }
        const length = password.length >= 8;
        const uppercase = password.match(/[A-Z]/);
        const lowercase = password.match(/[a-z]/);
        const number = password.match(/[0-9]/);
        if (length && number && uppercase && lowercase) {
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
        }
    }, [password]);

    return [password, setPassword, passwordValid];
}

export default usePasswordSecurityValidation;
