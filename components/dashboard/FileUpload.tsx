"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
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
import {
  CheckIcon,
  Loader2Icon,
  UploadIcon,
  FileIcon,
  FileTextIcon,
  VideoIcon,
  XIcon,
  RefreshCwIcon,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  onUploadSuccess: (attachmentId: string) => void;
  initialImage?: string | null;
  label?: React.ReactNode;
  supportFormat?: string;
  className?: string;
  preventFormSubmit?: boolean;
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
  className,
  preventFormSubmit = false,
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      setFileType(file.type);
      setFileName(file.name);

      if (file.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(file));
      } else if (file.type === "application/pdf") {
        setPreview(URL.createObjectURL(file)); // Show PDF preview
      } else if (file.type === "video/mp4") {
        setPreview(URL.createObjectURL(file)); // Show video preview
      } else {
        setPreview(null); // No preview for unsupported types
      }

      // Reset states
      setUploadSuccess(false);
      setShowSuccessMessage(false);
      setUploadProgress(0);

      // Auto-upload when file is selected
      handleUpload(file);
    } else {
      setPreview(initialImage || null);
      setFileType(null);
      setFileName(null);
    }
  };

  const handleDeletePreview = (e: React.MouseEvent) => {
    if (preventFormSubmit) {
      e.preventDefault();
    }

    setPreview(null);
    setFileType(null);
    setFileName(null);
    form.setValue("file", null as unknown as FileList);
    setUploadSuccess(false);
    setShowSuccessMessage(false);
    setUploadProgress(0);

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadSuccess(false);
    setShowSuccessMessage(false);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 95 ? 95 : newProgress;
        });
      }, 300);

      const response = await formPost("uploads", formData);
      const fileId = response?.fileData?._id || null;

      clearInterval(progressInterval);
      setUploadProgress(100);

      onUploadSuccess(fileId);
      setUploadSuccess(true);
      setShowSuccessMessage(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      toast.success("File uploaded successfully.");
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("Failed to upload file.");
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (preventFormSubmit) {
      event?.preventDefault?.();
    }

    if (data.file?.[0]) {
      await handleUpload(data.file[0]);
    }
  };

  const handleBrowseClick = (e: React.MouseEvent) => {
    if (preventFormSubmit) {
      e.preventDefault();
    }

    fileInputRef.current?.click();
  };

  const getFileIcon = () => {
    if (!fileType) return <FileIcon className="h-6 w-6 text-gray-400" />;

    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-6 w-6 text-blue-500" />;
    } else if (fileType === "application/pdf") {
      return <FileTextIcon className="h-6 w-6 text-red-500" />;
    } else if (fileType === "video/mp4") {
      return <VideoIcon className="h-6 w-6 text-purple-500" />;
    }

    return <FileIcon className="h-6 w-6 text-gray-400" />;
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">{label}</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-2">
                      {/* Hidden file input */}
                      <Input
                        ref={fileInputRef}
                        id="file-upload"
                        type="file"
                        accept="image/*,application/pdf,.pdf,video/mp4"
                        onChange={(event) => {
                          if (preventFormSubmit) {
                            event.preventDefault();
                          }
                          field.onChange(event.target.files);
                          handleFileChange(event.target.files);
                        }}
                        className="hidden"
                      />

                      {/* Upload area */}
                      {!preview && !isUploading && !uploadSuccess && (
                        <div
                          onClick={handleBrowseClick}
                          className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 hover:border-primary hover:bg-accent/50 transition-colors"
                        >
                          <UploadIcon
                            size={24}
                            className="text-muted-foreground mb-2"
                          />
                          <span className="text-sm font-medium">
                            Click to upload
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            {supportFormat}
                          </span>
                        </div>
                      )}

                      {/* Loading state with progress bar */}
                      {isUploading && (
                        <div className="flex flex-col space-y-2 p-3 border rounded-lg bg-accent/30">
                          <div className="flex items-center">
                            <Loader2Icon className="animate-spin h-5 w-5 text-primary mr-2" />
                            <span className="text-sm">Uploading...</span>
                          </div>
                          <Progress value={uploadProgress} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{fileName}</span>
                            <span>{Math.round(uploadProgress)}%</span>
                          </div>
                        </div>
                      )}

                      {/* Success message */}
                      {showSuccessMessage && (
                        <div className="flex items-center justify-center p-3 border rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 transition-all duration-300 animate-in fade-in">
                          <CheckIcon className="h-5 w-5 mr-2" />
                          <span className="text-sm font-medium">
                            Upload complete!
                          </span>
                        </div>
                      )}

                      {/* Preview area */}
                      {(preview || (uploadSuccess && fileName)) && (
                        <div
                          className={cn(
                            "relative border rounded-lg overflow-hidden transition-all duration-300",
                            uploadSuccess
                              ? "border-green-200 dark:border-green-800"
                              : "border-border"
                          )}
                        >
                          {/* Preview content */}
                          <div className="flex items-center p-2">
                            {fileType?.startsWith("image/") && preview ? (
                              <div className="relative w-full aspect-video flex items-center justify-center bg-accent/30">
                                <img
                                  src={preview || "/placeholder.svg"}
                                  alt="Preview"
                                  className="max-h-32 max-w-full object-contain"
                                />
                              </div>
                            ) : fileType === "application/pdf" && preview ? (
                              <div className="flex items-center space-x-2 p-2">
                                <FileTextIcon className="h-5 w-5 text-red-500" />
                                <span className="text-sm truncate max-w-[180px]">
                                  {fileName}
                                </span>
                              </div>
                            ) : fileType === "video/mp4" && preview ? (
                              <div className="relative w-full aspect-video flex items-center justify-center bg-accent/30">
                                <video
                                  src={preview}
                                  controls
                                  className="max-h-32 max-w-full"
                                />
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2 p-2">
                                {getFileIcon()}
                                <span className="text-sm truncate max-w-[180px]">
                                  {fileName}
                                </span>
                              </div>
                            )}

                            {/* Success indicator */}
                            {uploadSuccess && (
                              <div className="absolute top-2 right-10">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-1.5 rounded-full">
                                        <CheckIcon size={16} />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Upload successful</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            )}
                          </div>

                          {/* Action buttons */}
                          <div className="absolute top-2 right-2 flex space-x-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={handleDeletePreview}
                                  >
                                    <XIcon size={14} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Remove file</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={handleBrowseClick}
                                  >
                                    <RefreshCwIcon size={14} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Replace file</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
