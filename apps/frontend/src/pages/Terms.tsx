import { motion } from "motion/react";
import { ArrowLeft, Shield, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const TermsPrivacy = () => {
  return (
    <div className="min-h-screen bg-[rgb(13, 13, 13)] text-white terms">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="hero-text">Terms & Privacy</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Our commitment to transparency and your rights
          </p>
        </motion.div>

        {/* Terms of Service Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass-card rounded-2xl p-8 border border-neon-green/20">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-neon-green" />
              <h2 className="text-2xl font-bold text-foreground">
                Terms of Service
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Acceptance
                </h3>
                <p>
                  By accessing and using AlgoArena, you accept and agree to be
                  bound by the terms and provision of this agreement. If you do
                  not agree to abide by the above, please do not use this
                  service.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  User Conduct
                </h3>
                <p>
                  Users are expected to maintain respectful behavior when
                  participating in our coding challenges and community features.
                  Any form of harassment, cheating, or malicious activity is
                  strictly prohibited and may result in account suspension.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Intellectual Property
                </h3>
                <p>
                  All content, challenges, and educational materials provided on
                  AlgoArena are protected by intellectual property laws. Users
                  retain ownership of their submitted solutions but grant us a
                  license to use them for educational purposes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Service Availability
                </h3>
                <p>
                  We strive to maintain 99.9% uptime but cannot guarantee
                  uninterrupted service. Maintenance windows and unexpected
                  downtime may occur, and we will communicate these as
                  transparently as possible.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Privacy Policy Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card rounded-2xl p-8 border border-neon-green/20">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-neon-green" />
              <h2 className="text-2xl font-bold text-foreground">
                Privacy Policy
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Data Usage
                </h3>
                <p>
                  We collect only the necessary information to provide you with
                  the best coding experience. This includes your email, progress
                  data, and solution submissions. We never sell your personal
                  data to third parties.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Cookies
                </h3>
                <p>
                  We use essential cookies to maintain your session and
                  preferences. Analytics cookies help us understand how you use
                  our platform to improve your experience. You can manage cookie
                  preferences in your browser settings.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Third-Party Tools
                </h3>
                <p>
                  We integrate with trusted third-party services for analytics,
                  authentication, and payment processing. These partners are
                  bound by strict data protection agreements and only receive
                  the minimum data necessary.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  User Rights
                </h3>
                <p>
                  You have the right to access, modify, or delete your personal
                  data at any time. You can export your progress data or request
                  complete account deletion through your account settings or by
                  contacting our support team.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Contact Info
                </h3>
                <p>
                  For any privacy-related questions or concerns, please reach
                  out to us at privacy@algoarena.com. We typically respond
                  within 48 hours and are committed to addressing your concerns
                  promptly.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-neon-green hover:text-neon-blue transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
          <p className="text-muted-foreground text-sm mt-4">
            Last updated: June 2025
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPrivacy;
