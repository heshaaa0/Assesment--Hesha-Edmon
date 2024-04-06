import React from "react";

const HelpPage = ({ devices }) => {
  return (
    <div
      style={{
        backgroundSize: "cover",

        backgroundPosition: "center",
        minHeight: "00px",
        marginTop: "80px",
        top: "0",
        marginBottom: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          padding: "20px",
          backgroundColor: "rgb(194, 239, 239)",
          borderRadius: "10px",
          marginTop: "-40px",
        }}
      >
        <h2>Frequently Asked Questions (FAQs)</h2>
        <p>
          <strong>Q: Is my data secure?</strong>
          <br />
          A: Yes, we take the security and privacy of your data seriously. All
          data transmitted between your devices and our servers is encrypted to
          ensure confidentiality.
        </p>
        <p>
          <strong>Q: How many devices can I track with DeviceLocator?</strong>
          <br />
          A: There is no limit to the number of devices you can track with
          DeviceLocator. You can add as many devices as you need and manage them
          efficiently from within the app.
        </p>

        <h2>Contact Information</h2>
        <p>
          <strong>Need Help?</strong>
          <br />
          If you have any questions or encounter issues while using
          DeviceLocator, please don't hesitate to contact our support team at
          support@devicelocator.com. We're here to help you!
        </p>

        <h2>Privacy Policy</h2>
        <p>
          <strong>Your Privacy Matters</strong>
          <br />
          Read our Privacy Policy to learn more about how we collect, use, and
          protect your personal information.
        </p>

        <h2>Updates and Release Notes</h2>
        <p>
          <strong>Stay Up to Date</strong>
          <br />
          Check out the latest updates and release notes for DeviceLocator
          [here]. We're constantly improving our app to provide you with the
          best tracking experience.
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
