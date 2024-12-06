import { ElectionVotePage } from "@/features";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function Page({ searchParams }: Props ) {

  return <ElectionVotePage searchParams={searchParams}/>
}
