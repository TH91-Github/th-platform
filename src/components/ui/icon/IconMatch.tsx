import { IconCheck } from "./IconCheck";

// 🔹 id 값과 일치하는 icon import
export const IconMatch = ({ id }: { id: string }) => {
  if (id in IconCheck) {
    const IconComponent = IconCheck[id as keyof typeof IconCheck];
    return <IconComponent />;
  }
  return <span>x</span>;
};