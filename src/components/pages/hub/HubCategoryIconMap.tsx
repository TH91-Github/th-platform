import { IconAirport, IconBookmark, IconCalendar, IconChat, IconComponents, IconFolderAdd, IconKey, IconLock, IconMoney, IconPart, IconPen, IconRunning, IconTogether, IconUnlock, IconUser } from "@/assets/icon";

export const HubCategoryIconMap : Record<string, React.ReactNode> = {
  // total
  totalAll: <IconPart />,
  totalSingle: <IconUser />,
  totalMulti: <IconTogether />,
  totalPublic: <IconUnlock />,
  totalPrivate: <IconLock />,
  // category
  categoryNormal: <IconChat />,
  categoryTravel: <IconAirport />,
  categoryCalendar: <IconCalendar />,
  categoryMemo: <IconPen />,
  categoryCashledger: <IconMoney />,
  categoryRunning: <IconRunning />,
  // book
  bookmarkAll: <IconBookmark />,
  bookmarkCategory: <IconComponents />, 
  bookmarkPublic:<IconKey />,
}