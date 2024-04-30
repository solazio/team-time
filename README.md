# Team Time

![team-time](/assets/team-time.jpg)

Show your team's time zones at the top of Raycast's Root Search. I used the [raycast](https://www.raycast.com/templates/team-time) one to start.

It will automatically refresh every minute, but can also be refreshed manually by pressing ↩️

## How to add it to your Raycast
- Run `npm install`
- Run `npm run build`

List of time zones: [https://en.wikipedia.org/wiki/List_of_tz_database_time_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

List of country codes: [https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)

## Example on how to use it as a command to search specific time zone

```
import { Clipboard, environment, LaunchType, Toast, updateCommandMetadata, List } from "@raycast/api";
import { useEffect } from "react";

const shortList = [
  {
    flag: "🇺🇸",
    name: "NY",
    code: "US/Eastern",
  },
  {
    flag: "🇺🇸",
    name: "IL",
    code: "Asia/Jerusalem",
  },
  {
    flag: "🇪🇸",
    name: "ES",
    code: "Europe/Madrid",
  },
];

const longList = [
  {
    name: "US",
    flag: "🇺🇸",
    keywords: ["us", "united states", "pacific", "mountain", "central", "eastern"],
    timeZones: [
      {
        name: "Pacific",
        code: "US/Pacific",
      },
      {
        name: "Mountain",
        code: "US/Mountain",
      },
      {
        name: "Central",
        code: "US/Central",
      },
      {
        name: "Eastern",
        code: "US/Eastern",
      },
    ],
  },
  {
    name: "Israel",
    flag: "🇮🇱",
    keywords: ["israel", "jerusalem"],
    timeZones: [
      {
        name: "Jerusalem",
        code: "Asia/Jerusalem",
      },
    ],
  },
];

export default function Command() {
  const now = new Date();

  const getLocalTime = (timeZone: string) => now.toLocaleString([], { timeZone, timeStyle: "short", hourCycle: "h12" });

  const subtitle = shortList.map(({ name, code, flag }) => `${flag}${name}-${getLocalTime(code)}`).join(" | ");

  updateCommandMetadata({ subtitle }).then(async () => {
    if (environment.launchType === LaunchType.UserInitiated) {
      const toast = new Toast({
        style: Toast.Style.Success,
        title: "Refreshed!",
        message: subtitle,
      });
      toast.primaryAction = {
        title: "Copy to Clipboard",
        shortcut: { modifiers: ["cmd", "shift"], key: "c" },
        onAction: () => Clipboard.copy(subtitle),
      };
      await toast.show();
    }
  });

  return (
    <List>
      {longList.map((item, key) => (
        <List.Item
          key={key}
          title={`${item.flag} ${item.name}`}
          subtitle={item.timeZones.map(({ name, code }) => `${name} ${getLocalTime(code)}`).join(" | ")}
        />
      ))}
    </List>
  );
}
```
