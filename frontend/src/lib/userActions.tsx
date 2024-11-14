import api from "@/lib/api";

export const getLoggedInUser = async () => {
    try {
        const user = await api.get("/api/userdetails/")
            .then((res) => res.data)
            .then((data) => data.shift())

        return user;
    } catch (error) {
        return null;
    }
}

export const getUserAdresses = async () => {
    try {
        const addresses = await api.get("/api/useraddresses/")

        return addresses.data;
    } catch (error) {
        return null;
    }
}