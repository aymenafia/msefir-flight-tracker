'use client';
import { useTranslation } from "@/hooks/use-translation";

export function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="border-t mt-12">
            <div className="container mx-auto max-w-4xl py-8 px-4 text-center text-muted-foreground">
                <div className="flex justify-center gap-4 md:gap-8 mb-4">
                    <p>{t('footer.tagline')}</p>
                </div>
                <p className="text-sm">&copy; {new Date().getFullYear()} msefir. {t('footer.rights')}</p>
            </div>
        </footer>
    );
}
