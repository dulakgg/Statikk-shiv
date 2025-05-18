import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfService: React.FC = () => {
  return (
    <>
    <Navbar />
    <main className="bg-background text-white min-h-screen py-10 px-4">
      <link rel="canonical" href="https://statikkshiv.com/terms" />
      <Head>
        <title>Terms of Service - Statikkshiv.com</title>
      </Head>
      <section className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Terms of Service</h1>
        <p className="text-sm">Last Updated: May 11, 2025</p>
        <p>
          Welcome to Statikkshiv.com (the “Website”). These Terms of Service (“Terms”) govern your access
          to and use of our Website, services, and content (collectively, the “Services”). By accessing
          or using the Services, you agree to be bound by these Terms. If you do not agree, please do
          not use the Services.
        </p>

        <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p>
          By using the Website, you acknowledge that you have read, understood, and agree to these
          Terms and our Privacy Policy. We may modify these Terms at any time by posting revised terms
          on this page with an updated “Last Updated” date. Your continued use after any changes
          indicates your acceptance of the new Terms.
        </p>

        <h2 className="text-2xl font-semibold">2. Eligibility</h2>
        <p>
          You must be at least 13 years old to use the Services. If you are under 18, you may only
          use the Services under the supervision of a parent or legal guardian who agrees to these
          Terms.
        </p>

        <h2 className="text-2xl font-semibold">3. User Accounts & Security</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Registration:</strong> Some features may require you to register for an account.
            You agree to provide accurate and complete information.
          </li>
          <li>
            <strong>Credentials:</strong> You are responsible for maintaining the confidentiality of
            your account credentials. You agree to notify us immediately of any unauthorized use.
          </li>
          <li>
            <strong>Account Termination:</strong> We reserve the right to suspend or terminate accounts
            that violate these Terms or for any lawful reason.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold">4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Use the Services for any unlawful purpose or in violation of any local, national, or
            international law.
          </li>
          <li>Post or transmit any material that is defamatory, obscene, threatening, or otherwise objectionable.</li>
          <li>Use any robot, spider, or automated means to access the Website for any purpose without our express permission.</li>
          <li>Interfere with or disrupt the integrity or performance of the Services.</li>
        </ul>

        <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Ownership:</strong> All content, trademarks, logos, graphics, and code on the Website
            (“Content”) are owned by or licensed to Statikkshiv.com.
          </li>
          <li>
            <strong>License to Users:</strong> We grant you a limited, non-exclusive, non-transferable
            license to access and use the Services for personal, non-commercial purposes.
          </li>
          <li>
            <strong>Restrictions:</strong> You may not copy, modify, distribute, sell, or lease any portion
            of our Content without our prior written consent.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold">6. User-Generated Content</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            You retain ownership of your submissions but grant us a perpetual, worldwide, royalty-free
            license to use, reproduce, and display them.
          </li>
          <li>
            You represent that you have all rights necessary to grant this license and that your
            submissions do not violate any rights of third parties.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold">7. Advertisements & Third-Party Links</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Ads:</strong> We use Google AdSense and other ad networks to display advertisements.
            Clicking ads is entirely optional.
          </li>
          <li>
            <strong>Third-Party Links:</strong> Our Website may contain links to external sites. We are not
            responsible for their content or practices. Your use of third-party sites is at your own risk.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold">8. Disclaimers & Limitation of Liability</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>No Warranty:</strong> The Services are provided “as is” and “as available” without
            warranties of any kind. We disclaim all warranties, express or implied.
          </li>
          <li>
            <strong>Limitation of Liability:</strong> To the maximum extent permitted by law,
            Statikkshiv.com and its affiliates shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising out of your use of the Services.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold">9. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless Statikkshiv.com and its officers,
          directors, employees, and agents from any claims, liabilities, damages, losses, or expenses
          (including reasonable attorneys’ fees) arising out of your use of the Services or violation of
          these Terms.
        </p>

        <h2 className="text-2xl font-semibold">10. Termination</h2>
        <p>
          We may suspend or terminate your access to the Services, without notice, for any conduct that
          we, in our sole discretion, believe violates these Terms or is harmful to other users or us.
        </p>

        <h2 className="text-2xl font-semibold">11. Governing Law & Dispute Resolution</h2>
        <p>
          These Terms are governed by the laws of [Your Jurisdiction] without regard to its
          conflict-of-law principles. Any dispute arising under these Terms shall be resolved exclusively
          in the state or federal courts located in [Your City, Your Country].
        </p>

        <h2 className="text-2xl font-semibold">12. Severability</h2>
        <p>
          If any provision of these Terms is held to be invalid or unenforceable, then that provision
          shall be deemed severed, and the remaining provisions will remain in full force and effect.
        </p>

        <h2 className="text-2xl font-semibold">13. Waiver</h2>
        <p>
          Our failure to enforce any right or provision of these Terms will not be deemed a waiver of such
          right or provision.
        </p>

        <h2 className="text-2xl font-semibold">14. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p>
          Email: <a href="mailto:support@statikkshiv.com" className="underline">support@statikkshiv.com</a>
        </p>

        <p>
          Thank you for using Statikkshiv.com. We hope you enjoy our content and services within these guidelines!
        </p>
      </section>
    </main>
    <Footer />
    </>
  );
};

export default TermsOfService;
