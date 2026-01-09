import { Modal } from '@/components/element/modal/Modal';
import { GuideModalDetail } from '@/components/pages/guide/GuideModalDetail';
import { SearchLists } from '@/components/pages/guide/SearchLists';
import { utilData } from '@/data/guide/utilData';
import type { PopupDataType } from '@/types/guide';
import { useState } from 'react';
export const UtilsGuidePage = () => {
  const [popupData, setPopupData] = useState<PopupDataType | null>(null);
  
  const handleItemClick = (e:string) => {
    const findData = utilData.find(item => item.id === e);
    if(findData?.popInfo){
      setPopupData({
        infoData: findData?.popInfo,
        link: findData.link
      })
    }
  }
  const onClose = () => {
    setPopupData(null);
  }
  return( 
    <div className="guide-cont">
      <div className="guide-inner">
        <SearchLists 
          data={utilData}
          searchTitle="Util"
          onClick={handleItemClick}
        />
        { popupData && (
          <Modal
            onClose={onClose}
            $width={600}
            $align="left"
          >
            <GuideModalDetail data={popupData} />
          </Modal>
        )}
      </div>
    </div>
  )
}