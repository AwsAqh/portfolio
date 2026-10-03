/* ============================================================
   BLOG POSTS — single source of truth
   ------------------------------------------------------------
   • Posts are listed NEWEST FIRST. Array order = display order.
   • index.html only shows the latest HOME_POST_LIMIT posts; the
     rest (plus the full archive) live on blog.html.
   • To add a post: prepend a new object here with the next `id`
     and matching `tags` slug(s). Nothing else needs editing —
     the home page keeps itself short automatically.
   ============================================================ */

// How many posts the home page shows before pointing to blog.html
const HOME_POST_LIMIT = 6;

// Filter pills rendered on blog.html (label + tag slug used in `tags`)
const POST_FILTERS = [
    { label: 'All',     value: 'all'    },
    { label: 'Dev Log', value: 'devlog' },
    { label: 'TIL',     value: 'til'    },
    { label: 'Tools',   value: 'tools'  },
    { label: 'Career',  value: 'career' }
];

const BLOG_POSTS = [
    {
        id: 1,
        date: 'Oct 1, 2026', tag: 'Dev Log', tags: ['devlog'],
        title: 'Building a Safe Logging Middleware for Node.js',
        excerpt: "A quick outline of the safe-logging package I've been working on — automatically redacting secrets, tokens, and PII before they hit your log sink.",
        links: [
            { label: 'npm: @awsaqh/redact-logs', url: 'https://www.npmjs.com/package/@awsaqh/redact-logs', icon: 'fab fa-npm' },
            { label: 'Source on GitHub', url: 'https://github.com/AwsAqh/redact-logs', icon: 'fab fa-github' }
        ],
        body: `
            <p>One of the most common production incidents I've seen is accidentally logging sensitive data — API keys, passwords, JWT tokens, or user PII slipping into your log output.</p>
            <h4>The Problem</h4>
            <p>Standard loggers like Winston or Pino will faithfully serialize whatever object you pass them. If a request body or error object contains a <code>password</code> field, it goes straight into your log sink — potentially Datadog, CloudWatch, or wherever.</p>
            <h4>The Approach</h4>
            <ul>
                <li>A recursive redactor that walks any object and replaces values at sensitive keys with <code>[REDACTED]</code>.</li>
                <li>A middleware layer that wraps Express/Koa request/response logging.</li>
                <li>Regex pattern matching for bearer tokens and credit card numbers that don't have a predictable key name.</li>
            </ul>
            <h4>What's Next</h4>
            <p>Publishing it as an npm package. The goal is zero-config drop-in safety with a sensible default blocklist, and full customizability for teams with specific needs.</p>`
    },
    {
        id: 2,
        date: 'Sep 22, 2026', tag: 'TIL', tags: ['til'],
        title: 'TIL: Kubernetes Job Queueing with Kueue',
        excerpt: 'Notes from my open-source contribution to kubernetes-sigs/kueue — how quota management works and why it matters for batch workloads.',
        links: [
            { label: 'kubernetes-sigs/kueue', url: 'https://github.com/kubernetes-sigs/kueue', icon: 'fab fa-github' }
        ],
        body: `
            <p>While contributing to <strong>kubernetes-sigs/kueue</strong>, I had to really understand the quota and borrowing model. Here's my condensed understanding.</p>
            <h4>What is Kueue?</h4>
            <p>Kueue is a Kubernetes-native job queuing system. Instead of submitting jobs directly to the cluster, you submit them to Kueue, which manages when they actually get scheduled based on available quota.</p>
            <h4>Key Concepts</h4>
            <ul>
                <li><strong>ResourceFlavor</strong> — describes a class of nodes (e.g., GPU vs CPU).</li>
                <li><strong>ClusterQueue</strong> — holds quota and borrowing rules for a set of resources.</li>
                <li><strong>LocalQueue</strong> — namespace-scoped view into a ClusterQueue for teams.</li>
            </ul>
            <h4>My Contribution</h4>
            <p>I fixed a documentation inconsistency in the quota borrowing examples that was causing confusion for new contributors. Small change, big impact on onboarding clarity.</p>`
    },
    {
        id: 3,
        date: 'Sep 10, 2026', tag: 'Tools', tags: ['tools'],
        title: 'n8n vs Custom Scripts — When to Use Which',
        excerpt: 'A pragmatic comparison of low-code automation (n8n) vs rolling your own scripts, with concrete tradeoffs for solo developers and small teams.',
        links: [
            { label: 'n8n.io', url: 'https://n8n.io', icon: 'fas fa-link' }
        ],
        body: `
            <p>I've been using both n8n and plain Node.js scripts for automation. Here's my honest take on when each makes sense.</p>
            <h4>Use n8n when…</h4>
            <ul>
                <li>The workflow involves many third-party integrations (Slack, Google Sheets, GitHub, etc.).</li>
                <li>Non-technical teammates need to inspect or modify the workflow.</li>
                <li>You need a visual audit trail of runs.</li>
            </ul>
            <h4>Use a custom script when…</h4>
            <ul>
                <li>The logic is complex enough that visual nodes become harder to read than code.</li>
                <li>You need tight control over error handling and retries.</li>
                <li>Performance matters — n8n adds overhead per node.</li>
            </ul>
            <h4>My Rule of Thumb</h4>
            <p>If it fits on one page of n8n canvas without scrolling, use n8n. If you're scrolling or the JS Code nodes outnumber the integration nodes, write a script.</p>`
    },
    {
        id: 4,
        date: 'Aug 28, 2026', tag: 'Career', tags: ['career'],
        title: 'What I Learned in My First Full-Stack Internship',
        excerpt: 'Reflections from my time at GridsApps — shipping features fast, code review culture, and the gap between university projects and production code.',
        links: [
            { label: 'GridsApps', url: 'https://gridsapps.com', icon: 'fas fa-link' }
        ],
        body: `
            <p>Three months at GridsApps taught me more about real-world engineering than two years of side projects. Here are the biggest lessons.</p>
            <h4>1. Code Review is a Skill</h4>
            <p>I thought writing code was the hard part. It's not — writing code that other people can understand, review, and maintain is. My first PR had 30+ comments. By month two, I was down to 5.</p>
            <h4>2. "Done" Means Deployed and Monitored</h4>
            <p>University projects end when the feature works locally. Production means the feature works, has tests, is behind a feature flag, has logging, and you've watched it in staging.</p>
            <h4>3. Ask Early, Ask Often</h4>
            <p>I wasted a week going down the wrong architectural path because I didn't want to look like I didn't know something. Asking earlier would have saved everyone time.</p>
            <h4>4. The Best Developers Communicate</h4>
            <p>The senior devs I admired most weren't the fastest coders. They were the ones who could explain tradeoffs clearly and write good Slack messages.</p>`
    },
    {
        id: 5,
        date: 'Aug 12, 2026', tag: 'Dev Log', tags: ['devlog'],
        title: 'ZerfAi: From Idea to Launch in 3 Weeks',
        excerpt: 'The full story of building and shipping ZerfAi — the AI-powered SaaS idea analyzer — from an empty repo to a live product with real users.',
        links: [
            { label: 'zerfai.com', url: 'https://www.zerfai.com/', icon: 'fas fa-link' }
        ],
        body: `
            <p>ZerfAi started as a weekend experiment: what if I could feed AI real pain-point threads from Reddit and ProductHunt to validate SaaS ideas systematically?</p>
            <h4>Week 1 — Core Loop</h4>
            <p>Built the idea submission form and the AI analysis pipeline using OpenAI's API. The hardest part was prompt engineering — getting structured JSON output that was actually useful.</p>
            <h4>Week 2 — Auth and Persistence</h4>
            <p>Added Supabase for auth and storage. Used Next.js Server Actions to keep API keys server-side. Built the idea vault — a dashboard where users can save and compare analyses.</p>
            <h4>Week 3 — Polish and Launch</h4>
            <p>Responsive UI polish, SEO meta tags, and landing page copy. Deployed to Vercel. Posted in two communities and got the first 50 users within 48 hours.</p>
            <h4>Takeaway</h4>
            <p>Ship ugly. The version I shipped in week 3 was embarrassing compared to what I had in my head. Real feedback from real users is worth more than another week of polishing in isolation.</p>`
    },
    {
        id: 6,
        date: 'Jul 30, 2026', tag: 'TIL', tags: ['til'],
        title: 'TIL: Roslyn Analyzers and How They Catch Bugs at Compile Time',
        excerpt: 'While contributing to xunit.analyzers I learned how Roslyn analyzers work — and how to write your own diagnostic rules to enforce coding standards.',
        links: [
            { label: 'xunit/xunit.analyzers', url: 'https://github.com/xunit/xunit.analyzers', icon: 'fab fa-github' }
        ],
        body: `
            <p>Contributing to <strong>xunit.analyzers</strong> introduced me to Roslyn — the .NET compiler platform that lets you write custom diagnostic rules.</p>
            <h4>What's a Roslyn Analyzer?</h4>
            <p>It's a piece of code that runs during compilation (or in the IDE in real time) and can emit warnings, errors, or suggestions based on patterns it finds in your source code.</p>
            <h4>How They Work</h4>
            <ul>
                <li>You register a <strong>SyntaxNode action</strong> to be called when the compiler visits certain node types.</li>
                <li>Inside the callback, you analyze the node and call <code>context.ReportDiagnostic()</code> if something looks wrong.</li>
                <li>The IDE shows a squiggly underline immediately — no need to run the code.</li>
            </ul>
            <h4>My Fix</h4>
            <p>I corrected a false-positive in one of the xUnit assertion analyzers that was triggering on valid async assertion patterns. The fix involved checking whether the awaited expression was the assertion itself or just a value provider.</p>`
    }
];

