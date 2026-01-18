import Image from "next/image";
import { useRef } from "react";
import { FiEdit, FiUploadCloud } from "react-icons/fi";

type TImageUploadPreviewProps = {
  label?: string;
  value?: string | null;
  onChange: (file: File) => void;
  className?: string;
};

const ImageUploadPreview = ({
  label,
  value,
  onChange,
  className,
}: TImageUploadPreviewProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange(file);
    }
  };

  return (
    <div className={className}>
      <div
        onClick={handleImageClick}
        className="border-2 border-dashed border-primary bg-primary/5 rounded-lg h-50 flex flex-col justify-center items-center"
      >
        {value ? (
          <div className="relative w-full max-w-[190px] h-[190px] overflow-hidden rounded-lg bg-white">
            <Image
              src={value}
              alt="preview product"
              fill
              className="object-cover"
              sizes="190px"
            />
            <div className="opacity-0 hover:opacity-100 absolute inset-0 flex items-center gap-2 justify-center bg-black/60 text-white text-xs">
              <FiEdit />
              Change Image
            </div>
          </div>
        ) : (
          <>
            <FiUploadCloud className="text-primary" size={24} />
            <span className="text-sm font-medium">Click to Upload</span>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUploadPreview;
