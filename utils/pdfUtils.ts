import { formatDate, formatCurrency } from "@/utils/helper";
import type { BikeDetailsType } from "@/types";

export const generateBikePdfContent = (bikeDetails: BikeDetailsType) => {
  const {
    bikeBrand,
    bikeModel,
    engineNumber,
    chassisNumber,
    registrationStatus,
    registrationNumber,
    createdAt,
    user,
    name,
    phoneNumber,
    nid,
    address,
    manufacturingYear,
    odo,
    witnessName,
    witnessPhoneNumber,
    witnessNID,
    keyStatus,
    purchaseAmount,
    securityAmount,
    remarks,
  } = bikeDetails;

  const totalAmount = (purchaseAmount || 0) + (securityAmount || 0);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bike Details - ${bikeBrand.toUpperCase()} ${bikeModel}</title>
      <meta charset="utf-8" />
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 5mm 20mm;
          font-size: 12px;
        }
        .header {
          text-align: center;
          margin-bottom: 5px;
        }
        .header img {
          width: 150px;
          height: auto;
          margin-bottom: 5px;
        }
        .header h1 {
          font-size: 16px;
          margin: 5px 0;
          color: #00A2ED;
        }
        .header p {
          margin: 3px 0;
          font-size: 12px;
          color: #666;
        }
        h2 {
          font-size: 14px;
          margin-top: 12px;
          color: #00A2ED;
          border-bottom: 1px solid #00A2ED;
          padding-bottom: 4px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 10px;
        }
        th, td {
          text-align: left;
          padding: 4px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 12px;
        }
        th {
          font-weight: bold;
          background-color: #f1f5f9;
        }
        .remarks {
          background-color: #f9fafb;
          padding: 4px;
         
          border-bottom: 1px solid #e5e7eb;
          font-size: 12px;
        }
        .footer {
          margin-top: 10px;
          text-align: center;
          font-size: 10px;
          color: #6b7280;
        }
        .signature {
          margin-top: 10px;
          text-align: right;
          font-size: 12px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="https://admin.sawaribd.com/storage/site/VIRZUCWrXi86aqXySwzEFOE5uukekKNvJSTCYV5k.svg" alt="SAWARI Logo" /> 
        <h1>Bike Transaction Details</h1>
        <p>H-25, R-5, Block-A, Mirpur-2, Dhaka, Dhaka Metro, Dhaka 1216</p>
        <p>Phone: 01766614293</p>
      </div>

      <h2>Bike Information</h2>
      <table>
        <tr><th>Bike Brand</th><td>${bikeBrand.toUpperCase()}</td></tr>
        <tr><th>Bike Model</th><td>${bikeModel}</td></tr>
        <tr><th>Engine Number</th><td>${engineNumber}</td></tr>
        <tr><th>Chassis Number</th><td>${chassisNumber}</td></tr>
        <tr><th>Manufacturing Year</th><td>${
          manufacturingYear || "N/A"
        }</td></tr>
        <tr><th>Odometer (km)</th><td>${odo || "N/A"}</td></tr>
        <tr><th>Registration Status</th><td>${registrationStatus}</td></tr>
        ${
          registrationNumber
            ? `<tr><th>Registration Number</th><td>${registrationNumber}</td></tr>`
            : ""
        }
      </table>

      <h2>Seller Information</h2>
      <table>
        <tr><th>Name</th><td>${name || "N/A"}</td></tr>
        <tr><th>Phone Number</th><td>${phoneNumber || "N/A"}</td></tr>
        <tr><th>NID Number</th><td>${nid || "N/A"}</td></tr>
        <tr><th>Address</th><td>${address || "N/A"}</td></tr>
      </table>

      <h2>Transaction Details</h2>
      <table>
        <tr><th>Key Status</th><td>${
          keyStatus === 1 ? "One Key" : "Two Keys"
        }</td></tr>
        <tr><th>Purchase Amount</th><td>${formatCurrency(
          purchaseAmount
        )}</td></tr>
        <tr><th>Security Amount</th><td>${formatCurrency(
          securityAmount
        )}</td></tr>
        <tr><th>Total Amount</th><td>${formatCurrency(totalAmount)}</td></tr>
      </table>

      <h2>Remarks</h2>
      <div class="remarks">
        ${remarks || "No remarks provided"}
      </div>

      <div class="signature">
        <p>_________________________</p>
        <p>Authorized Signatory</p>
        <p>SAWARI</p>
      </div>

      <div class="footer">
        <p>Generated on ${new Date().toLocaleString()}</p>
       
    </body>
    </html>
  `;
};
