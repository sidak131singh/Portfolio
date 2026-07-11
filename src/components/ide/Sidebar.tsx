"use client";

import Explorer from "@/components/ide/Explorer";
import SearchPanel from "@/components/ide/SearchPanel";
import SourceControlPanel from "@/components/ide/SourceControlPanel";
import ExtensionsPanel from "@/components/ide/ExtensionsPanel";
import ProfilePanel from "@/components/ide/ProfilePanel";
import SettingsPanel from "@/components/ide/SettingsPanel";
import { useIdeStore } from "@/store/ideStore";

/** Renders whichever panel the activity bar has selected. */
export default function Sidebar() {
  const panel = useIdeStore((s) => s.sidebarPanel);

  switch (panel) {
    case "search":
      return <SearchPanel />;
    case "source-control":
      return <SourceControlPanel />;
    case "extensions":
      return <ExtensionsPanel />;
    case "profile":
      return <ProfilePanel />;
    case "settings":
      return <SettingsPanel />;
    default:
      return <Explorer />;
  }
}
