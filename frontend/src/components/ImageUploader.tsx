"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "./ui/Button"
import { Card } from "./ui/Card"
import { X, Upload, ImageIcon } from "lucide-react"
import { cn } from "../lib/utils"

interface ImageUploaderProps {
  onImagesChange: (files: File[]) => void
  maxImages?: number
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesChange, maxImages = 5 }) => {
  const [images, setImages] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files).filter(
      (file) => file.type.startsWith("image/") && images.length + 1 <= maxImages,
    )

    const updatedImages = [...images, ...newFiles].slice(0, maxImages)
    setImages(updatedImages)
    onImagesChange(updatedImages)
  }

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)
    onImagesChange(updatedImages)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <Card
        className={cn(
          "border-2 border-dashed p-8 text-center cursor-pointer transition-colors",
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400",
          images.length >= maxImages && "opacity-50 cursor-not-allowed",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={images.length < maxImages ? openFileDialog : undefined}
      >
        <div className="flex flex-col items-center space-y-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <div className="text-sm text-gray-600">
            {images.length >= maxImages ? (
              `Maximum ${maxImages} images reached`
            ) : (
              <>
                <span className="font-medium">Click to upload</span> or drag and drop
              </>
            )}
          </div>
          <div className="text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB ({images.length}/{maxImages})
          </div>
        </div>
      </Card>

      <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleInputChange} className="hidden" />

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((file, index) => (
            <div key={index} className="relative group">
              <Card className="overflow-hidden">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="p-2">
                  <div className="text-xs text-gray-600 truncate">{file.name}</div>
                  <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</div>
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
  )
}
