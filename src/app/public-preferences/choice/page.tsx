import { ChoicePage } from "@/features";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function Page({ searchParams }: Props) {
  return <ChoicePage searchParams={searchParams} />;
}
