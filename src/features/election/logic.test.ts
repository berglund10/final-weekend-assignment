import test from "node:test";
import { deepEqual } from "node:assert/strict";
import { calculateAgreementRate } from "./logic";

test("It should return 0 when no votes match", () => {

    const representativeVotes = [
        { voter_id: 1, alternative_id: 1 },
        { voter_id: 2, alternative_id: 1 },
        { voter_id: 3, alternative_id: 1 },
        { voter_id: 4, alternative_id: 1 },
        { voter_id: 5, alternative_id: 1 },
      ];
      
      const publicPreferences = [
        { voter_id: 1, alternative_id: 2 },
        { voter_id: 2, alternative_id: 2 },
        { voter_id: 3, alternative_id: 2 },
        { voter_id: 4, alternative_id: 2 },
        { voter_id: 5, alternative_id: 2 },
      ];
  const result = calculateAgreementRate(representativeVotes, publicPreferences);

  deepEqual(result, 0);
});

test("Should filter and remove null, and give rate of 80 %", () => {

    const representativeVotes = [
        { voter_id: 1, alternative_id: 2 },
        { voter_id: 2, alternative_id: 3 },
        { voter_id: 3, alternative_id: 1 },
        { voter_id: 4, alternative_id: 2 },
        { voter_id: 5, alternative_id: 3 },
        { voter_id: null, alternative_id: 2 },
      ];
      
      const publicPreferences = [
        { voter_id: 1, alternative_id: 2 },
        { voter_id: 2, alternative_id: 3 },
        { voter_id: 3, alternative_id: 1 },
        { voter_id: 4, alternative_id: 2 },
        { voter_id: 5, alternative_id: 2 },
        { voter_id: null, alternative_id: 3 },
      ];
  const result = calculateAgreementRate(representativeVotes, publicPreferences);

  deepEqual(result, 80);
});

test("It should return 100 when all votes match", () => {

    const representativeVotes = [
        { voter_id: 1, alternative_id: 1 },
        { voter_id: 2, alternative_id: 1 },
        { voter_id: 3, alternative_id: 1 },
        { voter_id: 4, alternative_id: 1 },
        { voter_id: 5, alternative_id: 1 },
      ];
      
      const publicPreferences = [
        { voter_id: 1, alternative_id: 1 },
        { voter_id: 2, alternative_id: 1 },
        { voter_id: 3, alternative_id: 1 },
        { voter_id: 4, alternative_id: 1 },
        { voter_id: 5, alternative_id: 1 },
      ];
  const result = calculateAgreementRate(representativeVotes, publicPreferences);

  deepEqual(result, 100);
});

test("It should return 50 when half votes match", () => {

    const representativeVotes = [
        { voter_id: 1, alternative_id: 1 },
        { voter_id: 2, alternative_id: 1 },
        { voter_id: 3, alternative_id: 1 },
        { voter_id: 4, alternative_id: 2 },
        { voter_id: 5, alternative_id: 2 },
        { voter_id: 5, alternative_id: 2 },

      ];
      
      const publicPreferences = [
        { voter_id: 1, alternative_id: 1 },
        { voter_id: 2, alternative_id: 1 },
        { voter_id: 3, alternative_id: 1 },
        { voter_id: 4, alternative_id: 1 },
        { voter_id: 5, alternative_id: 1 },
        { voter_id: 5, alternative_id: 1 },

      ];
  const result = calculateAgreementRate(representativeVotes, publicPreferences);
  
  deepEqual(result, 50);
});