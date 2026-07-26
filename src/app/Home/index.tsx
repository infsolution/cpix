import { StackRouterProps } from "@/routes/StackRoutes";
import { AppBar } from "@/components/AppBar";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { PixList } from "@/components/PixList";
import { KeysToShare } from "@/app/Type/types";
import { Banner } from "@/ads/Banner";
import { initializeBackgroundTask } from "@/tasks/backgroundBackupTask";

let resolver: (() => void) | null;
const promise = new Promise<void>((resolve) => {
  resolver = resolve;
});
initializeBackgroundTask(promise);
export function Home({ route }: StackRouterProps<"home">) {
  const [keysToShare, setKeysToShare] = useState<KeysToShare[]>([]);
  useEffect(() => {
    if (resolver) {
      resolver();
    }
  }, []);
  return (
    <AppBar keys={keysToShare} currentRoute={"home"}>
      <Header />
      <PixList
        own={0}
        keysToShare={keysToShare}
        setKeysToShare={setKeysToShare}
        custoStyleListItem={{ paddingBottom: 126 }}
      />
      <Banner custom={{ position: "absolute", bottom: "106" }} />
    </AppBar>
  );
}
