'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="main" className="admin-main"><h1>We couldn’t load this workspace.</h1><p>Please check the database connection and try again. Your saved content is unchanged.</p><button className="admin-button" onClick={reset}>Try again</button></main>}
