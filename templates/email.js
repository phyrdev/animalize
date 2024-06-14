export const caseCreatedTemplate = () => {
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
      }

      nav {
        display: flex;
        width: 100%;
        height: fit-content;
        padding: 30px 30px;
        margin-top: 0px;
      }

      nav img {
        width: 150px;
        background: #fff;
        margin: 0 auto;
      }

      .rp-header {
        padding: 10px 20px;
        border-top: 1px dashed #e0e0e0;
        border-bottom: 1px dashed #e0e0e0;
        color: #484848;
        font-size: 14px;
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
        <img src="https://www.animalize.io/animalizelogo.png" alt="" />
      </nav>
      <div class="rp-header">
        <table style="width: 100%">
          <tr>
            <td>12 June, 2024</td>
            <td style="text-align: center">Invoice</td>
            <td style="text-align: right">LE89TPRES</td>
          </tr>
        </table>
      </div>

      <div class="billed-to">
        <h4>Billed to:</h4>
        <p>Priyangsu Banerjee</p>
        <p>priyangsu26@gmail.com</p>
      </div>
      <div class="billed-from">
        <h4>Billed from:</h4>
        <p>Lenus Vet Labs</p>
        <p>lenuslabs@gmail.com</p>
        <p>9647045453</p>
      </div>

      <div class="inst-message">
        <p>
          Greetings from Lenus Vet Labs! We are pleased to inform you that your
          case has been successfully processed and the invoice is ready for
          download. Please find the details below:
        </p>
      </div>

      <div class="items-header">
        <table style="width: 100%">
          <tr>
            <td><span>Total items: 3</span></td>
            <td style="text-align: right">
              <h3>Subtotal: ₹600</h3>
            </td>
          </tr>
        </table>
      </div>

      <div class="payment-options">
        <span>Mode: Cash</span>
        <span>Status: Paid</span>
        <span>Due: 0</span>
      </div>

      <div class="action-buttons">
        <a href="">
          <button>
            <span>View detailed invoice</span>
            <img
              src="https://static-00.iconduck.com/assets.00/invoice-icon-937x1024-wmtgcq5d.png"
              style="height: 15px"
              alt=""
            />
          </button>
        </a>
        &nbsp; &nbsp;

        <a href="">
          <button>
            <span>Track status</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z"
              />
            </svg>
          </button>
        </a>
      </div>
    </div>
  </body>
</html>
`;
};
