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
    createdBy,
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

  const paidAmount = purchaseAmount - securityAmount;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bike Details - ${bikeBrand.toUpperCase()} ${bikeModel}</title>
      <meta charset="utf-8" />
      <style>
        @page {
          size: A4;
          margin: 20mm 10mm 15mm 10mm;
        }
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          font-size: 11px;
          background-color: white;
        }
        .container {
          max-width: 190mm;
          margin: 0 auto;
          padding-top: 10mm;
        }
        .header {
          text-align: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e5e7eb;
        }
        .header img {
          width: 120px;
          height: auto;
          margin-bottom: 8px;
        }
        .header h1 {
          font-size: 18px;
          margin: 8px 0;
          color: #00A2ED;
        }
        .header p {
          margin: 3px 0;
          font-size: 12px;
          color: #666;
        }
        .document-title {
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          margin: 15px 0;
          padding: 8px;
          background-color: #f1f5f9;
          border-radius: 4px;
        }
        .columns {
          display: flex;
          gap: 20px;
          margin-bottom: 15px;
        }
        .column {
          flex: 1;
        }
        h2 {
          font-size: 14px;
          margin-top: 15px;
          margin-bottom: 8px;
          color: #00A2ED;
          border-bottom: 1px solid #00A2ED;
          padding-bottom: 5px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        th, td {
          text-align: left;
          padding: 6px 8px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 12px;
        }
        th {
          font-weight: bold;
          background-color: #f1f5f9;
          width: 40%;
        }
        .remarks {
          background-color: #f9fafb;
          padding: 10px;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          font-size: 12px;
          margin-bottom: 20px;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 10px;
          color: #6b7280;
          border-top: 1px solid #e5e7eb;
          padding-top: 8px;
        }
        .signatures {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          margin-bottom: 20px;
        }
        .signature {
          text-align: center;
          font-size: 12px;
        }
        .signature-line {
          width: 150px;
          border-top: 1px solid #000;
          margin: 0 auto 8px;
        }
        .amount-green {
          color: #16a34a;
          font-weight: bold;
        }
        .amount-blue {
          color: #2563eb;
          font-weight: bold;
        }
        .amount-purple {
          color: #7c3aed;
          font-weight: bold;
        }
        .meta-info {
          font-size: 10px;
          color: #6b7280;
          text-align: right;
          margin-top: 10px;
        }
        .bike-id {
          font-family: monospace;
          background-color: #f1f5f9;
          padding: 3px 5px;
          border-radius: 2px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://admin.sawaribd.com/storage/site/VIRZUCWrXi86aqXySwzEFOE5uukekKNvJSTCYV5k.svg" alt="SAWARI Logo" /> 
          <h1>Bike Transaction Details</h1>
          <p>H-25, R-5, Block-A, Mirpur-2, Dhaka, Dhaka Metro, Dhaka 1216</p>
          <p>Phone: 01766614293</p>
        </div>

        <div class="document-title">
          ${bikeBrand.toUpperCase()} ${bikeModel} - ${engineNumber}
        </div>

        <div class="columns">
          <div class="column">
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
              <tr><th>Key Status</th><td>${
                keyStatus === 1 ? "One Key" : "Two Keys"
              }</td></tr>
            </table>
          </div>
          
          <div class="column">
            <h2>Seller Information</h2>
            <table>
              <tr><th>Name</th><td>${name || "N/A"}</td></tr>
              <tr><th>Phone Number</th><td>${phoneNumber || "N/A"}</td></tr>
              <tr><th>NID Number</th><td>${nid || "N/A"}</td></tr>
              <tr><th>Address</th><td>${address || "N/A"}</td></tr>
            </table>
            
            <h2>Witness Information</h2>
            <table>
              <tr><th>Witness Name</th><td>${witnessName || "N/A"}</td></tr>
              <tr><th>Witness Phone</th><td>${
                witnessPhoneNumber || "N/A"
              }</td></tr>
              <tr><th>Witness NID</th><td>${witnessNID || "N/A"}</td></tr>
            </table>
          </div>
        </div>

        <h2>Transaction Details</h2>
        <table>
          <tr>
            <th>Purchase Amount</th>
            <td class="amount-green">${formatCurrency(purchaseAmount)}</td>
          </tr>
         
          <tr>
            <th>Security Amount</th>
            <td class="amount-blue">${formatCurrency(securityAmount)}</td>
          </tr>
           <tr>
            <th>Paid Amount</th>
            <td class="amount-purple">${formatCurrency(paidAmount)}</td>
          </tr>
        </table>

        <h2>Remarks</h2>
        <div class="remarks">
          ${remarks || "No remarks provided"}
        </div>

        <div class="signatures">
          <div class="signature">
            <div class="signature-line"></div>
            <p>Seller Signature</p>
            <p>${name}</p>
          </div>
          
          <div class="signature">
            <div class="signature-line"></div>
            <p>Witness Signature</p>
            <p>${witnessName}</p>
          </div>
          
          <div class="signature">
            <div class="signature-line"></div>
            <p>Authorized Signatory</p>
            <p>SAWARI</p>
          </div>
        </div>

        <div class="meta-info">
          <p>Created By: ${createdBy?.name || "N/A"} | Date: ${formatDate(
    createdAt
  )}</p>
          <p>Document ID: <span class="bike-id">${
            bikeDetails._id || "N/A"
          }</span></p>
        </div>

        <div class="footer">
          <p>Generated on ${new Date().toLocaleString()} | This is a computer-generated document and does not require a physical signature.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
