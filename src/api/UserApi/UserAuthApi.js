const backendUrl = "https://ipl-manager-server.onrender.com"

export const loginUser = async (userData) => {
    const response = await fetch(`${backendUrl}/api/user/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
         credentials: 'include',
    });
    
    if (!response.ok) {
        throw new Error("Login failed");
    }
    
    const data = await response.json();
    return data;
    }

export const signupUser = async (userData) => {
    const response = await fetch(`${backendUrl}/api/user/signup`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
        throw new Error("Signup failed");
    }
    
    const data = await response.json();
    return data;
}

export const currentuser = async () => {
    const response = await fetch(`${backendUrl}/api/user/currentuser`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
         credentials: 'include',
        
    });
    
    if (!response.ok) {
        throw new Error("User not found");
    }
    
    const data = await response.json();
    return data;
}

export const forgotPassword = async (userData) => {
    const response = await fetch(`${backendUrl}/api/user/forgot-password`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
        throw new Error("Password reset failed");
    }
    
    const data = await response.json();
    return data;
}

export const resetPassword = async (password,token) => {
    console.log(token)
    console.log(password)
    const response = await fetch(`${backendUrl}/api/user/reset-password/${token}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({password}),
    });
    
    if (!response.ok) {
        throw new Error("Password reset failed");
    }
    
    const data = await response.json();
    return data;
}

export const updateUser = async (userData,id) => {
    const response = await fetch(`${backendUrl}/api/user/updateuser/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
        throw new Error("User update failed");
    }
    
    const data = await response.json();
    return data;
}

export const logoutUser = async () => {
    const response = await fetch(`${backendUrl}/api/user/logout`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
    });
    
    if (!response.ok) {
        throw new Error("Logout failed");
    }
    
    const data = await response.json();
    return data;
}

export const handleGoogleLogin = async (userDetails) => {
    const response = await fetch(`${backendUrl}/api/user/google-login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
    });
    
    if (!response.ok) {
        throw new Error("User not found");
    }
    
    const data = await response.json();
    return data;
}
