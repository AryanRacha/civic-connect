import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card"; // Assuming this Card component
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "../lib/utils";

interface ImageUploaderProps {
  onImagesChange: (files: File[]) => void;
  maxImages?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesChange,
  maxImages = 5,
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setImagePreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFilesToAdd: File[] = [];
    let currentTotal = images.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/") && currentTotal < maxImages) {
        newFilesToAdd.push(file);
        currentTotal++;
      } else if (currentTotal >= maxImages) {
        break;
      }
    }

    if (newFilesToAdd.length > 0) {
      const updatedImages = [...images, ...newFilesToAdd];
      setImages(updatedImages);
      onImagesChange(updatedImages);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const openFileDialog = () => {
    if (images.length < maxImages) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      <Card
        className={cn(
          // Apply styling to the Card itself
          "border-2 border-dashed p-0 cursor-pointer transition-colors", // Removed padding here, will add to inner div
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400",
          images.length >= maxImages && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* Wrap content in a div and apply drag handlers and internal padding here */}
        <div
          className="p-8 text-center" // Add desired padding and text alignment to this inner div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog} // Keep the click handler here
          // Ensure it fills the Card if Card has specific height or min-height
          style={{
            minHeight: "120px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <div className="text-sm text-gray-600">
              {images.length >= maxImages ? (
                `Maximum ${maxImages} images reached`
              ) : (
                <>
                  <span className="font-medium">Click to upload</span> or drag
                  and drop
                </>
              )}
            </div>
            <div className="text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB ({images.length}/{maxImages})
            </div>
          </div>
        </div>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((file, index) => (
            <div key={index} className="relative group">
              <Card className="overflow-hidden">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {imagePreviews[index] ? (
                    <img
                      src={imagePreviews[index]}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="p-2">
                  <div className="text-xs text-gray-600 truncate">
                    {file.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </div>
                </div>
              </Card>
              <Button
                variant="outline"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-red-500 text-white border-red-500 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
