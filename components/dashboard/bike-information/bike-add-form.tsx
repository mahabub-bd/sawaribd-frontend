"use client";

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
import type { Brand } from "@/types";
import { postData } from "@/utils/apiServices";
import { serverRevalidate } from "@/utils/revalidatePath";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useMemo } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FileUpload from "../FileUpload";

const bikeAddSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  nid: z.coerce.number().int().min(10, "NID must be at least 10 characters."),
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
  witnessNID: z.coerce
    .number()
    .int()
    .min(10, "NID must be at least 10 characters."),
  witnessNIDPhoto: z.string(), // Assume it's a file path as a string.
  sellerNIDPhoto: z.string(), // Separated seller NID photo
  sellerDLPhoto: z.string().optional(), // Separated seller DL photo (optional)
  keyStatus: z.coerce.number().min(0, "Key status must be a valid number."),
  purchaseAmount: z.coerce
    .number()
    .positive("Purchase amount must be positive."),
  securityAmount: z.coerce
    .number()
    .positive("Security amount must be positive."),
  remarks: z.string().optional(),
});

type BikeFormValues = z.infer<typeof bikeAddSchema>;

// Moved to constants for better organization
const UPLOAD_FIELDS = [
  "currentPhoto",
  "witnessNIDPhoto",
  "sellerNIDPhoto",
  "sellerDLPhoto",
  "regDocument",
  "sellingVideo",
] as const;

const FIELD_CONFIGS = {
  currentPhoto: {
    label: "Current Bike Photo",
    supportFormat: "Supported formats: JPG, PNG",
  },
  witnessNIDPhoto: {
    label: "Witness NID Photo",
    supportFormat: "Supported formats: JPG, PNG",
  },
  sellerNIDPhoto: {
    label: "Seller NID Photo",
    supportFormat: "Supported formats: JPG, PNG",
  },
  sellerDLPhoto: {
    label: "Seller DL Photo",
    supportFormat: "Supported formats: JPG, PNG",
  },
  regDocument: {
    label: "Registration Document",
    supportFormat: "Supported formats: JPG, PNG, PDF",
  },
  sellingVideo: {
    label: "Selling Video",
    supportFormat: "Supported formats: MP4",
  },
};

const FIELD_LABELS: Record<keyof BikeFormValues, string> = {
  name: "Name",
  nid: "National ID Number",
  phoneNumber: "Phone Number",
  address: "Address",
  bikeBrand: "Bike Brand",
  bikeModel: "Bike Model",
  engineNumber: "Engine Number",
  chassisNumber: "Chassis Number",
  manufacturingYear: "Manufacturing Year",
  registrationStatus: "Registration Status",
  registrationNumber: "Registration Number",
  odo: "Odometer Reading",
  regDocument: "Registration Document",
  currentPhoto: "Current Photo",
  sellingVideo: "Selling Video",
  witnessName: "Witness Name",
  witnessPhoneNumber: "Witness Phone Number",
  witnessNID: "Witness NID",
  witnessNIDPhoto: "Witness NID Photo",
  sellerNIDPhoto: "Seller NID Photo",
  sellerDLPhoto: "Seller DL Photo",
  keyStatus: "Key Status",
  purchaseAmount: "Purchase Amount",
  securityAmount: "Security Amount",
  remarks: "Remarks",
};

const FIELD_PLACEHOLDERS: Record<keyof BikeFormValues, string> = {
  name: "Enter Name",
  nid: "Enter National ID Number",
  phoneNumber: "Enter Phone Number",
  address: "Enter Address",
  bikeBrand: "Select Bike Brand",
  bikeModel: "Enter Bike Model",
  engineNumber: "Enter Engine Number",
  chassisNumber: "Enter Chassis Number",
  manufacturingYear: "Enter Manufacturing Year",
  registrationStatus: "Select Registration Status",
  registrationNumber: "Enter Registration Number (Optional)",
  odo: "Enter Odometer Reading",
  regDocument: "",
  currentPhoto: "",
  sellingVideo: "",
  witnessName: "Enter Witness Name",
  witnessPhoneNumber: "Enter Witness Phone Number",
  witnessNID: "Enter Witness NID",
  witnessNIDPhoto: "",
  sellerNIDPhoto: "",
  sellerDLPhoto: "",
  keyStatus: "Select Key Status",
  purchaseAmount: "Enter Purchase Amount",
  securityAmount: "Enter Security Amount",
  remarks: "Enter Remarks (Optional)",
};

