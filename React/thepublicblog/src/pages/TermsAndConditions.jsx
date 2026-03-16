import { Link } from "react-router-dom";

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-12 pb-8 border-b border-default">
        <span className="text-xs font-medium uppercase tracking-widest text-amber mb-4 block">
          Legal
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
          Terms & Conditions
        </h1>
        <p className="text-muted text-sm">Last updated: March 16, 2026</p>
      </div>

      {/* Content */}
      <div className="prose-content flex flex-col gap-8">

        <section>
          <h2>Agreement</h2>
          <p>
            By creating an account or using ThePublicBlog, you agree to these terms. If you
            do not agree, please do not use the platform. These terms apply to all visitors,
            registered users, and contributors.
          </p>
        </section>

        <section>
          <h2>Your Account</h2>
          <p>
            You are responsible for keeping your account credentials secure. You must not share
            your account with others or use someone else's account. You must provide accurate
            information when registering.
          </p>
          <p>
            You must be at least 13 years old to create an account. By registering, you confirm
            that you meet this requirement.
          </p>
        </section>

        <section>
          <h2>Content You Post</h2>
          <p>
            You retain full ownership of the content you publish on ThePublicBlog. By posting,
            you grant ThePublicBlog a non-exclusive, royalty-free licence to display and
            distribute your content on the platform.
          </p>
          <p>You agree not to post content that:</p>
          <ul>
            <li>Is unlawful, harmful, threatening, abusive, or harassing.</li>
            <li>Infringes the intellectual property rights of others.</li>
            <li>Contains spam, malware, or deceptive information.</li>
            <li>Violates the privacy of any individual.</li>
            <li>Promotes discrimination, violence, or hatred toward any group.</li>
          </ul>
          <p>
            We reserve the right to remove content that violates these terms without prior notice.
          </p>
        </section>

        <section>
          <h2>Intellectual Property</h2>
          <p>
            The ThePublicBlog name, logo, design, and codebase are the intellectual property
            of ThePublicBlog. You may not reproduce, distribute, or create derivative works
            from them without written permission.
          </p>
          <p>All user-generated content remains the property of its respective authors.</p>
        </section>

        <section>
          <h2>Platform Availability</h2>
          <p>
            We strive to keep ThePublicBlog available at all times, but we do not guarantee
            uninterrupted access. We may suspend or discontinue the service at any time for
            maintenance, security, or other reasons. We will attempt to provide advance notice
            where possible.
          </p>
        </section>

        <section>
          <h2>Termination</h2>
          <p>
            You may delete your account at any time. We reserve the right to suspend or
            terminate accounts that violate these terms, engage in abusive behaviour, or
            otherwise harm the platform or its users.
          </p>
          <p>
            Upon termination, your posts will be removed from public view. You are responsible
            for backing up any content you wish to keep before deleting your account.
          </p>
        </section>

        <section>
          <h2>Disclaimers</h2>
          <p>
            ThePublicBlog is provided "as is" without warranties of any kind. We are not
            responsible for the accuracy, completeness, or reliability of any user-generated
            content published on the platform.
          </p>
          <p>
            We are not liable for any direct, indirect, incidental, or consequential damages
            arising from your use of or inability to use the platform.
          </p>
        </section>

        <section>
          <h2>Governing Law</h2>
          <p>
            These terms are governed by applicable law. Any disputes arising from these terms
            or your use of ThePublicBlog will be resolved through good-faith negotiation before
            any formal proceedings.
          </p>
        </section>

        <section>
          <h2>Changes to These Terms</h2>
          <p>
            We may update these terms at any time. The updated date at the top of this page
            will reflect the most recent revision. Continued use of the platform after changes
            are posted constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about these terms? Reach us at{" "}
            <a href="mailto:legal@thepublicblog.com">
              legal@thepublicblog.com
            </a>.
          </p>
        </section>

      </div>

      {/* Footer nav */}
      <div className="mt-12 pt-8 border-t border-default flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <Link to="/" className="text-sm text-amber hover:underline cursor-pointer">
          ← Back to home
        </Link>
        <Link to="/privacy" className="text-sm text-muted hover:text-amber transition-colors cursor-pointer">
          Privacy Policy →
        </Link>
      </div>
    </div>
  );
}