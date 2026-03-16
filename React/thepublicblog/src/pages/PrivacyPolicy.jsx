import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-12 pb-8 border-b border-default">
        <span className="text-xs font-medium uppercase tracking-widest text-amber mb-4 block">
          Legal
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted text-sm">Last updated: March 16, 2026</p>
      </div>

      {/* Content */}
      <div className="prose-content flex flex-col gap-8">

        <section>
          <h2>Overview</h2>
          <p>
            ThePublicBlog is a platform for writers and readers. We take your privacy seriously.
            This policy explains what information we collect, how we use it, and what rights you
            have over your data. We keep it simple because we believe you deserve to actually
            understand the policies that govern your data.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <p>We collect only what is necessary to run the platform:</p>
          <ul>
            <li>
              <strong>Account information</strong> — your name and email address when you sign up.
            </li>
            <li>
              <strong>Content you create</strong> — posts, titles, slugs, and images you upload.
            </li>
            <li>
              <strong>Usage data</strong> — basic analytics such as pages visited and actions
              taken, used only to improve the platform.
            </li>
          </ul>
          <p>
            We do not collect payment information, sell your data to advertisers, or build
            behavioural profiles for third parties.
          </p>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To create and manage your account.</li>
            <li>To display your posts to readers.</li>
            <li>To send transactional emails such as email verification and password reset.</li>
            <li>To improve the platform based on aggregated usage patterns.</li>
          </ul>
          <p>
            We will never sell, rent, or share your personal information with third parties
            for marketing purposes.
          </p>
        </section>

        <section>
          <h2>Data Storage</h2>
          <p>
            Your data is stored securely via Appwrite Cloud, hosted in the Singapore region.
            Appwrite encrypts data at rest and in transit. You can read more about their
            security practices at{" "}
            <a href="https://appwrite.io/security" target="_blank" rel="noopener noreferrer">
              appwrite.io/security
            </a>.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            ThePublicBlog uses a single localStorage key to remember your theme preference
            (dark or light mode). We do not use tracking cookies, advertising cookies, or
            third-party cookies of any kind.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Correct inaccurate data.</li>
            <li>Delete your account and all associated data at any time.</li>
            <li>Export your content before deleting your account.</li>
          </ul>
          <p>To exercise any of these rights, contact us at the email address below.</p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>
            ThePublicBlog uses TinyMCE for the rich text editor. TinyMCE may load resources
            from its CDN. Their privacy policy is available at{" "}
            <a href="https://www.tiny.cloud/privacy" target="_blank" rel="noopener noreferrer">
              tiny.cloud/privacy
            </a>.
          </p>
          <p>
            We use Google Fonts to load Playfair Display and DM Sans. Google may log font
            requests as described in their{" "}
            <a href="https://fonts.google.com/about" target="_blank" rel="noopener noreferrer">
              fonts privacy FAQ
            </a>.
          </p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>
            ThePublicBlog is not directed at children under the age of 13. We do not knowingly
            collect personal information from children. If you believe a child has created an
            account, please contact us and we will remove the data promptly.
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. When we do, we will update the date
            at the top of this page. Continued use of ThePublicBlog after changes constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            If you have any questions about this privacy policy or your data, please reach
            out at{" "}
            <a href="mailto:privacy@thepublicblog.com">
              privacy@thepublicblog.com
            </a>.
          </p>
        </section>

      </div>

      {/* Footer nav */}
      <div className="mt-12 pt-8 border-t border-default flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <Link to="/" className="text-sm text-amber hover:underline cursor-pointer">
          ← Back to home
        </Link>
        <Link to="/terms" className="text-sm text-muted hover:text-amber transition-colors cursor-pointer">
          Terms & Conditions →
        </Link>
      </div>
    </div>
  );
}