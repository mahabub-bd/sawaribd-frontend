import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { BikeDetailsType } from "@/types";
import { formatDate } from "@/utils/helper";
import Image from "next/image";

const BikeItem = ({
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
  user,
  createdAt,
  nid,
  phoneNumber,
}: BikeDetailsType) => {
  return (
    <div className="md:p-4 p-6 bg-white shadow-2xl rounded-lg">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{`Brand: ${bikeBrand} -- Model: ${bikeModel}`}</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>{phoneNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>NID Number</TableCell>
                  <TableCell>{nid}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>{address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bike Brand</TableCell>
                  <TableCell>{bikeBrand}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Bike Model</TableCell>
                  <TableCell>{bikeModel}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Chassis Number</TableCell>
                  <TableCell>{chassisNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Engine Number</TableCell>
                  <TableCell>{engineNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Manufacturing Year</TableCell>
                  <TableCell>{manufacturingYear}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Odometer (km)</TableCell>
                  <TableCell>{odo}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Registration Status</TableCell>
                  <TableCell>{registrationStatus}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Registration Number</TableCell>
                  <TableCell>{registrationNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Current Photo</TableCell>
                  <TableCell>
                    <Image
                      src={currentPhoto.path}
                      alt="Current Bike Photo"
                      width={150}
                      height={100}
                      className="rounded-lg shadow-xl"
                    />
                  </TableCell>
                  <TableCell>Registration Document</TableCell>
                  <TableCell>
                    <Image
                      src={regDocument.path}
                      alt="Registration Document"
                      width={150}
                      height={100}
                      className="rounded-lg shadow-xl"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Uploaded By</TableCell>
                  <TableCell>{user.name}</TableCell>
                </TableRow>
                {createdAt && (
                  <TableRow>
                    <TableCell>Uploaded At</TableCell>
                    <TableCell>{formatDate(createdAt)}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default BikeItem;
