export const signIn = async (email: string, password: string) => {
    const response = await fetch("/api/signin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
        window.location.href = "/background-info";
    }

    return data;
};

export const signUp = async (email: string, password: string) => {
    const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
    return response.json();
};