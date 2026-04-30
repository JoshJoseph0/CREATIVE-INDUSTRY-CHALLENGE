

export const CHAPTERS = [
  // ── Chapter 1 ─────────────────────────────────────────────────────────────
  {
    id: 1,
    label: 'Chapter 1',
    title: 'Who is George?',
    accent: '#D4607A',
    slides: [
      {
        id: 'ch1-s1',
        title: 'Who is George?',
        body:
          'George is a life-sized mannequin who has been part of Walter Sickert\'s world for over a century. He\'s watched artists work, travelled across continents, and somehow survived it all — though not entirely in one piece.',
        audio: null, // e.g. "/audio/ch1_slide1.m4a"
        isInteraction: false,
      },
      {
        id: 'ch1-s2',
        title: 'A Life of Adventures',
        body:
          'From the smoky studios of London to sunlit European galleries, George has been there for it all. He\'s been packed into trunks, propped against walls, and posed under hot studio lights more times than anyone can count.',
        audio: null,
        isInteraction: false,
      },
      {
        id: 'ch1-s3',
        title: 'Loss of Fingers & Wobbly Parts',
        body:
          'Time has taken its toll. George\'s fingers have gone missing over the years, and a few of his joints are decidedly wobbly. But that only adds to his character — every crack and missing piece tells a story.',
        audio: null,
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
        title: 'Meeting Walter',
        body:
          'Walter Sickert was one of Britain\'s most important painters — unconventional, brilliant, and always searching for the perfect subject. When he found George, he knew immediately that this was the model he\'d been looking for.',
        audio: null,
        isInteraction: false,
      },
      {
        id: 'ch2-s2',
        title: 'Helping with the Paintings',
        body:
          'George held his poses patiently while Sickert worked. He never complained, never moved, never needed a tea break. For a painter obsessed with the human figure, George was the ideal collaborator.',
        audio: null,
        isInteraction: false,
      },
      {
        id: 'ch2-s3',
        title: 'Answer George',
        body: '',
        audio: null,
        isInteraction: true,
        interactionPrompt:
          'Imagine you are Walter Sickert. You\'ve just met George for the first time. What do you say to him?',
        interactionPlaceholder: 'Write your answer here…',
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
          'George eventually found his way to Corsham Court — home of Bath Spa University\'s art school. Here, new generations of students discovered him, each seeing something different in his worn and patient face.',
        audio: null,
        isInteraction: false,
      },
      {
        id: 'ch3-s2',
        title: 'European Trips',
        body:
          'George accompanied students on trips across Europe — sketchbooks open, eyes wide. He observed masterpieces in Florence, felt the cold air of Parisian galleries, and stood very still while everyone around him was anything but.',
        audio: null,
        isInteraction: false,
      },
      {
        id: 'ch3-s3',
        title: 'Answer George',
        body: '',
        audio: null,
        isInteraction: true,
        interactionPrompt:
          'You\'re an art student on a trip to Europe with George. Where do you take him, and what do you ask him to pose in front of?',
        interactionPlaceholder: 'Write your answer here…',
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
        title: 'Believability & Scale',
        body:
          'George\'s greatest gift to any artist is his scale. Life-size and uncannily human, he helps painters understand proportion, shadow, and the way light falls on a figure — things no photograph can fully teach.',
        audio: null,
        isInteraction: false,
      },
      {
        id: 'ch4-s2',
        title: 'Answer George',
        body: '',
        audio: null,
        isInteraction: true,
        interactionPrompt:
          'George has posed for the Lazarus paintings — rising from the dead, again and again. If you were the artist, what scene would you ask George to pose for?',
        interactionPlaceholder: 'Write your answer here…',
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
          'After all these years, George still loves an audience. There\'s something in the way visitors pause when they first see him — a flicker of uncertainty, then recognition. Is he real? Is he art? Is he both?',
        audio: null,
        isInteraction: false,
      },
      {
        id: 'ch5-s2',
        title: 'Your Colouring Invitation',
        body:
          'Before you go, George has one last request. Head to the colouring station and give him a new look — choose his colours, his outfit, his expression. Make him yours. After all, every great artist leaves their mark.',
        audio: null,
        isInteraction: false,
      },
    ],
  },
]
