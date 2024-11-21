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

export const getShoeList = async (filters:FiltersToSentProps) => {
    try {
        const formattedFilters = Object.keys(filters.filters).reduce((acc, key) => {
            const typedKey = key as keyof Filters;

            if (Array.isArray(filters.filters[typedKey])) {
                filters.filters[typedKey].forEach((value) => {
                    acc.append(typedKey, value);
                });
            } else {
                acc.append(typedKey, filters.filters[typedKey]);
            }
            return acc;
        }, new URLSearchParams());


        const queryParams = new URLSearchParams(formattedFilters).toString();
        const shoeList = await api.get(`/api/shoelist/?${queryParams}`);

        return shoeList.data;
        
    } catch (error) {
        return null;
    }
}

export const getAvailableFilters = async () => {
    try {
        const response = await api.get("/api/shoe-filters/");
        return response.data[0];
    } catch (error) {
        console.error("Error fetching filters:", error);
        return null;
    }
}

export const getShoe = async (id:string) => {
    try {
        const shoe = await api.get(`/api/shoelist/?id=${id}`);

        return shoe.data
    } catch (error) {
        return null
    }
}