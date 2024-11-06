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