interface BikeAddFormProps {
  isOpen: (value: boolean) => void;
}

const BikeAddForm: React.FC<BikeAddFormProps> = ({ isOpen }) => {
  const form = useForm<BikeFormValues>({
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
      regDocument: "",
      currentPhoto: "",
      sellingVideo: "",
      witnessName: "",
      witnessPhoneNumber: "",
      witnessNID: 0,
      witnessNIDPhoto: "",
      sellerNIDPhoto: "",
      sellerDLPhoto: "",
      keyStatus: 1,
      purchaseAmount: 0,
      securityAmount: 0,
      remarks: "",
    },
  });

  const handleUploadSuccess =
    (field: keyof BikeFormValues) => (attachmentId: string) => {
      form.setValue(field, attachmentId);
      toast.success(`${FIELD_LABELS[field]} uploaded successfully.`);
    };

  const onSubmit: SubmitHandler<BikeFormValues> = async (values) => {
    try {
      await postData("bike-information", values);
      toast.success("Bike information added successfully.");
      serverRevalidate("/dashboard/bikes");
      isOpen(false);
    } catch (error) {
      toast.error("Failed to add bike information.");
      console.error("Error submitting form:", error);
    }
  };

  // Get form fields excluding upload fields
  const formFields = useMemo(() => {
    return Object.keys(form.getValues()).filter(
      (key) => !UPLOAD_FIELDS.includes(key as any)
    ) as Array<keyof BikeFormValues>;
  }, [form]);

  const renderFormField = (fieldName: keyof BikeFormValues) => {
    // Special handling for select fields
    if (fieldName === "registrationStatus") {
      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{FIELD_LABELS[fieldName]}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={FIELD_PLACEHOLDERS[fieldName]} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="On Test">On Test</SelectItem>
                    <SelectItem value="Registered">Registered</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    if (fieldName === "bikeBrand") {
      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{FIELD_LABELS[fieldName]}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={FIELD_PLACEHOLDERS[fieldName]} />
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

    if (fieldName === "keyStatus") {
      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{FIELD_LABELS[fieldName]}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) =>
                    field.onChange(Number.parseInt(value))
                  }
                  defaultValue={field.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={FIELD_PLACEHOLDERS[fieldName]} />
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

    // Default input field
    return (
      <FormField
        key={fieldName}
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{FIELD_LABELS[fieldName]}</FormLabel>
            <FormControl>
              <Input
                type={
                  [
                    "manufacturingYear",
                    "nid",
                    "odo",
                    "witnessNID",
                    "purchaseAmount",
                    "securityAmount",
                  ].includes(fieldName)
                    ? "number"
                    : "text"
                }
                {...field}
                placeholder={FIELD_PLACEHOLDERS[fieldName]}
                value={
                  field.value === 0 &&
                  [
                    "nid",
                    "witnessNID",
                    "odo",
                    "purchaseAmount",
                    "securityAmount",
                  ].includes(fieldName)
                    ? ""
                    : field.value
                }
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    [
                      "nid",
                      "witnessNID",
                      "odo",
                      "purchaseAmount",
                      "securityAmount",
                      "manufacturingYear",
                    ].includes(fieldName) &&
                    value === ""
                  ) {
                    field.onChange(0);
                  } else {
                    field.onChange(e);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {UPLOAD_FIELDS.map((field) => (
          <FileUpload
            key={field}
            onUploadSuccess={handleUploadSuccess(field)}
            label={FIELD_CONFIGS[field].label}
            supportFormat={FIELD_CONFIGS[field].supportFormat}
          />
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {formFields.map(renderFormField)}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
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
