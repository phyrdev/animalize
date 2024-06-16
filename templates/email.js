import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";

export const caseCreatedTemplate = (report) => {
  let reportno = report.reportno;
  let date = new Date(report.createdAt).toDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  let parentName = report.parentFirstName;
  let parentEmail = report.parentEmail;
  let orgname = report.organization.name;
  let orgemail = report.organization.email;
  let orgphone = report.organization.phone;
  let itemsCount = report.tests.length;
  let subtotal = (
    getCurrencySymbol(report.payment.currency) + report.payment.subtotal
  ).toString();
  let paymentstatus = capitalizeFirstLetter(report.payment.paymentStatus);
  let dueamount = (
    getCurrencySymbol(report.payment.currency) +
    (report.payment.subtotal - report.payment.paidAmount)
  ).toString();

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
      }

      body {
        background: whitesmoke;
        padding-top: 10px;
      }

      .container {
        max-width: 500px;
        width: 100%;
        min-height: 400px;
        padding-bottom: 10px;
        background-color: white;
        margin: 0 auto;
        padding-top: 20px;
      }

      nav {
        width: 100%;
      }

      .rp-header {
        padding: 10px 20px;
        border-top: 1px dashed #e0e0e0;
        border-bottom: 1px dashed #e0e0e0;
        color: #484848;
        font-size: 14px;
        margin-top: 20px;
      }

      .rp-header span:nth-child(2) {
        margin: 0 auto;
      }


      .billed-to {
        margin-top: 20px;
        padding: 0 20px;
      }

      .billed-to h4 {
        font-size: 16px;
        margin-bottom: 10px;
      }

      .billed-to p {
        margin-top: 6px;
        font-size: 14px;
      }

      .billed-from {
        margin-top: 30px;
        padding: 0 20px;
      }

      .billed-from h4 {
        font-size: 16px;
        margin-bottom: 10px;
      }

      .billed-from p {
        margin-top: 6px;
        font-size: 14px;
      }

      .items-header {
        display: flex;
        padding: 10px 20px;
        margin-top: 30px;
        justify-content: space-between;
        border-top: 1px dashed #e0e0e0;
        border-bottom: 1px dashed #e0e0e0;
        color: #484848;
        font-size: 14px;
      }

      .inst-message {
        padding: 0 20px;
        margin-top: 20px;
        border-top: 1px dashed #e0e0e0;
        padding-top: 30px;
      }

      .inst-message p {
        font-size: 14px;
        line-height: 1.7;
      }

      .payment-options {
        display: flex;
        align-items: center;
        padding: 0px 20px;
        margin-top: 20px;
        font-size: 14px;
      }

      .payment-options span {
        margin-right: 30px;
      }

      .action-buttons {
        padding: 0 20px;
        display: flex;
        align-items: center;
        margin-top: 30px;
      }

      .action-buttons button {
        padding: 8px 15px;
        border-radius: 5px;
        border: 1px solid #d4d4d4;
        background: #ededed;
        color: #000;
        display: flex;
        align-items: center;
        cursor: pointer;
        text-decoration: none;
        font-size: 14px;
      }

      .action-buttons button span {
        margin-right: 10px;
      }

      a {
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <nav>
        <center>
          <img
            style="width: 150px; height: auto"
            src="https://res.cloudinary.com/doj9qpbek/image/upload/v1718552212/animalize/animalizelogo_p7noc9.png"
            alt=""
          />
        </center>
      </nav>
      <div class="rp-header">
        <table style="width: 100%">
          <tr>
            <td>${date}</td>
            <td style="text-align: center">Invoice</td>
            <td style="text-align: right">${reportno}</td>
          </tr>
        </table>
      </div>

      <div class="billed-to">
        <h4>Billed to:</h4>
        <p>${parentName}</p>
        <p>${parentEmail}</p>
      </div>
      <div class="billed-from">
        <h4>Billed from:</h4>
        <p>${orgname}</p>
        <p>${orgemail}</p>
        <p>${orgphone}</p>
      </div>

      <div class="inst-message">
        <p>
          Greetings from ${orgname}. We are pleased to inform you that your case
          has been successfully processed and the invoice is ready for download.
          Please find the details below:
        </p>
      </div>

      <div class="items-header">
        <table style="width: 100%">
          <tr>
            <td><span>Total items: ${itemsCount}</span></td>
            <td style="text-align: right">
              <h3>Subtotal: ${subtotal}</h3>
            </td>
          </tr>
        </table>
      </div>

      <div class="payment-options">
        <span>Status: ${paymentstatus}</span>
        <span>Due: ${dueamount}</span>
      </div>

      <div class="action-buttons">
        <a href=${"https://animalize.io/invoice/" + reportno}>
          <button>
            <span>View invoice</span>
            <img
              src="https://static-00.iconduck.com/assets.00/invoice-icon-937x1024-wmtgcq5d.png"
              style="height: 15px"
              alt=""
            />
          </button>
        </a>
        &nbsp; &nbsp;

        <a href=${"https://animalize.io/status/" + reportno}>
          <button>
            <span>Track status</span>
            <img
              src="https://cdn-icons-png.flaticon.com/512/109/109617.png"
              style="height: 15px"
              alt=""
            />
          </button>
        </a>
      </div>
    </div>
  </body>
</html>`;
};

export const minimizedInvoiceTemplate = (report) => {
  let reportno = report.reportno;
  let date = new Date().toDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  let orgname = report.organization.name;
  let itemsCount = report.tests.length;
  let subtotal = (
    getCurrencySymbol(report.payment.currency) + report.payment.subtotal
  ).toString();
  let paymentstatus = capitalizeFirstLetter(report.payment.paymentStatus);
  let dueamount = (
    getCurrencySymbol(report.payment.currency) +
    (report.payment.subtotal - report.payment.paidAmount)
  ).toString();

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
      }

      body {
        background: whitesmoke;
        padding-top: 10px;
      }

      .container {
        max-width: 500px;
        width: 100%;
        min-height: 400px;
        padding-bottom: 10px;
        background-color: white;
        margin: 0 auto;
        padding-top: 20px;
      }

      nav {
        width: 100%;
      }

      .rp-header {
        padding: 10px 20px;
        border-top: 1px dashed #e0e0e0;
        border-bottom: 1px dashed #e0e0e0;
        color: #484848;
        font-size: 14px;
        margin-top: 20px;
      }

      .rp-header span:nth-child(2) {
        margin: 0 auto;
      }

      .billed-to {
        margin-top: 20px;
        padding: 0 20px;
      }

      .billed-to h4 {
        font-size: 16px;
        margin-bottom: 10px;
      }

      .billed-to p {
        margin-top: 6px;
        font-size: 14px;
      }

      .billed-from {
        margin-top: 30px;
        padding: 0 20px;
      }

      .billed-from h4 {
        font-size: 16px;
        margin-bottom: 10px;
      }

      .billed-from p {
        margin-top: 6px;
        font-size: 14px;
      }

      .items-header {
        display: flex;
        padding: 10px 20px;
        margin-top: 30px;
        justify-content: space-between;
        border-top: 1px dashed #e0e0e0;
        border-bottom: 1px dashed #e0e0e0;
        color: #484848;
        font-size: 14px;
      }

      .inst-message {
        padding: 0 20px;
        padding-top: 30px;
      }

      .inst-message p {
        font-size: 14px;
        line-height: 1.7;
      }

      .payment-options {
        display: flex;
        align-items: center;
        padding: 0px 20px;
        margin-top: 20px;
        font-size: 14px;
      }

      .payment-options span {
        margin-right: 30px;
      }

      .action-buttons {
        padding: 0 20px;
        display: flex;
        align-items: center;
        margin-top: 40px;
      }

      .action-buttons button {
        padding: 8px 15px;
        border-radius: 5px;
        border: 1px solid #d4d4d4;
        background: #ededed;
        color: #000;
        display: flex;
        align-items: center;
        cursor: pointer;
        text-decoration: none;
        font-size: 14px;
      }

      .action-buttons button span {
        margin-right: 10px;
      }

      a {
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <nav>
        <center>
          <img
            style="width: 150px; height: auto"
            src="https://res.cloudinary.com/doj9qpbek/image/upload/v1718552212/animalize/animalizelogo_p7noc9.png"
            alt=""
          />
        </center>
      </nav>
      <div class="rp-header">
        <table style="width: 100%">
          <tr>
            <td>${date}</td>
            <td style="text-align: center">Invoice</td>
            <td style="text-align: right">${reportno}</td>
          </tr>
        </table>
      </div>

      <div class="inst-message">
        <p>
          Greetings from ${orgname}. This is a minimized version of the invoice
          against your case. You can find a copy of the actual invoice by
          clicking the button below.
        </p>
      </div>

      <div class="items-header">
        <table style="width: 100%">
          <tr>
            <td><span>Total items: ${itemsCount}</span></td>
            <td style="text-align: right">
              <h3>Subtotal: ${subtotal}</h3>
            </td>
          </tr>
        </table>
      </div>

      <div class="payment-options">
        <span>Status: ${paymentstatus}</span>
        <span>Due: ${dueamount}</span>
      </div>

      <div class="action-buttons">
         <a href=${"https://animalize.io/invoice/" + reportno}>
          <button>
            <span>View invoice</span>
            <img
              src="https://static-00.iconduck.com/assets.00/invoice-icon-937x1024-wmtgcq5d.png"
              style="height: 15px"
              alt=""
            />
          </button>
        </a>
      </div>
    </div>
  </body>
</html>

`;
};

