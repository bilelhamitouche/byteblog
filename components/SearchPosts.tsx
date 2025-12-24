"use client";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function testPathname(pathname: string) {
  return /^\/(login|register)(\/|$)/.test(pathname);
}

export default function SearchPosts({
  isAuthenticated,
  isMobile,
}: {
  isAuthenticated: boolean;
  isMobile?: boolean;
}) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/posts/search?search=${encodeURIComponent(search as string)}`);
  }
  if (!isAuthenticated && testPathname(pathname)) return null;
  return (
    <form onSubmit={onSubmit} className="w-full">
      <ButtonGroup className="w-full">
        <Input
          placeholder="Search Posts"
          className={`${isMobile ? "min-w-fit" : ""} max-w-48`}
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
