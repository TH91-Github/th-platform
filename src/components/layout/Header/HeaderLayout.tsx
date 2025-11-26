import css from './HeaderLayout.module.scss';

export const HeaderLayout = () => {
  return (
    <div className={css.header}>
      <div className="blind">
        test
      </div>
      <div className="cont-inner">
        <p className="title">ddd</p>
        <p className={`tit ${css.tit}`}>ddd</p>
        <p className="tit-s">zx czxc </p>
        <p className={css.text}>zx c d</p>
        <p className="desc">dzxc zdd</p>
        <p className="txt">ddxc zxc zxc zd</p>
        <p className="txt-s">dddxc zxc </p>
      </div>
    </div>
  )
}