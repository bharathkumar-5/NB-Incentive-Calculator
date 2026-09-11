export const INCENTIVE_MATRIX = [
  {
    rating: 0,
    walkIns: 0,
    dialled: 0,
    talkTime: 0,
    payout: 0,
  },
  {
    rating: 1,
    walkIns: 10,
    dialled: 125,
    talkTime: 135,
    payout: 800,
  },
  {
    rating: 2,
    walkIns: 17,
    dialled: 136,
    talkTime: 150,
    payout: 1600,
  },
  {
    rating: 3,
    walkIns: 23,
    dialled: 146,
    talkTime: 165,
    payout: 2400,
  },
  {
    rating: 4,
    walkIns: 30,
    dialled: 157,
    talkTime: 180,
    payout: 3200,
  },
  {
    rating: 5,
    walkIns: 37,
    dialled: 167,
    talkTime: 195,
    payout: 4000,
  },
  {
    rating: 6,
    walkIns: 43,
    dialled: 178,
    talkTime: 210,
    payout: 4800,
  },
  {
    rating: 7,
    walkIns: 50,
    dialled: 188,
    talkTime: 225,
    payout: 5600,
  },
  {
    rating: 8,
    walkIns: 57,
    dialled: 199,
    talkTime: 240,
    payout: 6400,
  },
  {
    rating: 9,
    walkIns: 63,
    dialled: 209,
    talkTime: 255,
    payout: 7200,
  },
  {
    rating: 10,
    walkIns: 70,
    dialled: 220,
    talkTime: 270,
    payout: 8000,
  },
];

export const WEIGHTS = {
  walkIns: 0.6,
  dialled: 0.2,
  talkTime: 0.2,
};

export const MAX_PAYOUT = 8000;
