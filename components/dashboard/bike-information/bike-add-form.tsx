import { SubmitButton } from "@/components/auth/submit-button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { brands } from "@/constants";
import { Brand } from "@/types";
import { postData } from "@/utils/apiServices";
import { serverRevalidate } from "@/utils/revalidatePath";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FileUpload from "../FileUpload";

const bikeAddSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  nid: z.coerce.number().int().min(1000000000).max(9999999999),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters."),
  address: z.string().min(5, "Address is required."),
  bikeBrand: z.string().min(2, "Bike brand is required."),
  bikeModel: z.string().min(2, "Bike model is required."),
  engineNumber: z.string().min(3, "Engine number is required."),
  chassisNumber: z.string().min(3, "Chassis number is required."),
  manufacturingYear: z.coerce
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear()),
  registrationStatus: z.enum(["On Test", "Registered"]),
  registrationNumber: z.string().optional(),
  odo: z.coerce
    .number()
    .min(2, { message: "Odometer reading must be a positive number." }),
  regDocument: z.string().optional(),
  currentPhoto: z.string().optional(),
  sellingVideo: z.string().optional(),
  witnessName: z.string().min(2, "Witness name must be at least 2 characters."),
  witnessPhoneNumber: z.string().min(10, "Witness phone number must be valid."),
  witnessNID: z.coerce.number().min(1000000000).max(9999999999),
  witnessNIDPhoto: z.string(), // Assume it's a file path as a string.
  sellerNIDandDLPhoto: z.string(), // Assume it's also a file path.
  keyStatus: z.coerce.number().min(0, "Key status must be a valid number."),
  purchaseAmount: z.coerce
    .number()
    .positive("Purchase amount must be positive."),
  securityAmount: z.coerce
    .number()
    .positive("Security amount must be positive."),
  remarks: z.string().optional(),
});

const placeholders: Record<string, string> = {
  name: "Enter User Name",
  nid: "Enter National ID Number",
  phoneNumber: "Enter Phone Number",
  address: "Enter Address",
  bikeBrand: "Enter Bike Brand",
  bikeModel: "Enter Bike Model",
  engineNumber: "Enter Engine Number",
  chassisNumber: "Enter Chassis Number",
  manufacturingYear: "Enter Manufacturing Year",
  odo: "Enter Odometer Reading (Optional)",
  registrationNumber: "Enter Registration Number (Optional)",
  witnessName: "Enter Witness Name",
  witnessPhoneNumber: "Enter Witness Phone Number",
  witnessNID: "Enter Witness NID",
  keyStatus: "Enter Key Status",
  purchaseAmount: "Enter Purchase Amount",
  securityAmount: "Enter Security Amount",
  remarks: "Enter Remarks (Optional)",
};

const labels: Record<string, string> = {
  name: "Name",
  nid: "National ID Number",
  phoneNumber: "Phone Number",
  address: "Address",
  bikeBrand: "Bike Brand",
  bikeModel: "Bike Model",
  engineNumber: "Engine Number",
  chassisNumber: "Chassis Number",
  manufacturingYear: "Manufacturing Year",
  odo: "Odometer Reading",
  registrationNumber: "Registration Number",
  witnessName: "Witness Name",
  witnessPhoneNumber: "Witness Phone Number",
  witnessNID: "Witness NID",
  witnessNIDPhoto: "Witness NID Photo",
  sellerNIDandDLPhoto: "Seller NID & DL Photo",
  keyStatus: "Key Status",
  purchaseAmount: "Purchase Amount",
  securityAmount: "Security Amount",
  remarks: "Remarks",
};

interface BikeAddFormProps {
  isOpen: (value: boolean) => void;
}

const BikeAddForm: React.FC<BikeAddFormProps> = ({ isOpen }) => {
  const form = useForm<z.infer<typeof bikeAddSchema>>({
    resolver: zodResolver(bikeAddSchema),
    defaultValues: {
      name: "",
      nid: 0,
      phoneNumber: "",
      address: "",
      bikeBrand: "all",
      bikeModel: "",
      engineNumber: "",
      chassisNumber: "",
      manufacturingYear: new Date().getFullYear(),
      registrationStatus: "On Test",
      registrationNumber: "",
      odo: 0,
      witnessName: "",
      witnessPhoneNumber: "",
      witnessNID: 0,
      witnessNIDPhoto: "",
      sellerNIDandDLPhoto: "",
      keyStatus: 1,
      purchaseAmount: 0,
      securityAmount: 0,
      remarks: "",
    },
  });

  const handleUploadSuccess =
    (field: keyof z.infer<typeof bikeAddSchema>) => (attachmentId: string) => {
      form.setValue(field, attachmentId);
      toast.success(`${field} uploaded successfully.`);
    };

  const onSubmit: SubmitHandler<z.infer<typeof bikeAddSchema>> = async (
    values
  ) => {
    console.log(values);

    try {
      await postData("bike-information", values);
      toast.success("Bike information added successfully.");
      serverRevalidate("/dashboard/bikes");
      isOpen(false);
    } catch (error) {
      toast.error("Failed to add bike information.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <FileUpload
          onUploadSuccess={handleUploadSuccess("currentPhoto")}
          label="Current Bike Photo"
        />
        <FileUpload
          onUploadSuccess={handleUploadSuccess("regDocument")}
          label="Registration Document"
        />
        <FileUpload
          onUploadSuccess={handleUploadSuccess("sellingVideo")}
          label="Selling Video"
        />

        <FileUpload
          onUploadSuccess={handleUploadSuccess("witnessNIDPhoto")}
          label="Witness NID Photo"
        />
        <FileUpload
          onUploadSuccess={handleUploadSuccess("sellerNIDandDLPhoto")}
          label="Seller NID & DL Photo"
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Object.keys(form.getValues()).map((key) => {
              if (
                [
                  "regDocument",
                  "currentPhoto",
                  "sellingVideo",
                  "witnessNIDPhoto",
                  "sellerNIDandDLPhoto",
                ].includes(key)
              ) {
                return null;
              }

              if (key === "registrationStatus") {
                return (
                  <FormField
                    key={key}
                    control={form.control}
                    name="registrationStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Registration Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="On Test">On Test</SelectItem>
                              <SelectItem value="Registered">
                                Registered
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              }

              if (key === "bikeBrand") {
                return (
                  <FormField
                    key={key}
                    control={form.control}
                    name="bikeBrand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bike Brand</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Bike Brand" />
                            </SelectTrigger>
                            <SelectContent>
                              {brands.map((brand: Brand) => (
                                <SelectItem key={brand.id} value={brand.id}>
                                  {brand.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              }
              if (key === "keyStatus") {
                return (
                  <FormField
                    key={key}
                    control={form.control}
                    name="keyStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value.toString()}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Key Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">One</SelectItem>
                              <SelectItem value="2">Two</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              }
              return (
                <FormField
                  key={key}
                  control={form.control}
                  name={key as keyof z.infer<typeof bikeAddSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{labels[key] || key}</FormLabel>
                      <FormControl>
                        <Input
                          type={
                            ["manufacturingYear", "nid", "odo"].includes(key)
                              ? "number"
                              : "text"
                          }
                          {...field}
                          placeholder={placeholders[key] || `Enter ${key}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={() => isOpen(false)}
            >
              Cancel
            </Button>
            <SubmitButton>Save</SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BikeAddForm;
