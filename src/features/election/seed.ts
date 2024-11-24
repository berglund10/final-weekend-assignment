import { db } from "@/db/instance";
import {
  electionTable,
  alternativesTable,
  electionVotesTable,
  publicPreferencesVotesTable,
} from "./schema";
import {
  publicVotersTable,
  representativeTable,
} from "../representative/schema";

const seedCatsAndDogsElection = async () => {
  const representatives = [
    { name: "Andrea", email: "andrea@example.com" },
    { name: "Beatrice", email: "beatrice@example.com" },
  ];

  for (const rep of representatives) {
    await db.insert(representativeTable).values(rep);
  }

  const andreaVoters = await db
    .insert(publicVotersTable)
    .values([...Array(10).fill({ representative_id: 1 })])
    .returning();

  const beatriceVoters = await db
    .insert(publicVotersTable)
    .values([...Array(20).fill({ representative_id: 2 })])
    .returning();

  const election = await db
    .insert(electionTable)
    .values({
      description: "Should Cats or Dogs be allowed in the office?",
      done: true,
    })
    .returning();

  const electionId = election[0].id;

  const catsAlternative = await db
    .insert(alternativesTable)
    .values({
      name: "Cats",
      election_id: electionId,
    })
    .returning();

  const dogsAlternative = await db
    .insert(alternativesTable)
    .values({
      name: "Dogs",
      election_id: electionId,
    })
    .returning();

  const catsId = catsAlternative[0].id;
  const dogsId = dogsAlternative[0].id;

  const electionVotes = [
    ...andreaVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: catsId,
    })),

    ...beatriceVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: dogsId,
    })),
  ];

  await db.insert(electionVotesTable).values(electionVotes);

  const publicPreferences = [
    ...andreaVoters.slice(0, 5).map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: catsId,
    })),
    ...andreaVoters.slice(5, 10).map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: dogsId,
    })),

    ...beatriceVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: catsId,
    })),
  ];

  await db.insert(publicPreferencesVotesTable).values(publicPreferences);
};

const seedSchoolsElection = async () => {
  const representatives = [
    { name: "Lena", email: "lena@example.com" },
    { name: "Bengt", email: "bengt@example.com" },
    { name: "Charles", email: "charles@example.com" },
  ];

  for (const rep of representatives) {
    await db.insert(representativeTable).values(rep);
  }

  const lenaVoters = await db
    .insert(publicVotersTable)
    .values([...Array(10).fill({ representative_id: 3 })])
    .returning();

  const bengtVoters = await db
    .insert(publicVotersTable)
    .values([...Array(20).fill({ representative_id: 4 })])
    .returning();

  const charlesVoters = await db
    .insert(publicVotersTable)
    .values([...Array(15).fill({ representative_id: 5 })])
    .returning();

  const election = await db
    .insert(electionTable)
    .values({
      description: "Should schools be publicly funded or privately funded?",
      done: true,
    })
    .returning();

  const electionId = election[0].id;

  const publicSchoolsAlternative = await db
    .insert(alternativesTable)
    .values({
      name: "Publicly funded schools",
      election_id: electionId,
    })
    .returning();

  const privateSchoolsAlternative = await db
    .insert(alternativesTable)
    .values({
      name: "Privately funded schools",
      election_id: electionId,
    })
    .returning();

  const publicId = publicSchoolsAlternative[0].id;
  const privateId = privateSchoolsAlternative[0].id;

  const electionVotes = [
    ...lenaVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: publicId,
    })),
    ...bengtVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: privateId,
    })),
    ...charlesVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: publicId,
    })),
  ];

  await db.insert(electionVotesTable).values(electionVotes);

  const publicPreferences = [
    ...lenaVoters.slice(0, 5).map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: publicId,
    })),
    ...lenaVoters.slice(5, 10).map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: privateId,
    })),

    ...bengtVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: privateId,
    })),

    ...charlesVoters.slice(0, 10).map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: publicId,
    })),
    ...charlesVoters.slice(10, 15).map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: privateId,
    })),
  ];

  await db.insert(publicPreferencesVotesTable).values(publicPreferences);
};

