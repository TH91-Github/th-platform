import { Btn } from '@/components/element/button/Btn';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
	const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    if (count === 0) {
      navigate('/', { replace: true });
      return;
    }

    const timer = setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, [count, navigate]);
  return (
    <div className={styles.errorPage}>
      <div className={styles.inner}>
        <h1 className={styles.title}>페이지를 찾을 수 없습니다.</h1>
        <p className={styles.desc}>
          요청하신 페이지가 존재하지 않거나<br />
          주소가 변경되었을 수 있어요.
        </p>

        <div className={styles.btnWrap}>
          <Btn
						bType="primary"
            className={styles.primaryBtn}
            onClick={() => navigate('/')}
          >
            홈으로 이동
          </Btn>
          <span className={styles.timerText}>{count}초 후 자동으로 이동합니다.</span>
        </div>
      </div>
    </div>
  );
};
