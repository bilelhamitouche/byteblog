"use client";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function SearchTopics() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(`/topics?search=${encodeURIComponent(search)}`);
  }
  return (
    <form onSubmit={onSubmit}>
      <ButtonGroup>
        <Input
          placeholder="Search Topics"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm md:min-w-md"
        />
        <Button type="submit">Search</Button>
      </ButtonGroup>
    </form>
  );
}
