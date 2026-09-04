export type LetterSection = {
  id: string;
  heading?: string;
  paragraphs: string[];
  photo?: {
    src: string;
    alt: string;
    caption?: string;
  };
  pacing?: "normal" | "slow" | "quiet";
};

export const meta = {
  title: "For Daniella — Seven Years of Us",
  description:
    "A letter for my best friend, seven years in the making. Break the seal.",
};

export const envelope = {
  to: "For Daniella",
  subtitle: "With all the things I've never properly said.",
  invitation: "Break the seal.",
};

export const sections: LetterSection[] = [
  {
    id: "opening",
    paragraphs: [
      "Seven years.",
      "It's such a strange number to sit with. Long enough that I genuinely cannot remember what my life sounded like before you were in it. And somehow, still, not long enough. I don't think any number would be.",
      "I've been meaning to write this for a while. Not because there was an occasion I was waiting for — I just never knew how to start it without it turning into something cheesy, and you already know I'd rather die than be cheesy at you in person. So I'm doing it like this instead. Read slowly. I mean every word.",
    ],
  },
  {
    id: "beginning",
    heading: "How This Even Started",
    paragraphs: [
      "We were just classmates. That's it. That's the whole beginning — no dramatic meet-cute, nobody spilling anything on anybody, none of that. Just two girls in the same class who somehow kept ending up next to each other, and then somehow kept choosing to.",
      "I don't remember the exact day it stopped being 'that girl from school' and started being you. It just happened. One day you were someone I knew, and then you were someone I told things to. And then you were just... there. In everything. Still are.",
    ],
    photo: {
      src: "/images/childhood-01.jpg",
      alt: "A photo from years ago",
      caption: "before either of us knew what was coming",
    },
  },
  {
    id: "chaos",
    heading: "The Chaos",
    paragraphs: [
      "You used to just barge into my house. No knock, no text saying you were coming, nothing. You'd just appear, like you lived there too, honestly. At the time I probably rolled my eyes about it. Now it's one of my favourite things to think about, and I don't think I've ever told you that.",
      "I didn't know, back then, that those were the moments I'd miss the most. Nobody tells you that the ordinary days are the ones you'll go looking for later. I was too busy actually living it to notice I was collecting memories.",
      "Then there was the hostel. God, the hostel. All those nights that felt like nothing was happening — just talking, being ridiculous, dealing with whatever chaos the day had brought — and somehow those 'nothing' nights are some of the clearest memories I have. I can still picture the room better than I can picture some things from last year.",
      "And the running. You remember. The two of us actually running out of school, straight to my house, like we'd committed some kind of crime, giggling the whole way about absolutely nothing. We were definitely making questionable decisions. I regret none of it. If anything I want to know what we were thinking, because I don't think we were thinking at all — and that's exactly why it was so good.",
    ],
    photo: {
      src: "/images/us-02.jpg",
      alt: "The two of us, an old photo",
      caption: "hostel era, probably mid-chaos",
    },
  },
  {
    id: "fights",
    heading: "I've Always Fought For You",
    paragraphs: [
      "There were times you almost got into it with people, and I want you to know — I was never just standing there. I was ready. I've always been ready, for you.",
      "But it was never really about the physical stuff. It's that I've defended you. I've stood next to you when I didn't even fully know what was going on, because it didn't matter — you needed someone in your corner, and I was going to be that person, full stop. I still am. That hasn't changed and it's not going to.",
      "I don't say this to make it sound like some big dramatic thing. It's just true. I've fought for you. Quietly, loudly, whatever the moment needed. You're worth fighting for and I've never once resented doing it.",
    ],
  },
  {
    id: "growing-up",
    heading: "Growing Up",
    paragraphs: [
      "So much has changed since school. We've changed. Some of it was good, some of it was hard, some of it neither of us saw coming. But through all of it, somehow, you stayed part of my life. Not because it was easy or convenient — sometimes it really wasn't — but because we kept choosing to make room for each other.",
      "That's the part that actually gets me, if I'm honest. It's not that we've known each other seven years. It's that we've kept knowing each other, on purpose, through every version of ourselves that came and went in between.",
    ],
  },
  {
    id: "what-i-see",
    heading: "What I See In You",
    paragraphs: [
      "You are one of the most resilient people I have ever met, and I don't think I tell you that enough — or maybe ever. You've been through things that would've knocked a lot of people flat, and you kept going anyway. Not in a loud, look-at-me way. Just quietly, stubbornly, getting up and continuing. I admire that about you more than you know.",
      "You're smart in a way that sneaks up on people, because you never make a show of it. You're kind in a way that costs you something, because real kindness always does, and you give it anyway. You're beautiful, obviously, but that's honestly the least interesting thing about you compared to everything else going on in there.",
      "And you are so completely, unapologetically yourself. You've never tried to be a version of you that's easier for other people to swallow. I've watched you do that for seven years and it still amazes me. Most people flatten themselves out at some point. You never did.",
      "You're a rare kind of person. The kind you don't just meet twice. I know how lucky I am that I found you, or that you found me, or whatever the right way to put it is. I've stopped trying to find the right way. I just know I'm lucky.",
    ],
    photo: {
      src: "/images/daniella-02.jpg",
      alt: "Daniella",
    },
  },
  {
    id: "what-you-mean",
    heading: "What You Mean To Me",
    pacing: "slow",
    paragraphs: [
      "I don't think I can tell the story of my life without you in it somewhere. That's not an exaggeration, and it's not me being dramatic for the sake of this letter. It's just accurate. Too many of my memories have you standing in them. Too many versions of me existed with you right beside me, holding some part of it up.",
      "You're not just my best friend. That phrase feels too small for what this actually is. You're woven into it. Into the actual fabric of who I became. I genuinely don't know which parts of me are mine and which parts I picked up from years of being around you, and I don't think I want to separate them anyway.",
    ],
  },
  {
    id: "never-said",
    heading: "What I've Never Properly Said",
    pacing: "slow",
    paragraphs: [
      "I am so grateful for you. For all seven years of it — the good parts and the messy parts. For the arguments we've had and gotten past. For the laughing until it hurt. For the stupid decisions, the hostel, the running, the fights, the thousands of conversations that meant nothing and somehow meant everything at the same time.",
      "I'm grateful for the growing up we did next to each other, even when it was awkward, even when we were figuring ourselves out in real time and probably getting it wrong half the time.",
      "Seven years is a long time. And it still doesn't feel like enough. I don't know how else to say that without it sounding like a line from a movie, but it's just true, so I'm leaving it exactly like that.",
    ],
  },
  {
    id: "what-i-miss",
    heading: "What I Miss",
    pacing: "slow",
    paragraphs: [
      "I miss your presence more than I know how to say properly. Not just talking to you, though I miss that too. I mean the actual presence of you — your chaos, your specific way of walking into a room like you own it, the familiarity of just having you around without needing a reason.",
      "I don't think you realise how much of my sense of normal was built around you being nearby. You don't notice how load-bearing someone is until there's a gap where they used to be. That's where I am, some days. Just noticing the gap.",
      "I miss the little things most. The things too small to even qualify as memories at the time. Turns out those were the ones that mattered.",
    ],
  },
  {
    id: "future",
    heading: "Wherever We End Up",
    paragraphs: [
      "Life is going to keep pulling us in different directions, distance and time and whatever else decides to get in the way. I know that. I'm not going to pretend otherwise or make some promise I can't actually keep.",
      "But I am building a life on purpose, and you are one of the people I'm building it for room to keep. Whatever that ends up looking like — different cities, different chapters, less time than either of us would want — I'm not letting the distance decide who gets to stay close to me. You're staying close. That part isn't up for negotiation.",
    ],
  },
  {
    id: "ending",
    pacing: "quiet",
    paragraphs: ["Daniella.", "You literally mean the world to me."],
  },
];