export const finalReportTemplate = (report) => {
  let reportno = report.reportno;
  let date = new Date().toDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let orgname = report.organization.name;
  let orgemail = report.organization.email;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
      }

      body {
        background: whitesmoke;
        padding-top: 10px;
      }

      .container {
        max-width: 500px;
        width: 100%;
        padding-bottom: 30px;
        background-color: white;
        margin: 0 auto;
        padding-top: 20px;
      }

      nav {
        width: 100%;
      }

      .rp-header {
        padding: 10px 20px;
        border-top: 1px dashed #e0e0e0;
        border-bottom: 1px dashed #e0e0e0;
        color: #484848;
        font-size: 14px;
        margin-top: 20px;
      }

      .rp-header span:nth-child(2) {
        margin: 0 auto;
      }

      .billed-to {
        margin-top: 20px;
        padding: 0 20px;
      }

      .billed-to h4 {
        font-size: 16px;
        margin-bottom: 10px;
      }

      .billed-to p {
        margin-top: 6px;
        font-size: 14px;
      }

      .billed-from {
        margin-top: 30px;
        padding: 0 20px;
      }

      .billed-from h4 {
        font-size: 16px;
        margin-bottom: 10px;
      }

      .billed-from p {
        margin-top: 6px;
        font-size: 14px;
      }

      .items-header {
        display: flex;
        padding: 10px 20px;
        margin-top: 30px;
        justify-content: space-between;
        border-top: 1px dashed #e0e0e0;
        border-bottom: 1px dashed #e0e0e0;
        color: #484848;
        font-size: 14px;
      }

      .inst-message {
        padding: 0 20px;
        padding-top: 30px;
      }

      .inst-message p {
        font-size: 14px;
        line-height: 1.7;
      }

      .payment-options {
        display: flex;
        align-items: center;
        padding: 0px 20px;
        margin-top: 20px;
        font-size: 14px;
      }

      .payment-options span {
        margin-right: 30px;
      }

      .action-buttons {
        padding: 0 20px;
        display: flex;
        align-items: center;
        margin-top: 40px;
      }

      .action-buttons button {
        padding: 8px 15px;
        border-radius: 5px;
        border: 1px solid #d4d4d4;
        background: #ededed;
        color: #000;
        display: flex;
        align-items: center;
        cursor: pointer;
        text-decoration: none;
        font-size: 14px;
      }

      .action-buttons button span {
        margin-right: 10px;
      }

      a {
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <nav>
        <center>
          <img
            style="width: 150px; height: auto"
            src="https://animalize.io/animalizelogo.png"
            alt=""
          />
        </center>
      </nav>
      <div class="rp-header">
        <table style="width: 100%">
          <tr>
            <td>${date}</td>
            <td style="text-align: center">Report</td>
            <td style="text-align: right">${reportno}</td>
          </tr>
        </table>
      </div>

      <div class="inst-message">
        <p>
          Greetings from ${orgname}. Your report has been prepared and is ready
          for download. Please find the details below. If you have any
          questions, please contact us at ${orgemail}. You can visit our center to collect the hard copy of the report.
        </p>
      </div>

      <div class="action-buttons">
         <a href=${"https://animalize.io/final-report/" + reportno}>
          <button>
            <span>View report</span>
            <img
              src="https://static-00.iconduck.com/assets.00/invoice-icon-937x1024-wmtgcq5d.png"
              style="height: 15px"
              alt=""
            />
          </button>
        </a>
      </div>
    </div>
  </body>
</html>
`;
};

export const generalUpdateTemplate = (reportno, message) => {
  let date = new Date().toDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
      }

      body {
        background: whitesmoke;
        padding-top: 10px;
      }

      .container {
        max-width: 500px;
        width: 100%;
        padding-bottom: 30px;
        background-color: white;
        margin: 0 auto;
        padding-top: 20px;
      }

      nav {
        width: 100%;
      }

      .rp-header {
        padding: 10px 20px;
        border-top: 1px dashed #e0e0e0;
        border-bottom: 1px dashed #e0e0e0;
        color: #484848;
        font-size: 14px;
        margin-top: 20px;
      }

      .rp-header span:nth-child(2) {
        margin: 0 auto;
      }

      .billed-to {
        margin-top: 20px;
        padding: 0 20px;
      }

      .billed-to h4 {
        font-size: 16px;
        margin-bottom: 10px;
      }

      .billed-to p {
        margin-top: 6px;
        font-size: 14px;
      }

      .billed-from {
        margin-top: 30px;
        padding: 0 20px;
      }

      .billed-from h4 {
        font-size: 16px;
        margin-bottom: 10px;
      }

      .billed-from p {
        margin-top: 6px;
        font-size: 14px;
      }

      .items-header {
        display: flex;
        padding: 10px 20px;
        margin-top: 30px;
        justify-content: space-between;
        border-top: 1px dashed #e0e0e0;
        border-bottom: 1px dashed #e0e0e0;
        color: #484848;
        font-size: 14px;
      }

      .inst-message {
        padding: 0 20px;
        padding-top: 30px;
      }

      .inst-message p {
        font-size: 14px;
        line-height: 1.7;
      }

      .payment-options {
        display: flex;
        align-items: center;
        padding: 0px 20px;
        margin-top: 20px;
        font-size: 14px;
      }

      .payment-options span {
        margin-right: 30px;
      }

      .action-buttons {
        padding: 0 20px;
        display: flex;
        align-items: center;
        margin-top: 30px;
      }

      .action-buttons button {
        padding: 8px 15px;
        border-radius: 5px;
        border: 1px solid #d4d4d4;
        background: #ededed;
        color: #000;
        display: flex;
        align-items: center;
        cursor: pointer;
        text-decoration: none;
        font-size: 14px;
      }

      .action-buttons button span {
        margin-right: 10px;
      }

      a {
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <nav>
        <center>
          <img
            style="width: 150px; height: auto"
            src="https://animalize.io/animalizelogo.png"
            alt=""
          />
        </center>
      </nav>
      <div class="rp-header">
        <table style="width: 100%">
          <tr>
            <td>${date}</td>
            <td style="text-align: center">Updates</td>
            <td style="text-align: right">${reportno || ""}</td>
          </tr>
        </table>
      </div>

      <div class="inst-message">
        <p>${message}</p>
      </div>
    </div>
  </body>
</html>

`;
};