const seedGoatFootballersElection = async () => {
  const lenaVoters = await db
    .insert(publicVotersTable)
    .values([...Array(15).fill({ representative_id: 3 })])
    .returning();

  const bengtVoters = await db
    .insert(publicVotersTable)
    .values([...Array(10).fill({ representative_id: 4 })])
    .returning();

  const charlesVoters = await db
    .insert(publicVotersTable)
    .values([...Array(20).fill({ representative_id: 5 })])
    .returning();

  const election = await db
    .insert(electionTable)
    .values({
      description: "Who is the greatest footballer of all time?",
      done: false,
    })
    .returning();

  const electionId = election[0].id;

  const maradonaAlternative = await db
    .insert(alternativesTable)
    .values({
      name: "Diego Maradona",
      election_id: electionId,
    })
    .returning();

  const messiAlternative = await db
    .insert(alternativesTable)
    .values({
      name: "Lionel Messi",
      election_id: electionId,
    })
    .returning();

  const baggioAlternative = await db
    .insert(alternativesTable)
    .values({
      name: "Roberto Baggio",
      election_id: electionId,
    })
    .returning();

  const tottiAlternative = await db
    .insert(alternativesTable)
    .values({
      name: "Francesco Totti",
      election_id: electionId,
    })
    .returning();

  const ronaldoAlternative = await db
    .insert(alternativesTable)
    .values({
      name: "Ronaldo Fenomeno",
      election_id: electionId,
    })
    .returning();

  const maradonaId = maradonaAlternative[0].id;
  const messiId = messiAlternative[0].id;
  const baggioId = baggioAlternative[0].id;
  const tottiId = tottiAlternative[0].id;
  const ronaldoId = ronaldoAlternative[0].id;

  const electionVotes = [
    ...lenaVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: maradonaId,
    })),
    ...bengtVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: messiId,
    })),
    ...charlesVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: ronaldoId,
    })),
  ];

  await db.insert(electionVotesTable).values(electionVotes);

  const publicPreferences = [
    ...lenaVoters.slice(0, 10).map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: maradonaId,
    })),
    ...lenaVoters.slice(10, 15).map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: baggioId,
    })),

    ...bengtVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: messiId,
    })),

    ...charlesVoters.slice(0, 10).map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: ronaldoId,
    })),
    ...charlesVoters.slice(10, 20).map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: tottiId,
    })),
  ];

  await db.insert(publicPreferencesVotesTable).values(publicPreferences);
};

const seedTransportationElection = async () => {
  const lenaVoters = await db
    .insert(publicVotersTable)
    .values([...Array(15).fill({ representative_id: 3 })])
    .returning();

  const bengtVoters = await db
    .insert(publicVotersTable)
    .values([...Array(10).fill({ representative_id: 4 })])
    .returning();

  const charlesVoters = await db
    .insert(publicVotersTable)
    .values([...Array(20).fill({ representative_id: 5 })])
    .returning();

  const election = await db
    .insert(electionTable)
    .values({
      description: "Should public transportation be tax-funded?",
      done: false,
    })
    .returning();

  const electionId = election[0].id;

  const taxFundedAlternative = await db
    .insert(alternativesTable)
    .values({
      name: "Publicly funded",
      election_id: electionId,
    })
    .returning();

  const userFundedAlternative = await db
    .insert(alternativesTable)
    .values({
      name: "Privately funded",
      election_id: electionId,
    })
    .returning();

  const taxFundedId = taxFundedAlternative[0].id;
  const userFundedId = userFundedAlternative[0].id;

  const electionVotes = [
    ...lenaVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: taxFundedId,
    })),
    ...bengtVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: userFundedId,
    })),
    ...charlesVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: taxFundedId,
    })),
  ];

  await db.insert(electionVotesTable).values(electionVotes);

  const publicPreferences = [
    ...lenaVoters.slice(0, 10).map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: taxFundedId,
    })),
    ...lenaVoters.slice(10, 15).map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: userFundedId,
    })),

    ...bengtVoters.map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: userFundedId,
    })),

    ...charlesVoters.slice(0, 15).map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: taxFundedId,
    })),
    ...charlesVoters.slice(15, 20).map((voter) => ({
      voter_id: voter.id,
      election_id: electionId,
      alternative_id: userFundedId,
    })),
  ];

  await db.insert(publicPreferencesVotesTable).values(publicPreferences);
};

(async () => {
  await seedCatsAndDogsElection();
  await seedSchoolsElection();
  await seedGoatFootballersElection();
  await seedTransportationElection();

  console.log("Seeding elections...");
})();
