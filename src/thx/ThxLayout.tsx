import { Typography } from '@alfalab/core-components/typography';
import rocket from '../assets/rocket.png';
import { thxSt } from './style.css';

export const ThxLayout = () => {
  return (
    <>
      <div className={thxSt.container}>
        <div className={thxSt.box}>
          <img src={rocket} width={48} height={48} />
        </div>
        <Typography.TitleResponsive font="system" tag="h1" view="large" defaultMargins weight="bold">
          Ваши интересы — наше вдохновение
        </Typography.TitleResponsive>
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
          Мы проводим исследование для нового сервиса. Скоро расскажем о нём подробнее, следите за новостями!
        </Typography.Text>
      </div>
    </>
  );
};
