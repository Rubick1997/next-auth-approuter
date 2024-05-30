import { AuthForm } from "@/components";

export default async function Home({ searchParams }: Props) {
  const formMode = searchParams.mode || "login";
  return <AuthForm mode={formMode} />;
}

type Props = {
  searchParams: ObjectType;
};
