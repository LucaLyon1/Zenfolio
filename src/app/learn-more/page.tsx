
import Link from 'next/link';

export default function LearnMore() {
    return (
        <div className="min-h-screen p-8 text-gray-300">
            <div className="max-w-3xl mx-auto rounded-lg shadow-md p-6 text-justify">
                <h1 className="text-3xl font-bold mb-6">Learn More About ZenFolio</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">What is ZenFolio?</h2>
                    <p className="mb-4">
                        ZenFolio is a financial growth visualization tool that helps you track and project
                        your wealth accumulation over time. It's designed to provide a zen-like experience,
                        focusing on long-term growth rather than short-term market fluctuations.
                        Zenfolio has no ambition on being 100% accurate, it projects the growth of your portfolio
                        using a historical average value, but this is NOT a guarantee.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                    <ul className="list-disc pl-6">
                        <li>Real-time wealth growth visualization</li>
                        <li>Customizable portfolio settings</li>
                        <li>Goal tracking for major purchases (car, house) and becoming a millionaire</li>
                        <li>User authentication for personalized experiences</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
                    <ol className="list-decimal pl-6">
                        <li className="mb-2">Sign up or log in to your account</li>
                        <li className="mb-2">Set your initial capital, monthly savings, and expected growth rate</li>
                        <li className="mb-2">Watch your wealth grow in real-time on the dashboard</li>
                        <li className="mb-2">Adjust your settings anytime to see how different scenarios affect your growth</li>
                    </ol>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
                    <ul className="list-disc pl-6">
                        <li>Next.js 14 with App Router for efficient, server-side rendered React applications</li>
                        <li>Tailwind CSS for responsive and customizable styling</li>
                        <li>Prisma ORM for database management</li>
                        <li>Clerk for user authentication and management</li>
                    </ul>
                </section>

                <Link href="/" className="inline-block text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors border border-gray-600">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}