import { useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";

interface CaptchaFieldProps {
  value: string;
  onChange: (value: string) => void;
  onValidChange?: (isValid: boolean) => void;
  sitekey?: string;
}

// Extend the Window interface to include hcaptcha
declare global {
  interface Window {
    hcaptcha: any;
  }
}

export function CaptchaField({
  onChange,
  onValidChange,
  sitekey = "10000000-ffff-ffff-ffff-000000000001" // hCaptcha test key
}: CaptchaFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Function to initialize hCaptcha
    const initHCaptcha = () => {
      if (!containerRef.current || !window.hcaptcha) return;

      // Clear any existing widget
      if (widgetIdRef.current) {
        try {
          window.hcaptcha.remove(widgetIdRef.current);
        } catch (e) {
          console.error("Error removing hCaptcha widget:", e);
        }
      }

      // Render new widget
      try {
        widgetIdRef.current = window.hcaptcha.render(containerRef.current, {
          sitekey: sitekey,
          callback: (token: string) => {
            onChange(token);
            onValidChange?.(true);
          },
          "expired-callback": () => {
            onChange("");
            onValidChange?.(false);
          },
          "error-callback": () => {
            onChange("");
            onValidChange?.(false);
          },
        });
      } catch (e) {
        console.error("Error rendering hCaptcha:", e);
      }
    };

    // Check if hCaptcha script is already loaded
    if (window.hcaptcha) {
      initHCaptcha();
    } else {
      // Wait for hCaptcha script to load
      const checkHCaptcha = setInterval(() => {
        if (window.hcaptcha) {
          clearInterval(checkHCaptcha);
          initHCaptcha();
        }
      }, 100);

      return () => {
        clearInterval(checkHCaptcha);
        if (widgetIdRef.current && window.hcaptcha) {
          try {
            window.hcaptcha.remove(widgetIdRef.current);
          } catch (e) {
            console.error("Error removing hCaptcha widget:", e);
          }
        }
      };
    }

    return () => {
      if (widgetIdRef.current && window.hcaptcha) {
        try {
          window.hcaptcha.remove(widgetIdRef.current);
        } catch (e) {
          console.error("Error removing hCaptcha widget:", e);
        }
      }
    };
  }, [sitekey, onChange, onValidChange]);

  return (
    <div className="space-y-2">
      <Label className="font-mono">
        Security Verification
      </Label>
      <div ref={containerRef} className="h-captcha" />
    </div>
  );
}
