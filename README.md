# SubMetrics

SubMetrics is a dashboard designed to deliver key metrics on the subscan network in real time! Submetrics processes insights directly from a Subspace node such that you have full control of the data.

The app works on mobile -- for those times where you just don't want to fumble around PolkadotJS

Hacked out over a few hours using nextJS. The app can also be compiled statically and hosted on Arweave with a few tweaks.

## Getting Started

First, run the development server:

```bash
pnpm install && pnpm run dev
```

Voila! The app should run on `localhost:3000`. An example of the app deployed can be found [here](https://subspace-example.vercel.app/).

## Avenues for improvement/Coming soon!

Submetrics is a couple of hour scaffold project. Here is what i envisage as the main avenues for improvement for the project:

- Add the ability for the user to provide their own node. This becomes much more useful/resillient if a user is able to supply their own light node! This could be done by simply storing the node's URI in localstorage and doing a check against compatible runtime versions before connecting. This should be paired with...
- Improved error handling. I'm sure there are potential hanging error states here - this becomes much more important when we allow a user to supply their own node. Error messages need to make sense, and we need to make reasonable assumptions. PolkadotJS will just refresh forever.
- Snapshot tests - This will be useful for us to prevent regressions.
- Expand on/add more statistics based on feedback. Truth is, i don't really know what the key metrics are for subspace yet. I think interviewing users/engineers and understanding what they'd actually like to see could take this to the next level. There are probably a lot of stats that could be added with custom RPCs - things like number of nodes on the network, total storage space available, average/median plot size, storage space gini coefficient might be interesting!
