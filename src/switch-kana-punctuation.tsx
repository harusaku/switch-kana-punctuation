import { Action, ActionPanel, List } from "@raycast/api";

export default function Command() {
  const items = ["Kana", "Punctuation"];

  return (
    <List isLoading={items === undefined}>
      {items?.map((item, index) => (
        <List.Item
          key={index}
          title={item}
          actions={
            <ActionPanel>
              <Action title="Select" onAction={() => console.log(`${item} selected`)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
