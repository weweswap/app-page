import { useEffect, useState } from "react";
import Link from "next/link";
import { Typography } from "./Typography";
import { Button } from "./Button";
import { toast } from "react-toastify";

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setShowBanner(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-2 py-4 lg:p-5 flex-col flex gap-4 z-50">
      <Typography  size="sm">
      We use cookies to personalize content, improve your experience, and analyze site traffic. By clicking 'Accept,' you agree to our use of cookies. For more information, please refer to our 
        <Link className="text-blue-400 underline hover:text-blue-300" href={""} onClick={() => {toast.info("Work in progress.", {theme: "dark"})}}> Privacy Policy.</Link>
      </Typography>
      <Button
        onClick={handleAccept}
        className="w-fit bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none"
      >
        <Typography size="lg" className="px-5">Accept</Typography>
      </Button>
      </div>
  );
};

export default CookieBanner;
