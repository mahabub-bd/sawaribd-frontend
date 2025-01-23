import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody } from "@/components/ui/table";
import { BikeDetailsType } from "@/types";
import { formatDate } from "@/utils/helper";
import ImagePreview from "./image-preview";
import SectionHeading from "./section-heading";
import TableRowData from "./table-row-data";

const BikeItem = (bikeDetails: BikeDetailsType) => {
  const {
    name,
    address,
    bikeBrand,
    bikeModel,
    engineNumber,
    chassisNumber,
    manufacturingYear,
    odo,
    registrationStatus,
    registrationNumber,
    currentPhoto,
    regDocument,
    sellingVideo,
    user,
    createdAt,
    nid,
    phoneNumber,
    witnessName,
    witnessPhoneNumber,
    witnessNID,
    witnessNIDPhoto,
    sellerNIDandDLPhoto,
    keyStatus,
    purchaseAmount,
    securityAmount,
    remarks,
  } = bikeDetails;

  return (
    <div className="md:p-6 p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <Accordion type="single" collapsible>
        <AccordionItem value="bike-details">
          <AccordionTrigger className="text-lg font-semibold text-primary capitalize">
            {`Brand: ${bikeBrand} | Model: ${bikeModel}`}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <SectionHeading>Personal Information</SectionHeading>
                <Table>
                  <TableBody>
                    <TableRowData label="Name" value={name} />
                    <TableRowData label="Phone Number" value={phoneNumber} />
                    <TableRowData label="NID Number" value={nid} />
                    <TableRowData label="Address" value={address} />
                  </TableBody>
                </Table>
              </div>

              {/* Bike Details */}
              <div>
                <SectionHeading>Bike Details</SectionHeading>
                <Table>
                  <TableBody>
                    <TableRowData
                      label="Bike Brand"
                      value={bikeBrand}
                      className="capitalize"
                    />
                    <TableRowData label="Bike Model" value={bikeModel} />
                    <TableRowData
                      label="Chassis Number"
                      value={chassisNumber}
                    />
                    <TableRowData label="Engine Number" value={engineNumber} />
                    <TableRowData
                      label="Manufacturing Year"
                      value={manufacturingYear}
                    />
                    <TableRowData label="Odometer (km)" value={odo} />
                    <TableRowData
                      label="Registration Status"
                      value={
                        <span
                          className={`${
                            registrationStatus === "Registered"
                              ? "text-green-600"
                              : "text-red-600"
                          } font-medium`}
                        >
                          {registrationStatus}
                        </span>
                      }
                    />

                    <TableRowData
                      label="Registration Number"
                      value={registrationNumber}
                    />
                  </TableBody>
                </Table>
              </div>

              {/* Witness Information */}
              <div>
                <SectionHeading>Witness Information</SectionHeading>
                <Table>
                  <TableBody>
                    <TableRowData label="Witness Name" value={witnessName} />
                    <TableRowData
                      label="Witness Phone"
                      value={witnessPhoneNumber}
                    />
                    <TableRowData label="Witness NID" value={witnessNID} />
                  </TableBody>
                </Table>
              </div>

              {/* Photos */}
              <div className="grid md:grid-cols-2 gap-4">
                <ImagePreview
                  title="Witness NID Photo"
                  src={witnessNIDPhoto?.path}
                  alt="Witness NID Photo"
                />
                <ImagePreview
                  title="Seller NID & DL Photo"
                  src={sellerNIDandDLPhoto?.path}
                  alt="Seller NID & DL Photo"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <ImagePreview
                  title="Current Photo"
                  src={currentPhoto?.path}
                  alt="Current Bike Photo"
                />
                <ImagePreview
                  title="Registration Document"
                  src={regDocument?.path}
                  alt="Registration Document"
                />
                <ImagePreview
                  title="Dealing Video"
                  src={sellingVideo?.path}
                  alt="Dealing Video"
                />
              </div>

              {/* Transaction Details */}
              <div>
                <SectionHeading>Transaction Details</SectionHeading>
                <Table>
                  <TableBody>
                    <TableRowData label="Key Status" value={keyStatus} />
                    <TableRowData
                      label="Purchase Amount"
                      value={purchaseAmount}
                    />
                    <TableRowData
                      label="Security Amount"
                      value={securityAmount}
                    />
                  </TableBody>
                </Table>
              </div>

              {/* Additional Information */}
              <div>
                <SectionHeading>Additional Information</SectionHeading>
                <Table>
                  <TableBody>
                    <TableRowData label="Uploaded By" value={user?.name} />
                    <TableRowData
                      label="Uploaded At"
                      value={formatDate(createdAt)}
                    />
                  </TableBody>
                </Table>
              </div>
              <div>
                <SectionHeading>Remarks</SectionHeading>
                <Table>
                  <TableBody>
                    <TableRowData label="Remarks" value={remarks} />
                  </TableBody>
                </Table>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default BikeItem;
