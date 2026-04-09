import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RewardsSection from "@/components/RewardsSection";

const RewardsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20">
      <RewardsSection />
    </div>
    <Footer />
  </div>
);

export default RewardsPage;
