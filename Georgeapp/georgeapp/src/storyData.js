
export const CHAPTERS = [
  // ── Chapter 1 ─────────────────────────────────────────────────────────────
  {
    id: 1,
    label: 'Chapter 1',
    title: 'The Life of George',
    accent: '#F7B731',
    slides: [
      {
        id: 'ch1-s1',
        title: "Hi there, my name is George.",
        body:
          "Hi there, my name is George. Well, that's what the museum likes to call me. I'm not really sure who made me, but I've been around for a hundred years, so I've seen a lot of amazing things.",
        audio: '/audio/ch1-s1.wav',
        isInteraction: false,
      },
      {
        id: 'ch1-s2',
        title: 'A Bit Old Now',
        body:
          "I might look a bit old now and I've lost a few fingers and the rest are quite wobbly, but that's just because I've had lots of adventures. Despite how old I'm getting, it's still lovely being here for you all today.",
        audio: '/audio/ch1-s2.wav',
        isInteraction: false,
      },
    ],
  },

  // ── Chapter 2 ─────────────────────────────────────────────────────────────
  {
    id: 2,
    label: 'Chapter 2',
    title: 'London & Sickert',
    accent: '#7B9BD4',
    slides: [
      {
        id: 'ch2-s1',
        title: 'Meeting Walter Sickert',
        body:
          "I spent most of my younger years with a kind man called Walter Sickert and he took really good care of me. I even got to help him when he was making some of his paintings. How cool is that? It does make me feel a little shy, but also very proud of what I've helped to accomplish.",
        audio: '/audio/ch2-s1.wav',
        isInteraction: false,
      },
    ],
  },

  // ── Chapter 3 ─────────────────────────────────────────────────────────────
  {
    id: 3,
    label: 'Chapter 3',
    title: 'Corsham & Art School',
    accent: '#5BAF88',
    slides: [
      {
        id: 'ch3-s1',
        title: 'Education at Bath Spa',
        body:
          "When he passed, he sent me to the Bath School of Art. I was looking forward to helping people learn, although I didn't get a degree myself. And after a few trips to Europe, I ended up in the Bath Spa University collection.",
        audio: '/audio/ch3-s1.wav',
        isInteraction: false,
      },
    ],
  },

  // ── Chapter 4 ─────────────────────────────────────────────────────────────
  {
    id: 4,
    label: 'Chapter 4',
    title: "The Artist's Tool",
    accent: '#E8A84A',
    slides: [
      {
        id: 'ch4-s1',
        title: 'Lazarus Paintings',
        body:
          "I used to be a lot more flexible and helpful for Walter when he was working on the Lazarus paintings, especially since I could hold my poses forever.",
        audio: '/audio/ch4-s1.wav',
        isInteraction: false,
      },
    ],
  },

  // ── Chapter 5 ─────────────────────────────────────────────────────────────
  {
    id: 5,
    label: 'Chapter 5',
    title: 'Farewell',
    accent: '#A99ED4',
    slides: [
      {
        id: 'ch5-s1',
        title: 'The Thrill of an Audience',
        body:
          "Thank you everyone for letting me chat a little bit about my memories. I really could get used to audiences like this. It's rather thrilling.",
        audio: '/audio/ch5-s1.wav',
        isInteraction: false,
      },
    ],
  },

  // ── Questions ─────────────────────────────────────────────────────────────
  {
    id: 6,
    label: 'Questions',
    title: 'Test Your Knowledge',
    accent: '#E05C5C',
    slides: [
      {
        id: 'q-s1',
        title: 'Question One',
        body: '',
        audio: '/audio/q1.wav',
        isInteraction: true,
        interactionPrompt:
          'How do you think I lost these fingers?',
        interactionPlaceholder: 'Write your answer here…',
      },
      {
        id: 'q-s2',
        title: 'Question Two',
        body: '',
        audio: '/audio/q2.wav',
        isInteraction: true,
        interactionPrompt:
          'How do you think I got this lipstick on my face? The truth is, I have no idea how this ended up here, and neither does the university. I\'d bet it was one of those mischievous students at the Bath School of Art!',
        interactionPlaceholder: 'Write your answer here…',
      },
      {
        id: 'q-s3',
        title: 'Question Three',
        body: '',
        audio: '/audio/q3.wav',
        isInteraction: true,
        interactionPrompt:
          'What inspired Walter to use mannequins like myself as inspiration for his artwork?',
        interactionPlaceholder: 'Write your answer here…',
      },
      {
        id: 'q-s4',
        title: "Time's Up!",
        body:
          "His use of wooden mannequins came from a desire to create believability and scale in his work.",
        audio: '/audio/q3-answer.wav',
        isInteraction: false,
      },
    ],
  },

  // ── Colouring Activity ────────────────────────────────────────────────────
  {
    id: 7,
    label: 'Activity',
    title: 'Colour Me In!',
    accent: '#4CAF50',
    slides: [
      {
        id: 'activity-s1',
        title: 'Your Turn!',
        body:
          "Before you go, I've prepared a colouring activity for all the young historians in the audience today. Once again, thank you all very much for coming, and have a lovely day!",
        audio: '/audio/ch5-s2.wav',
        isInteraction: false,
        isColourActivity: true,
      },
    ],
  },
]
