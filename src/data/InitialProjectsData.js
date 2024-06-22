const initialProjectsData = [
  {
    id: 1,
    project_name: "The One with the Lottery",
    project_details:
      "The group pools money to buy lottery tickets, but disagreements about how to handle potential winnings lead to conflicts and a comical chase.",
    created_at: "2024-05-22T09:00:00+00:00",
    sub_projects: {
      allSubProjects: [
        {
          id: 1,
          subProjectName:
            "Each friend fantasizes about what they would do with the lottery winnings, showcasing their dreams and desires.",
          subProjectRoles: [
            "Ross",
            "Phoebe",
            "Monica",
            "Rachel",
            "Chandler",
            "Joey",
          ],
          subProjectPercent: "100",
        },
        {
          id: 2,
          subProjectName:
            "Ross talks about investing the winnings in obscure historical artifacts or funding his own paleontology digs, much to the amusement and bewilderment of the others.",
          subProjectRoles: ["Ross"],
          subProjectPercent: "100",
        },
        {
          id: 3,
          subProjectName:
            "A pigeon startles Phoebe as she holds the tickets on the balcony, causing her to accidentally drop them. This leads to a comical yet tense moment as the group scrambles to recover the potentially winning tickets.",
          subProjectRoles: ["Phoebe"],
          subProjectPercent: "100",
        },
        {
          id: 4,
          subProjectName:
            "The friends gather around the TV to watch the lottery drawing, each reacting in real-time as the numbers are announced. The tension peaks, followed by their collective disappointment as they realize they have not won the jackpot.",
          subProjectRoles: [
            "Ross",
            "Phoebe",
            "Monica",
            "Rachel",
            "Chandler",
            "Joey",
          ],
          subProjectPercent: "100",
        },
        {
          id: 5,
          subProjectName:
            "Finally, the group gets a 'call' from the pigeon involved in dropping the bowl of lottery tickets.",
          subProjectRoles: ["Phoebe"],
          subProjectPercent: "100",
        },
      ],
    },
    roles: {
      allRoles: ["Ross", "Phoebe", "Monica", "Rachel", "Chandler", "Joey"],
    },
    priority: "Urgent",
    percent: 100,
    due_date: "2024-05-30T00:00:00+00:00",
    organization: "Friends Cast",
    posted_by: "Chandler",
  },
  {
    id: 2,
    project_name: "The One with Ross's Wedding",
    project_details:
      "In London for Ross's wedding, mishaps and misunderstandings abound, culminating in a dramatic slip at the altar.",
    created_at: "2024-05-22T09:00:00+00:00",
    sub_projects: {
      allSubProjects: [
        {
          id: 1,
          subProjectName:
            "Ross accidentally says Rachel's name instead of Emily's during his vows, causing a shocking wedding blunder.",
          subProjectRoles: ["Ross", "Rachel"],
          subProjectPercent: "100",
        },
        {
          id: 2,
          subProjectName:
            "Sparked by the romantic setting, Monica and Chandler begin their secret relationship.",
          subProjectRoles: ["Monica", "Chandler"],
          subProjectPercent: "100",
        },
        {
          id: 3,
          subProjectName:
            "Joey tours London, visiting famous landmarks and enjoying being mistaken for a local.",
          subProjectRoles: ["Joey"],
          subProjectPercent: "0",
        },
      ],
    },
    roles: {
      allRoles: ["Ross", "Monica", "Rachel", "Chandler", "Joey"],
    },
    priority: "Important",
    percent: 67,
    due_date: "2024-05-30T00:00:00+00:00",
    organization: "Friends Cast",
    posted_by: "Ross",
  },
  {
    id: 3,
    project_name: "The One with Ross's Sandwich",
    project_details:
      "Ross's reaction to his coworkers eating his sandwich leads to larger issues at work, reflecting his struggles with anger and disappointment.",
    created_at: "2024-05-22T09:00:00+00:00",
    sub_projects: {
      allSubProjects: [
        {
          id: 1,
          subProjectName:
            "Ross discovers that his specially made Thanksgiving leftover sandwich has been eaten by a coworker, sparking an over-the-top reaction.",
          subProjectRoles: ["Ross"],
          subProjectPercent: "100",
        },
        {
          id: 2,
          subProjectName:
            "Ross accidentally yells at his boss, who confesses to eating the sandwich, complicating his work relationships.",
          subProjectRoles: ["Ross"],
          subProjectPercent: "100",
        },
        {
          id: 3,
          subProjectName:
            "Ross is required to attend anger management sessions, leading to introspective and comedic moments.",
          subProjectRoles: ["Ross"],
          subProjectPercent: "0",
        },
      ],
    },
    roles: {
      allRoles: ["Ross"],
    },
    priority: "Normal",
    percent: 67,
    due_date: "2024-05-30T00:00:00+00:00",
    organization: "Friends Cast",
    posted_by: "Ross",
  },
  {
    id: 4,
    project_name: "The One Where Everybody Finds Out",
    project_details:
      "The friends slowly discover Monica and Chandler's secret relationship, leading to a series of comedic and dramatic confrontations.",
    created_at: "2024-05-22T09:00:00+00:00",
    sub_projects: {
      allSubProjects: [
        {
          id: 1,
          subProjectName:
            "Phoebe tries to seduce Chandler as part of a plan to force him to reveal his relationship with Monica.",
          subProjectRoles: ["Phoebe", "Chandler", "Monica", "Rachel"],
          subProjectPercent: "100",
        },
        {
          id: 2,
          subProjectName:
            "Chandler and Monica catch on to Phoebe's antics and decide to play along, leading to escalating seduction attempts.",
          subProjectRoles: ["Phoebe", "Chandler", "Monica", "Rachel"],
          subProjectPercent: "100",
        },
        {
          id: 3,
          subProjectName:
            "Ross discovers Monica and Chandler's relationship through Ugly Naked Guy's apartment window, leading to his explosive reaction.",
          subProjectRoles: ["Ross", "Chandler", "Monica"],
          subProjectPercent: "100",
        },
        {
          id: 4,
          subProjectName:
            "Joey, who has been keeping the secret the longest, expresses relief as the truth finally comes out among the friends.",
          subProjectRoles: ["Joey"],
          subProjectPercent: "100",
        },
        {
          id: 5,
          subProjectName:
            "The entire group confronts the situation together, leading to a humorous resolution and acceptance of the new couple.",
          subProjectRoles: [
            "Ross",
            "Phoebe",
            "Monica",
            "Rachel",
            "Chandler",
            "Joey",
          ],
          subProjectPercent: "100",
        },
      ],
    },
    roles: {
      allRoles: ["Ross", "Phoebe", "Monica", "Rachel", "Chandler", "Joey"],
    },
    priority: "Urgent",
    percent: 100,
    due_date: "2024-05-30T00:00:00+00:00",
    organization: "Friends Cast",
    posted_by: "Ross",
  },
  {
    id: 5,
    project_name: "The One with the Prom Video",
    project_details:
      "The friends watch an old prom video at Monica and Rachel's apartment, which shows Ross's sweet but ultimately unnecessary gesture. ",
    created_at: "2024-05-22T09:00:00+00:00",
    sub_projects: {
      allSubProjects: [
        {
          id: 1,
          subProjectName:
            "Ross prepares to step in as Rachel's prom date, donning a tuxedo and a mustache, ready to save the day.",
          subProjectRoles: ["Ross", "Rachel"],
          subProjectPercent: "10",
        },
      ],
    },
    roles: {
      allRoles: ["Ross", "Rachel"],
    },
    priority: "Important",
    percent: 10,
    due_date: "2024-05-30T00:00:00+00:00",
    organization: "Friends Cast",
    posted_by: "Rachel",
  },
  {
    id: 6,
    project_name: "The One with Ross's Tan",
    project_details:
      "Ross attempts to get a tan for an event but ends up with a comically uneven result.",
    created_at: "2024-05-22T09:00:00+00:00",
    sub_projects: {
      allSubProjects: [
        {
          id: 1,
          subProjectName:
            "Ross attempts to get a tan for an event but ends up with a comically uneven result.",
          subProjectRoles: ["Ross"],
          subProjectPercent: "20",
        },
        {
          id: 2,
          subProjectName:
            "Ross tries to even out his tan with another session, but the results worsen.",
          subProjectRoles: ["Ross"],
          subProjectPercent: "20",
        },
      ],
    },
    roles: {
      allRoles: ["Ross"],
    },
    priority: "Urgent",
    percent: 20,
    due_date: "2024-05-30T00:00:00+00:00",
    organization: "Friends Cast",
    posted_by: "Ross",
  },
  {
    id: 7,
    project_name: "The One with the Jellyfish",
    project_details:
      "During a trip to the beach, the friends encounter a series of mishaps, including Monica getting stung by a jellyfish.",
    created_at: "2024-05-22T09:00:00+00:00",
    sub_projects: {
      allSubProjects: [
        {
          id: 1,
          subProjectName:
            "Monica gets stung by a jellyfish, and the group scrambles to find a remedy, leading to a memorable and embarrassing moment.",
          subProjectRoles: ["Monica", "Chandler", "Joey"],
          subProjectPercent: "5",
        },
        {
          id: 2,
          subProjectName:
            "Joey recalls hearing about a peculiar remedy for jellyfish stings, which he hesitantly suggests to Monica.",
          subProjectRoles: ["Monica", "Chandler", "Joey"],
          subProjectPercent: "7",
        },
        {
          id: 3,
          subProjectName:
            "Chandler ultimately decides to help Monica by applying the suggested remedy, solidifying their friendship.",
          subProjectRoles: ["Monica", "Chandler", "Joey"],
          subProjectPercent: "40",
        },
        {
          id: 4,
          subProjectName:
            "Ross and Rachel have an emotional conversation about their past relationship, highlighting their unresolved feelings.",
          subProjectRoles: ["Ross", "Rachel"],
          subProjectPercent: "20",
        },
        {
          id: 5,
          subProjectName:
            "Phoebe uses the trip to the beach as an opportunity to further her search for her biological father, leading to introspective moments and revelations about her family.",
          subProjectRoles: ["Phoebe"],
          subProjectPercent: "100",
        },
      ],
    },
    roles: {
      allRoles: ["Ross", "Phoebe", "Monica", "Rachel", "Chandler", "Joey"],
    },
    priority: "Low",
    percent: 34,
    due_date: "2024-05-30T00:00:00+00:00",
    organization: "Friends Cast",
    posted_by: "Phoebe",
  },
  {
    id: 8,
    project_name: "The One Where No One Proposes",
    project_details:
      "Due to a misunderstanding at the hospital after Emma's birth, Joey accidentally proposes to Rachel, leading to confusion and comedic situations.",
    created_at: "2024-05-22T09:00:00+00:00",
    sub_projects: {
      allSubProjects: [
        {
          id: 1,
          subProjectName:
            "Joey finds an engagement ring and, upon picking it up, accidentally proposes to Rachel, who misunderstands and accepts.",
          subProjectRoles: ["Joey", "Rachel"],
          subProjectPercent: "10",
        },
        {
          id: 2,
          subProjectName:
            "Ross finds out about the accidental proposal and reacts with disbelief and frustration, trying to find out what really happened.",
          subProjectRoles: ["Ross", "Joey", "Rachel", "Phoebe"],
          subProjectPercent: "5",
        },
        {
          id: 3,
          subProjectName:
            "Amidst the chaos, Monica and Chandler begin their journey of facing fertility challenges, adding depth to their storyline.",
          subProjectRoles: ["Monica", "Chandler"],
          subProjectPercent: "0",
        },
      ],
    },
    roles: {
      allRoles: ["Ross", "Phoebe", "Monica", "Rachel", "Chandler", "Joey"],
    },
    priority: "Low",
    percent: 5,
    due_date: "2024-05-30T00:00:00+00:00",
    organization: "Friends Cast",
    posted_by: "Chandler",
  },
  {
    id: 9,
    project_name: "The One Where Phoebe Runs",
    project_details:
      "Phoebe's unique and carefree approach to running embarrasses Rachel when they go jogging together, but it also brings out important lessons in self-acceptance and friendship.",
    created_at: "2024-05-22T09:00:00+00:00",
    sub_projects: {
      allSubProjects: [
        {
          id: 1,
          subProjectName:
            "Phoebe embarrasses Rachel by running wildly in the park, arms flailing and oblivious to other people’s judgments.",
          subProjectRoles: ["Phoebe", "Rachel"],
          subProjectPercent: "20",
        },
        {
          id: 2,
          subProjectName:
            "Initially embarrassed, Rachel tries to teach Phoebe to run more 'normally,' but struggles with the societal pressure of appearing 'proper.'",
          subProjectRoles: ["Phoebe", "Rachel"],
          subProjectPercent: "20",
        },
        {
          id: 3,
          subProjectName:
            "Rachel eventually embraces Phoebe’s style, running freely with her, which leads to a liberating experience that strengthens their friendship.",
          subProjectRoles: ["Rachel"],
          subProjectPercent: "100",
        },
      ],
    },
    roles: {
      allRoles: ["Phoebe", "Rachel"],
    },
    priority: "Important",
    percent: 47,
    due_date: "2024-05-30T00:00:00+00:00",
    organization: "Friends Cast",
    posted_by: "Phoebe",
  },
  {
    id: 10,
    project_name: "The One with Phoebe's Cookies",
    project_details:
      "Phoebe tries to recreate her grandmother's secret cookie recipe, only to discover the true origin of the recipe, leading to a humorous exploration of family heritage and traditions.",
    created_at: "2024-05-22T09:00:00+00:00",
    sub_projects: {
      allSubProjects: [
        {
          id: 1,
          subProjectName:
            "Phoebe and Monica try to recreate the family recipe from a single cookie Phoebe saved, leading to various baking mishaps.",
          subProjectRoles: ["Phoebe", "Monica"],
          subProjectPercent: "4",
        },
        {
          id: 2,
          subProjectName:
            "Phoebe discovers the recipe was not her grandmother’s secret but actually from a famous brand, challenging her views on family heritage.",
          subProjectRoles: ["Phoebe", "Monica"],
          subProjectPercent: "0",
        },
      ],
    },
    roles: {
      allRoles: ["Phoebe", "Monica"],
    },
    priority: "Low",
    percent: 2,
    due_date: "2024-05-30T00:00:00+00:00",
    organization: "Friends Cast",
    posted_by: "Monica",
  },
  {
    id: 11,
    project_name: "The One with All the Poker",
    project_details:
      "The friends play a competitive game of poker while Rachel struggles with job rejections in her pursuit of a career in fashion.",
    created_at: "2024-05-22T09:00:00+00:00",
    sub_projects: {
      allSubProjects: [
        {
          id: 1,
          subProjectName:
            "The girls challenge the boys to a high-stakes game to prove they can hold their own in poker.",
          subProjectRoles: [
            "Ross",
            "Phoebe",
            "Monica",
            "Rachel",
            "Chandler",
            "Joey",
          ],
          subProjectPercent: "0",
        },
        {
          id: 2,
          subProjectName:
            "Rachel receives a call about a job interview mid-game, adding tension and excitement to the night.",
          subProjectRoles: ["Rachel"],
          subProjectPercent: "0",
        },
        {
          id: 3,
          subProjectName:
            "Rachel wins the final hand impressively and later receives a job offer, ending the episode on a high note for her career ambitions.",
          subProjectRoles: ["Rachel", "Ross"],
          subProjectPercent: "100",
        },
      ],
    },
    roles: {
      allRoles: ["Ross", "Phoebe", "Monica", "Rachel", "Chandler", "Joey"],
    },
    priority: "Normal",
    percent: 33,
    due_date: "2024-05-30T00:00:00+00:00",
    organization: "Friends Cast",
    posted_by: "Rachel",
  },
  {
    id: 12,
    project_name: "The One with All the Thanksgivings",
    project_details:
      "Flashbacks reveal the friends' worst Thanksgiving experiences, culminating in new revelations and forgiveness.",
    created_at: "2024-05-22T09:00:00+00:00",
    sub_projects: {
      allSubProjects: [
        {
          id: 1,
          subProjectName:
            "Rachel mistakenly makes a dessert with beef, resulting in a bizarre but memorable dish",
          subProjectRoles: ["Rachel"],
          subProjectPercent: "100",
        },
        {
          id: 2,
          subProjectName:
            "Joey gets his head stuck in a turkey in one of his first Thanksgivings with the gang.",
          subProjectRoles: ["Joey"],
          subProjectPercent: "100",
        },
        {
          id: 3,
          subProjectName:
            "Monica dances with a turkey on her head to cheer up Chandler, leading him to accidentally confess his love.",
          subProjectRoles: ["Monica", "Chandler"],
          subProjectPercent: "100",
        },
      ],
    },
    roles: {
      allRoles: ["Monica", "Rachel", "Chandler", "Joey"],
    },
    priority: "Urgent",
    percent: 100,
    due_date: "2024-05-30T00:00:00+00:00",
    organization: "Friends Cast",
    posted_by: "Rachel",
  },
  {
    id: 13,
    project_name: "The One Where No One's Ready",
    project_details:
      "In this episode, Ross is eager to get everyone to a museum benefit, but all of his friends are preoccupied with personal issues in their apartments, causing hilarious delays.",
    created_at: "2021-11-12T09:00:00+00:00",
    sub_projects: {
      allSubProjects: [
        {
          id: 1,
          subProjectName: "Chandler hide all Joey's the clothes",
          subProjectRoles: ["Chandler", "Joey"],
          subProjectPercent: "0",
        },
        {
          id: 2,
          subProjectName:
            "Joey wears all of Chandler's clothes as a joke, leading to the iconic line, 'Could I BE wearing any more clothes?'",
          subProjectRoles: ["Chandler", "Joey"],
          subProjectPercent: "0",
        },
        {
          id: 3,
          subProjectName:
            "Ross grows increasingly frantic as he tries to hurry everyone up, repeatedly checking on his friends and getting more anxious by the minute",
          subProjectRoles: [
            "Ross",
            "Phoebe",
            "Monica",
            "Rachel",
            "Chandler",
            "Joey",
          ],
          subProjectPercent: "0",
        },
        {
          id: 4,
          subProjectName:
            "Phoebe gets hummus on her dress and creatively covers it up with a Christmas decoration.",
          subProjectRoles: ["Phoebe"],
          subProjectPercent: "0",
        },
      ],
    },
    roles: {
      allRoles: ["Ross", "Phoebe", "Monica", "Rachel", "Chandler", "Joey"],
    },
    priority: "Urgent",
    percent: 0,
    due_date: "2024-05-30T00:00:00+00:00",
    organization: "Friends Cast",
    posted_by: "Phoebe",
  },
];
export default initialProjectsData;
