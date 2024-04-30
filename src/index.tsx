import { Clipboard, environment, LaunchType, Toast, updateCommandMetadata } from "@raycast/api";

const shortList = [
  {
    flag: "🇺🇸",
    name: "LA",
    code: "US/Pacific",
  },
  {
    flag: "🇺🇸",
    name: "NY",
    code: "US/Eastern",
  },
  {
    flag: "🇵🇹",
    name: "",
    code: "Europe/Lisbon",
  },
  {
    flag: "🇮🇱",
    name: "",
    code: "Asia/Jerusalem",
  },
];

const command = async () => {
  const now = new Date();

  const getLocalTime = (timeZone: string) => now.toLocaleString([], { timeZone, timeStyle: "short" });

  const subtitle = shortList.map(({ name, code, flag }) => `${flag} ${name} ${getLocalTime(code)}`).join(" | ");

  await updateCommandMetadata({ subtitle });

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
};

export default command;

// import { Clipboard, environment, LaunchType, Toast, updateCommandMetadata, List } from "@raycast/api";
// import { useEffect } from "react";

// const shortList = [
//   {
//     flag: "🇺🇸",
//     name: "NY",
//     code: "US/Eastern",
//   },
//   {
//     flag: "🇺🇸",
//     name: "IL",
//     code: "Asia/Jerusalem",
//   },
//   {
//     flag: "🇪🇸",
//     name: "ES",
//     code: "Europe/Madrid",
//   },
// ];

// const longList = [
//   {
//     name: "US",
//     flag: "🇺🇸",
//     keywords: ["us", "united states", "pacific", "mountain", "central", "eastern"],
//     timeZones: [
//       {
//         name: "Pacific",
//         code: "US/Pacific",
//       },
//       {
//         name: "Mountain",
//         code: "US/Mountain",
//       },
//       {
//         name: "Central",
//         code: "US/Central",
//       },
//       {
//         name: "Eastern",
//         code: "US/Eastern",
//       },
//     ],
//   },
//   {
//     name: "Israel",
//     flag: "🇮🇱",
//     keywords: ["israel", "jerusalem"],
//     timeZones: [
//       {
//         name: "Jerusalem",
//         code: "Asia/Jerusalem",
//       },
//     ],
//   },
// ];

// export default function Command() {
//   const now = new Date();

//   const getLocalTime = (timeZone: string) => now.toLocaleString([], { timeZone, timeStyle: "short", hourCycle: "h12" });

//   const subtitle = shortList.map(({ name, code, flag }) => `${flag}${name}-${getLocalTime(code)}`).join(" | ");

//   updateCommandMetadata({ subtitle }).then(async () => {
//     if (environment.launchType === LaunchType.UserInitiated) {
//       const toast = new Toast({
//         style: Toast.Style.Success,
//         title: "Refreshed!",
//         message: subtitle,
//       });
//       // toast.primaryAction = {
//       //   title: "Copy to Clipboard",
//       //   shortcut: { modifiers: ["cmd", "shift"], key: "c" },
//       //   onAction: () => Clipboard.copy(subtitle),
//       // };
//       await toast.show();
//     }
//   });

//   return (
//     <List>
//       {longList.map((item, key) => (
//         <List.Item
//           key={key}
//           title={`${item.flag} ${item.name}`}
//           subtitle={item.timeZones.map(({ name, code }) => `${name} ${getLocalTime(code)}`).join(" | ")}
//         />
//       ))}
//     </List>
//   );
// }
