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
