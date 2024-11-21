"use client"
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import api from '@/lib/api';
import { ACCESS_TOKEN } from '@/lib/utils';
import { useState } from 'react';


export default function EditUserPhoto() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("avatar", selectedFile);

        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            const response = await api.patch("/api/userdetails/update/", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                window.location.reload()
            }
        } catch (error) {
            console.error("Error uploading photo:", error);
            alert("Failed to upload photo. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Popover>
            <PopoverTrigger>
                <div className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mt-3 sm:m-0 rounded-md text-sm font-medium transition-colors">
                    Edit photo
                </div>

            </PopoverTrigger>
            <PopoverContent className="rounded-[12px] min-w-[350px] p-4">
                <div className="flex flex-col items-center">
                    <input
                        type="file"
                        accept="image/*"
                        className="mb-3"
                        onChange={handleFileChange}
                    />
                    <Button onClick={handleUpload} disabled={loading}>
                        {loading ? "Uploading..." : "Upload Photo"}
                    </Button>

                </div>
            </PopoverContent>
        </Popover>

    )
}
