Long version

Read the code starting with /src/events/aroai_framework_events.txt, it contains a reasonable amount of comments, should
be enough to understand what is going on at least on a basic level.

Short version

Vanilla AI for construction and budget management is mostly disabled. Custom scripts are used instead to handle those,
an entire system was designed to make it possible without everything lagging.

AI countries make decisions in a loop, with every iteration taking X weeks, by default it's 4.

On the first day the most critical data is collected, then budget settings get adjusted, then it checks if it's allowed
to construct or downsize buildings in the country. If yes, a lot more data is collected on country, state and building
scopes, from incorporated population, to available workforce, to median productivity and profitability, to shortages,
to usage of production methods, to levels of government buildings, to states connected to market capital by land, like
really a lot of different data. Was quite a challenge performance-wise. Then downsizing of buildings is performed, and
if construction is allowed, an event for the second day of the iteration is scheduled. Now if not, then nothing happens,
the iteration ends right here with variables used getting cleared.

Additionally, there's a separate weekly loop, with each iteration executed immediately and next being scheduled, as you
might guess, a week later. It's in sync with the main loop in a way that there's always an iteration of it on the first
day of the main iteration, because it's where this initial critical data is actually collected. There's a lot of data in
the game that needs to be checked every week, mostly related to budget income and expenses, and thus a weekly loop was
introduced to handle it.

On the second day all the data collected gets processed, where we determine a priority level and a lot of other values
for every type of building a country can construct. Government buildings are evaluated using various predefined formulas
and stuff, because they don't produce goods, so you need some arbitrary measure on how much bureaucracy or innovation or
convoys a country should want. Meanwhile production buildings are evaluated using market supply vs demand, with a fair
share of weightning added to reflect all the variables you can't get dynamically in Paradox scripting language, like
which goods depend on which, what is critical for the country existance and what's not, etc.

Speaking of data you can't get dynamically, everything related to input and output goods of buildings fall into this
category, which is why there are entire separate files in the mod dedicated to all the required static data just written
by hand. This is the same reason why ARoAI doesn't support any modded buildings without compatibility patches. It's not
possible technically, but algorithms themselves are absolutely dynamic enough to handle modded buildings if you would
add static data about them using compatibility patches. The instruction is in the same folder where you found this file.

On the third day the actual construction starts. Every day a single building type is chosen and a bunch of its levels
get queued in some states, which ones is determined partly on the second day, partly right before starting construction.
This continues until we run out of either unused construction points or building types or days, cause this stage will be
interrupted when we reach 1/2 days dedicated to the iteration, so it's 14 days with the default 4 weeks. After that all
the variables used are cleared and an iteration basically ends, it's second half remains unused, with only weekly loop
disturbing the peace.

If you find this setup to be kinda weird, I'll just repeat the magical word once more: performance. Paradox scripting
language is meant for adding content, like events, journals, but not for heavy scripts with a lot of data. All the day
distribution stuff and pauses in decision making of countries has one goal, to save as much performance as possible.
