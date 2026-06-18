import { StackRouterProps } from "@/routes/StackRoutes";
import { AppBar } from "@/components/AppBar";
import { useState } from "react";
import { Header } from "@/components/Header";
import { PixList } from "@/components/PixList";
import { KeysToShare } from "@/app/Type/types";

export function Home({ route }: StackRouterProps<"home">) {
  const [keysToShare, setKeysToShare] = useState<KeysToShare[]>([]);
  return (
    <AppBar keys={keysToShare} currentRoute={"home"}>
      <Header />
      <PixList
        own={0}
        keysToShare={keysToShare}
        setKeysToShare={setKeysToShare}
      />
    </AppBar>
  );
}
