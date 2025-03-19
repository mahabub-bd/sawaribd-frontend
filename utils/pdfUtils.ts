// utils/pdfUtils.ts
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
          line-height: 1.4;
          color: #333;
          margin: 0;
          padding: 10mm; /* 10mm padding for A4 margins */
          font-size: 10px; /* Smaller font size for compact layout */
        }
        .header {
          text-align: center;
          margin-bottom: 10px;
        }
        .header img {
          width: 80px; /* Smaller logo for compact layout */
          height: auto;
          margin-bottom: 5px;
        }
        .header h1 {
          font-size: 16px; /* Smaller title font size */
          margin: 5px 0;
          color: #2563eb;
        }
        .header p {
          margin: 2px 0;
          font-size: 9px; /* Smaller font size for address and phone */
          color: #666;
        }
        h2 {
          font-size: 12px; /* Smaller heading font size */
          margin-top: 10px;
          margin-bottom: 5px;
          color: #2563eb;
        }
        .section {
          margin-bottom: 10px; /* Reduced margin for compact layout */
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 10px; /* Reduced margin for compact layout */
        }
        th, td {
          text-align: left;
          padding: 5px; /* Reduced padding for compact layout */
          border-bottom: 1px solid #e5e7eb;
          font-size: 9px; /* Smaller font size for table content */
        }
        th {
          font-weight: bold;
          width: 40%;
          background-color: #f9fafb;
        }
        .remarks {
          background-color: #f9fafb;
          padding: 5px; /* Reduced padding for compact layout */
          border-radius: 4px;
          border: 1px solid #e5e7eb;
          font-size: 9px; /* Smaller font size for remarks */
        }
        .footer {
          margin-top: 10px; /* Reduced margin for compact layout */
          text-align: center;
          font-size: 8px; /* Smaller font size for footer */
          color: #6b7280;
        }
        @media print {
          body {
            padding: 0;
            margin: 0;
          }
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="https://admin.sawaribd.com/storage/site/VIRZUCWrXi86aqXySwzEFOE5uukekKNvJSTCYV5k.svg" alt="SAWARI Logo" /> 
        
        <p>H-25, R-5, Block-A, Mirpur-2, Dhaka, Dhaka Metro, Dhaka 1216</p>
        <p>Phone: 01766614293</p>
      </div>

      <div class="header-info">
        <div>
          <h2>${bikeBrand.toUpperCase()} ${bikeModel}</h2>
          <p>Engine: ${engineNumber}</p>
          <p>Chassis: ${chassisNumber}</p>
          ${
            registrationNumber
              ? `<p>Registration: ${registrationNumber}</p>`
              : ""
          }
        </div>
        <div>
          <p>Status: <span class="badge ${
            registrationStatus === "Registered"
              ? "badge-success"
              : "badge-destructive"
          }">${registrationStatus}</span></p>
          <p>Date: ${formatDate(createdAt)}</p>
          <p>Recorded by: ${user?.name || "N/A"}</p>
        </div>
      </div>

      <div class="section">
        <h2>Seller Information</h2>
        <table>
          <tr><th>Name</th><td>${name || "N/A"}</td></tr>
          <tr><th>Phone Number</th><td>${phoneNumber || "N/A"}</td></tr>
          <tr><th>NID Number</th><td>${nid || "N/A"}</td></tr>
          <tr><th>Address</th><td>${address || "N/A"}</td></tr>
        </table>
      </div>

      <div class="section">
        <h2>Bike Details</h2>
        <table>
          <tr><th>Bike Brand</th><td>${bikeBrand.toUpperCase()}</td></tr>
          <tr><th>Bike Model</th><td>${bikeModel}</td></tr>
          <tr><th>Chassis Number</th><td>${chassisNumber}</td></tr>
          <tr><th>Engine Number</th><td>${engineNumber}</td></tr>
          <tr><th>Manufacturing Year</th><td>${
            manufacturingYear || "N/A"
          }</td></tr>
          <tr><th>Odometer (km)</th><td>${odo || "N/A"}</td></tr>
          <tr><th>Registration Status</th><td>${
            registrationStatus || "N/A"
          }</td></tr>
          ${
            registrationNumber
              ? `<tr><th>Registration Number</th><td>${registrationNumber}</td></tr>`
              : ""
          }
        </table>
      </div>

      <div class="section">
        <h2>Witness Information</h2>
        <table>
          <tr><th>Witness Name</th><td>${witnessName || "N/A"}</td></tr>
          <tr><th>Witness Phone</th><td>${witnessPhoneNumber || "N/A"}</td></tr>
          <tr><th>Witness NID</th><td>${witnessNID || "N/A"}</td></tr>
        </table>
      </div>

      <div class="section">
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
      </div>

      <div class="section">
        <h2>Remarks</h2>
        <div class="remarks">
          ${remarks || "No remarks provided"}
        </div>
      </div>

      <div class="footer">
        <p>Generated on ${new Date().toLocaleString()}</p>
        <p>This is a computer-generated document and does not require a signature.</p>
      </div>
    </body>
    </html>
  `;
};
