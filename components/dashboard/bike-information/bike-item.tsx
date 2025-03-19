"use client";

import { useState, useMemo, useRef } from "react";
import { Table, TableBody } from "@/components/ui/table";
import type { BikeDetailsType } from "@/types";
import { formatDate, formatCurrency } from "@/utils/helper";
import { generateBikePdfContent } from "@/utils/pdfUtils";
import ImagePreview from "./image-preview";
import SectionHeading from "./section-heading";
import TableRowData from "./table-row-data";
import VideoPreview from "./video-preview";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  User,
  Bike,
  FileText,
  DollarSign,
  MessageSquare,
  Calendar,
  Key,
  UserCheck,
  Eye,
  EyeOff,
  Printer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BikeItemProps extends BikeDetailsType {
  isLoading?: boolean;
}

const BikeItem = ({ isLoading = false, ...bikeDetails }: BikeItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const printRef = useRef<HTMLDivElement>(null);

  const totalAmount = useMemo(
    () => (bikeDetails.purchaseAmount || 0) + (bikeDetails.securityAmount || 0),
    [bikeDetails.purchaseAmount, bikeDetails.securityAmount]
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (!isExpanded) setIsExpanded(true);
  };

  const toggleAccordion = () => setIsExpanded(!isExpanded);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups for this website");
      return;
    }

    const printContent = generateBikePdfContent(bikeDetails);
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.print();
    };
  };

  if (isLoading) {
    return <BikeItemSkeleton />;
  }

  return (
    <Card className="overflow-hidden border-muted shadow-2xl hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-md">
              <Bike className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg capitalize">{`${bikeDetails.bikeBrand} ${bikeDetails.bikeModel}`}</CardTitle>
            <Badge
              variant={
                bikeDetails.registrationStatus === "Registered"
                  ? "default"
                  : "destructive"
              }
              className="ml-1"
            >
              {bikeDetails.registrationStatus}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-sm text-muted-foreground gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(bikeDetails.createdAt)}</span>
              </div>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2"
                    onClick={handlePrint}
                  >
                    <Printer className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:ml-2">
                      Print
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate printable PDF (text only)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <CardDescription className="flex flex-wrap gap-3 mt-2">
          <span className="inline-flex items-center gap-1 bg-muted/30 px-2 py-0.5 rounded-md">
            <Key className="h-3.5 w-3.5" />
            <span className="font-medium">Engine:</span>{" "}
            {bikeDetails.engineNumber}
          </span>
          <span className="inline-flex items-center gap-1 bg-muted/30 px-2 py-0.5 rounded-md">
            <FileText className="h-3.5 w-3.5" />
            <span className="font-medium">Chassis:</span>{" "}
            {bikeDetails.chassisNumber}
          </span>
          {bikeDetails.registrationNumber && (
            <span className="inline-flex items-center gap-1 bg-muted/30 px-2 py-0.5 rounded-md">
              <FileText className="h-3.5 w-3.5" />
              <span className="font-medium">Reg:</span>{" "}
              {bikeDetails.registrationNumber}
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <div className="px-6 py-1 flex justify-between items-center border-t border-b">
        <div className="flex gap-1">
          <button
            onClick={() => handleTabChange("details")}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              activeTab === "details"
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted/50"
            )}
          >
            <Bike className="h-4 w-4" />
            <span>Details</span>
          </button>
          <button
            onClick={() => handleTabChange("documents")}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              activeTab === "documents"
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted/50"
            )}
          >
            <FileText className="h-4 w-4" />
            <span>Documents</span>
          </button>
          <button
            onClick={() => handleTabChange("transaction")}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              activeTab === "transaction"
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted/50"
            )}
          >
            <DollarSign className="h-4 w-4" />
            <span>Transaction</span>
          </button>
        </div>
        <button
          onClick={toggleAccordion}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? (
            <>
              <EyeOff className="h-4 w-4" />
              <span className="hidden sm:inline">Hide</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">View</span>
            </>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="p-6" ref={printRef}>
          {activeTab === "details" && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <SectionHeading icon={<User className="h-4 w-4" />}>
                  Seller Information
                </SectionHeading>
                <Table>
                  <TableBody>
                    <TableRowData label="Name" value={bikeDetails.name} />
                    <TableRowData
                      label="Phone Number"
                      value={bikeDetails.phoneNumber}
                    />
                    <TableRowData label="NID Number" value={bikeDetails.nid} />
                    <TableRowData label="Address" value={bikeDetails.address} />
                  </TableBody>
                </Table>
              </div>

              {/* Bike Details */}
              <div>
                <SectionHeading icon={<Bike className="h-4 w-4" />}>
                  Bike Details
                </SectionHeading>
                <Table>
                  <TableBody>
                    <TableRowData
                      label="Bike Brand"
                      value={bikeDetails.bikeBrand.toUpperCase()}
                      className="capitalize"
                    />
                    <TableRowData
                      label="Bike Model"
                      value={bikeDetails.bikeModel}
                    />
                    <TableRowData
                      label="Chassis Number"
                      value={bikeDetails.chassisNumber}
                    />
                    <TableRowData
                      label="Engine Number"
                      value={bikeDetails.engineNumber}
                    />
                    <TableRowData
                      label="Manufacturing Year"
                      value={bikeDetails.manufacturingYear}
                    />
                    <TableRowData
                      label="Odometer (km)"
                      value={bikeDetails.odo}
                    />
                    <TableRowData
                      label="Registration Status"
                      value={
                        <Badge
                          variant={
                            bikeDetails.registrationStatus === "Registered"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {bikeDetails.registrationStatus}
                        </Badge>
                      }
                    />
                    {bikeDetails.registrationNumber && (
                      <TableRowData
                        label="Registration Number"
                        value={bikeDetails.registrationNumber}
                      />
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Witness Information */}
              <div>
                <SectionHeading icon={<UserCheck className="h-4 w-4" />}>
                  Witness Information
                </SectionHeading>
                <Table>
                  <TableBody>
                    <TableRowData
                      label="Witness Name"
                      value={bikeDetails.witnessName}
                    />
                    <TableRowData
                      label="Witness Phone"
                      value={bikeDetails.witnessPhoneNumber}
                    />
                    <TableRowData
                      label="Witness NID"
                      value={bikeDetails.witnessNID}
                    />
                  </TableBody>
                </Table>
              </div>

              {/* Remarks */}
              <div>
                <SectionHeading icon={<MessageSquare className="h-4 w-4" />}>
                  Remarks
                </SectionHeading>
                <div className="p-3 border rounded-md bg-muted/30 text-sm">
                  {bikeDetails.remarks || "No remarks provided"}
                </div>
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-6">
              <SectionHeading icon={<FileText className="h-4 w-4" />}>
                Identification Documents
              </SectionHeading>
              <div className="grid md:grid-cols-3 gap-4 print:hidden">
                <ImagePreview
                  title="Seller NID Photo"
                  imageUrl={bikeDetails.sellerNIDPhoto?.path}
                  alt="Seller NID Photo"
                />
                <ImagePreview
                  title="Seller DL Photo"
                  imageUrl={bikeDetails.sellerDLPhoto?.path}
                  alt="Seller DL Photo"
                />
                <ImagePreview
                  title="Witness NID Photo"
                  imageUrl={bikeDetails.witnessNIDPhoto?.path}
                  alt="Witness NID Photo"
                />
              </div>

              <SectionHeading icon={<Bike className="h-4 w-4" />}>
                Bike Documents
              </SectionHeading>
              <div className="grid md:grid-cols-3 gap-4 print:hidden">
                <ImagePreview
                  title="Current Bike Photo"
                  imageUrl={bikeDetails.currentPhoto?.path}
                  alt="Current Bike Photo"
                />
                <ImagePreview
                  title="Registration Document"
                  imageUrl={bikeDetails.regDocument?.path}
                  alt="Registration Document"
                />
                <VideoPreview
                  poster={bikeDetails.currentPhoto?.path}
                  title="Dealing Video"
                  videoUrl={bikeDetails.sellingVideo?.path}
                  alt="Dealing Video"
                />
              </div>
            </div>
          )}

          {activeTab === "transaction" && (
            <div className="space-y-6 max-w-md">
              <SectionHeading icon={<DollarSign className="h-4 w-4" />}>
                Transaction Details
              </SectionHeading>
              <Table>
                <TableBody>
                  <TableRowData
                    label="Key Status"
                    value={
                      <Badge variant="outline">
                        {bikeDetails.keyStatus === 1 ? "One Key" : "Two Keys"}
                      </Badge>
                    }
                  />
                  <TableRowData
                    label="Purchase Amount"
                    value={
                      <span className="font-medium text-green-600">
                        {formatCurrency(bikeDetails.purchaseAmount)}
                      </span>
                    }
                  />
                  <TableRowData
                    label="Security Amount"
                    value={
                      <span className="font-medium text-blue-600">
                        {formatCurrency(bikeDetails.securityAmount)}
                      </span>
                    }
                  />
                  <TableRowData
                    label="Total Amount"
                    value={
                      <span className="font-bold text-primary">
                        {formatCurrency(totalAmount)}
                      </span>
                    }
                  />
                </TableBody>
              </Table>

              <SectionHeading icon={<Calendar className="h-4 w-4" />}>
                Record Information
              </SectionHeading>
              <Table>
                <TableBody>
                  <TableRowData
                    label="Recorded By"
                    value={
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{bikeDetails.user?.name}</span>
                      </div>
                    }
                  />
                  <TableRowData
                    label="Recorded At"
                    value={
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(bikeDetails.createdAt)}</span>
                      </div>
                    }
                  />
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}

      <CardFooter className="flex justify-between py-2 px-6 border-t bg-muted/10">
        <div className="text-sm text-muted-foreground">
          ID: {bikeDetails?._id || "N/A"}
        </div>
        <div className="text-sm font-medium">{formatCurrency(totalAmount)}</div>
      </CardFooter>
    </Card>
  );
};

// Skeleton loader for BikeItem
const BikeItemSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-2">
          <Skeleton className="h-6 w-32 rounded-md" />
          <Skeleton className="h-6 w-36 rounded-md" />
          <Skeleton className="h-6 w-28 rounded-md" />
        </div>
      </CardHeader>
      <div className="px-6 py-3 border-t border-b">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </div>
      <CardContent className="p-6">
        <Skeleton className="h-64 w-full rounded-md" />
      </CardContent>
      <CardFooter className="py-2 px-6 border-t flex justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-20" />
      </CardFooter>
    </Card>
  );
};

export default BikeItem;
