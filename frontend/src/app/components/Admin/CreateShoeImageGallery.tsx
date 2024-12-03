"use client";
import Image from "next/image";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { ACCESS_TOKEN } from "@/lib/utils";
import { getAvailableFilters } from "@/lib/userActions";

export default function CreateShoeImageGallery() {
    const [file1, setFile1] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);
    const [file3, setFile3] = useState<File | null>(null);
    const [file4, setFile4] = useState<File | null>(null);
    const [color, setColor] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [colors, setColors] = useState<string[]>([]);
    const [shoes, setShoes] = useState<{ id: string, manufacturer: string, model: string, gender: string }[]>([]);

    useEffect(() => {
        const fetchColorsAndShoes = async () => {
            try {
                const filters = await getAvailableFilters();
                if (filters) {
                    setColors(filters.color.map((color: string) => color.toLowerCase()));
                }

                const response = await api.get("/api/shoelist/");
                setShoes(response.data.map((shoe: any) => ({
                    id: shoe.id,
                    manufacturer: shoe.manufacturer,
                    model: shoe.model,
                    gender: shoe.gender,
                })));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchColorsAndShoes();
    }, []);

    const handleFileChange = (fileSetter: React.Dispatch<React.SetStateAction<File | null>>, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        fileSetter(file);
    };

    const uploadFiles = async () => {
        if (!file1 || !file2 || !file3 || !file4 || !color || !id) {
            alert("Please fill in all fields and upload all images.");
            return;
        }
    
        const formData = new FormData();
        formData.append("color", color);
        formData.append("shoe", id);
        formData.append("image1", file1);
        formData.append("image2", file2);
        formData.append("image3", file3);
        formData.append("image4", file4);
    
        try {
            const response = await api.post("/api/image-galleries/", formData, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "multipart/form-data",
                },
            });
    
            console.log(response.data);
            alert("Images uploaded successfully!");
        } catch (error) {
            alert(`Failed to upload images: ${error}`);
        }
    };

    return (
        <Popover>
            <PopoverTrigger>
                <div className="w-full h-[120px] flex flex-col items-center justify-center">
                    <span className="text-gray-500">
                        Upload new shoe image gallery.
                    </span>
                    <Image src={"/img/edit.svg"} width={20} height={20} alt="editButton" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="rounded-[12px] min-w-[350px] text-black">
                <div className="border-2 rounded-[12px] px-9 py-5">
                    <div className="flex flex-col mb-4">
                        <label className="font-medium mb-2">Select Shoe:</label>
                        <select
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            className="p-2 bg-gray-300 border-2 border-gray-700 rounded"
                        >
                            <option value="">Select a shoe</option>
                            {shoes.map((shoe) => (
                                <option key={shoe.id} value={shoe.id}>
                                    {`${shoe.manufacturer} ${shoe.model} (${shoe.gender})`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="font-medium mb-2">Color:</label>
                        <select
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="p-2 bg-gray-300 border-2 border-gray-700 rounded"
                        >
                            <option value="">Select a color</option>
                            {colors.map((colorOption) => (
                                <option key={colorOption} value={colorOption}>
                                    {colorOption}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-4 mb-4">
                        <label className="font-medium">Upload Images:</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(setFile1, e)}
                            className="mb-2"
                        />
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(setFile2, e)}
                            className="mb-2"
                        />
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(setFile3, e)}
                            className="mb-2"
                        />
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(setFile4, e)}
                            className="mb-2"
                        />
                    </div>
                    <div className="flex justify-center mt-5">
                        <Button onClick={uploadFiles} className="px-12">
                            Upload
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
