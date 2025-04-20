async function forgotPassword(email){
    const res = await fetch("/api/user/forgot-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data;
}
async function fetchCurrentUser() {
      const res = await fetch("/api/user/currentuser", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
    }

const userServices = {
    forgotPassword,
    fetchCurrentUser
}
