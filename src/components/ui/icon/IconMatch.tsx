import { IconMatchLists } from "./IconCheck";


// 🔹 id 값과 일치하는 icon import
export const IconMatch = ({ id }: { id: string }) => {
  if (id in IconMatchLists) {
    const IconComponent = IconMatchLists[id as keyof typeof IconMatchLists];
    return <IconComponent />;
  }
  return <span>x</span>;
};