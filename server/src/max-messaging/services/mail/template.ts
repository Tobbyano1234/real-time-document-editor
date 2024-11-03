import { nameFormat } from "../../../max-shared/misc";
import {
  Template,
  InvitationTemplate,
  InvoiceTemplate,
  TaskTemplate,
} from "./types";

export const accountVerificationTemp1 = ({
  firstName,
  timeLeft,
  url = "https://entrova-app.onrender.com",
  otp,
}: Template) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">

      <style type="text/css">
    body, p, div {
      font-family: inherit;
      font-size: 14px;
    }
    body {
      color: #000000;
    }
    body a {
      color: #1188E6;
      text-decoration: none;
    }
    p { margin: 0; padding: 0; }
    table.wrapper {
      width:100% !important;
      table-layout: fixed;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    img.max-width {
      max-width: 100% !important;
    }
    .column.of-2 {
      width: 50%;
    }
    .column.of-3 {
      width: 33.333%;
    }
    .column.of-4 {
      width: 25%;
    }
    ul ul ul ul  {
      list-style-type: disc !important;
    }
    ol ol {
      list-style-type: lower-roman !important;
    }
    ol ol ol {
      list-style-type: lower-latin !important;
    }
    ol ol ol ol {
      list-style-type: decimal !important;
    }
    @media screen and (max-width:480px) {
      .preheader .rightColumnContent,
      .footer .rightColumnContent {
        text-align: left !important;
      }
      .preheader .rightColumnContent div,
      .preheader .rightColumnContent span,
      .footer .rightColumnContent div,
      .footer .rightColumnContent span {
        text-align: left !important;
      }
      .preheader .rightColumnContent,
      .preheader .leftColumnContent {
        font-size: 80% !important;
        padding: 5px 0;
      }
      table.wrapper-mobile {
        width: 100% !important;
        table-layout: fixed;
      }
      img.max-width {
        height: auto !important;
        max-width: 100% !important;
      }
      a.bulletproof-button {
        display: block !important;
        width: auto !important;
        font-size: 80%;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .columns {
        width: 100% !important;
      }
      .column {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .social-icon-column {
        display: inline-block !important;
      }
    }
  </style>
      <!--user entered Head Start--><link href="https://fonts.googleapis.com/css?family=Muli&display=swap" rel="stylesheet"><style>
body {font-family: 'Muli', sans-serif;}
</style><!--End Head user entered-->
    </head>
    <body>
      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
            <tr>
              <td valign="top" bgcolor="#FFFFFF" width="100%">
                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="100%">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                      <tr>
                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    <tr>
      <td role="module-content">
        <p></p>
      </td>
    </tr>
  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:30px 20px 30px 20px;" bgcolor="#f6f6f6" data-distribution="1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="540" style="width:540px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="948e3f3f-5214-4721-a90e-625a47b1c957" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:50px 30px 18px 30px; line-height:36px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 43px">Thanks for signing up, ${firstName}!</span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a10dcb57-ad22-4f4d-b765-1d427dfddb4e" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 30px 18px 30px; line-height:22px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px">Please verify your email address to</span><span style="color: #000000; font-size: 18px; font-family: arial, helvetica, sans-serif"> get started</span><span style="font-size: 18px">.</span></div>
<div style="font-family: inherit; text-align: center"><span style="color: #ffbe00; font-size: 18px"><strong>Thank you!</strong></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7770fdab-634a-4f62-a277-1c66b2646d8d">
    <tbody>
      <tr>
        <td style="padding:0px 0px 20px 0px;" role="module-content" bgcolor="#ffffff">
        </td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="d050540f-4672-4f31-80d9-b395dc08abe1">
      <tbody>
        <tr>
          <td align="center" bgcolor="#ffffff" class="outer-td" style="padding:0px 0px 0px 0px; background-color:#ffffff;">
            <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
              <tbody>
              <tr>
              <td align="center" bgcolor="#ffbe00" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit; margin-bottom:10px;"><p>Here is your <strong>OTP: ${otp}</strong> expires in <strong>${timeLeft}</strong></p></td>
              </tr>
                // <tr>
                // <td align="center" bgcolor="#ffbe00" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                // <a href="${url}" style="background-color:#ffbe00; border:1px solid #ffbe00; border-color:#ffbe00; border-radius:0px; border-width:1px; color:#000000; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 40px 12px 40px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit; margin: 15px 0 15px 0 " target="_blank">Verify Email Now</a>
                // </td>
                // </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="550f60a9-c478-496c-b705-077cf7b1ba9a">
      <tbody>
        <tr>
          <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 20px 0px;">
            <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
              <tbody>
                <tr>
                <td align="center" bgcolor="#f5f8fd" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a href="#" style="background-color:#f5f8fd; border:1px solid #f5f8fd; border-color:#f5f8fd; border-radius:25px; border-width:1px; color:#a8b9d5; display:inline-block; font-size:10px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:5px 18px 5px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:helvetica,sans-serif;" target="_blank">♥ POWERED BY ENTROVA</a></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table></td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>`;

export const passwordResetTemp = ({ firstName, otp, timeLeft }: Template) => ``;

export const accountVerificationTemp = ({
  firstName,
  timeLeft,
  url = "https://entrova-app.onrender.com",
  otp,
  subject,
}: Template) => `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
  
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f7f7f7;
      }
  
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
  
      .content {
        margin-bottom: 20px;
      }
  
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #ffbe00;
        color: #000000;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
      }
  
      .footer {
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>${subject}</h2>
      </div>
      <div class="content">
        <p>Dear ${firstName},</p>
        <p>Thank you for signing up on Entrova. Please verify your account by clicking the following link:</p>
        
        <p>Your one-time password (OTP) is: ${otp}</p>
        <p>This OTP will expire in ${timeLeft} minutes.</p>
        
        //  <p><a href="${url}" class="button">Verify Email Now</a></p>
        
        <p>If you did not sign up for an account, please ignore this email.</p>
      </div>
      <div class="footer">
        <p>Best regards,<br>Entrova</p>
      </div>
    </div>
  </body>
  </html>
`;

export const invitationTemp = ({
  email,
  companyName,
  invitationLink,
}: InvitationTemplate) => `
  <!DOCTYPE html>
<html>
<head>
    <title>Organization Invitation</title>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="background-color: #f5f5f5; padding: 20px 0;">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
                            <h1 style="color: #333333;">Invitation to Join Our Organization</h1>
                            <p style="color: #555555;">Hi ${
                              email.split("@")[0]
                            },</p>
                            <p style="color: #555555;">We would like to invite you to join our organization, ${companyName}.</p>
                            <p style="color: #555555;">As a member of our organization, you'll have access to various benefits and resources. We look forward to working with you!</p>
                            <p style="color: #555555;">To accept the invitation, click the button below:</p>
                            <a href="${invitationLink}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 3px; font-weight: bold;">Accept Invitation</a>
                            <p style="color: #555555;">If you have any questions or need assistance, please contact us at <a href="mailto:dev1@utiva.io?subject=Support%20Request&body=Hello%20Team%2C%0A%0AI%20have%20a%20question%20regarding%20your%20services.%20Could%20you%20please%20help%3F">Contact Us</a>.</p>
                            <p style="color: #555555;">Thank you and welcome to our organization!</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export const ClientInvitationTemp = ({
  fullName,
  companyName,
  invitationLink,
  individualName,
}: InvitationTemplate) => `
  <!DOCTYPE html>
<html>
<head>
    <title>Client Invitation</title>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="background-color: #f5f5f5; padding: 20px 0;">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
                            <h1 style="color: #333333;">Invitation to Join Our Organization</h1>
                            <p style="color: #555555;">Hi ${
                              fullName ? fullName : companyName
                            },</p>
                            <p style="color: #555555;">${individualName} would like to invite you to join Entrova to manage your project/contract.</p>
                            <p style="color: #555555;">As a member of our organization, you'll have access to various benefits and resources. We look forward to working with you!</p>
                            <p style="color: #555555;">To accept the invitation, click the button below:</p>
                            <a href="${invitationLink}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 3px; font-weight: bold;">Accept Invitation</a>
                            <p style="color: #555555;">If you have any questions or need assistance, please contact us at <a href="mailto:dev1@utiva.io?subject=Support%20Request&body=Hello%20Team%2C%0A%0AI%20have%20a%20question%20regarding%20your%20services.%20Could%20you%20please%20help%3F">Contact Us</a>.</p>
                            <p style="color: #555555;">Thank you and welcome to our organization!</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export const CompanyEmployeeInvitationTemp = ({
  companyName,
  invitationLink,
  companyEmployeeName,
}: InvitationTemplate) => `
  <!DOCTYPE html>
<html>
<head>
    <title>Offer Letter</title>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="background-color: #f5f5f5; padding: 20px 0;">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
                            <h1 style="color: #333333;">Invitation to Join Our Organization</h1>
                            <p style="color: #555555;">Hi ${companyEmployeeName},</p>
                            <p style="color: #555555;">${companyName} would like to invite you to join Entrova to manage your employment/contract.</p>
                            <p style="color: #555555;">As a member of our organization, you'll have access to various benefits and resources. We look forward to working with you!</p>
                            <p style="color: #555555;">To accept the invitation, click the button below:</p>
                            <a href="${invitationLink}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 3px; font-weight: bold;">Accept Invitation</a>
                            <p style="color: #555555;">If you have any questions or need assistance, please contact us at <a href="mailto:dev1@utiva.io?subject=Support%20Request&body=Hello%20Team%2C%0A%0AI%20have%20a%20question%20regarding%20your%20services.%20Could%20you%20please%20help%3F">Contact Us</a>.</p>
                            <p style="color: #555555;">Thank you and welcome to our organization!</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export const ProjectInvoiceTemp = ({
  clientName,
  projectName,
  individualName,
  invoiceNumber,
}: InvoiceTemplate) => `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice for Your Project</title>
</head>
<body style="font-family: Arial, sans-serif;">

  <div style="background-color: #f8f8f8; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

      <header style="padding: 20px; background-color: #3498db; color: #ffffff; text-align: center;">
        <h1>Invoice for Your Purchase</h1>
      </header>

      <section style="padding: 20px;">
        <p>Hello ${clientName},</p>
        <p>Please find attached the invoice for ${projectName} project with ${individualName}.</p>
        <p>Invoice Number: ${invoiceNumber}</p>
      </section>

      <footer style="background-color: #f1f1f1; padding: 10px; text-align: center;">
        <p>Thank you for your business!</p>
      </footer>

    </div>
  </div>

</body>
</html>
`;

export const AssignTaskNotificationTemp = ({
  companyEmployeeName,
  companyName,
  taskName,
  taskDescription,
  taskDueDate,
  projectName,
}: TaskTemplate) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Assigned Notification</title>
    <style>
        /* Reset styles */
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        /* Container styles */
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        /* Header styles */
        .header {
            background-color: #007bff;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        /* Content styles */
        .content {
            padding: 20px;
        }
        /* Button styles */
        .button {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
        }
        /* Footer styles */
        .footer {
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Task Assigned Notification</h2>
        </div>
        <div class="content">
            <p>Hello ${companyEmployeeName},</p>
            <p>A new task has been assigned to you:</p>
            <p><strong>Task Title:</strong> ${taskName}</p>
            <p><strong>Description:</strong> ${taskDescription}</p>
            <p><strong>Project Name:</strong> ${projectName}</p>
            <p><strong>Due Date:</strong> ${taskDueDate}</p>
            <p>Please complete the task by the specified deadline.</p>
            <p>You can view more details and track the progress of the task by logging into your account.</p>
            <p>If you have any questions or concerns, feel free to reach out to your manager.</p>
            <p>Best regards,<br> ${companyName}</p>
        </div>
        <div class="footer">
            <p>If you wish to unsubscribe from these notifications, please <a href="#">click here</a>.</p>
        </div>
    </div>
</body>
</html>
`;

export const CompanyAdminInvitationTemp = ({
  companyEmployeeName,
  companyName,
  invitationLink,
  role,
}: InvitationTemplate) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Invitation</title>
  <style>
    /* Reset styles */
    body, h1, p {
      margin: 0;
      padding: 0;
    }
    /* Main styles */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .logo {
      width: 150px;
    }
    .content {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="your-logo.png" alt="Your Logo" class="logo">
      <h1>Admin Invitation</h1>
    </div>
    <div class="content">
      <p>Hello ${companyEmployeeName},</p>
      <p>You have been invited to become an admin (${nameFormat(
        String(role)
      )}) on Entrova for ${companyName}. Please click the button below to accept the invitation:</p>
      <p><a href="${invitationLink}" class="button">Accept Invitation</a></p>
      <p>This invitation will expire in <strong>7days</strong>.</p>
      <p>If you have any questions, feel free to contact us.</p>
    </div>
    <div class="footer">
      <p>This email was sent automatically. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;
