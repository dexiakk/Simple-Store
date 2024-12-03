"use client";
import React, { useEffect, useState } from "react";
import ShoeImageGalleries from "./ShoeImageGalleries";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

interface Color {
    id: number;
    name: string;
}

export default function CreateShoeVariant() {
    const [shoeId, setShoeId] = useState<string>("");
    const [shoes, setShoes] = useState<{ id: string; manufacturer: string; model: string; gender: string }[]>([]);
    const [color, setColor] = useState<string>("");
    const [colors, setColors] = useState<Color[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [selectedImageGalleryId, setSelectedImageGalleryId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<any>("");

    useEffect(() => {
        const fetchColorsAndShoes = async () => {
            try {
                const filtersResponse = await api.get("/api/shoe-filters-with-id/");
                const filters = filtersResponse.data.shift();

                if (filters && filters.color) {
                    const parsedColors = filters.color.map((color: string) => {
                        const parsed = JSON.parse(color.replace(/'/g, '"'));
                        return { id: parsed.id, name: parsed.name };
                    });
                    setColors(parsedColors);
                }

                const response = await api.get("/api/shoelist/");
                setShoes(
                    response.data.map((shoe: any) => ({
                        id: shoe.id,
                        manufacturer: shoe.manufacturer,
                        model: shoe.model,
                        gender: shoe.gender,
                    }))
                );
            } catch (error) {
                return null
            }
        };

        fetchColorsAndShoes();
    }, []);

    const handleImageGallerySelect = (id: number) => {
        setSelectedImageGalleryId(id);
    };

    const handleShoeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setShoeId(e.target.value);
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setColor(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!shoeId || !color || !file || !selectedImageGalleryId) {
            setMessage(<p className="text-red-500">Please enter all fields.</p>);
            return;
        }

        setLoading(true);
        setMessage("");

        const formData = new FormData();
        formData.append("shoe", shoeId);
        formData.append("color", color);
        formData.append("main_image", file);
        formData.append("images_gallery", selectedImageGalleryId.toString());

        try {
            await api.post("/api/shoe-variants/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage(<p className="text-green-500">Variant added succesfuly.</p>);
        } catch (error) {
            setMessage(<p className="text-red-500">Error with adding new variant.</p>);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center gap-3 mt-4 mb-4 p-4 border-2">
                <div className="flex flex-col items-center">
                    <label htmlFor="shoeSelect" className="font-semibold mb-2">Select shoe:</label>
                    <select id="shoeSelect" value={shoeId} onChange={handleShoeChange} className="custom-select">
                        <option value="" disabled className="">
                            Select shoe
                        </option>
                        {shoes.map((shoe) => (
                            <option key={shoe.id} value={shoe.id}>
                                {`${shoe.manufacturer} ${shoe.model} - ${shoe.gender}`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col items-center">
                    <label htmlFor="colorSelect" className="font-semibold mb-2">Color:</label>
                    <select id="colorSelect" value={color} onChange={handleColorChange} className="custom-select">
                        <option value="" disabled>
                            Select color
                        </option>
                        {colors.map((color) => (
                            <option key={color.id} value={color.id}>
                                {color.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col items-center">
                    <label htmlFor="fileInput" className="font-semibold mb-4">Main Image:</label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                <div>
                    <Button onClick={handleSubmit} disabled={loading} className="my-3">
                        {loading ? "Sending..." : "Add variant"}
                    </Button>
                </div>

                {message && <div>{message}</div>}
            </div>

            <ShoeImageGalleries
                selectedImageGalleryId={selectedImageGalleryId}
                onSelectImageGallery={handleImageGallerySelect}
                type="create"
            />


        </div>
    );
}
