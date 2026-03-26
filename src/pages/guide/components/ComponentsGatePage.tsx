import { elementData, layoutData, moduleData } from '@/data/guide/componentData';
import { guideLists } from '@/data/guide/guideLists';
import { useLocationPath } from '@/hook/common/useLocation';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { SearchLists } from '@/components/pages/guide/SearchLists';
import { capitalizeWords } from '@/utils/textUtils';

// 🔹 component gate page (element, module, layout)
const COMPONENT_DATA = {
  element : elementData,
  layout : layoutData,
  module : moduleData,
}
type ComponentCategory = keyof typeof COMPONENT_DATA;

export const ComponentsGatePage = () => {
  const { id } = useParams<{ id?: string }>();
  const { parentPath, currentPath } = useLocationPath(guideLists, 'id');
  const navigate = useNavigate();

  const handleItemClick = (pathID:string) => {
    navigate(`${pathID}`);
  }

  // 🔹 상세 페이지
  if (id) {
    return (
      <Outlet context={{ parentPath, id }} />
    );
  }

  const category = currentPath as ComponentCategory;
  // 🔹 검색 및 리스트
  return( 
    <SearchLists 
      data={COMPONENT_DATA[category]}
      searchTitle={capitalizeWords(category)}
      pageSize={12}
      onClick={handleItemClick}
    />
  )
}
