"use client";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Input } from "./ui/input";
import { useQueryState } from "nuqs";
import { FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function SearchPosts({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const router = useRouter();
  const pathname = usePathname();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/posts/search?search=${encodeURIComponent(search as string)}`);
  }
  if (!isAuthenticated && pathname === "/") return null;
  return (
    <form onSubmit={onSubmit}>
      <ButtonGroup>
        <Input
          placeholder="Search Posts"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search || ""}
        />
        <Button variant="outline">
          <Search />
        </Button>
      </ButtonGroup>
    </form>
  );
}
