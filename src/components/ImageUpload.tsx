
import { useState, useRef } from 'react';
import { Upload, Camera, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div
        className={`
          p-12 text-center transition-all duration-300 cursor-pointer
          ${isDragOver 
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-dashed border-green-400' 
            : 'bg-white/70 backdrop-blur-sm border-2 border-dashed border-gray-300 hover:border-green-400 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="space-y-6">
          <div className={`
            w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-300
            ${isDragOver ? 'bg-green-600 scale-110' : 'bg-gradient-to-br from-green-500 to-emerald-500'}
          `}>
            <Upload className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-800">
              Envie uma Foto do seu Prato
            </h3>
            <p className="text-gray-600">
              Arraste e solte uma foto da refeição ou clique para selecionar
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Camera className="w-4 h-4" />
              <span>Foto do prato</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ImageIcon className="w-4 h-4" />
              <span>JPG, PNG</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="mt-4 border-green-200 text-green-600 hover:bg-green-50"
          >
            Selecionar Arquivo
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ImageUpload;
