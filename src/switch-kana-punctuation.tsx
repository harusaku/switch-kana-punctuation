import { Action, ActionPanel, closeMainWindow, Icon, List, PopToRootType } from "@raycast/api";
import { execSync } from "child_process";
import { useEffect, useState } from "react";

enum PunctuationType {
  "JP-JP" = 0,
  "JP-EN" = 1,
  "EN-JP" = 2,
  "EN-EN" = 3,
}

type Punctuation = {
  type: PunctuationType;
  title: string;
};

const items: Punctuation[] = [
  { type: PunctuationType["JP-JP"], title: "。と、" },
  { type: PunctuationType["JP-EN"], title: "。と，" },
  { type: PunctuationType["EN-JP"], title: "．と、" },
  { type: PunctuationType["EN-EN"], title: "．と，" },
];

const getCurrentPunctuationType = (): PunctuationType => {
  const output = execSync("defaults read com.apple.inputmethod.Kotoeri JIMPrefPunctuationTypeKey", {
    encoding: "utf-8",
  });
  const index = parseInt(output, 10);
  return index as PunctuationType;
};

const switchPunctuation = async (punctuation: Punctuation) => {
  execSync(
    `defaults write com.apple.inputmethod.Kotoeri JIMPrefPunctuationTypeKey ${punctuation.type} && killall -HUP imklaunchagent`,
  );
  await closeMainWindow({ clearRootSearch: true, popToRootType: PopToRootType.Immediate });
};

export default function Command() {
  const [currentType, setCurrentType] = useState<PunctuationType>(0);

  useEffect(() => {
    const currentType = getCurrentPunctuationType();
    setCurrentType(currentType);
  }, []);
  return (
    <List isLoading={items === undefined}>
      {items.map((item) => (
        <List.Item
          key={item.type}
          icon={item.type === currentType ? Icon.Checkmark : Icon.Circle}
          title={item.title}
          actions={
            <ActionPanel>
              <Action title="Select" onAction={() => switchPunctuation(item)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
