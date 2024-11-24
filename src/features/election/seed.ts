import { db } from "@/db/instance";
import { electionTable, alternativesTable, votesTable } from "./schema";
import {
  publicVotersTable,
  representativeTable,
} from "../representative/schema";

const seedRepresentativesAndVoters = async () => {
  const representatives = [
    { name: "Arne Johansson", email: "ajn@se" },
    { name: "Ingrid Nilsson", email: "in@se" },
    { name: "Kurt Persson", email: "kp@se" },
  ];

  for (const rep of representatives) {
    await db.insert(representativeTable).values(rep);
  }

  const voters = [
    { representative_id: 1 },
    { representative_id: 1 },
    { representative_id: 1 },
    { representative_id: 1 },
    { representative_id: 1 },
    { representative_id: 1 },
    { representative_id: 2 },
    { representative_id: 2 },
    { representative_id: 2 },
    { representative_id: 2 },
  ];

  for (const voter of voters) {
    await db.insert(publicVotersTable).values(voter);
  }
};

const seedElectricityElection = async () => {
  const election = await db
    .insert(electionTable)
    .values({
      description:
        "Electricity Supply: Should electricity be state-owned or privatized?",
      done: true,
    })
    .returning();

  const electionId = election[0].id;

  const stateOwnedAlternative = await db
    .insert(alternativesTable)
    .values({
      name: "State-controlled electricity to ensure stability and sustainability",
      election_id: electionId,
    })
    .returning();

  const privatizedAlternative = await db
    .insert(alternativesTable)
    .values({
      name: "Privatized electricity with market competition to reduce prices",
      election_id: electionId,
    })
    .returning();

  const stateOwnedId = stateOwnedAlternative[0].id;
  const privatizedId = privatizedAlternative[0].id;

  await db.insert(votesTable).values([
    {
      voter_id: 1,
      representative_id: 1,
      election_id: electionId,
      alternative_id: stateOwnedId,
    },
    {
      voter_id: 2,
      representative_id: 1,
      election_id: electionId,
      alternative_id: stateOwnedId,
    },
    {
      voter_id: 3,
      representative_id: 1,
      election_id: electionId,
      alternative_id: stateOwnedId,
    },
    {
      voter_id: 4,
      representative_id: 1,
      election_id: electionId,
      alternative_id: privatizedId,
    },
    {
      voter_id: 5,
      representative_id: 1,
      election_id: electionId,
      alternative_id: privatizedId,
    },
    {
      voter_id: 6,
      representative_id: 1,
      election_id: electionId,
      alternative_id: privatizedId,
    },
    {
      voter_id: 7,
      representative_id: 2,
      election_id: electionId,
      alternative_id: stateOwnedId,
    },
    {
      voter_id: 8,
      representative_id: 2,
      election_id: electionId,
      alternative_id: stateOwnedId,
    },
    {
      voter_id: 9,
      representative_id: 2,
      election_id: electionId,
      alternative_id: stateOwnedId,
    },
    {
      voter_id: 10,
      representative_id: 2,
      election_id: electionId,
      alternative_id: stateOwnedId,
    },
  ]);

  console.log("Seed completed for electricity supply election");
};

/* const seedEducationElection = async () => {

    const election = await db.insert(electionTable).values({
      description: 'Education Funding: Should education be publicly funded or privately funded?',
      done: true,
    }).returning();
  
    const electionId = election[0].id;
  
    const publicFundingAlternative = await db.insert(alternativesTable).values({
      name: 'Publicly funded education to ensure equality and accessibility for all',
      election_id: electionId,
    }).returning();
  
    const privateFundingAlternative = await db.insert(alternativesTable).values({
      name: 'Privately funded education with choice and competition',
      election_id: electionId,
    }).returning();
  
    const publicFundingId = publicFundingAlternative[0].id;
    const privateFundingId = privateFundingAlternative[0].id;
  
    const voters = [
      { representative_id: 1 },
      { representative_id: 1 },
      { representative_id: 1 },
      { representative_id: 1 },
      { representative_id: 1 },
      { representative_id: 1 },
      { representative_id: 2 },
      { representative_id: 2 },
      { representative_id: 2 },
      { representative_id: 2 },
    ];
  
    for (const voter of voters) {
      await db.insert(publicVotersTable).values(voter);
    }
  
    // Skapa röster för alternativen
    await db.insert(votesTable).values([
      { voter_id: 1, representative_id: 1, election_id: electionId, alternative_id: publicFundingId },
      { voter_id: 2, representative_id: 1, election_id: electionId, alternative_id: publicFundingId },
      { voter_id: 3, representative_id: 1, election_id: electionId, alternative_id: publicFundingId },
      { voter_id: 4, representative_id: 1, election_id: electionId, alternative_id: privateFundingId },
      { voter_id: 5, representative_id: 1, election_id: electionId, alternative_id: privateFundingId },
      { voter_id: 6, representative_id: 1, election_id: electionId, alternative_id: privateFundingId },
      { voter_id: 7, representative_id: 2, election_id: electionId, alternative_id: publicFundingId },
      { voter_id: 8, representative_id: 2, election_id: electionId, alternative_id: publicFundingId },
      { voter_id: 9, representative_id: 2, election_id: electionId, alternative_id: privateFundingId },
      { voter_id: 10, representative_id: 2, election_id: electionId, alternative_id: privateFundingId },
    ]);
  
    console.log('Seed completed for education funding election');
  };
 */
const startSeed = async () => {
  try {
    await seedRepresentativesAndVoters();

    //await seedEducationElection();

    await seedElectricityElection();

    console.log("All seeds completed successfully.");
  } catch (error) {
    console.error("Error during seeding process:", error);
  }
};

startSeed();
