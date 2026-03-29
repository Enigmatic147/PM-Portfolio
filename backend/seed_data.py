import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from utils.auth import get_password_hash
from datetime import datetime
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Blog posts data from frontend mock
blog_posts = [
    {
        "number": "01",
        "title": "How SQL changed the way I make product decisions",
        "slug": "sql-product-decisions",
        "date": datetime(2026, 3, 24),
        "category": "Data & Analytics",
        "difficulty": "Beginner",
        "readTime": "5 min read",
        "excerpt": "Most PMs rely on dashboards and gut feelings. Here's why learning SQL transformed my decision-making process and how you can start today.",
        "content": """# How SQL changed the way I make product decisions

Most product managers I know rely on dashboards built by others. They wait for data teams to run queries, create reports, and answer questions. I used to be one of them.

Then I learned SQL, and everything changed.

## The problem with secondhand data

When you depend on others for data, you're always one step removed from the truth. You ask questions based on what you think you need to know, but you can't explore, iterate, or dig deeper in real-time.

The feedback loop is broken. By the time you get answers, the context has shifted, and you're asking new questions.

## What SQL unlocked for me

**Speed**: I can answer my own questions in minutes, not days.

**Depth**: I can slice data in ways I never thought to request.

**Confidence**: I understand where numbers come from and what they actually mean.

**Discovery**: I find patterns and insights I wasn't looking for.

At GAH IT Services, I used SQL to identify friction points in our onboarding funnel. Instead of waiting for weekly reports, I ran queries daily, testing hypotheses and validating fixes in real-time. That direct feedback loop led to a 12% improvement in user activation.

## The queries that matter most

You don't need to be a data engineer. Here are the types of queries I run weekly:

1. **Funnel analysis**: Where are users dropping off?
2. **Cohort retention**: How do different user groups behave over time?
3. **Feature adoption**: What percentage of users actually use new features?
4. **Segmentation**: How do power users differ from casual users?

## How to start

You don't need to master complex joins and window functions on day one. Start small:

- **Week 1**: Learn SELECT, WHERE, and basic filtering
- **Week 2**: Practice COUNT, SUM, AVG, and GROUP BY
- **Week 3**: Understand JOINs (INNER, LEFT)
- **Week 4**: Apply it to real product questions

The best learning happens when you're answering real questions about your product.

## The mindset shift

Learning SQL isn't just about writing queries. It's about thinking in data, asking better questions, and building a mental model of how your product actually works.

It's the difference between being told what's happening and discovering it yourself.

And once you make that shift, there's no going back.""",
        "published": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "number": "02",
        "title": "The GTM mistakes most PMs make — and how to avoid them",
        "slug": "gtm-mistakes-pms-make",
        "date": datetime(2026, 3, 17),
        "category": "GTM Strategy",
        "difficulty": "Beginner",
        "readTime": "6 min read",
        "excerpt": "Building a great product means nothing if you can't get it to market effectively. Here are the GTM mistakes I see repeatedly — and how to fix them.",
        "content": """# The GTM mistakes most PMs make — and how to avoid them

You've built a great product. The features work, customers love it, and your team is proud. But the numbers aren't moving.

Sound familiar?

I've seen this pattern repeat across SaaS and healthtech companies. The product isn't the problem. The go-to-market strategy is.

## Mistake #1: Treating GTM as Marketing's problem

Product managers often think their job ends at launch. They hand things off to Marketing and move on to the next feature.

But GTM isn't a handoff — it's a collaboration.

At Frontier Business Systems, I learned this the hard way. We launched a new integration bundle and assumed Marketing would handle positioning and messaging. Three months later, sales were flat. Why? Because we hadn't aligned on:

- Who the ideal customer was
- What pain points we were solving
- How to communicate value clearly

Once I started working directly with Sales and Marketing to define these together, everything changed. We reduced CAC by 34% in six months.

**Fix**: Own GTM strategy as part of your product role. Work with Marketing to define ICP, positioning, and messaging before launch — not after.

## Mistake #2: Launching without segmentation

Not all customers are the same. Yet most PMs launch with a one-size-fits-all approach.

When we introduced behaviour-based segmentation at Frontier, we discovered that mid-market customers had completely different needs than enterprise clients. Our onboarding flow, pricing, and support model needed to reflect that.

Segmentation isn't just for Marketing. It's a product decision.

**Fix**: Define clear customer segments before launch. Tailor onboarding, messaging, and success metrics for each segment.

## Mistake #3: Ignoring the full funnel

Most PMs obsess over activation and engagement. But if your acquisition cost is too high or retention is broken, growth won't happen.

I track five GTM metrics religiously:

1. **CAC** (Customer Acquisition Cost)
2. **Activation rate** (% of users reaching value)
3. **NPS** (Net Promoter Score)
4. **Retention** (7-day, 30-day cohorts)
5. **LTV:CAC ratio**

At GAH IT Services, we improved activation by 12%, but that only mattered because we'd already optimized acquisition and retention.

**Fix**: Map the entire funnel. Identify the weakest link and optimize there first.

## Mistake #4: No feedback loop from Sales

Sales teams talk to prospects every day. They hear objections, questions, and concerns that never make it into your roadmap.

I run weekly 30-minute syncs with Sales. I ask:

- What objections are you hearing repeatedly?
- Which features are prospects asking for?
- Where are we losing deals?

This feedback has shaped pricing changes, feature prioritization, and messaging tweaks that directly impacted close rates.

**Fix**: Build a regular feedback loop with Sales. Make it easy for them to share insights.

## Mistake #5: Launching and forgetting

Launch isn't the end. It's the beginning.

I treat the first 90 days post-launch as a discovery phase. I'm watching funnels, talking to users, and iterating based on what I learn.

Most GTM failures aren't strategy failures. They're execution and iteration failures.

**Fix**: Plan for post-launch iteration. Schedule weekly reviews of GTM metrics and be ready to adjust quickly.

## The mindset shift

GTM isn't a one-time event. It's an ongoing process of aligning product, marketing, and sales around a shared understanding of the customer and the value you deliver.

And when you get it right, growth stops being a mystery.""",
        "published": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "number": "03",
        "title": "Why VoC programs are broken — and how to fix them",
        "slug": "voc-programs-broken",
        "date": datetime(2026, 3, 10),
        "category": "Discovery",
        "difficulty": "Beginner",
        "readTime": "5 min read",
        "excerpt": "Voice of Customer programs sound great in theory. In practice, most are theater. Here's what actually works.",
        "content": """# Why VoC programs are broken — and how to fix them

Every company claims to be customer-centric. Most run surveys, hold user interviews, and collect feedback.

But when I audit VoC programs, I see the same problems everywhere:

- Feedback goes into a black hole
- Insights don't reach the product team
- Nothing actually changes

Voice of Customer isn't broken because of bad intentions. It's broken because of bad systems.

## The theater of customer feedback

Here's how most VoC programs work:

1. Send quarterly NPS surveys
2. Collect responses
3. Create a dashboard
4. Present findings in a meeting
5. Do nothing

It's theater. It looks like customer-centricity, but it doesn't drive decisions.

At GAH IT Services, we had a 60% NPS response rate. That sounds impressive until you realize nobody was reading the responses. They were going into a Slack channel and getting buried.

## What actually works: The feedback loop

I rebuilt our VoC program around one principle: **Every piece of feedback should lead to a decision**.

Here's the system:

### 1. Centralize feedback in one place

We use a simple Airtable base with fields for:
- Customer name
- Feedback type (bug, feature request, pain point)
- Source (support ticket, interview, survey)
- Priority (impact × frequency)
- Status (new, under review, roadmapped, shipped)

### 2. Weekly triage sessions

Every Monday, I spend 30 minutes reviewing new feedback with the team. We ask:
- Is this a real problem or an edge case?
- How many customers are affected?
- What's the underlying need?
- Should this go on the roadmap?

### 3. Close the loop

When we ship something based on feedback, we tell the customer. This is critical.

We send a simple email:

> "You mentioned [problem]. We just shipped [solution]. Try it and let us know what you think."

Response rates to these emails are 10x higher than generic product updates.

## The discovery cadence

Surveys and interviews aren't the same thing.

**Surveys** tell you *what* is happening. **Interviews** tell you *why*.

I run both on a regular cadence:

- **Monthly**: In-depth interviews with 5-8 users
- **Quarterly**: NPS survey with open-ended questions
- **Ongoing**: Support ticket analysis (weekly)

The magic happens when you combine all three. Surveys surface patterns. Interviews explain them. Support tickets validate them.

## The questions that matter

Most customer interviews are too broad. "Tell me about your workflow" leads to rambling answers.

I ask specific, job-to-be-done style questions:

- "Walk me through the last time you tried to [do X]. What happened?"
- "What workaround are you using to solve [problem]?"
- "If you could change one thing about [feature], what would it be?"

These questions uncover real friction, not hypothetical wishes.

## From insights to action

The gap between feedback and action is where most VoC programs die.

Here's how we bridge it:

1. **Tag every piece of feedback** with themes (onboarding, pricing, integrations, etc.)
2. **Quantify impact**: How many users mentioned this? What's the revenue at risk?
3. **Map to OKRs**: Does this align with our current goals?
4. **Decide fast**: Yes, no, or not now. No maybes.

At GAH IT Services, VoC-led discovery drove 30% of our roadmap. And because it was tied to real customer pain, adoption was higher.

## The mindset shift

VoC isn't about listening to customers. It's about building systems that turn listening into action.

And when you do that, customer-centricity stops being a buzzword and starts being a competitive advantage.""",
        "published": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "number": "04",
        "title": "NPS is lying to you — here's what to measure instead",
        "slug": "nps-lying-what-to-measure",
        "date": datetime(2026, 3, 3),
        "category": "Metrics",
        "difficulty": "Beginner",
        "readTime": "4 min read",
        "excerpt": "NPS has become the default metric for customer satisfaction. But it's hiding more than it reveals. Here's what I track instead.",
        "content": """# NPS is lying to you — here's what to measure instead

Net Promoter Score is everywhere. Boards love it, executives track it, and PMs report on it.

But NPS has a dirty secret: **it doesn't predict behavior**.

I've seen companies with 70+ NPS scores lose customers. I've seen companies with 40 NPS scores grow revenue by 50%. The correlation between NPS and actual business outcomes is weaker than most people think.

So what should you measure instead?

## The problem with NPS

NPS asks one question: *"How likely are you to recommend us to a friend?"*

It's simple, standardized, and completely divorced from action.

Think about it: How many times have you given a product a high NPS score and never recommended it to anyone? Or used a product daily despite rating it a 6?

NPS measures sentiment, not behavior. And sentiment is a lagging indicator.

## What actually predicts retention and growth

After years of experimenting with different metrics, I track three things:

### 1. Product engagement score (PES)

This is a composite metric based on:
- **Frequency**: How often do users log in?
- **Depth**: How many features do they use?
- **Duration**: How much time do they spend?

At Frontier Business Systems, I built a simple scoring model:

- Daily active users: 10 points
- Weekly active: 5 points
- Using 3+ features: 5 points
- Session > 10 minutes: 5 points

Users with a PES above 15 had 90% retention. Users below 10 churned within 60 days.

PES is a leading indicator. It tells you who's at risk before they leave.

### 2. Time to value (TTV)

How long does it take a new user to experience their first "aha" moment?

At GAH IT Services, we defined value as completing onboarding and creating their first workflow. The faster users hit that milestone, the higher their retention.

When we reduced TTV from 7 days to 3 days, activation improved by 12%.

NPS never would have caught that.

### 3. Feature adoption rate

This one's simple: What percentage of your users are using the features you ship?

If you launch a feature and only 15% of users adopt it, something's wrong. Either:
- The feature isn't solving a real problem
- The onboarding is broken
- The messaging isn't clear

I track adoption at 7, 30, and 90 days. If a feature isn't hitting 40% adoption by day 30, I investigate.

## The one survey question I do ask

I still run surveys, but I don't ask about recommendations. I ask:

**"How disappointed would you be if you could no longer use [product]?"**

Options:
- Very disappointed
- Somewhat disappointed
- Not disappointed

This is the Sean Ellis test, and it's far more predictive than NPS.

Users who answer "very disappointed" are your core audience. They're the ones driving retention and growth. If that number is above 40%, you have product-market fit.

If it's below 40%, no amount of marketing will save you.

## The metrics that match your goals

Not every metric matters for every product. What you track should depend on your business model:

**SaaS B2B**: Focus on activation, feature adoption, and expansion revenue

**Freemium**: Focus on time to value and conversion rate

**Marketplace**: Focus on transaction frequency and GMV per user

**Content/Media**: Focus on engagement depth and return visits

NPS is a one-size-fits-all metric. That's the problem.

## The mindset shift

Metrics aren't about reporting. They're about understanding behavior and predicting outcomes.

NPS tells you how people feel. Engagement, adoption, and TTV tell you what people do.

And in product management, behavior beats sentiment every time.""",
        "published": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
]

async def seed_database():
    print("🌱 Starting database seeding...")
    
    # 1. Create admin user
    print("\n📝 Creating admin user...")
    admin_exists = await db.admin_users.find_one({"username": "admin"})
    
    if not admin_exists:
        admin_user = {
            "username": "admin",
            "email": "admin@pranaymishra.pm",
            "password": get_password_hash("admin123"),  # Default password
            "createdAt": datetime.utcnow()
        }
        await db.admin_users.insert_one(admin_user)
        print("✅ Admin user created")
        print("   Username: admin")
        print("   Password: admin123")
        print("   ⚠️  Please change this password after first login!")
    else:
        print("ℹ️  Admin user already exists")
    
    # 2. Seed blog posts
    print("\n📝 Seeding blog posts...")
    existing_posts = await db.blog_posts.count_documents({})
    
    if existing_posts == 0:
        result = await db.blog_posts.insert_many(blog_posts)
        print(f"✅ Created {len(result.inserted_ids)} blog posts")
    else:
        print(f"ℹ️  Database already has {existing_posts} blog posts")
    
    # 3. Create indexes
    print("\n📝 Creating indexes...")
    await db.blog_posts.create_index("slug", unique=True)
    await db.blog_posts.create_index("published")
    await db.blog_posts.create_index("date")
    await db.admin_users.create_index("username", unique=True)
    await db.contact_submissions.create_index("submittedAt")
    print("✅ Indexes created")
    
    print("\n✅ Database seeding complete!")
    print("\n🔐 Admin Credentials:")
    print("   URL: /admin/login")
    print("   Username: admin")
    print("   Password: admin123")

if __name__ == "__main__":
    asyncio.run(seed_database())
