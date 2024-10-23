import { Action, ActionPanel, closeMainWindow, List } from "@raycast/api";
import { exec } from "child_process";

type PunctuationType = "JP-JP" | "JP-EN" | "EN-JP" | "EN-EN";

type Punctuation = {
  type: PunctuationType;
  title: string;
  index: number;
};

const items: Punctuation[] = [
  { type: "JP-JP", title: "。と、", index: 0 },
  { type: "JP-EN", title: "。と，", index: 1 },
  { type: "EN-JP", title: "．と、", index: 2 },
  { type: "EN-EN", title: "．と，", index: 3 },
];

const switchPunctuation = async (punctuation: Punctuation) => {
  exec(
    `defaults write com.apple.inputmethod.Kotoeri JIMPrefPunctuationTypeKey ${punctuation.index} && killall -HUP imklaunchagent`,
  );
  await closeMainWindow();
};

export default function Command() {
  return (
    <List isLoading={items === undefined}>
      {items?.map((item) => (
        <List.Item
          key={item.type}
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
