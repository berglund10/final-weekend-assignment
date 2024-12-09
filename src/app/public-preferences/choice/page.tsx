import ChoicePage from "@/features/public-preferences/ui/choice-page";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function Page({ searchParams }: Props) {
  return <ChoicePage searchParams={searchParams} />;
}
