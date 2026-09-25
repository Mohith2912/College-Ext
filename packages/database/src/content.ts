/** Original educational demonstration material written for this independent project. */
import { computerNetworks } from './computer-networks';
export interface SeedModule {
  slug: string;
  title: string;
  description: string;
  markdown: string;
}

export interface SeedCourse {
  slug: string;
  title: string;
  subject: string;
  code: string;
  term: number;
  description: string;
  modules: SeedModule[];
}

function module(title: string, description: string, markdown: string): SeedModule {
  return {
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    title,
    description,
    markdown: `${markdown.trim()}\n\n---\n\n*Original demonstration material for Aetheria Study Companion, an independent study companion. All business cases and figures are fictional teaching examples.*`,
  };
}

export const courses: SeedCourse[] = [
  {
    slug: 'marketing-fundamentals', title: 'Marketing Fundamentals', subject: 'Marketing', code: 'MKT101', term: 1,
    description: 'Understand customers, choose a market, and build a proposition worth paying attention to.',
    modules: [
      module('Understanding customer value', 'Begin with the problem a customer is trying to solve.', `
## Learning objectives

By the end of this module you can distinguish a customer need from a product feature, describe the total cost of a purchase, and write a testable value proposition.

## Value starts with a situation

A customer rarely wants a product in isolation. A commuter wants to arrive reliably; a new manager wants a report colleagues can understand. Marketing starts by understanding that situation. A product is one possible means of making progress.

Customer value is the customer's assessment of benefits relative to sacrifices. Benefits may be functional, emotional, or social. Sacrifices include price, search time, uncertainty, switching effort, and maintenance. Two people can evaluate the same offer differently because their circumstances differ.

> **Definition:** A value proposition states whom an offer helps, the outcome it enables, and why the offer is credible compared with available alternatives.

## Separate observations from assumptions

“Customers need a mobile app” is a proposed solution. “Customers forget to reorder before stock runs out” describes a potential problem. To investigate, ask about the most recent specific incident: what happened, what workaround was used, and what the consequences were. Past behavior usually provides stronger evidence than an enthusiastic response to a hypothetical feature.

Record observations in three columns: the customer's words, your interpretation, and the next evidence needed. This makes disagreement productive. A team can challenge an interpretation without denying an observation.

## A practical value proposition

Use a short working statement: “For [specific customer] who [situation], our [offer] helps [outcome] through [mechanism].” Treat it as a hypothesis. If interviews reveal that the outcome is unimportant, revise the offer instead of adding persuasive language.

| Customer sacrifice | Possible response | Evidence to collect |
| --- | --- | --- |
| Long waiting time | Book an appointment | Actual waiting times |
| Fear of poor quality | Offer a repair guarantee | Return and repair records |
| Difficult comparison | Publish an itemized quote | Questions before purchase |

## Case study: Luma Cycle's commuter repair desk

Luma Cycle is a fictional repair shop near a railway station. Its owner wants to promote premium parts. Interviews with 12 commuters reveal a different concern: customers cannot predict whether their bicycle will be ready for the evening journey. Eight describe arranging alternative transport after an unexpected delay.

The owner proposes a reserved morning repair slot with a status message by noon. A standard service costs ₹600; the reserved slot costs ₹680. Premium parts remain optional. The relevant comparison is the customer's current workaround, including travel expense and inconvenience, rather than the price of parts alone.

**Worked analysis:** The segment is commuters with time-sensitive journeys. The desired outcome is a reliable evening pickup. The mechanism is scheduled capacity plus an early update. The ₹80 premium is only justified if customers value that certainty. Twelve interviews suggest a problem but do not establish market size or willingness to pay.

**Test:** Offer 20 reserved slots over two weeks. Track paid bookings, on-time completion, and repeat requests. Define a decision rule before observing results: continue only if at least 10 slots sell and at least 90% finish on time. These thresholds are business choices, not universal marketing rules.

## Recall and application

1. Explain why “premium parts” is a feature rather than a complete value proposition.
2. Name two non-price sacrifices in this case.
3. What would make the interview evidence misleading?
4. Write a one-sentence proposition without using “best,” “innovative,” or “quality.”

## Key takeaways

- Begin with a concrete customer situation.
- Count time, effort, and risk as well as money.
- Link a promised outcome to an observable mechanism.
- Validate interest with behavior before treating it as demand.
`),
      module('Segmentation and positioning', 'Choose a useful customer group and a credible place in the market.', `
## Learning objectives

Create actionable segments, compare target markets, and write a positioning statement supported by evidence.

## Why segmentation matters

A market contains customers whose needs and buying circumstances differ. Segmentation groups customers in ways that help a business make decisions. Demographic descriptions can be convenient, but behavior and context often explain demand more directly. “People aged 20–35” may contain several unrelated needs; “renters moving within the next month” identifies a concrete situation.

A useful segment is identifiable, reachable, meaningfully different, and economically serviceable. A group can be real yet unsuitable for a particular business. If reaching it costs more than the contribution earned from serving it, a different segment or operating model may be necessary.

## Targeting requires tradeoffs

Compare segments using criteria linked to capabilities: problem intensity, accessible demand, competition, acquisition cost, contribution, and ability to deliver. Avoid multiplying weak estimates into a precise-looking score. A simple table with confidence levels can expose uncertainty better than an elaborate ranking.

Positioning describes the association a business wants a chosen audience to hold relative to alternatives. It is not merely a slogan. A positioning claim affects product design, service choices, pricing, and distribution. If an offer promises convenience but requires five phone calls to book, the operation contradicts the claim.

## Case study: choosing Luma Cycle's first segment

The fictional shop considers three groups: daily commuters, weekend sport riders, and occasional family riders. Commuters emphasize completion time; sport riders emphasize specialist expertise; families emphasize patient explanations and predictable prices. Luma has a station-side location and good scheduling but limited specialist equipment.

| Segment | Main need | Fit with current capabilities |
| --- | --- | --- |
| Commuters | Reliable repair timing | Strong location and scheduling fit |
| Sport riders | Specialist performance work | Equipment gap |
| Families | Clear advice and package prices | Possible secondary offer |

**Worked analysis:** Commuters are a reasonable initial target because their need matches an existing strength. This does not prove they are the largest or most profitable segment. The shop should test demand and capacity. Its proposed position is “scheduled bicycle care for station commuters,” supported by booking slots and completion updates.

A meaningful alternative includes fixing the bicycle at home, using another shop, or switching transport. Competitor analysis that lists only nearby bicycle shops can miss the customer's actual choice set.

## From position to action

Choose one claim and two proof points. For Luma, the claim is predictable timing; proof points might be a stated collection window and a measured on-time rate. Proof points must be accurate. If the rate falls, fix the service before increasing promotion.

## Common errors

- Defining segments so broadly that every customer fits.
- Targeting several groups while using one incompatible offer.
- Claiming a difference customers do not care about.
- Confusing a visual identity with an operating position.

## Recall and application

Explain what evidence could make family riders a better first target. Draft a positioning statement naming the audience, need, category, benefit, and reason to believe. Then identify one service choice the statement requires and one service the shop may initially decline.

## Key takeaways

Segmentation makes differences useful. Targeting commits resources. Positioning makes a focused promise that the service must deliver.
`),
      module('The marketing mix', 'Align the offer, price, channels, and communication.', `
## Learning objectives

Use the marketing mix to make connected decisions and calculate a simple contribution-based break-even point.

## Four connected decisions

The marketing mix is often summarized as product, price, place, and promotion. These categories are useful when treated as a system. Product includes the service experience and support. Price includes payment terms and perceived sacrifice. Place concerns how the customer finds, buys, and receives the offer. Promotion communicates relevant information and a credible reason to act.

A discount can create demand the service cannot fulfill. An expensive product can appear less credible if the channel offers poor information. Alignment matters more than optimizing each category independently.

## Price and contribution

Revenue is not profit. Contribution per unit is selling price minus variable cost. It helps pay fixed costs; only the remaining amount contributes to operating profit in this simplified model.

$$\\text{Contribution per unit} = \\text{Price} - \\text{Variable cost}$$

$$\\text{Break-even quantity} = \\frac{\\text{Fixed costs}}{\\text{Contribution per unit}}$$

The formula assumes a positive contribution, a stable mix, and costs that behave as classified over the relevant range. Capacity and demand can still make the result unattainable. It is a planning estimate, not a guarantee.

## Case study: Luma's scheduled service package

Luma sets a fictional package price of ₹800 with a variable cost of ₹320. A monthly scheduling and staffing commitment adds ₹24,000 of fixed cost. Contribution is ₹480 per package, so the additional service needs 50 packages each month to cover that commitment: ₹24,000 ÷ ₹480 = 50.

The shop considers reducing the price to ₹700. If variable cost stays ₹320, contribution falls to ₹380 and break-even rises to 64 packages after rounding up. The team must examine whether the lower price can attract enough additional customers and whether the workshop has spare capacity.

**Worked mix:** Product is a defined repair package with a completion window. Price reflects both cost and the customer's perceived value. Place is a simple booking form plus a station-side drop-off point. Promotion explains the reserved slot, exclusions, and collection process. The promise avoids claiming guaranteed same-day completion for repairs requiring unavailable parts.

## Designing an honest offer

List what is included, what is excluded, and how exceptions are handled. A clear limitation may reduce unsuitable bookings while increasing trust. Do not bury essential charges in a footnote. Communication should help the intended customer make an informed choice.

Consider channels as part of delivery. A social post creates awareness, but a confusing booking page can lose the customer. Trace the entire path from first contact to completed service and identify where the customer has to repeat information.

## Recall and application

1. Calculate contribution at a price of ₹750 and variable cost of ₹330.
2. What happens to break-even quantity if fixed cost increases?
3. Why might a profitable unit economics calculation still describe a poor business opportunity?
4. Identify one mismatch between a “predictable service” position and a walk-in-only process.

## Key takeaways

Make the offer coherent across product, price, place, and promotion. Check contribution and capacity together. State limitations clearly and measure the complete customer journey.
`),
      module('Marketing experiments and metrics', 'Evaluate a campaign using useful comparisons and sound measurement.', `
## Learning objectives

Define an experiment, calculate conversion and acquisition cost, and distinguish a business outcome from a convenient activity metric.

## Start with a decision

An experiment should reduce uncertainty about a decision. “Can reminder messages increase repeat bookings?” is actionable. “Can we get more clicks?” is incomplete unless clicks predict a useful outcome. Write a hypothesis, an intervention, a comparison, and a measurement window before running a campaign.

Use one primary metric plus guardrails. A primary metric might be completed bookings. Guardrails might be cancellation rate, customer complaints, or service delays. Optimizing clicks while exhausting workshop capacity would not be a successful campaign.

## Metrics and denominators

Conversion rate is completed target actions divided by the relevant opportunities. Always label the denominator: bookings per visitor differs from bookings per message delivered. Customer acquisition cost divides eligible acquisition expenditure by newly acquired customers. It should not mix returning customers into the denominator without disclosure.

$$\\text{Conversion rate} = \\frac{\\text{Completed target actions}}{\\text{Eligible opportunities}}$$

Compare contribution from acquired customers with acquisition cost over a defined time horizon. Revenue alone can conceal expensive fulfillment and refunds. Small samples produce unstable estimates, so report counts alongside percentages.

## Case study: a reminder experiment

Luma randomly splits 200 consenting previous customers into two groups. One hundred receive a maintenance reminder; one hundred receive no reminder during the same fortnight. The reminder group makes 18 bookings; the comparison group makes 10. The observed booking rates are 18% and 10%, an 8 percentage-point difference.

**Worked analysis:** The relative increase is 80%, but that larger number can obscure the absolute difference and small counts. Random assignment helps balance known and unknown differences, but it does not remove sampling uncertainty. A single small experiment is preliminary evidence. Check whether bookings were completed and whether the reminder created complaints.

Suppose the reminders cost ₹1,600 and the team attributes the observed eight additional bookings to the intervention. The estimated incremental cost is ₹200 per additional booking. Calling ₹1,600 ÷ 18 an incremental acquisition cost would use the wrong denominator because some customers might have booked without the reminder. These are existing customers, so “reactivation cost” is a more accurate label than “new-customer acquisition cost.”

## A measurement plan

Record assignment, delivery, booking, completion, and cancellation separately. Define how duplicate bookings are handled. Respect the customer's communication preferences. Restrict analysis to data needed for the stated purpose and avoid collecting unnecessary personal details.

Before scaling, repeat the experiment or obtain a larger sample, inspect the uncertainty, and confirm the service can handle extra demand. A result from existing customers may not generalize to people who have never used the shop.

## Recall and application

Explain the difference between percentage points and relative percentage change. Name two threats to a before-and-after comparison without a control group. Choose a guardrail for a campaign offering a large discount.

## Key takeaways

Choose a decision before a metric. State denominators and comparison groups. Report uncertainty, observe operational effects, and use honest labels for the costs being measured.
`),
    ],
  },
  {
    slug: 'business-statistics', title: 'Business Statistics', subject: 'Statistics', code: 'STA101', term: 1,
    description: 'Turn observations into clear summaries, careful comparisons, and evidence for decisions.',
    modules: [
      module('Data and descriptive statistics', 'Understand a dataset before summarizing it.', `
## Learning objectives

Identify a unit of observation, distinguish variable types, and choose summaries that preserve the important shape of a distribution.

## Define what one row means

A dataset starts with a measurement plan. A row might represent an order, a customer, or one daily store total. Mixing these units creates errors that no chart can repair. For example, averaging order values answers a different question from averaging each customer's monthly spending.

Categorical variables describe groups; numerical variables record amounts or counts. A numeric customer identifier remains categorical because adding identifiers has no meaningful interpretation. Record units, missing-value conventions, collection dates, and eligibility rules alongside the data.

## Centre and spread belong together

The arithmetic mean is the sum of observations divided by their count. The median is the middle ordered value, averaging the two middle values for an even-sized dataset. The mean uses every magnitude and is sensitive to extreme values; the median is more resistant. Neither is universally superior.

$$\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n}x_i$$

Describe spread as well as centre. The range is simple but depends entirely on two observations. The interquartile range describes the middle half of ordered values. Standard deviation summarizes dispersion around the mean in the variable's original units. Specify the convention used when calculating sample variance or quartiles.

## Case study: Cedar Parcel's delivery times

A fictional local delivery business records six eligible delivery times in minutes: 12, 14, 14, 15, 17, and 48. Their sum is 120, so the mean is 20 minutes. The median is the average of the third and fourth values, (14 + 15) ÷ 2 = 14.5 minutes. The range is 36 minutes.

**Worked analysis:** The 48-minute observation pulls the mean above the median. It might be a data error, a genuine road closure, or evidence of an important service failure. Removing it solely to improve the metric would be misleading. Inspect the source record and document any correction. If genuine, report a resistant centre together with information about long delays.

The owner proposes advertising “typical delivery: 14.5 minutes.” That statement still needs context: only six deliveries were measured, and the eligibility window may exclude difficult routes. A small convenience sample cannot support a broad service promise.

## A first-pass data checklist

1. Check the unit of observation and expected row count.
2. Inspect missing values, impossible values, and duplicates.
3. Display the distribution before relying on an average.
4. Break down results by relevant groups without exposing individuals.
5. Document cleaning decisions so the summary can be reproduced.

## Recall and application

Calculate the mean and median after replacing 48 with 18. Explain why the median changes less. Then decide which summary would help a dispatcher plan capacity and which would help investigate occasional delays. More than one summary may be needed.

## Key takeaways

Define the row before calculating. Keep units visible. Summarize distribution and uncertainty, and investigate unusual observations without deleting inconvenient evidence.
`),
      module('Probability and conditional reasoning', 'Read uncertainty carefully and avoid reversing conditions.', `
## Learning objectives

Use a sample space, calculate a conditional probability, and distinguish a useful risk signal from certainty.

## Probability describes an event under a model

A probability lies between zero and one. An event may be “an eligible parcel arrives late.” Before estimating its probability, define “late,” the eligible population, and the time window. A historical proportion estimates future probability only when the history is relevant to the future setting.

For two events A and B, the conditional probability P(A given B) restricts attention to cases where B occurred. It does not equal P(B given A) in general. Confusing these quantities is common when evaluating alerts, screening tests, or customer predictions.

$$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B)>0$$

Independence means knowing one event occurred does not change the probability of the other. Mutually exclusive events cannot occur together. These are different ideas: two nonzero-probability events that are mutually exclusive are not independent.

## Case study: Cedar Parcel's weather alert

Of 200 fictional deliveries, 40 occurred during a weather alert. Sixteen of the alert deliveries were late. Of the remaining 160 deliveries, 16 were late.

| Weather condition | Late | On time | Total |
| --- | --- | --- | --- |
| Alert | 16 | 24 | 40 |
| No alert | 16 | 144 | 160 |
| Total | 32 | 168 | 200 |

**Worked analysis:** P(late given alert) = 16/40 = 40%. P(alert given late) = 16/32 = 50%. The overall late rate is 32/200 = 16%. The alert is associated with a higher late rate, but most alert deliveries still arrive on time: 24/40 = 60%.

A manager who hears “half of late parcels had alerts” might think half of alert parcels are late. The table shows why that reversal is wrong. The denominator changes. Also, weather alerts may coincide with longer routes or busy periods, so this observational table does not isolate the causal effect of weather.

## Expected value and decisions

Expected cost is a probability-weighted average across possible outcomes. If an additional late delivery costs an average of ₹100 and a proposed action reduces estimated late risk from 40% to 25%, its estimated avoided cost is ₹15 per eligible delivery. An action costing ₹20 would not be justified by that cost reduction alone. Other benefits, uncertainty, and operational constraints may matter.

## Recall and application

Calculate P(no alert given on time). Explain why a useful warning system can produce many alerts without a late delivery. Name evidence needed to assess whether a proposed intervention causes fewer delays.

## Key takeaways

Write conditions in words, identify the denominator, and inspect base rates. An association supports a prediction only within its limitations; it does not by itself prove a causal mechanism.
`),
      module('Sampling and estimation', 'Use samples to learn about populations while acknowledging uncertainty.', `
## Learning objectives

Distinguish a population from a sample, recognize selection bias, and interpret an interval estimate without overstating what it means.

## A sample needs a route to the population

The population is the set of cases a question concerns. The sampling frame is the list or process from which a sample can be drawn. A gap between the two can create coverage bias. A survey sent only to app users cannot automatically describe all customers, even if every app user responds.

Random sampling gives each eligible unit a known selection mechanism. It helps quantify sampling uncertainty. Convenience sampling may be useful for exploration but usually cannot support the same generalization. Increasing a biased sample's size can make an incorrect estimate appear more precise without removing the bias.

## Sampling variability

Different random samples produce different statistics. The standard error describes the variability of an estimator across repeated samples under a model. It is different from standard deviation, which describes variation among individual observations.

For independent observations with an adequate sample size, an approximate standard error for a mean is:

$$SE(\\bar{x}) = \\frac{s}{\\sqrt{n}}$$

A confidence interval combines an estimate with a margin determined by the method and assumptions. A 95% confidence procedure covers the fixed population parameter in 95% of repeated samples under those assumptions. It does not guarantee that 95% of individual observations lie inside the interval.

## Case study: estimating Cedar's average delivery time

Suppose Cedar randomly samples 100 deliveries from a clearly defined month. The sample mean is 24 minutes and the sample standard deviation is 10 minutes. The estimated standard error is 10/√100 = 1 minute. A large-sample normal approximation gives 24 ± 1.96 × 1, or approximately 22.04 to 25.96 minutes. A t-based interval is generally appropriate when population variability is estimated and would be slightly wider here.

**Worked analysis:** The interval concerns the month's population mean under the sampling assumptions. It is not a prediction interval for the next delivery. If the sample omits failed deliveries or repeatedly measures the same dependent route conditions, the calculation may understate uncertainty or target the wrong population.

Now imagine surveying the first 100 customers who voluntarily click a feedback link. The arithmetic is unchanged, but the random-sampling justification disappears. Dissatisfied or highly engaged customers may respond at different rates. Report this limitation rather than attaching a precise margin of error without support.

## Planning a better sample

Define the target period and eligible cases. Include relevant days and route types. Use a reproducible random selection procedure. Record nonresponse or missing outcomes. If sampling strata deliberately, retain the weights needed to represent their population shares.

## Recall and application

If sample size increases from 100 to 400 with the same variability, what happens to the standard error? It halves, rather than falling to one quarter. Explain why a larger sample does not fix excluding deliveries from remote areas.

## Key takeaways

Assess selection before sample size. Separate individual variability from estimation uncertainty. State the target population, assumptions, and limitations whenever reporting an interval.
`),
      module('Comparisons and business experiments', 'Interpret differences with attention to uncertainty and practical impact.', `
## Learning objectives

Form a comparison, explain the role of random assignment, and distinguish statistical evidence from business importance.

## Comparisons need a credible counterfactual

A counterfactual asks what would have happened without an intervention. In a randomized experiment, eligible units are assigned to treatment or comparison conditions by chance. This supports a causal comparison when the assignment is followed, outcomes are measured consistently, and spillovers or attrition do not undermine the design.

Before-and-after comparisons may confuse an intervention with seasonality, staffing changes, or changes in demand. Regression adjustment can help address observed differences, but it does not automatically remove unmeasured confounding.

## Hypotheses and uncertainty

A null hypothesis often states that there is no difference under a specified model. A p-value describes how incompatible the observed data, or more extreme data according to the test, are with that null model. It is not the probability that the null hypothesis is true and not the probability that the result occurred “by chance.”

An effect estimate and interval are usually more useful for a decision than a threshold alone. A tiny effect can be statistically detectable in a large sample yet have little practical value. A promising estimate in a small sample can remain too uncertain for an expensive commitment.

## Case study: dispatch checklists at Cedar

Cedar randomly assigns 80 comparable delivery shifts to use a checklist and 80 to current practice. The average shift delay is 7 minutes with the checklist and 10 minutes without it. The observed mean difference is −3 minutes. Assume each group's sample standard deviation is 8 minutes and shifts are independent for this teaching calculation.

The standard error of the difference is approximately √(8²/80 + 8²/80) = √1.6 ≈ 1.265 minutes. A large-sample 95% interval is −3 ± 1.96 × 1.265, or approximately −5.48 to −0.52 minutes. A suitable t-based procedure produces a similar interval; real analysis must also inspect design and distribution assumptions.

**Worked analysis:** These fictional data support a reduction under the assumed design. The plausible effect range still matters: saving half a minute per shift may not justify an expensive system, while five minutes might. Compare the intervention's cost, staff effort, and safety effects. Do not conclude that every shift improves by three minutes.

If the same drivers work many shifts, outcomes may be correlated. Treating all shifts as independent can underestimate the standard error. A clustered design or appropriate analysis may be needed. This demonstrates why knowledge of data collection is essential to interpretation.

## Avoid flexible analysis after seeing results

Select a primary outcome and analysis plan in advance. Repeatedly checking results and stopping only when a threshold is crossed changes the interpretation of a conventional test. Testing many outcomes and reporting only the most favorable one also exaggerates evidence.

## Recall and application

Explain why random sampling and random assignment answer different questions. List a plausible spillover in the checklist experiment. State a business decision rule that includes effect size, uncertainty, cost, and an operational guardrail.

## Key takeaways

Use a credible comparison, analyze the actual assignment unit, and present the effect with its uncertainty. Statistical evidence informs a decision; it does not replace business judgment.
`),
    ],
  },
  {
    slug: 'business-communication', title: 'Business Communication', subject: 'Communication', code: 'COM101', term: 1,
    description: 'Make complex ideas understandable through purposeful writing, listening, and presentation.',
    modules: [
      module('Audience and purpose', 'Shape a message around a reader and a decision.', `## Begin with the reader

A useful business message helps a particular person understand or do something. State the decision, the evidence the reader needs, and the action requested. A technical team may need implementation detail; a budget owner may need cost and uncertainty. Both deserve accurate information.

## Practice case

Fictional office supplier Paperlane must explain a two-day shipment delay. Customers need the revised date and options before a detailed explanation of the warehouse issue. Lead with the change, acknowledge its effect, and provide a clear response channel.

## Try it

Write the opening three sentences of that message. Include the new delivery date, one available option, and who will handle questions. Remove claims that cannot be supported.

## Key takeaway

Organize around the reader's next decision. Clarity comes from relevance and structure, not merely short sentences.`),
      module('Clear business writing', 'Build paragraphs with a point and supporting evidence.', `## Structure before polish

Give each paragraph one main point. Follow it with evidence, explanation, or a concrete example. Use familiar words when they express the meaning accurately. Define a necessary technical term when it first appears.

## Worked example

“Processing efficiency has been enhanced” hides the actor and result. “The support team reduced average reply time from six hours to four in August” states what changed and when. It still needs context if ticket types changed.

## Revision exercise

Draft a recommendation in 150 words. Underline the recommendation and circle its strongest evidence. If you cannot find either, revise the structure before adjusting word choice. Preserve limitations that affect the reader's decision.

## Key takeaway

Prefer specific verbs, meaningful comparisons, and visible reasoning. Editing should remove ambiguity without hiding uncertainty.`),
      module('Listening and feedback', 'Use questions and feedback to improve shared understanding.', `## Listen for meaning

Listening includes checking what you understood. Ask open questions, allow the speaker to finish, and summarize the issue in neutral terms. Separate a person's intention from the effect of their behavior.

## Practice case

A fictional project team misses a handoff. Feedback such as “You are careless” labels a person. “The inventory file arrived after the agreed deadline, so packing started late” identifies an observation and impact. Ask what prevented the handoff and agree on a future process.

## Try it

Write one observation, one impact, and one question for a recurring meeting problem. Avoid “always” and “never” unless the evidence supports them. Record the next action and who owns it.

## Key takeaway

Good feedback is specific enough to act on and open enough to discover missing context.`),
      module('Presenting an argument', 'Connect a recommendation with evidence and a clear next step.', `## Build a reasoning chain

A presentation should make a decision easier. Introduce the question, explain the evidence, compare credible options, and state the recommendation. Distinguish observations from assumptions and forecasts.

## Practice case

A fictional retailer is considering Saturday opening. A useful presentation compares incremental contribution with staffing cost, shows uncertainty in expected demand, and proposes a limited trial. A crowded slide of sales totals does not by itself justify the change.

## Try it

Create a five-slide outline: decision, current evidence, options, recommended trial, and success criteria. Give each slide a sentence headline that states its point. Use a chart only when it clarifies the comparison.

## Key takeaway

An audience should be able to reconstruct the reasoning, challenge assumptions, and understand the requested decision.`),
    ],
  },
  {
    slug: 'entrepreneurship', title: 'Entrepreneurship', subject: 'Entrepreneurship', code: 'ENT101', term: 1,
    description: 'Explore problems, test assumptions, and design a sustainable venture.',
    modules: [
      module('Problem discovery', 'Find evidence of a problem before committing to a solution.', `## Observe the work

An opportunity begins with an unmet need and a plausible way to serve it. Interviews are most useful when they examine recent behavior, existing workarounds, and consequences. Compliments about an idea are weak evidence of willingness to pay.

## Case exercise

Fictional campus venture Refill Route proposes reusable water delivery. Interview three potential customers about their last purchase, carrying effort, and storage constraints. Separate firsthand observations from your interpretation.

## Decision practice

Write the riskiest assumption in one sentence. Design a low-cost test that could disprove it. State what evidence would make you stop or change direction before conducting the test.

## Key takeaway

The purpose of discovery is learning, including learning that an attractive idea solves a problem too small to support a venture.`),
      module('Business model design', 'Connect value creation, delivery, and revenue.', `## Make the model explicit

A business model explains whom the venture serves, what it offers, how it delivers, and how it earns enough to continue. Map customers, channels, activities, partners, costs, and revenue streams together.

## Case exercise

Refill Route considers subscriptions and individual orders. Subscriptions may improve demand visibility but create a service obligation. Individual orders provide flexibility but may raise delivery cost per unit. Compare contribution and operating demands rather than assuming recurring revenue is automatically better.

## Try it

Draw a one-page model and mark every untested assumption. Choose the assumption whose failure would invalidate the model. Design a test using actual purchasing behavior where feasible.

## Key takeaway

A model is a connected set of hypotheses. Changing one component often changes the economics or feasibility of the others.`),
      module('Experiments and minimum viable offers', 'Test a risky assumption with a narrowly defined offer.', `## Define the learning goal

A minimum viable offer is the smallest credible experience that tests an important assumption. It must be safe and honest about its limitations. An incomplete product that teaches nothing is not a useful experiment.

## Case exercise

Refill Route manually serves one building for two weeks. The test measures paid demand, repeat orders, delivery time, and returned-container rates. A sign-up list measures interest but cannot replace fulfillment evidence.

## Try it

Specify a hypothesis, eligible participants, the offer, success criteria, and a stopping rule. Include one operational guardrail, such as a maximum delivery delay. Document unexpected costs as carefully as customer feedback.

## Key takeaway

The experiment should be small in scope while preserving the essential behavior being tested.`),
      module('Venture economics', 'Examine contribution, cash timing, and capacity.', `## Cash and profit differ

A venture can appear profitable yet run out of cash if customers pay after suppliers and staff must be paid. Track the timing of inflows and outflows alongside contribution per sale and fixed operating costs.

## Worked case

Refill Route charges ₹90 per delivery and incurs ₹55 of variable cost. Contribution is ₹35. A monthly fixed cost of ₹7,000 requires 200 deliveries to break even under this simplified model. If the team can only complete 150 deliveries, the current combination is infeasible.

## Try it

Recalculate break-even after a ₹5 increase in variable cost. Then outline one change to price, cost, or capacity and explain the customer consequence.

## Key takeaway

Check demand, contribution, capacity, and cash timing together before scaling.`),
    ],
  },
  {
    slug: 'financial-statements', title: 'Financial Statements', subject: 'Finance', code: 'FIN201', term: 2,
    description: 'Read the stories told by income, financial position, and cash flow.',
    modules: [
      module('The accounting equation', 'Understand assets, liabilities, and equity.', `## A balanced view

The accounting equation is assets = liabilities + equity. Assets are resources recognized under applicable accounting rules; liabilities are obligations; equity is the residual interest. A transaction affects at least two accounts while preserving the equation.

## Worked example

A fictional studio receives ₹50,000 from its owner. Cash and equity each increase by ₹50,000. It then buys ₹10,000 of equipment for cash: one asset increases while another decreases. Total assets are unchanged by the purchase at that moment.

## Practice

Describe the effect of borrowing ₹20,000 and then paying ₹5,000 toward the principal. Distinguish principal repayment from interest expense.

## Key takeaway

Classify the economic event before recording it. Cash movement alone does not determine whether an item is revenue or expense.`),
      module('Income and performance', 'Separate revenue, expenses, and margins.', `## Read a period's performance

An income statement summarizes recognized revenue and expenses over a period. Gross profit deducts the relevant cost of sales from revenue; operating profit also reflects operating expenses. Definitions and presentation vary with the business and accounting framework.

## Worked example

A fictional studio earns ₹80,000 revenue and records ₹30,000 direct production costs plus ₹20,000 operating expenses. Under this simplified classification, gross profit is ₹50,000 and operating profit is ₹30,000 before other items.

## Practice

Calculate gross and operating margins using revenue as the denominator. Explain why unpaid customer invoices may contribute to recognized revenue without yet producing cash.

## Key takeaway

State the period, classification, and denominator. Compare like measures and investigate changes in business mix.`),
      module('Cash flow and working capital', 'Understand why profitable businesses can face cash shortages.', `## Follow the timing

Cash flow groups movements into operating, investing, and financing activities according to the applicable rules. Working capital decisions influence the timing of cash: inventory ties up funds, receivables delay collections, and payables defer supplier payments.

## Case exercise

A fictional workshop pays for materials immediately but allows customers 45 days to pay. Growing sales require more materials before earlier invoices are collected. The business may need additional funding despite positive margins.

## Practice

Draw a timeline from ordering material to receiving customer payment. Identify a realistic improvement that does not simply transfer an unreasonable burden to suppliers or customers.

## Key takeaway

Revenue growth and cash availability can move in different directions. Forecast timing explicitly.`),
      module('Financial ratios in context', 'Use ratios to ask better questions.', `## Ratios are starting points

A ratio relates two quantities to make scale or structure easier to compare. A current ratio compares current assets with current liabilities. Profit margins compare a defined profit measure with revenue. Neither is meaningful without context.

## Case exercise

Two fictional retailers report the same current ratio, but one holds cash while the other holds slow-moving inventory. Their ability to meet near-term payments may differ. Examine asset quality, maturity dates, and cash conversion.

## Practice

Choose a profitability, liquidity, and efficiency measure. State its numerator, denominator, interpretation, and one limitation. Use consistent accounting periods and definitions.

## Key takeaway

Avoid universal “good ratio” thresholds. Compare a business with relevant peers, its own history, and its operating conditions.`),
    ],
  },
  {
    slug: 'microeconomics', title: 'Microeconomics', subject: 'Economics', code: 'ECO201', term: 2,
    description: 'Explore choices, incentives, markets, and the tradeoffs behind business decisions.',
    modules: [
      module('Choice and opportunity cost', 'Recognize the value of the next best alternative.', `## Scarcity creates tradeoffs

Time, resources, and attention are limited. Opportunity cost is the value of the next best alternative forgone, not the sum of every rejected alternative. A cost already incurred and unrecoverable is sunk for a forward-looking decision.

## Case exercise

A fictional baker can use the last oven hour for bread contributing ₹700 or cakes contributing ₹900. If other constraints are unchanged, choosing bread forgoes ₹900 of contribution from the alternative. Include relevant effects such as committed orders before deciding.

## Practice

Explain why the original purchase price of an unused machine may not determine whether to accept a new order. Identify any recoverable resale value that remains relevant.

## Key takeaway

Compare incremental consequences and the best available alternative.`),
      module('Demand and supply', 'Distinguish movements along curves from shifts.', `## A market model

A demand curve describes quantities buyers would choose at different prices, holding other relevant factors constant. A supply curve describes sellers' quantities. A change in the item's own price moves along a curve; a change in income, input cost, or another determinant may shift a curve.

## Case exercise

For a fictional café, a rise in coffee-bean cost may reduce the quantity supplied at each menu price. A nearby office opening may increase demand. Observing a higher price alone does not reveal which change occurred.

## Practice

Draw the effect of each change separately before combining them. State what is ambiguous when both curves shift.

## Key takeaway

The model clarifies mechanisms, but interpretation requires evidence about the underlying changes.`),
      module('Elasticity and pricing', 'Describe how responsive quantity is to price changes.', `## Compare relative changes

Price elasticity of demand relates percentage change in quantity demanded to percentage change in price. The midpoint method uses the average of starting and ending values to avoid direction-dependent percentages over a finite change.

## Worked example

If a fictional product's price rises from ₹100 to ₹110 and quantity falls from 100 to 90, the midpoint percentages are about +9.52% and −10.53%. The ratio is about −1.11. Its magnitude suggests elastic demand over this interval under the stated assumptions.

## Practice

Calculate revenue before and after the change. Explain why an observed correlation may not identify a demand response if other conditions changed.

## Key takeaway

Elasticity is context-specific and is not the same as slope.`),
      module('Costs and market structure', 'Connect marginal decisions to competitive conditions.', `## Think at the margin

Marginal cost is the additional cost of producing another unit. Average cost divides total cost by output. They answer different questions. A firm's pricing power also depends on substitutes, entry conditions, differentiation, and the competitive setting.

## Case exercise

A fictional printer has spare capacity and receives a one-time order. Relevant analysis considers incremental cost, alternative capacity use, and effects on regular customers. Average historical cost alone may obscure the decision, but long-run prices still need to support the business.

## Practice

List conditions under which accepting a low-price order could harm the firm despite covering immediate variable cost.

## Key takeaway

Combine marginal reasoning with capacity, customer expectations, and the time horizon.`),
    ],
  },
  {
    slug: 'macroeconomics', title: 'Macroeconomics', subject: 'Economics', code: 'ECO202', term: 2,
    description: 'Interpret economic output, inflation, employment, and policy transmission.',
    modules: [
      module('Output and national income', 'Understand what aggregate production measures include.', `## Measure production carefully

Gross domestic product measures the value of final goods and services produced within an economy over a period under a defined statistical framework. Counting intermediate sales separately would double count value already included in final output.

## Worked example

A fictional mill sells flour to a baker for ₹100; the baker sells bread to households for ₹160. Counting ₹260 would double count the flour. In this simplified chain, total value added is ₹160.

## Practice

Explain the difference between nominal and real output. Identify two aspects of wellbeing that a production measure does not fully capture.

## Key takeaway

Aggregate output is useful for a specific purpose. It is not a complete measure of welfare, distribution, or environmental quality.`),
      module('Inflation and purchasing power', 'Separate a price level from its rate of change.', `## A changing basket cost

Inflation is a rate of increase in a broad price index. A fall in inflation means prices are rising more slowly; it does not necessarily mean the price level is falling. An index's interpretation depends on its basket, weights, and construction.

## Worked example

A fictional basket costs ₹1,000 in one year and ₹1,060 in the next. Its measured inflation is 6%. If the following year's rate is 3%, the basket cost rises again to ₹1,091.80.

## Practice

Compare a 5% nominal income increase with 6% inflation. Use a ratio calculation for the exact real change and explain the approximation.

## Key takeaway

Distinguish levels, changes, and purchasing power, and state which price index you use.`),
      module('Employment and business cycles', 'Interpret labor indicators with their denominators.', `## Definitions shape the indicator

An unemployment rate generally relates unemployed people meeting a statistical definition to the labor force. It is not the share of the entire population without a job. Participation and employment ratios provide additional perspectives.

## Case exercise

In a fictional economy, some jobseekers stop searching. Depending on the survey definition, measured unemployment may decline without an increase in employment. This is why several indicators should be read together.

## Practice

Build a small table separating employed people, eligible unemployed people, and those outside the labor force. Calculate the relevant ratios and describe how a denominator change affects them.

## Key takeaway

Read labor statistics with definitions, coverage, and participation trends visible.`),
      module('Policy and business decisions', 'Trace channels rather than assuming immediate effects.', `## Policy works through mechanisms

Fiscal decisions affect public spending, taxes, and transfers. Monetary policy can influence financing conditions, expectations, and aggregate demand. Effects vary with the economic setting, transmission channels, and time lags.

## Case exercise

A fictional manufacturer considers a capacity expansion after financing costs fall. Lower borrowing cost may improve the proposal, but expected demand, supplier capacity, and cash-flow risk remain relevant. A policy change does not guarantee a particular firm's sales.

## Practice

Draw a causal chain from borrowing cost to investment and then output. Mark assumptions at each arrow and identify a reason the chain could weaken.

## Key takeaway

Use scenarios and explicit assumptions when translating economy-wide changes into business decisions.`),
    ],
  },
  {
    slug: 'website-development', title: 'Website Development', subject: 'Technology', code: 'WEB201', term: 2,
    description: 'Build a foundation in semantic pages, accessible styles, and browser interactions.',
    modules: [
      module('How the web works', 'Follow a request from a browser to a server.', `## A request and a response

A browser requests a resource identified by a URL. A server returns a response containing a status, headers, and often a body. The browser interprets HTML, applies styles, and runs permitted scripts. Transport encryption protects data in transit but does not guarantee that a site's content is trustworthy.

## Practice case

Trace a fictional library page request. Identify the page document, stylesheet, image request, and any later data request. Explain how a missing image can fail while the text still loads.

## Try it

Inspect a small page's network activity and classify resources. Avoid submitting personal information to an unfamiliar service for this exercise.

## Key takeaway

A page is an interaction among resources and systems, not a single file delivered in one step.`),
      module('Semantic HTML', 'Give content a meaningful structure.', `## Meaning before appearance

HTML elements communicate structure. Headings identify sections, lists represent related items, and buttons perform actions. A link navigates to a destination. Using the correct element provides useful browser and assistive-technology behavior.

## Example

\`<button type="button">Open contents</button>\` communicates an action more accurately than a clickable generic container. A form control also needs an associated label; a placeholder is not a reliable substitute.

## Practice

Outline a fictional course page with one main heading, a navigation region, a main content region, and descriptive links. Read only the heading outline and check whether the hierarchy still makes sense.

## Key takeaway

Semantic structure supports accessibility, maintainability, and clear information organization.`),
      module('Responsive CSS', 'Design layouts that adapt to content and available space.', `## Start with flexible constraints

Responsive design combines flexible sizing, layout systems, and carefully chosen breakpoints. Breakpoints should respond to content needs rather than specific device names. Long text, translated labels, and zoom can reveal failures hidden by a single screenshot.

## Practice case

A fictional note reader uses a bounded text column and a contents sidebar. On smaller screens the sidebar becomes a disclosure panel, preserving access without squeezing paragraphs into an unreadable width.

## Try it

Test a page at narrow and wide widths and at 200% zoom. Check keyboard focus, table overflow, and touch target size. Respect reduced-motion preferences.

## Key takeaway

Adapt layout while preserving content, reading order, and access to every control.`),
      module('JavaScript interactions', 'Manage state and handle failure clearly.', `## Events change state

Interactive interfaces respond to events such as form submission, selection, and network completion. Keep the current state explicit and render feedback that reflects the actual result. A successful click does not mean a server operation succeeded.

## Practice case

A fictional bookmark button sends a request. It shows a pending state, confirms only after persistence succeeds, and provides a retry if the request fails. The server checks ownership independently of the visible button.

## Try it

Describe idle, pending, success, and failure states for a save action. Decide what happens when the user clicks twice or loses connectivity.

## Key takeaway

Good interaction design handles time, repeated actions, and failure as normal parts of the experience.`),
    ],
  },
  {
    slug: 'digital-marketing', title: 'Digital Marketing', subject: 'Marketing', code: 'MKT301', term: 3,
    description: 'Connect useful content and distribution with measurable customer outcomes.',
    modules: [
      module('Customer journeys and channels', 'Map the steps between discovery and a useful outcome.', `## Follow the customer's task

A journey map describes what someone is trying to accomplish, their questions, and the channels involved. Real journeys may repeat or skip stages. A funnel is a simplifying model, not a claim that every customer behaves identically.

## Case exercise

Fictional retailer Threadleaf maps discovery, comparison, purchase, delivery, and support. Search may help discovery while a sizing guide helps comparison. Assign a useful outcome to each touchpoint.

## Practice

Choose one customer task and list friction at each step. Prioritize a problem based on evidence rather than the popularity of a channel.

## Key takeaway

Choose channels that serve the customer's task and the business's delivery capability.`),
      module('Content and discoverability', 'Create useful information with clear structure.', `## Answer a real question

Useful content addresses a specific audience need with accurate, understandable information. Descriptive titles, semantic headings, and clear links help people navigate. Search visibility should follow from useful and accessible material rather than misleading claims.

## Case exercise

Threadleaf publishes a sizing guide with measurements, instructions, and return conditions. This may reduce uncertainty before purchase and avoid preventable returns. Measure whether visitors complete the relevant task, not only page views.

## Practice

Draft an outline answering one common customer question. Identify the evidence supporting each claim and who will review it for accuracy.

## Key takeaway

Content quality includes accuracy, relevance, usability, and maintenance.`),
      module('Paid campaigns and attribution', 'Interpret campaign results without overstating causality.', `## Attribution is a rule

Attribution assigns credit to touchpoints using a chosen method. Last-click attribution is easy to describe but can ignore earlier influence. Attribution data alone does not show what would have happened without the campaign.

## Worked example

A fictional campaign spends ₹5,000 and records 25 purchases attributed under a defined rule. Attributed cost per purchase is ₹200. If some purchases would have occurred anyway, this differs from incremental cost per additional purchase.

## Practice

List the conversion window, eligible costs, refund treatment, and attribution rule before comparing campaigns. Consider a credible experiment to estimate incremental impact.

## Key takeaway

Label attribution honestly and compare campaign economics using contribution and uncertainty.`),
      module('Retention and responsible measurement', 'Learn from repeat behavior while respecting customer choices.', `## Retention needs a definition

Retention compares a defined cohort's behavior over a stated period. A monthly purchase business and an annual purchase business require different measures. A customer who has not bought recently is not automatically dissatisfied.

## Practice case

Threadleaf groups first-time purchasers by purchase month and measures repeat purchases within 90 days. The team waits until each cohort has a complete observation window before comparing results.

## Try it

Specify a cohort, qualifying repeat behavior, and observation period. Identify data that is unnecessary for the analysis and honor communication preferences.

## Key takeaway

Use comparable windows and minimal data. Retention should reflect continuing value, not obstacles to leaving.`),
    ],
  },
  {
    slug: 'operations-management', title: 'Operations Management', subject: 'Operations', code: 'OPS301', term: 3,
    description: 'Improve flow, capacity, inventory, and quality in everyday business processes.',
    modules: [
      module('Processes and bottlenecks', 'Find the stage that limits the output of a system.', `## Map the flow

A process transforms inputs into outputs through connected activities. Measure each stage's capacity in consistent units. The bottleneck is the capacity constraint that limits flow under the current conditions; it can move when demand or the process changes.

## Worked case

A fictional packing line prepares 30 orders per hour, checks 20, and dispatches 25. Ignoring other losses, the checking stage limits throughput to 20 orders per hour. Speeding preparation alone may increase work waiting for checks.

## Practice

Draw the line and mark work-in-progress before each stage. Propose a change to the bottleneck and identify what might become the next constraint.

## Key takeaway

Improve the system's flow instead of optimizing an isolated activity.`),
      module('Capacity and queues', 'Understand why high utilization can create long waits.', `## Variation matters

Capacity describes what a process can handle under stated assumptions. Utilization compares demand or actual output with capacity. When arrivals and service times vary, waiting can increase sharply near full utilization.

## Case exercise

A fictional service desk handles an average of ten requests per hour. Receiving ten requests per hour on average does not guarantee no queue: requests may arrive together and some take longer than others. Averages hide the timing pattern.

## Practice

List options to reduce arrival variation, service variation, or workload at peak times. Consider the customer and staff consequences of each.

## Key takeaway

Plan for variability and service goals, not just average demand divided by average capacity.`),
      module('Inventory decisions', 'Balance availability with the cost of holding stock.', `## Stock has benefits and costs

Inventory can protect service from demand and supply variability, but it ties up funds and may become obsolete. A reorder decision depends on demand during replenishment lead time and the desired protection against uncertainty.

## Worked case

A fictional shop sells an average of five units daily and replenishment takes four days. Expected lead-time demand is 20 units under stable assumptions. Additional safety stock requires a deliberate service and variability analysis, not an arbitrary universal percentage.

## Practice

Describe how longer or more variable lead time affects the decision. Identify an item for which obsolescence is a more serious risk than storage cost.

## Key takeaway

Connect stock policies to demand, replenishment uncertainty, and the cost of shortages.`),
      module('Quality and continuous improvement', 'Use evidence to improve a repeatable process.', `## Define quality operationally

Quality requires a clear customer requirement and a way to observe whether it is met. Distinguish a one-off correction from changing the process that created the problem. Measurement should identify variation without encouraging people to hide errors.

## Case exercise

A fictional warehouse repeatedly ships the wrong size. Rechecking an individual order fixes the immediate issue. Investigating label design, shelf placement, and scanning steps may prevent recurrence.

## Practice

Write a precise defect definition, collect a small baseline, propose one change, and compare results while watching for unintended effects. Document the revised standard if it helps.

## Key takeaway

Improve the process with observable evidence and involve the people who do the work.`),
    ],
  },
  {
    slug: 'product-management', title: 'Product Management', subject: 'Management', code: 'PRD301', term: 3,
    description: 'Discover problems, prioritize outcomes, and learn through delivery.',
    modules: [
      module('Product outcomes and discovery', 'Define progress for users and the business.', `## Outcomes guide discovery

An output is something shipped; an outcome is a change in behavior or value. A new dashboard is an output. Helping users identify an issue sooner is an outcome that needs evidence.

## Case exercise

Fictional scheduling product Loopdesk sees repeated meeting rescheduling. Discovery examines recent cases, the people involved, and current workarounds before deciding a calendar feature is the answer.

## Practice

Write a user outcome, a business outcome, and a measurable signal for each. Identify how a metric could improve while the real experience worsens.

## Key takeaway

Discovery reduces uncertainty about the problem, the user, and a credible path to value.`),
      module('Prioritization and tradeoffs', 'Make choices explicit when resources are limited.', `## Priorities express judgment

A prioritization framework organizes evidence; it does not replace judgment. Compare expected impact, confidence, effort, dependencies, and risk. A precise score based on weak estimates can conceal uncertainty.

## Case exercise

Loopdesk chooses between faster page loading and a new reporting view. User evidence shows slow loading blocks a frequent task. The report may serve fewer users but support an important contractual need. Both facts belong in the decision.

## Practice

Create a comparison table with ranges and confidence levels. State what evidence would change the priority and which commitment constrains the choice.

## Key takeaway

Explain why a decision is reasonable now and revisit it when meaningful evidence changes.`),
      module('Requirements and delivery', 'Turn a goal into behavior that can be checked.', `## Describe observable behavior

Useful requirements state the user context, desired behavior, constraints, and acceptance evidence. Include access rules, failure states, accessibility, and data handling. A happy-path screenshot is not a complete specification.

## Case exercise

Loopdesk adds shared availability. The requirements specify whose information is visible, how time zones appear, and what happens when a calendar cannot load. The team verifies those conditions before release.

## Practice

Write acceptance examples for success, denial, invalid input, and temporary failure. Identify which rule belongs on the server even if the interface hides the action.

## Key takeaway

Requirements connect a user need to testable behavior, including boundaries and failure.`),
      module('Learning after launch', 'Use release evidence to guide the next decision.', `## Launch begins measurement

A release tests assumptions about usefulness, usability, and delivery. Define success and guardrails beforehand, instrument only what is needed, and combine behavior data with qualitative feedback.

## Case exercise

Loopdesk's new scheduling flow increases completed bookings but also increases accidental invitations. The team investigates both signals. A higher primary metric does not justify ignoring an important harm to the experience.

## Practice

Write a release review covering adoption, task completion, error rates, and support feedback. Distinguish correlation from a causal claim and propose the next uncertainty to test.

## Key takeaway

Treat a launch as evidence for a decision, including improving, expanding, or removing the change.`),
    ],
  },
  {
    slug: 'sustainability', title: 'Sustainability in Business', subject: 'Sustainability', code: 'SUS301', term: 3,
    description: 'Assess environmental and social tradeoffs with defined boundaries and credible evidence.',
    modules: [
      module('Systems and stakeholders', 'Look beyond a single activity or immediate cost.', `## Define the system

A business decision can affect suppliers, workers, customers, communities, and ecosystems. Map these relationships before optimizing one measure. Benefits and burdens can occur in different places or at different times.

## Case exercise

Fictional café Moss Table switches packaging. Lighter material reduces transport weight but may be difficult to recover locally. A useful assessment considers sourcing, use, collection, and actual end-of-life infrastructure.

## Practice

Draw a simple system map and identify who experiences each effect. Note missing evidence and avoid assuming that one visible improvement proves overall sustainability.

## Key takeaway

System boundaries and stakeholder perspectives determine which consequences are visible.`),
      module('Measuring environmental impact', 'Use defined boundaries and comparable units.', `## Measurement needs a basis

An impact comparison requires a functional unit, system boundary, data source, and method. Comparing packaging per item differs from comparing it per delivered meal if loss or breakage rates differ.

## Case exercise

Moss Table compares two fictional cups. A reusable cup has greater production impact but may spread it over repeated uses. Washing, transport, loss, and actual reuse frequency affect the conclusion.

## Practice

List the data needed for a fair comparison and which assumptions are most uncertain. Present a sensitivity range instead of a single unsupported number.

## Key takeaway

State what is measured, what is excluded, and how changing assumptions affects the result.`),
      module('Circular business models', 'Explore maintenance, reuse, repair, and recovery.', `## Preserve useful value

Circular approaches seek to reduce resource loss through longer use, maintenance, repair, reuse, and material recovery. Each approach needs an operational system and a viable demand for the recovered value.

## Case exercise

Moss Table pilots returnable containers. The team tracks return rate, cleaning effort, damage, and customer inconvenience. A deposit may encourage returns but can create barriers or administrative cost.

## Practice

Map the reverse flow from customer to collection and cleaning. Identify the weakest step and design a small test that measures actual returns.

## Key takeaway

A circular claim depends on demonstrated flows and repeated use, not merely on a product being theoretically recyclable.`),
      module('Responsible claims and decisions', 'Communicate specific progress without overstating it.', `## Make claims checkable

A responsible claim names the measured change, baseline, boundary, period, and supporting evidence. Broad labels can hide tradeoffs. Be clear about whether a statement describes a target, an estimate, or an achieved result.

## Practice case

Moss Table reports a measured reduction in single-use cup purchases at one location during a pilot. It should not turn that narrow result into an unsupported claim that the entire business has no environmental impact.

## Try it

Rewrite “completely green service” as a specific, evidence-based statement. Include one limitation that would affect a customer's interpretation.

## Key takeaway

Credible communication is proportional to evidence and makes meaningful limitations visible.`),
    ],
  },
  computerNetworks,
];
