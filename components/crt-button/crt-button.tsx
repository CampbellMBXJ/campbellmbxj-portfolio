import { FC } from "react";
import styles from './crt-button.module.scss';

type CrtButtonProps = {
  channel: number;
};

const CrtButton: FC<CrtButtonProps> = ({ channel }) => {
  return <div className={styles['crt-button']}>

  </div>;
};

export default CrtButton;
