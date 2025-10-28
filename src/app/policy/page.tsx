import RentWiseFooter from '@/components/common/about';
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="bg-[#0b1229] text-white py-10 text-center">
        <h1 className="text-3xl font-bold">Privacy Policy and Terms of Service</h1>
        <p className="mt-2 text-sm">Home / Privacy Policy and Terms of Service</p>
      </div>

      <div className="max-w-4xl mx-auto py-10 px-6">
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">1. Overview</h2>
          <p>
            RentWise is committed to protecting your personal data. This Privacy Policy explains how we
            collect, use, store, and protect your information when you use our platform — whether you're a tenant, landlord, or admin.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc ml-5">
            <li><strong>Personal Information:</strong> Name, email address, phone number, password, government-issued ID (for verification).</li>
            <li><strong>Property Data:</strong> Listings posted by landlords including property address, images, rental terms, etc.</li>
            <li><strong>Transaction Data:</strong> Rent tracking, bill payment status, reminders, and manual roommate bill split info.</li>
            <li><strong>Communication Data:</strong> Chat history between tenants and landlords/agents, feedback, and reviews.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device data, access times, and cookie/session identifiers.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">3. How We Use Your Data</h2>
          <ul className="list-disc ml-5">
            <li>To register and maintain your account on RentWise</li>
            <li>To allow you to browse and post property listings</li>
            <li>To facilitate communication between verified users</li>
            <li>To track payments and dues manually for reference</li>
            <li>To display landlord/tenant ratings and reviews</li>
            <li>To send in-app reminders and service notifications</li>
            <li>To detect and prevent fraudulent activities or abuse</li>
            <li>To analyze platform usage and improve our features</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p>
            We implement industry-standard measures to safeguard your data. This includes encrypted storage,
            secure HTTPS communication, role-based access, and regular monitoring to detect threats.
          </p>
          <p>
            Users are responsible for keeping their passwords confidential. We never ask for your credentials outside of the platform.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">5. User Rights</h2>
          <ul className="list-disc ml-5">
            <li>Right to access and review the personal information we hold about you</li>
            <li>Right to correct any incorrect or outdated information</li>
            <li>Right to delete your account and all related data (on request)</li>
            <li>Right to restrict or object to certain data processing activities</li>
            <li>Right to file a complaint regarding misuse of your data</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">6. Cookies and Tracking</h2>
          <p>
            RentWise uses cookies to improve your experience. These include session cookies for keeping you logged in,
            analytics cookies for performance tracking, and preference cookies for saving your choices. You can disable
            cookies in your browser, but some features may stop working correctly.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">7. Sharing of Data</h2>
          <ul className="list-disc ml-5">
            <li>We do <strong>not sell or rent</strong> user data to third parties.</li>
            <li>Data may be shared with:
              <ul className="list-disc ml-5">
                <li>Other users (e.g., landlords seeing your profile if you apply)</li>
                <li>Verified agents involved in property communication</li>
                <li>Third-party vendors used for hosting or analytics (e.g., database providers, cloud platforms)</li>
                <li>Legal authorities if required for compliance or investigation</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">8. Data Retention</h2>
          <p>
            We retain your data for as long as your account is active or as required by law. Inactive accounts
            may be archived but can be deleted permanently upon request.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify users through the app or by email when significant
            changes are made. Please review this policy regularly.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding your data, you can email us at:
            <strong> support@rentwise.com </strong> or message the admin through your RentWise dashboard.
          </p>
        </section>
      </div>
<RentWiseFooter/>
    </div>
  );
};

