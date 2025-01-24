"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formPost } from "@/utils/apiServices";
import { CheckIcon, Loader2Icon, Trash2, UploadIcon } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  onUploadSuccess: (attachmentId: string) => void;
  initialImage?: string | null;
  label?: string;
  supportFormat?: string;
}

const formSchema = z.object({
  file: z
    .any()
    .refine((fileList) => fileList instanceof FileList && fileList.length > 0, {
      message: "Please select a file before submitting.",
    })
    .optional(),
});

export default function FileUpload({
  onUploadSuccess,
  initialImage,
  label = "Upload a file",
  supportFormat = "Images, PDF, MP4",
  
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      setFileType(file.type);

      if (file.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(file));
      } else if (file.type === "application/pdf") {
        setPreview(URL.createObjectURL(file)); // Show PDF preview
      } else if (file.type === "video/mp4") {
        setPreview(URL.createObjectURL(file)); // Show video preview
      } else {
        setPreview(file.name); // Show file name for unsupported types
      }
    } else {
      setPreview(initialImage || null);
      setFileType(null);
    }
  };

  const handleDeletePreview = () => {
    setPreview(null);
    setFileType(null);
    form.setValue("file", null as unknown as FileList);
    setUploadSuccess(false);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data.file?.[0]) {
      setIsUploading(true);
      setUploadSuccess(false);
      const formData = new FormData();
      formData.append("file", data.file[0]);

      try {
        const response = await formPost("uploads", formData);
        const fileId = response?.fileData?._id || null;

        onUploadSuccess(fileId);

        setUploadSuccess(true);
        toast.success("File uploaded successfully.");
      } catch (error) {
        console.error("File upload error:", error);
        toast.error("Failed to upload file.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="mx-auto p-4 border rounded-lg shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800 font-medium mb-2">
                  {label}
                </FormLabel>
                <FormControl>
                  {!preview && (
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <label
                        htmlFor="file-upload"
                        className="w-full cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 hover:border-primary-light hover:bg-gray-50 transition"
                      >
                        <UploadIcon size={20} className="text-gray-400 mb-2" />
                        <span className="text-gray-600 text-sm font-medium">
                          Click to upload
                        </span>
                        <span className="text-xs text-gray-500 py-1">
                          {supportFormat}
                        </span>
                        <Input
                          id="file-upload"
                          type="file"
                          accept="image/*,application/pdf,.pdf,video/mp4"
                          onChange={(event) => {
                            field.onChange(event.target.files);
                            handleFileChange(event.target.files);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {preview && (
            <div className="relative flex flex-col items-center ">
              {fileType?.startsWith("image/") && (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-36  object-cover rounded-md border shadow"
                />
              )}
              {fileType === "application/pdf" && (
                <iframe
                  src={preview}
                  title="PDF Preview"
                  className="h-36 w-40  border overflow-hidden"
                ></iframe>
              )}
              {fileType === "video/mp4" && (
                <video
                  src={preview}
                  controls
                  className="h-36 w-40    rounded-md shadow overflow-hidden"
                />
              )}
              {fileType && !fileType.startsWith("image/") && (
                <div className="text-sm text-gray-700 mb-4">
                  <p>File: {preview}</p>
                </div>
              )}
              <button
                type="button"
                onClick={handleDeletePreview}
                className="mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                <Trash2 size={18} />
              </button>

              {uploadSuccess && (
                <div className="mt-4 flex items-center space-x-2 text-green-600">
                  <CheckIcon size={20} />
                  <span className="text-sm">Upload successful!</span>
                </div>
              )}
            </div>
          )}

          <Button className="w-full" disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2Icon className="animate-spin" size={18} />
                <span className="ml-2">Uploading...</span>
              </>
            ) : (
              <>
                <UploadIcon size={18} />
                <span className="ml-2">Upload File</span>
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
