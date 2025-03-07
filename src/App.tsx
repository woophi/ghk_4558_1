import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Gap } from '@alfalab/core-components/gap';
import { Input } from '@alfalab/core-components/input';
import { PopupSheet } from '@alfalab/core-components/popup-sheet';
import { Switch } from '@alfalab/core-components/switch';
import { SystemMessageMobile } from '@alfalab/core-components/system-message/mobile';
import { Typography } from '@alfalab/core-components/typography';
import { useState } from 'react';
import bottom from './assets/bottom.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { sendDataToGA } from './utils/events';

const items = [
  'Готовые фразы со смайликами',
  'Аудио, записанные вами',
  'Видео, записанные вами',
  'Видео с персонажами Альфа-Банка',
  'Видео от известных людей',
];

const items2 = ['Баста', 'Wylsacom', 'Алла Михеева'];

const obj = items.concat(items2).reduce<Record<string, boolean>>((acc, item) => {
  acc[item] = false;
  return acc;
}, {});

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [checkedItems, setCheckedItem] = useState(obj);
  const [celebName, setName] = useState('');

  const submitFinish = () => {
    setLoading(true);

    sendDataToGA({
      alla: checkedItems['Алла Михеева'] ? 1 : 0,
      audio: checkedItems['Аудио, записанные вами'] ? 1 : 0,
      basta: checkedItems['Баста'] ? 1 : 0,
      name: celebName,
      text_with_smiles: checkedItems['Готовые фразы со смайликами'] ? 1 : 0,
      video: checkedItems['Видео, записанные вами'] ? 1 : 0,
      video_celeb: checkedItems['Видео от известных людей'] ? 1 : 0,
      video_mascots: checkedItems['Видео с персонажами Альфа-Банка'] ? 1 : 0,
      wylsacom: checkedItems['Wylsacom'] ? 1 : 0,
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };
  const submit = () => {
    window.gtag('event', '4558_continue_click_var1');
    if (Object.values(checkedItems).every(item => !item) && !celebName) {
      setError(true);
      return;
    }

    submitFinish();
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.box}>
          <Typography.TitleResponsive tag="h1" view="large" font="system" weight="semibold">
            Персонализируйте переводы
          </Typography.TitleResponsive>
          <Typography.Text view="primary-medium">
            Выберите, какие сообщения добавлять при переводах другим клиентам Альфа-Банка
          </Typography.Text>
          <img src={bottom} alt="bottom" height={168} width="100%" style={{ marginBottom: '-1rem', objectFit: 'cover' }} />
        </div>

        <Typography.TitleResponsive tag="h3" view="small" font="system" weight="semibold">
          Виды сообщений
        </Typography.TitleResponsive>
        <div className={appSt.boxswitchers}>
          {items.map(item => (
            <Switch
              key={item}
              block
              reversed
              checked={checkedItems[item]}
              label={item}
              onChange={() =>
                setCheckedItem({
                  ...checkedItems,
                  [item]: !checkedItems[item],
                })
              }
              className={appSt.switchItem}
            />
          ))}
        </div>
        <Typography.TitleResponsive tag="h3" view="small" font="system" weight="semibold">
          Кого из знаменитостей добавить?
        </Typography.TitleResponsive>
        <div className={appSt.boxswitchers}>
          {items2.map(item => (
            <Switch
              key={item}
              block
              reversed
              checked={checkedItems[item]}
              label={item}
              onChange={() =>
                setCheckedItem({
                  ...checkedItems,
                  [item]: !checkedItems[item],
                })
              }
              className={appSt.switchItem}
            />
          ))}
          <Input
            block={true}
            label="Свой вариант"
            labelView={'inner'}
            size={48}
            value={celebName}
            onChange={e => setName(e.target.value)}
            maxLength={50}
          />
        </div>
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile loading={loading} block view="primary" onClick={submit}>
          Продолжить
        </ButtonMobile>
      </div>

      <PopupSheet open={error} onClose={() => setError(false)} padding={0}>
        <SystemMessageMobile padding={32}>
          <SystemMessageMobile.Title>Вы ничего не выбрали</SystemMessageMobile.Title>

          <SystemMessageMobile.Subtitle>
            Вы можете выбрать любые виды сообщений, которые хотели бы добавлять при совершении перевода. Это бесплатно.
          </SystemMessageMobile.Subtitle>

          <SystemMessageMobile.Controls>
            <ButtonMobile
              size="m"
              block
              view="primary"
              onClick={() => {
                window.gtag('event', '4558_back_var1');
                setError(false);
              }}
              disabled={loading}
            >
              Вернуться к выбору
            </ButtonMobile>
            <ButtonMobile
              size="m"
              block
              view="transparent"
              onClick={() => {
                window.gtag('event', '4558_quit_var1');
                submitFinish();
              }}
              disabled={loading}
            >
              Мне это не интересно
            </ButtonMobile>
          </SystemMessageMobile.Controls>
        </SystemMessageMobile>
      </PopupSheet>
    </>
  );
};
