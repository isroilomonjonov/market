import axiosInstance, { imageURL } from '@/utils/axiosInstance';
import { useState } from 'react';
import { toast } from './ui/use-toast';
import { X } from 'lucide-react';
import { ImageType } from './products/createProduct';
const ImageUploader = ({ selectedImage, setSelectedImage }: { selectedImage: ImageType | null, setSelectedImage: (e: ImageType | null) => void }) => {
    const userImageHandler = async ({ target: { files } }: { target: { files: any } }) => {
        const formData = new FormData();
        const fileSize = files[0].size;
        const maxSize = 10 * 1024 * 1024;
        if (fileSize < maxSize) {
            formData.append('img', files[0]);
            if (files[0].type === "image/png" || files[0].type === "image/svg+xml" || files[0].type === "image/jpeg" || files[0].type === "image/webp") {
                try {
                    const res = await axiosInstance({
                        url: "attachments/",
                        method: "POST",
                        data: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    setSelectedImage(res.data.data.newAttachment)
                } catch (err) {
                }
            } else {
                toast({ title: "Noto'g'ri fayl turini yuklamoqdasiz faqat |PNG|SVG|JPEG|WEBP| turidagi fayllarni yuklashingiz mumkin!" })
            }
        } else {
            toast({ title: "Maksimum yuklanvotgan rasm 10mg dan oshmasligi zarur!" })
        }
    }
    return (
        <div>
            <label className="cursor-pointer">
                <input
                    type="file"
                    accept=".png, .jpg, .webp, .svg"
                    className="hidden"
                    onChange={event => userImageHandler(event)}
                />
                <div className="relative max-w-64 max-h-64">
                    {selectedImage?.name && <button className="absolute top-0 left-[90%] lg:left-[100%] z-10" onClick={() => setSelectedImage(null)}>
                        <X className='w-10 h-10' /></button>}
                    {selectedImage ? <img src={`${selectedImage?.name ? `${imageURL}${selectedImage?.name}` : "/user.png"}`} /> :
                        <p>Rasm tanlash</p>}
                </div>
            </label >
        </div>
    );
};

export default ImageUploader;
