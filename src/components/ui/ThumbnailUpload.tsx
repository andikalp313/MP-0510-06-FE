import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ThumbnailUploadProps {
  onImageChange: (file: File | null) => void;
}

const ThumbnailUpload: React.FC<ThumbnailUploadProps> = ({ onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage("");
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <Label>Event Thumbnail</Label>
      {selectedImage ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative space-y-4"
        >
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg shadow-md">
            <Image
              src={selectedImage}
              alt="Thumbnail"
              className="object-cover transition-transform duration-300 hover:scale-110"
              fill
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={handleRemoveImage}
            size="sm"
            className="absolute right-2 top-2 opacity-80 transition-opacity duration-200 hover:opacity-100"
          >
            Remove
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          />
        </motion.div>
      )}
    </div>
  );
};

export default ThumbnailUpload;
