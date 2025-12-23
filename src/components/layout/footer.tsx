export function Footer() {
    return (
        <footer className="border-t mt-12">
            <div className="container mx-auto max-w-4xl py-8 px-4 text-center text-muted-foreground">
                <div className="flex justify-center gap-4 md:gap-8 mb-4">
                    <p>msefir — وضعية الرحلات بكل بساطة</p>
                    <p>msefir — Suivez votre vol sans stress</p>
                </div>
                <p className="text-sm">&copy; {new Date().getFullYear()} msefir. All rights reserved.</p>
            </div>
        </footer>
    );
}
