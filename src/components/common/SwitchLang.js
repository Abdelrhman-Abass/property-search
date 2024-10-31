"use clint";
import { useLocale } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";

const SwitchLang = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const local = useLocale();
  const pathname = usePathname();

  const onChangeLang = () => {
    startTransition(() => {
      const localtion = pathname.slice(3);
      const changed = local == "ar" ? "en" : "ar";
      router.replace(`/${changed}/${localtion}`);
    });
  };

  return (
    <div className="col-auto">
      <button
        onClick={onChangeLang}
        className="d-flex align-items-center gap-1 lang-btn"
      >
        <div className="lang-global">
          <Image src="/lang.png" width={19} height={19} alt="lang" />
        </div>
        <span className="text-uppercase">{local == "ar" ? "EN" : "AR"}</span>
      </button>
    </div>
  );
};

export default SwitchLang;
