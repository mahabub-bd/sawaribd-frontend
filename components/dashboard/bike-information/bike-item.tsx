"use client";

import { useState, useRef } from "react";
import { Table, TableBody } from "@/components/ui/table";
import type { BikeDetailsType } from "@/types";
import { formatDate, formatCurrency, formatDateTime } from "@/utils/helper";
import { generateBikePdfContent } from "@/utils/pdfUtils";
import ImagePreview from "./image-preview";
import SectionHeading from "./section-heading";
import TableRowData from "./table-row-data";
import VideoPreview from "./video-preview";
import {
  Card,
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
  Printer,
  ChevronDown,
  ChevronUp,
  Clock,
  Tag,
  Info,
  AlertCircle,
  Shield,
  CreditCard,
  CheckCircle,
  Wallet,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { patchData } from "@/utils/apiServices";
import { toast } from "sonner";
import { serverRevalidate } from "@/utils/revalidatePath";

interface BikeItemProps extends BikeDetailsType {
  isLoading?: boolean;
}

const BikeItem = ({ isLoading = false, ...bikeDetails }: BikeItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("details");
  const [securityMoneyReturned, setSecurityMoneyReturned] = useState<boolean>(
    bikeDetails.securityMoneyReturned
  );

  const printRef = useRef<HTMLDivElement>(null);

  async function handlesecurityMoneyReturned() {
    try {
      await patchData("bike-information", bikeDetails._id, {
        securityMoneyReturned: !securityMoneyReturned,
      });
      toast.success(
        `Security money ${securityMoneyReturned ? "not returned" : "returned"}`
      );
      serverRevalidate("/admin-dashboard/bike-information");
      setSecurityMoneyReturned(!securityMoneyReturned);
    } catch (error) {
      toast.error("Failed to update security money status. Please try again.");
    }
  }

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

  const registrationStatusColor =
    bikeDetails.registrationStatus === "Registered" ? "success" : "destructive";

  return (
    <Card className="overflow-hidden border border-border/60 hover:border-border transition-all duration-200 shadow-sm hover:shadow-md">
      <CardHeader className="pb-3 space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <Bike className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col py-4">
              <CardTitle className="text-lg capitalize flex items-center gap-2">
                {`${bikeDetails.bikeBrand} ${bikeDetails.bikeModel}`}
                <Badge
                  variant={
                    registrationStatusColor === "success"
                      ? "default"
                      : "destructive"
                  }
                  className="ml-1"
                >
                  {bikeDetails.registrationStatus}
                </Badge>
              </CardTitle>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1"
              onClick={toggleAccordion}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Collapse</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  <span className="hidden sm:inline">Expand</span>
                </>
              )}
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={handlePrint}
                  >
                    <Printer className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only sm:ml-2">
                      Print
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate PDF</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <div className="inline-flex items-center gap-1 bg-muted/40 px-2 py-1 rounded-md text-sm">
            <Key className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">Engine Number:</span>{" "}
            <span className="text-muted-foreground">
              {bikeDetails.engineNumber}
            </span>
          </div>
          <div className="inline-flex items-center gap-1 bg-muted/40 px-2 py-1 rounded-md text-sm">
            <Tag className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">Chassis Number:</span>{" "}
            <span className="text-muted-foreground">
              {bikeDetails.chassisNumber}
            </span>
          </div>
          {bikeDetails.registrationNumber && (
            <div className="inline-flex items-center gap-1 bg-muted/40 px-2 py-1 rounded-md text-sm">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-medium">Reg:</span>{" "}
              <span className="text-muted-foreground">
                {bikeDetails.registrationNumber}
              </span>
            </div>
          )}
          {bikeDetails.securityAmount > 0 && (
            <div className="inline-flex items-center gap-1 bg-muted/40 px-2 py-1 rounded-md text-sm">
              <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-medium">Security Money:</span>{" "}
              <Badge
                variant={securityMoneyReturned ? "default" : "destructive"}
                className="ml-1 text-xs"
              >
                {securityMoneyReturned ? "Returned" : "Not Returned"}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <>
          <div className="md:px-4 px-2 border-t border-border/60">
            <Tabs
              defaultValue="details"
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0">
                <TabsTrigger
                  value="details"
                  className={cn(
                    "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent",
                    "px-4 py-2 text-sm font-medium"
                  )}
                >
                  <Bike className="h-4 w-4 mr-2" />
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className={cn(
                    "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent",
                    "px-4 py-2 text-sm font-medium"
                  )}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Documents
                </TabsTrigger>
                <TabsTrigger
                  value="transaction"
                  className={cn(
                    "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent",
                    "px-4 py-2 text-sm font-medium"
                  )}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Transaction
                </TabsTrigger>
              </TabsList>

              <div className="p-4" ref={printRef}>
                <TabsContent value="details" className="m-0 pt-2">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
                      <div className="bg-muted/30 px-4 py-2 border-b border-border/60">
                        <SectionHeading icon={<User className="h-4 w-4" />}>
                          Seller Information
                        </SectionHeading>
                      </div>
                      <div className="p-4">
                        <Table>
                          <TableBody>
                            <TableRowData
                              label="Name"
                              value={bikeDetails.name}
                            />
                            <TableRowData
                              label="Phone Number"
                              value={bikeDetails.phoneNumber}
                            />
                            <TableRowData
                              label="NID Number"
                              value={bikeDetails.nid}
                            />
                            <TableRowData
                              label="Address"
                              value={bikeDetails.address}
                            />
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {/* Bike Details */}
                    <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
                      <div className="bg-muted/30 px-4 py-2 border-b border-border/60">
                        <SectionHeading icon={<Bike className="h-4 w-4" />}>
                          Bike Details
                        </SectionHeading>
                      </div>
                      <div className="p-4">
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
                                    registrationStatusColor === "success"
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
                    </div>

                    {/* Witness Information */}
                    <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
                      <div className="bg-muted/30 px-4 py-2 border-b border-border/60">
                        <SectionHeading
                          icon={<UserCheck className="h-4 w-4" />}
                        >
                          Witness Information
                        </SectionHeading>
                      </div>
                      <div className="p-4">
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
                    </div>

                    {/* Remarks */}
                    <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
                      <div className="bg-muted/30 px-4 py-2 border-b border-border/60">
                        <SectionHeading
                          icon={<MessageSquare className="h-4 w-4" />}
                        >
                          Remarks
                        </SectionHeading>
                      </div>
                      <div className="p-4">
                        <div className="p-3 border rounded-md bg-muted/20 text-sm min-h-[80px]">
                          {bikeDetails.remarks || "No remarks provided"}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="m-0 pt-2">
                  <div className="space-y-6">
                    <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
                      <div className="bg-muted/30 px-4 py-2 border-b border-border/60">
                        <SectionHeading icon={<FileText className="h-4 w-4" />}>
                          Identification Documents
                        </SectionHeading>
                      </div>
                      <div className="p-4">
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
                      </div>
                    </div>

                    <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
                      <div className="bg-muted/30 px-4 py-2 border-b border-border/60">
                        <SectionHeading icon={<Bike className="h-4 w-4" />}>
                          Bike Documents
                        </SectionHeading>
                      </div>
                      <div className="p-4">
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
                            title="Deal / Purchase Video"
                            videoUrl={bikeDetails.sellingVideo?.path}
                            alt="Dealing Video"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="transaction" className="m-0 pt-2">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
                      <div className="bg-muted/30 px-4 py-2 border-b border-border/60">
                        <SectionHeading
                          icon={<DollarSign className="h-4 w-4" />}
                        >
                          Transaction Details
                        </SectionHeading>
                      </div>
                      <div className="p-4">
                        <Table>
                          <TableBody>
                            <TableRowData
                              label="Key Status"
                              value={
                                <Badge variant="outline">
                                  {bikeDetails.keyStatus === 1
                                    ? "One Key"
                                    : "Two Keys"}
                                </Badge>
                              }
                            />
                            <TableRowData
                              label="Purchase Amount"
                              value={
                                <span className="font-medium text-green-600 dark:text-green-400">
                                  {formatCurrency(bikeDetails.purchaseAmount)}
                                </span>
                              }
                            />
                            <TableRowData
                              label="Paid Amount"
                              value={
                                <span className="font-medium text-purple-600 dark:text-purple-400">
                                  {formatCurrency(
                                    bikeDetails.purchaseAmount -
                                      bikeDetails.securityAmount
                                  )}
                                </span>
                              }
                            />
                            <TableRowData
                              label="Security Amount"
                              value={
                                <div className="flex items-center gap-3">
                                  <span className="font-medium text-blue-600 dark:text-blue-400">
                                    {formatCurrency(bikeDetails.securityAmount)}
                                  </span>
                                  {bikeDetails.securityAmount > 0 && (
                                    <div
                                      onClick={handlesecurityMoneyReturned}
                                      className={cn(
                                        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer",
                                        securityMoneyReturned
                                          ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/30"
                                          : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/30"
                                      )}
                                    >
                                      {securityMoneyReturned ? (
                                        <>
                                          <Shield className="h-3.5 w-3.5" />
                                          <span>Returned</span>
                                        </>
                                      ) : (
                                        <>
                                          <AlertCircle className="h-3.5 w-3.5" />
                                          <span>Not Returned</span>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                              }
                            />
                            {bikeDetails.securityAmount > 0 && (
                              <TableRowData
                                label="Security Money Status"
                                value={
                                  <div
                                    className={`flex items-center gap-2 ${
                                      securityMoneyReturned
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-amber-600 dark:text-amber-400"
                                    }`}
                                  >
                                    {securityMoneyReturned ? (
                                      <CheckCircle className="h-4 w-4" />
                                    ) : (
                                      <AlertCircle className="h-4 w-4" />
                                    )}
                                    <span className="text-sm">
                                      {securityMoneyReturned
                                        ? "Return Done"
                                        : "Pending Return"}
                                    </span>
                                  </div>
                                }
                              />
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
                      <div className="bg-muted/30 px-4 py-2 border-b border-border/60">
                        <SectionHeading icon={<Info className="h-4 w-4" />}>
                          Record Information
                        </SectionHeading>
                      </div>
                      <div className="p-4">
                        <Table>
                          <TableBody>
                            <TableRowData
                              label="Created By"
                              value={
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span>{bikeDetails.createdBy?.name}</span>
                                </div>
                              }
                            />
                            <TableRowData
                              label="Created At"
                              value={
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>
                                    {formatDateTime(bikeDetails.createdAt)}
                                  </span>
                                </div>
                              }
                            />

                            {bikeDetails.updateBy?.name && (
                              <TableRowData
                                label="Updated By"
                                value={
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span>{bikeDetails.updateBy?.name}</span>
                                  </div>
                                }
                              />
                            )}

                            <TableRowData
                              label="Updated At"
                              value={
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>
                                    {formatDateTime(bikeDetails?.updatedAt)}
                                  </span>
                                </div>
                              }
                            />
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </>
      )}

      <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-3 py-4 px-6 border-t bg-card/5">
        {/* Date information */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 flex-shrink-0" />
          <span>{formatDateTime(bikeDetails.createdAt)}</span>
        </div>

        {/* Financial information */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Purchase Amount Badge (original) */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className="flex items-center gap-2 py-1.5 px-3 border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800"
                >
                  <CreditCard className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-green-700 dark:text-green-400">
                    {formatCurrency(bikeDetails.purchaseAmount)}
                  </span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Purchase Amount</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Security Amount Badge (original with improvements) */}
          {bikeDetails.securityAmount > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className={cn(
                      "flex items-center gap-2 py-1.5 px-3",
                      securityMoneyReturned
                        ? "border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800"
                        : "border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800"
                    )}
                  >
                    <Shield className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-blue-700 dark:text-blue-400">
                      {formatCurrency(bikeDetails.securityAmount)}
                    </span>
                    {!securityMoneyReturned && (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                      </span>
                    )}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>
                    {securityMoneyReturned
                      ? "Security Deposit (Returned)"
                      : "Security Deposit (Pending)"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {/* Paid Amount Badge */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className="flex items-center gap-2 py-1.5 px-3 border-purple-200 bg-purple-50 dark:bg-purple-950/30 dark:border-purple-800"
                >
                  <Wallet className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                  <span className="font-medium text-purple-700 dark:text-purple-400">
                    {formatCurrency(
                      bikeDetails.purchaseAmount - bikeDetails.securityAmount
                    )}
                  </span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Paid Amount </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
};

// Skeleton loader for BikeItem
const BikeItemSkeleton = () => {
  return (
    <Card className="overflow-hidden border border-border/60 shadow-sm">
      <CardHeader className="pb-3 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-md" />
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <Skeleton className="h-8 w-36 rounded-md" />
          <Skeleton className="h-8 w-40 rounded-md" />
          <Skeleton className="h-8 w-32 rounded-md" />
        </div>
      </CardHeader>
      <CardFooter className="py-3 px-6 border-t flex justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-40" />
      </CardFooter>
    </Card>
  );
};

export default BikeItem;
