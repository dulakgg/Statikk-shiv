import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Head } from '@inertiajs/react';
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Head>
        <meta property="og:url" content="https://statikkshiv.com/privacy" />
        <link rel="canonical" href="https://statikkshiv.com/privacy" />
      </Head>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 text-white">
        <article>
          <h1 className="text-3xl font-bold mb-4">Privacy Policy for Statikkshiv.com</h1>
          <p className="mb-2 text-sm text-white">Last Updated: 11.05.2025</p>
          <p className="mb-4">
            Thank you for visiting Statikkshiv.com. This Privacy Policy explains how we collect,
            use, and protect your personal information. By accessing or using the Website, you
            agree to this policy.
          </p>

          <section aria-labelledby="info-we-collect">
            <h2 id="info-we-collect" className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Email Addresses: When you contact us, subscribe to newsletters, or engage with our services.</li>
              <li>Social Media Information: If you interact with us via social platforms (e.g., usernames, public profiles).</li>
              <li>Automatically Collected Data: Including IP addresses, device type, browser details, and cookies (see Section 4).</li>
              <li>Third-Party Advertising Data: As part of ad services provided by Google AdSense (see Section 4).</li>
            </ul>
          </section>

          <section aria-labelledby="how-we-use">
            <h2 id="how-we-use" className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Respond to emails or inquiries at <a href="mailto:support@statikkshiv.com" className="text-white underline">support@statikkshiv.com</a>.</li>
              <li>Send newsletters or promotional messages (if you opt-in).</li>
              <li>Improve Website performance and user experience.</li>
              <li>Display personalized advertisements through Google AdSense.</li>
              <li>Comply with legal obligations or protect against fraud.</li>
            </ul>
          </section>

          <section aria-labelledby="sharing-info">
            <h2 id="sharing-info" className="text-2xl font-semibold mt-6 mb-2">3. Sharing of Information</h2>
            <p>We do not sell or rent your personal data. We may share your information:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>With your explicit consent.</li>
              <li>If legally required (e.g., court orders).</li>
              <li>To protect our rights, users, or the public.</li>
            </ul>
            <p className="mt-2">
              <strong>Third-Party Advertisers:</strong> Google AdSense and its partners may collect non-personal data for ad targeting. Their data use is governed by their own privacy policies.
            </p>
          </section>

          <section aria-labelledby="cookies">
            <h2 id="cookies" className="text-2xl font-semibold mt-6 mb-2">4. Cookies & Google AdSense</h2>
            <p>This Website uses cookies and similar tracking technologies for:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Analytics and site functionality.</li>
              <li>Personalizing ad content via Google AdSense.</li>
            </ul>
            <p className="mt-2">
              Google and its partners use cookies to personalize and measure ads based on your activity across websites.
            </p>
            <p className="mt-2">
              You can opt out via <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-white underline">Google’s Ad Settings</a> or visit <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-white underline">www.aboutads.info</a>.
            </p>
            <p className="mt-2">You can also disable cookies via your browser settings (note: this may affect site functionality).</p>
          </section>

          <section aria-labelledby="data-security">
            <h2 id="data-security" className="text-2xl font-semibold mt-6 mb-2">5. Data Security</h2>
            <p>
              We use industry-standard security measures (e.g., encryption, limited access) to protect your data. No online service can guarantee 100% security. Review Google AdSense’s privacy practices for their specific policies.
            </p>
          </section>

          <section aria-labelledby="your-rights">
            <h2 id="your-rights" className="text-2xl font-semibold mt-6 mb-2">6. Your Rights</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Access, correct, or request deletion of your data.</li>
              <li>Unsubscribe from marketing emails at any time.</li>
              <li>Withdraw consent for data collection.</li>
              <li>Opt out of personalized advertising via:
                <ul className="list-disc list-inside ml-5 space-y-1">
                  <li><a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-white underline">Google’s Ad Settings</a></li>
                  <li><a href="https://www.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-white underline">Network Advertising Initiative (NAI)</a></li>
                  <li><a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-white underline">Digital Advertising Alliance (DAA)</a></li>
                </ul>
              </li>
            </ul>
          </section>

          <section aria-labelledby="third-party-links">
            <h2 id="third-party-links" className="text-2xl font-semibold mt-6 mb-2">7. Third-Party Links and Services</h2>
            <p>
              This Website may include links to third-party websites and services like Google AdSense. We are not responsible for their privacy practices. Always review third-party privacy policies before sharing data.
            </p>
          </section>

          <section aria-labelledby="children">
            <h2 id="children" className="text-2xl font-semibold mt-6 mb-2">8. Children’s Privacy</h2>
            <p>
              We do not knowingly collect information from children under 13. If you believe a child has submitted data, contact us at <a href="mailto:support@statikkshiv.com" className="text-white underline">support@statikkshiv.com</a>.
            </p>
          </section>

          <section aria-labelledby="updates">
            <h2 id="updates" className="text-2xl font-semibold mt-6 mb-2">9. Updates to This Policy</h2>
            <p>
              We may revise this policy periodically. Changes will be posted on this page with an updated Effective Date. Continued use of the Website indicates acceptance of the revised terms.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact" className="text-2xl font-semibold mt-6 mb-2">10. Contact Us</h2>
            <p>
              For questions, concerns, or privacy-related requests, please contact us at:
              <br />
              Email: <a href="mailto:support@statikkshiv.com" className="text-white underline">support@statikkshiv.com</a>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
