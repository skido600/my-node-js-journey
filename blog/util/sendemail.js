const { transporter } = require("./nodemailer");
const fs = require("fs");
const path = require("path");

exports.sendverification = async (user, verify) => {
  const htmlTemplatePath = path.join(__dirname, "./util/email.html");
  let htmlContent = fs.readFileSync(htmlTemplatePath, "utf-8");

  htmlContent = htmlContent
    .replace("{{verifyUrl}}", verify)
    .replace("{{username}}", user.username);

  const info = await transporter.sendMail({
    from: `"Maddison Foo Koch" <${process.env.GMAIL_USER}>`,
    to: user.usermail,
    subject: "Verify your email",
    html: htmlContent,
  });
  console.log(info);
};
