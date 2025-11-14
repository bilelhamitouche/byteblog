"use client";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Input } from "./ui/input";
import { useQueryState } from "nuqs";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SearchPosts() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const router = useRouter();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/posts/search?search=${encodeURIComponent(search as string)}`);
  }
  return (
    <form onSubmit={onSubmit}>
      <ButtonGroup>
        <Input
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
