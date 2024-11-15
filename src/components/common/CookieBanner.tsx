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
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-2 py-4 lg:p-5 flex flex-col lg:flex-row justify-between items-center gap-4 z-50 border-2 border-white border-opacity-40">
      <Typography  size="sm">
      We use cookies and similar technologies to analyze our traffic. You can choose not to allow some type of cookies by clicking Manage Settings in <Link className="text-blue-400 underline hover:text-blue-300" href={""} onClick={() => {toast.info("Work in progress.", {theme: "dark"})}}> Cookie Policy.</Link>
      </Typography>
      <Button
        onClick={handleAccept}
        className="bg_pink hover:bg-[#fb7bff] text-white text-sm px-4 py-2 rounded-md focus:outline-none"
      >
        <Typography size="sm" secondary className="text-black uppercase font-extrabold">Accept</Typography>
      </Button>
      </div>
  );
};

export default CookieBanner;
