"use client";

import { useLocale } from "@/contexts/LocaleContext";

export function TranslatedTitle({ translationKey }: { translationKey: string }) {
  const { t } = useLocale();
  return <>{t(translationKey)}</>;
}
